import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Touchable,
} from "react-native";

// The expected response from the API
type CarResponse = {
  id: string;
  name: string;
  model: string;
  year: number;
  pricePerDay: number;
  isAvailable: boolean;
};

export default function RandomCarCard() {

  // State to hold the current random car.
  const [car, setCar] = useState<CarResponse | null>(null);

  // Function to fetch car data from the API
  const fetchCarData = async () => {
    try {
      // Fetch the car data from the "API" (JSON file in this case), generally you would use a real API endpoint.
      // For example, see the SWApi for real endpoints: https://swapi.dev/
      const response = await axios.get(
        "https://raw.githubusercontent.com/DanInDev/mobile-software-development-exercises/main/cars.json"
      );
      const randomCar =
        response.data[Math.floor(Math.random() * response.data.length)];
      setCar(randomCar); // Set the random car in the state
    } catch (error) {
      console.log(error)
      console.error("Error fetching car data:", error
      );
    }
  };

  // Fetch the car data when the component mounts
  useEffect(() => {
    fetchCarData();
  }, []);

  // Function to handle the Rent Now button press
  const rentNow = () => {
    if (car) {
      console.log("Rent car button");
    }
  };

  // Check if no car was returned from the API
  if (!car) {
    return <Text>No car available</Text>;
  }

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity style={styles.getRandomCar} onPress={fetchCarData}>
        <Text style={styles.getRandomCarText}>Get Random Car From API!</Text>
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        <Image
          source={require("../../assets/batmobile.jpg")}
          style={styles.carImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.carModel}>{car.name}</Text>
          <Text style={styles.carModel}>{car.model}</Text>
          <Text style={styles.carPrice}>{`$${car.pricePerDay}/day`}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.rentButton} onPress={rentNow}>
        <Text style={styles.buttonText}>Rent Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  getRandomCar: {
    backgroundColor: "darkblue",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  getRandomCarText: {
    color: "white",
    fontSize: 16,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rentButton: {
    marginTop: 10,
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: "center",
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
    margin: 10,
    width: "90%",
    alignSelf: "center",
  },
  carImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  carModel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  carPrice: {
    fontSize: 16,
    color: "#888",
    marginTop: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
