import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar} from 'expo-status-bar';
import {ethers} from 'ethers';

import styles from '../../App.styles';

const ARBITRUM_SEPOLIA_CHAIN_ID = '0x66eee';
const PT_ADDRESS = '0x0CA65d9BA42e159631c1063A8fED2DDFACb0b638';
const YT_ADDRESS = '0xdC48Cc60AB06682a9B92a5df326Cf2ad01CA9733';

const PT_ABI = [
    'function holdedTokenCount(address holder) view returns (uint256)',
    {
        inputs: [
            {internalType: 'address', name: 'holder', type: 'address'},
            {internalType: 'uint256', name: 'offset', type: 'uint256'},
            {internalType: 'uint256', name: 'limit', type: 'uint256'},
        ],
        name: 'holdedMetadatas',
        outputs: [
            {
                components: [
                    {internalType: 'uint256', name: 'contractId', type: 'uint256'},
                    {internalType: 'uint256', name: 'energyVolume', type: 'uint256'},
                    {internalType: 'uint256', name: 'currencyVolume', type: 'uint256'},
                    {internalType: 'uint64', name: 'deliveryStartTimestamp', type: 'uint64'},
                    {internalType: 'uint64', name: 'deliveryEndTimestamp', type: 'uint64'},
                ],
                internalType: 'struct ISY.Metadata[]',
                name: 'result',
                type: 'tuple[]',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
];

const YT_ABI = [
    'function balanceOf(address account) view returns (uint256)',
    'function decimals() view returns (uint8)',
];

const trimFormattedUnits = (value) => {
    if (!value.includes('.')) {
        return value;
    }

    return value.replace(/0+$/, '').replace(/\.$/, '');
};

const switchToArbitrumSepolia = async (ethereum) => {
    const chainId = await ethereum.request({method: 'eth_chainId'});

    if (chainId.toLowerCase() !== ARBITRUM_SEPOLIA_CHAIN_ID) {
        await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{chainId: ARBITRUM_SEPOLIA_CHAIN_ID}],
        });
    }
};

