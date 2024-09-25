import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Screen1 from './src/Screen1';
import Screen2 from './src/Screen2';
import Screen3 from './src/Screen3';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    // NavigationContainer is a component which manages our navigation tree and contains the navigation state.
    <NavigationContainer>
      {/* Stack.Navigator is a component that provides a way for your app to transition between screens */}
      <Stack.Navigator initialRouteName="Screen1">
        {/* Stack.Screen is a component that defines each screen in the navigator */}
        <Stack.Screen name="Screen1" component={Screen1} />
        <Stack.Screen name="Screen2" component={Screen2} />
        <Stack.Screen name="Screen3" component={Screen3} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
