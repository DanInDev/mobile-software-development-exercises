import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StarButton from '../components/star_components/starButton';
import StarText from '../components/star_components/starText';
import colors from '../constants/colors';


const SplashScreen: React.FC = () => {
  const translation = useRef(new Animated.Value(-200)).current; 
  const navigation = useNavigation();

  /* Animation */
  useEffect(() => {
    Animated.timing(translation, {
      toValue: 300, 
      duration: 3250,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate('StarshipsScreen');
    });
  }, [translation, navigation]);
    
  /* 
    Ignore errors related to navigation.
    Also why are you looking here?
  */
  return (
    <ImageBackground 
      source={require('../../assets/galaxy.jpg')} 
      style={styles.background}
    >
      <View style={styles.container}>
        <StarText style={styles.titleSecondary}>Welcome to the</StarText>
        <StarText style={styles.titlePrimary}>Galaxy Navigator</StarText>

        <Animated.Image
          source={require('../../assets/x-wing.png')} 
          style={[styles.starship, { transform: [{ translateX: translation }] }]}
          resizeMode="contain"
        />
        <StarButton
          title="Hangar"
          onPress={() => navigation.navigate('StarshipsScreen')}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titlePrimary: {
    fontSize: 35,
    color: colors.primary,
    marginBottom: 50,
    textAlign: 'center',
  },
  titleSecondary: {
    fontSize: 14,
    color: colors.primary,
    marginBottom: 10,
    textAlign: 'center',
  },
  starship: {
    width: 200,
    height: 50,
  },
});

export default SplashScreen;
