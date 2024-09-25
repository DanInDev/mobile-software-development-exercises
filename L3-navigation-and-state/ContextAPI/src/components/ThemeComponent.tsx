import { useContext } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { ThemeContext } from "./ThemeContext";

// ThemeComponent will use the context to change theme
export const ThemeComponent: React.FC = () => {
    const themeContext = useContext(ThemeContext);
  
    // Ensure that ThemeContext is defined before using it, else typescript will throw an error
    if (!themeContext) {
      return null;
    }
  
    const { theme, changeTheme } = themeContext;
  
  
    // Define styles based on theme
    const containerStyle = theme === 'light' ? styles.lightContainer : styles.darkContainer;
    const textStyle = theme === 'light' ? styles.lightText : styles.darkText;
  
    /* Above is just a shorthand way of describing this:
  
      let containerStyle;
      if (theme === 'light') {
        containerStyle = styles.lightContainer;
      } else {
        containerStyle = styles.darkContainer;
      }
  
      let textStyle;
      if (theme === 'light') {
        textStyle = styles.lightText;
      } else {
        textStyle = styles.darkText;
      }
  
    */
    
      return (
      <View style={[styles.container, containerStyle]}>
        <Text style={textStyle}>Current Theme: {theme}</Text>
        <Button title="Change Theme" onPress={changeTheme} />
      </View>
    );
  };
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    lightContainer: {
      backgroundColor: '#fff',
    },
    darkContainer: {
      backgroundColor: '#333',
    },
    lightText: {
      color: '#000',
    },
    darkText: {
      color: '#fff',
    },
  });