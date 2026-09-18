import React from 'react';
import {StyleSheet, Button, View, Text, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { TouchableOpacity} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FlatList} from 'react-native';
//import styles from "./BuyList.style";
import styles from "../../../App.styles";

const data = [
    { id: '0', title: '|   Таймслот  | Кількість |  Ціна  |    Сума    |' },
    { id: '1', title: '| 00:00-01:00 |     100     |  10.00  |  1000.00  |' },
    { id: '2', title: '| 01:00-02:00 |     200     |  20.00  |  4000.00  |' },
    { id: '3', title: '| 02:00-03:00 |     300     |  30.00  |  9000.00  |' },
    { id: '4', title: '| 03:00-04:00 |     400     |  40.00  | 16000.00  |' },
    { id: '5', title: '| 03:00-04:00 |     500     |  10.00  |  5000.00  |' },
    { id: '6', title: '| 03:00-04:00 |     600     |  10.00  |  6000.00  |' },
    { id: '7', title: '| 03:00-04:00 |     700     |  10.00  |  7000.00  |' },
    { id: '8', title: '| 03:00-04:00 |     800     |  10.00  |  8000.00  |' },


    // ... Інші елементи
];

const Item = ({ title }) => (
        <Text style={styles.title1}>{title}</Text>
);

const BuyList= () => {
    return (
        10
        /*
        <FlatList
            data={data}
            renderItem={({ item }) => <Item title={item.title} />}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
        */
    );
};

export default BuyList;
