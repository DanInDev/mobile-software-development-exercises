import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
} from "react-native";
import * as Location from "expo-location";
import React from "react";
import StarButton from "../components/star_components/starButton";
import StarHeader from "../components/star_components/starHeader";
import colors from "../constants/colors";
import StarText from "../components/star_components/starText";

/* Task 4: Expo Location
  
  Since we are handling permissions as seen on the official documentation:

  https://docs.expo.dev/versions/latest/sdk/location/

We need to add the below configuration to the app.json file.
We already have a plugin (The Super Cool Star Wars Fonts), so we just add it below that.
{
  "expo": {
    "plugins": [
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Allow $(PRODUCT_NAME) to use your location."
        }
      ]
    ]
  }
}

  If you want to see examples how to handle permissions and display the location, 
  see on the exercise repository in lecture 3: camera-exercise"
*/

const EmergencyScreen = () => {

  /* 
    Most of this example is taken DIRECTLY from the official documentation on Expo.
    https://docs.expo.dev/versions/latest/sdk/location/

    But in short, when navigated here and we have updated our config file app.json with the code from above we need to:

    1. Ask for permission to access the location.
      1.1 If permission is denied, display an error message. [Optional]
      1.2 If permission is granted, continue to step 2.
    2. Get the current location.
    3. Display the location.
    4. Add a button to update the location.

  */ 

 /* 
  We set the state of the currentLocation here, and use the LocationObject type, or null if it is not set.
 */
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  /* 
    We set the state of the longitude and latitude here.
  */
  const [longitude, setLongitude] = useState<string>("Waiting...");
  const [latitude, setLatitude] = useState<string>("Waiting...");

/* 
  Again, taken from the offical documentation.

  But similiar to the Kotlin launch effect, we use the useEffect hook to ask for permission with the requestForeGroundPermissionsAsyncx(). When the component mounts.
  If the permission is granted, we get the current location.
  This also means, that if the app has permission from the user, it will not ask again.
*/
  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      if (location) {
        setLongitude(location.coords.longitude.toString());
        setLatitude(location.coords.latitude.toString());
      }
    }

    getCurrentLocation();
  }, []);

  /* 
  If a location object was returned, set the longitude and latitude.
  */
  const updateLocation = () => {
    if (location) {
      setLongitude(location.coords.longitude.toString());
      setLatitude(location.coords.latitude.toString());
    }
  };

  return (
    <View style={styles.container}>
      <StarHeader />
      <StarText style={styles.title}>Emergency signal</StarText>

      <Text style={styles.itemName}>Longitude: {longitude}</Text>
      <Text style={styles.itemName}>Latitude: {latitude}</Text>
      <StarButton title="update location" onPress={() => updateLocation()} />
        {/*
        Again, StarButton is just a modified TouchableOpacity component.
        Your implementation might look more like:

        <TouchableOpacity onPress={() => updateLocation()} style={styles.updateLocationButton}>
          <Text>Update Location</Text>
        </TouchableOpacity>
        */}

      {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}
      {/*
        Technically, it was not part of the exercise for the error handling, but it is good practice nonetheless.
      */}
    </View>
  );
}
export default EmergencyScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.secondary,
  },
  title: {
    fontSize: 20,
    color: colors.primary,
    textAlign: "center",
  },
  itemName: {
    fontSize: 25,
    color: colors.secondaryText,
  },
  error: {
    fontSize: 14,
    color: colors.danger,
    textAlign: 'center',
    marginTop: 10,
  },
});

