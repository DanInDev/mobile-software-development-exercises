import React from 'react';
import { StyleSheet, View } from 'react-native';
import MyComponent from './MyComponent';

export default function App() {
  return (
    <View style={styles.container}>
      <MyComponent text={'This is the prop we are giving to the component'} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
