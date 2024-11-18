import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
} from "react-native";
import { getStarships } from "../services/starshipsService";
import StarHeader from "../components/star_components/starHeader";
import StarText from "../components/star_components/starText";
import colors from "../constants/colors";
import LaunchButton from "../components/launchButton";
import { useNavigation } from "@react-navigation/native";

/* Task 1: Add more information about the starship 

As most of the information is already fetched from the API, we can just add the information to the render method.
Examples of displaying items in a list can be seen in the exercises repository in lecture 2.
*/

interface Starship {
  name: string;
  starship_class: string;
  cost_in_credits: string;
  crew: string;
  manufacturer: string;
}

const StarshipsScreen: React.FC = () => {
  const [starships, setStarships] = useState<Starship[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const navigation = useNavigation();

  /* Task 3: Is done in five parts.
    
    1. The Callback function from the LaunchButton Component is called when the button is pressed.
    2. useState hook to keep track the number of launched starships.
    3. useEffect to check if the number of launched starships is greater or equal to 3.

    UseEffect hook examples can been seen in the exercises repository in lecture 3 and 4.
    But is best read on the official documentation.

    Now when the condition is met, we have to navigate to the emergency screen.
    4. We add the emergency screen to the stack navigator in the stackNavigator.tsx file.
    5. We use the useNavigation hook to navigate to the emergency screen when the effect triggers.

    Navigation examples can be seen in the exercises repository in lecture 3.
  */
  const [launchCount, setLaunchCount] = useState(0);

  useEffect(() => {
    if (launchCount >= 3) {
      console.log("Armada has been sent, lets evacuate!");

      // Remember when implementing new navigation, to restart your App.
      navigation.navigate("emergencyScreen");
    }
  });

  const handleLaunchPress = () => {
    setLaunchCount(launchCount + 1);
  };

  /* 
    Fetch Starships from the API and update the state
  */
  useEffect(() => {
    const fetchStarships = async () => {
      try {
        const data = await getStarships();
        setStarships(data);
      } catch (error) {
        console.error("Failed to fetch starships:", error);
      } finally {
        setLoading(false);
        console.log("Starships fetched successfully!");
      }
    };
    fetchStarships();
  }, []);

  /* 
    Display a loading spinner while fetching the data
  */
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.secondary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StarHeader />
      <StarText style={styles.title}>Available Starships</StarText>
      <FlatList
        data={starships}
        keyExtractor={(starship) => starship.name}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image
              source={require("../../assets/x-wing.png")}
              style={styles.starshipIcon}
            />
            <View style={styles.textContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemClass}>{item.starship_class}</Text>
              {/* Task 1: Add more information about the starship */}
              <Text style={styles.itemClass}>Credits: {item.cost_in_credits}</Text>
              <Text style={styles.itemClass}>Capacity: {item.crew}</Text>
              <Text style={styles.itemClass}>
                Manufacturer: {item.manufacturer}
              </Text>
              <LaunchButton onPress={handleLaunchPress} />
              {/* Parsing our function as described in its type LaunchButtonProps */}
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.secondary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: colors.primary,
    textAlign: "center",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    backgroundColor: "lightgray",
    marginBottom: 8,
    borderRadius: 10,
  },
  starshipIcon: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 25,
    color: colors.mainText,
  },
  itemClass: {
    fontSize: 20,
    color: colors.mainText,
  },
});

export default StarshipsScreen;
