import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";

/*
     
    Exercise: Creating a new component
        •Use the application you just created
        •Create a new component
        •Create a file with a name such as: MyComponent.tsx or js
        •Make sure it has View and Text component with text like: “Hello World!”
        •Import it into App.tsx, to show the component
        •Also, create another Text component and pass a Prop with some newtext. 
    
        Tip: Check “The elements of a component” slide for syntax examples
 
*/

// First we define the props that we want to pass to the component
interface ComponentProps {
    text: string;
}

// We define the component as a function that takes in the props
export default function MyComponent({ text }: ComponentProps) {

    return (
        <View>
            <View style={styles.container}>

                <Text style={styles.mainText}>
                    The Original Hello World from MyComponent!
                </Text>
                <Text style={styles.textExample}>
                    Below is the prop you passed:
                </Text>
                <Text style={styles.PropText}>
                    {text}
                </Text>
            </View>
        </View>
    );
}

// Just styling. :)
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
    mainText: {
        fontWeight: "bold",
        fontSize: 25,
        borderColor: "black",
        textAlign: "center",

    },
    PropText: {
        fontWeight: "bold",
        fontSize: 25,
        color: "lightgreen",
        textAlign: "center",
    },
});
