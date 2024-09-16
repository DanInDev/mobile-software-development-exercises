import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";



export default function MyClickerComponent() {

    /* 
    Use the useState hook to create a state variable called currentAmount
    and a function to update it called setAmount.
    */
    const [currentAmount, setAmount] = useState(0);


    /* 
    Currently written as shorthand, but can be written as a function, like so:
    
    function onPress() {
        setAmount(currentAmount + 1);
    }
     
    Uses currentAmount to get its current value and increments it by 1, when setAmount is called.
    */

    const onPress = () => setAmount(currentAmount => currentAmount + 1);

    return (
        <View style={styles.container}>
            <Text style={styles.textExample}>
                This is the Clicker Component!
            </Text>
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <Text style={styles.textExample}>
                    Press here to increment: {currentAmount}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 25,
        backgroundColor: 'green',
        borderColor: 'black',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    textExample: {
        fontWeight: "bold",
        fontSize: 25,
        borderColor: "black",
    },
});
