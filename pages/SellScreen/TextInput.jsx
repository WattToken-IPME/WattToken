import { View, TextInput } from 'react-native';
import { useState } from "react";

import styles from "./TextInput.style";

const MyTextInput = () => {
    const [inputValue, setInputValue] = useState('');

    return (
        <SafeAreaProvider>
        <SafeAreaView style={styles.mainContainer}>
        <View style={styles.container}>

            <TextInput
                style={styles.input}
                onChangeText={text => setInputValue(text)}
                value={inputValue}
                placeholder="Введіть пропозицію"
            />
             <StatusBar style="auto" />
        </View>
        </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default MyTextInput;
