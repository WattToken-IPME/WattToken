import React from 'react';
import {StyleSheet, Button, View, Text, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { TouchableOpacity} from 'react-native';
import { StatusBar } from 'expo-status-bar';
//import {Button, StyleSheet, Text, View} from "react-native";
import styles from "../../App.styles";

const BuyOrSellScreen= ({navigation, route}) => {
    return (
       <SafeAreaProvider>
       <SafeAreaView style={styles.mainContainer}>
       <View style={styles.container}>

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
    )
};

export default BuyOrSellScreen;


