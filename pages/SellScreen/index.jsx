import {Button, StyleSheet, Text, View} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native';
import {StatusBar } from 'expo-status-bar'; 

import TextInput from "./TextInput";
import styles from "../../App.styles";

const SellScreen= ({navigation, route}) => {
    return (
        <SafeAreaProvider>
        <SafeAreaView style={styles.mainContainer}>
        <View style={styles.container}>
            {/*<Text style={styles.user}>This is {!route.params ? "DEFAULT" : route.params.name}'s profile</Text> */}
            <Text style={styles.user}>Продати</Text>
            <Text style={styles.user}>20</Text>
            {/*<Text style={styles.wallet}>0xB88672BB19da0F34526e9BC32A8d586a0b707e30</Text>*/}
            {/*<Text style={styles.wallet}>{signer.address}</Text>*/}
            {/*<TextInput />*/}

            <TouchableOpacity onPress={() => navigation.navigate('BuyOrSell')} style={styles.button}>
            <Text style={styles.buttonText}>Повернутися</Text>
            </TouchableOpacity>
         

        <StatusBar style="auto" />
        </View>
        </SafeAreaView>
        </SafeAreaProvider>
    )
};

export default SellScreen;

