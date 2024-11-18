import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import LoadingScreen from './src/components/star_components/loadingScreen';
import StackNavigator from './src/navigation/stackNavigator';


const App: React.FC = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'Starjedi': require('./assets/fonts/Starjedi.ttf'),
      'Starjhol': require('./assets/fonts/Starjhol.ttf'),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
    <StackNavigator/>
    </NavigationContainer>
  );
};

export default App;
