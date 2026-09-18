import {Button, StyleSheet, Text, View} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native';
import {StatusBar } from 'expo-status-bar'; 

import BuyList from "./BuyList";
import styles from "../../App.styles";

const BuyScreen= ({navigation, route}) => {
    return (
  <SafeAreaProvider>
       <SafeAreaView style={styles.mainContainer}>
        <View style={styles.container}>


            {/*<Text style={styles.user}>This is {!route.params ? "DEFAULT" : route.params.name}'s profile</Text> */}
            <Text style={styles.user}>Купити</Text>
            {/*<Text style={styles.title}>{signer.address}</Text>*/}

            <BuyList />
            {/*<View style={{marginTop: 20}}>*/}

            <TouchableOpacity onPress={() => navigation.navigate('BuyOrSell')} style={styles.button}>
            <Text style={styles.buttonText}>Повернутися</Text>
            </TouchableOpacity>

       <StatusBar style="auto" />
        </View>
        </SafeAreaView>
        </SafeAreaProvider>
    )
};


export default BuyScreen;