const BuyOrSellScreen = ({navigation, route}) => {
    const [walletAddress, setWalletAddress] = useState(route.params?.walletAddress ?? null);
    const [balances, setBalances] = useState({
        ptTokenCount: '0',
        ptEnergyVolume: '0',
        ytBalance: '0',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const requestId = useRef(0);
    const lastRouteAddress = useRef(route.params?.walletAddress ?? null);

    const loadBalances = useCallback(async (address) => {
        const ethereum = typeof window !== 'undefined' ? window.ethereum : null;
        const currentRequestId = ++requestId.current;

        if (!ethereum || !address || !ethers.isAddress(address)) {
            setIsLoading(false);
            setErrorMessage('Гаманець не підключено.');
            return;
        }

        setIsLoading(true);
        setErrorMessage(null);

        try {
            await switchToArbitrumSepolia(ethereum);

            // Recreate the provider after a possible chain switch.
            const provider = new ethers.BrowserProvider(ethereum);
            const ptContract = new ethers.Contract(PT_ADDRESS, PT_ABI, provider);
            const ytContract = new ethers.Contract(YT_ADDRESS, YT_ABI, provider);

            const [ptTokenCount, ytRawBalance, ytDecimals] = await Promise.all([
                ptContract.holdedTokenCount(address),
                ytContract.balanceOf(address),
                ytContract.decimals(),
            ]);

            let ptEnergyVolume = 0n;

            if (ptTokenCount > 0n) {
                const metadatas = await ptContract.holdedMetadatas(address, 0n, ptTokenCount);
                ptEnergyVolume = metadatas.reduce(
                    (total, metadata) => total + (metadata.energyVolume ?? metadata[1]),
                    0n,
                );
            }

            if (requestId.current !== currentRequestId) {
                return;
            }

            setBalances({
                ptTokenCount: ptTokenCount.toString(),
                ptEnergyVolume: ptEnergyVolume.toString(),
                ytBalance: trimFormattedUnits(ethers.formatUnits(ytRawBalance, Number(ytDecimals))),
            });
            setHasLoaded(true);
        } catch (error) {
            if (requestId.current !== currentRequestId) {
                return;
            }

            console.error('Balance loading failed:', error);
            setErrorMessage('Не вдалося завантажити баланси. Перевірте гаманець і мережу.');
        } finally {
            if (requestId.current === currentRequestId) {
                setIsLoading(false);
            }
        }
    }, []);

    useEffect(() => {
        const routeAddress = route.params?.walletAddress;

        if (routeAddress && routeAddress !== lastRouteAddress.current) {
            lastRouteAddress.current = routeAddress;
            setWalletAddress(routeAddress);
        }
    }, [route.params?.walletAddress]);

    useEffect(() => {
        const ethereum = typeof window !== 'undefined' ? window.ethereum : null;

        if (!ethereum || walletAddress) {
            return;
        }

        ethereum.request({method: 'eth_accounts'})
            .then((accounts) => {
                if (accounts.length > 0) {
                    const address = ethers.getAddress(accounts[0]);
                    setWalletAddress(address);
                    navigation.setParams({walletAddress: address});
                }
            })
            .catch((error) => console.error('Could not read connected wallet accounts:', error));
    }, [navigation, walletAddress]);

    useFocusEffect(
        useCallback(() => {
            loadBalances(walletAddress);

            return () => {
                // Invalidate a pending request when the user leaves this screen.
                requestId.current += 1;
            };
        }, [loadBalances, walletAddress]),
    );

    useEffect(() => {
        const ethereum = typeof window !== 'undefined' ? window.ethereum : null;

        if (!ethereum?.on) {
            return;
        }

        const handleAccountsChanged = (accounts) => {
            requestId.current += 1;

            if (accounts.length === 0) {
                setWalletAddress(null);
                setHasLoaded(false);
                setErrorMessage(null);
                lastRouteAddress.current = null;
                navigation.setParams({walletAddress: undefined});
                navigation.navigate('Home');
                return;
            }

            const address = ethers.getAddress(accounts[0]);
            setWalletAddress(address);
            navigation.setParams({walletAddress: address});
        };

        const handleChainChanged = () => {
            if (walletAddress) {
                loadBalances(walletAddress);
            }
        };

        ethereum.on('accountsChanged', handleAccountsChanged);
        ethereum.on('chainChanged', handleChainChanged);

        return () => {
            ethereum.removeListener?.('accountsChanged', handleAccountsChanged);
            ethereum.removeListener?.('chainChanged', handleChainChanged);
        };
    }, [loadBalances, navigation, walletAddress]);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.mainContainer}>
                <View style={[styles.container, styles.balanceScreenContainer]}>
                    <View style={styles.balanceContainer}>
                        <Text style={styles.balanceTitle}>Ваші баланси</Text>

                        {isLoading && (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator color="#012D33" />
                                <Text style={styles.loadingText}>Завантаження балансів...</Text>
                            </View>
                        )}

                        {hasLoaded && (
                            <>
                                <Text style={styles.tokenTitle}>PT</Text>
                                <View style={styles.balanceRow}>
                                    <Text style={styles.balanceLabel}>Кількість токенів</Text>
                                    <Text style={styles.balanceValue}>{balances.ptTokenCount}</Text>
                                </View>
                                <View style={styles.balanceRow}>
                                    <Text style={styles.balanceLabel}>Загальний обсяг енергії</Text>
                                    <Text style={styles.balanceValue}>{balances.ptEnergyVolume}</Text>
                                </View>
                                <Text style={styles.tokenTitle}>YT</Text>
                                <View style={styles.balanceRow}>
                                    <Text style={styles.balanceLabel}>Баланс</Text>
                                    <Text style={styles.balanceValue}>{balances.ytBalance}</Text>
                                </View>
                            </>
                        )}

                        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate('Buy')} style={styles.button}>
                        <Text style={styles.buttonText}>Купити</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Sell')} style={styles.button}>
                        <Text style={styles.buttonText}>Продати</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.button}>
                        <Text style={styles.buttonText}>Повернутися</Text>
                    </TouchableOpacity>

                    <StatusBar style="auto" />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default BuyOrSellScreen;
