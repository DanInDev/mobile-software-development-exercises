import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function CarRentalCard() {

    function rentnow() {
        console.log("Renting Car");
    }

    const imgsrc = require('../assets/batmobile.jpg');

    return (
        <View style={styles.cardContainer}>
            <View style={styles.contentContainer}>
                <Image source={imgsrc} style={styles.carImage} />
                <View style={styles.textContainer}>
                    <Text style={styles.carModel}>Mayhars Batmobile</Text>
                    <Text style={styles.carPrice}>$500/day</Text>
                </View>
            </View>

            {/* You could also use a <Button> instead, we just like some styling here*/}
            <TouchableOpacity style={styles.rentButton} onPress={rentnow}>
                <Text style={styles.buttonText}>Rent Now</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({

    /* Flexbox is used to align the image and text in a row, */
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    // Centers the button horizontally
    rentButton: {
        marginTop: 10,
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    
    // Centers text-container vertically
    textContainer: {
        // flex: 1, makes the text container take up all the remaining space (Grows with the View)
        flex: 1,
        paddingLeft: 10,
        justifyContent: 'center',
    },

    // Styling for the card container, only important is "alignSelf: 'center'"
    cardContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#fff',
        margin: 10,
        width: '90%',
        alignSelf: 'center',
    },

    /* Rest is just styling to make it look pretty. */
    // Image styling
    carImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    carModel: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    carPrice: {
        fontSize: 16,
        color: '#888',
        marginTop: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
