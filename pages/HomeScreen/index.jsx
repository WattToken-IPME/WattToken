import React from 'react';
import {StyleSheet, Button, View, Text, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native';
import {StatusBar } from 'expo-status-bar';
//import {SafeAreaView} from 'react-native-safe-area-context';
//import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';
//import HomeScreen from './HomeScreen';
//import DetailsScreen from './DetailsScreen';

//import BuyOrSell from './page2.js';

/*
// Import everything
import { ethers } from "ethers";

// Import just a few select items
import { BrowserProvider, parseUnits } from "ethers";

// Import from a specific export
import { HDNodeWallet } from "ethers/wallet";
*/


//import { View, Text, Button } from "react-native";
import styles from "../../App.styles";


// Import everything
import { ethers } from "ethers";

// Import just a few select items
import { BrowserProvider, parseUnits } from "ethers";

// Import from a specific export
import { HDNodeWallet } from "ethers/wallet";

<script type="module">
import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.min.js";
</script>


const HomeScreen = ({navigation}) => {

    let web3 = null;
    let provider = null;
    let signer = null;

async function connect () {
if (window.ethereum == null) {

    // If MetaMask is not installed, we use the default provider,
    // which is backed by a variety of third-party services (such
    // as INFURA). They do not have private keys installed,
    // so they only have read-only access
    console.log("MetaMask not installed; using read-only defaults")
    provider = ethers.getDefaultProvider()

} else {
    console.log("MetaMask  installed")
    // Connect to the MetaMask EIP-1193 object. This is a standard
    // protocol that allows Ethers access to make all read-only
    // requests through MetaMask.
    provider = new ethers.BrowserProvider(window.ethereum)

    // It also provides an opportunity to request access to write
    // operations, which will be performed by the private key
    // that MetaMask manages for the user.
    signer = await provider.getSigner();
    console.log(signer.address);
   //Adress = signer.address;
   //console.log(Adress);
}
}

  function loginWallet(){
    console.log('Button pressed 1');
    connect(); 
    //console.log(Adress);

    return (
        // connect()
    console.log('Button pressed 2')

    )
  }

   return (
      <SafeAreaProvider>
       <SafeAreaView style={styles.mainContainer}>
        <View style={styles.container}>
            <Text style={styles.title}>Wattoken</Text>
            {/*<Text>Open up App.js to start working on your app!</Text>*/}
            {/*<Button style={styles.button}*/}

        <TouchableOpacity onPress={() => {loginWallet(); navigation.navigate('BuyOrSell');}} 
                          style={styles.button}>
        <Text style={styles.buttonText}>Вхід через гаманець</Text>
        </TouchableOpacity>

          <StatusBar style="auto" />
        </View>
        </SafeAreaView>
        </SafeAreaProvider>
      ); 
  
      /*
  return (
        <View>
            <Text style={styles.title}>Wattoken</Text>
           

            <Button
                title="Вхід через гаманець"
                onPress={() => {loginWallet();
                    navigation.navigate('BuyOrSell');}
                }
            />

        </View>
    );
    */
};

export default HomeScreen;

 