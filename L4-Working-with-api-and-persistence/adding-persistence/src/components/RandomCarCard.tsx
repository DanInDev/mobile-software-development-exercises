import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';

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
  
  const [car, setCar] = useState<CarResponse | null>(null);

  const CAR_STORAGE_KEY = "persistedCar"; // Key for saving and loading data from AsyncStorage

  // Function to save the car data in AsyncStorage
  const persistCarData = async (carData: CarResponse) => {
    try {
      await AsyncStorage.setItem(CAR_STORAGE_KEY, JSON.stringify(carData));
      console.log("Car data saved to storage");
    } catch (error) {
      console.error("Error saving car data:", error);
    }
  };

  // Function to load the persisted car data
  const loadPersistedCar = async () => {
    try {
      const savedCar = await AsyncStorage.getItem(CAR_STORAGE_KEY);
      if (savedCar !== null) {
        console.log("Loaded car data from storage");
        return JSON.parse(savedCar);
      }
      return null;
    } catch (error) {
      console.error("Error loading car data:", error);
      return null;
    }
  };

  // Function to fetch car data from the API
  const fetchCarData = async () => {
    try {
      const response = await axios.get(
        "https://raw.githubusercontent.com/DanInDev/mobile-software-development-exercises/main/cars.json"
      );
      const randomCar =
        response.data[Math.floor(Math.random() * response.data.length)];

      setCar(randomCar); // Set the random car in the state
      persistCarData(randomCar); // Save the fetched car data to storage
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  };

  // Function to handle loading persisted data or fetching new data
  const loadOrFetchCar = async () => {
    const persistedCar = await loadPersistedCar();
    if (persistedCar) {
      setCar(persistedCar); // Use persisted data if available
    } else {
      fetchCarData(); // Otherwise, fetch from the API
    }
  };

  // Fetch persisted or new data when the component mounts
  useEffect(() => {
    loadOrFetchCar();
  }, []);

  const rentNow = () => {
    if (car) {
      console.log(`Renting Now!`);
    }
  };

  // Check if no car was returned from the API or storage
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
