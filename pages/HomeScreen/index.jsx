import React, {useState} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar} from 'expo-status-bar';
import {ethers} from 'ethers';

import styles from '../../App.styles';

const ARBITRUM_SEPOLIA = {
    chainId: '0x66eee',
    chainName: 'Arbitrum Sepolia',
    nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrls: ['https://sepolia-rollup.arbitrum.io/rpc'],
    blockExplorerUrls: ['https://sepolia.arbiscan.io'],
};

const getErrorCode = (error) => error?.code ?? error?.info?.error?.code ?? error?.data?.originalError?.code;

const switchToArbitrumSepolia = async (ethereum) => {
    try {
        await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{chainId: ARBITRUM_SEPOLIA.chainId}],
        });
    } catch (error) {
        if (Number(getErrorCode(error)) !== 4902) {
            throw error;
        }

        await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [ARBITRUM_SEPOLIA],
        });

        await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{chainId: ARBITRUM_SEPOLIA.chainId}],
        });
    }
};

const HomeScreen = ({navigation}) => {
    const [isConnecting, setIsConnecting] = useState(false);

    const connectWallet = async () => {
        const ethereum = typeof window !== 'undefined' ? window.ethereum : null;

        if (!ethereum) {
            Alert.alert('Гаманець не знайдено', 'Встановіть MetaMask, щоб підключити гаманець.');
            return;
        }

        setIsConnecting(true);

        try {
            await ethereum.request({method: 'eth_requestAccounts'});
            await switchToArbitrumSepolia(ethereum);

            // Create the provider after switching networks so ethers uses the current chain.
            const provider = new ethers.BrowserProvider(ethereum);
            const signer = await provider.getSigner();
            const walletAddress = await signer.getAddress();

            navigation.navigate('BuyOrSell', {walletAddress});
        } catch (error) {
            console.error('Wallet connection failed:', error);
            const message = Number(getErrorCode(error)) === 4001
                ? 'Підключення гаманця або зміну мережі було відхилено.'
                : 'Не вдалося підключити гаманець. Спробуйте ще раз.';
            Alert.alert('Помилка підключення', message);
        } finally {
            setIsConnecting(false);
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.mainContainer}>
                <View style={styles.container}>
                    <Text style={styles.title}>Wattoken</Text>

                    <TouchableOpacity
                        disabled={isConnecting}
                        onPress={connectWallet}
                        style={[styles.button, isConnecting && styles.buttonDisabled]}
                    >
                        <Text style={styles.buttonText}>
                            {isConnecting ? 'Підключення...' : 'Вхід через гаманець'}
                        </Text>
                    </TouchableOpacity>

                    <StatusBar style="auto" />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default HomeScreen;
