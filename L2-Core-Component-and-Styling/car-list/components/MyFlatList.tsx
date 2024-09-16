import { FlatList, View, StyleSheet, SafeAreaView, Text } from 'react-native';
import CarItem from './CarItem';

/*
  CarData is an array of objects, such as one you might get from an API.
*/
const carData = [
  { id: 1, carType: 'Sedan', mileage: 45000, price: 15000 },
  { id: 2, carType: 'SUV', mileage: 30000, price: 20000 },
  { id: 3, carType: 'BatMobile', mileage: 1377, price: 420000 },
  { id: 4, carType: 'Pick-up', mileage: 20000, price: 60000 },
  { id: 5, carType: 'Hatchback', mileage: 99999, price: 5942 },
  { id: 6, carType: 'Van', mileage: 1, price: 1 },
  { id: 7, carType: 'Sedan', mileage: 45000, price: 15000 },
  { id: 8, carType: 'SUV', mileage: 30000, price: 20000 },

];

const MyFlatList = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text style={styles.text}>My FlatList!</Text>
      </View>
      <View style={styles.container}>
        {/* 
          FlatList requires two properties
          data: an array of objects to render
          renderItem: a function that returns a component to render

          Why not use a keyExtractor?
            FlatList will use the id property of each object by default,
            so we don't need to specify a keyExtractor here
            If we wanted to use a different property like type, we would use keyExtractor
        */}
        <FlatList
          data={carData}  
          renderItem={({ item }) => (
            <CarItem
              id={item.id}
              carType={item.carType}
              mileage={item.mileage}
              price={item.price}
            />
          )}  
        />
      </View>
    </SafeAreaView >

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 32,
    textAlign: 'center',
    marginTop: 20,
},
});

export default MyFlatList;