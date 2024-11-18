import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import StarText from "./star_components/starText";
import colors from "../constants/colors";

/* 
  Task 3: Effect when enough starships have been launched
  An example way to do it, is to parse a callback function to the LaunchButton component.
  In this example it is optional. This way the component can interact with the parent component. 
*/ 

interface LaunchButtonProps {
  onPress?: () => void;
}

const LaunchButton: React.FC<LaunchButtonProps> = ({ onPress }) => {

  /* 
    UseState Examples are also seen in the exercises repository in lecture 2.
    https://github.com/DanInDev/mobile-software-development-exercises
  */
  const [launched, setLaunched] = useState(false);

  const handleLaunchPress = () => {
    setLaunched(true);

    // Task 3: The Callback function is called when the button is pressed, and it is "Launched"
    onPress?.();
  };
  return (
    <TouchableOpacity onPress={handleLaunchPress} style={styles.launchButton}>
      <StarText>{launched ? "Launched" : "Ready"}</StarText>

      {/*
       Task 2: Launch Starship Component 

       Actual Implementation your examples would look more like:

        <Text>{launched ? "Launched" : "Ready"}</Text>

       Since StarText is just a modified Text component.
      */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  launchButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.danger,
    alignItems: "center",
  },
});

export default LaunchButton;
