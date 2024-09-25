import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import RandomCarCard from './src/components/RandomCarCard';

export default function App() {
  return (
    <View style={styles.container}>
      <RandomCarCard/>
      <StatusBar style="auto" />
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
