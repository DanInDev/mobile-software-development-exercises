import { CameraView } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import {  useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Alert } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import PhotoFrame, { PhotoFrameProps } from './src/PhotoFrame';
import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';
enum CameraFace {
  front = 'front',
  back = 'back',
}

export default function App() {
  const [cameraFace, setCameraFace] = useState(CameraFace.front);
  let cameraRef: CameraView | null;
  const [photos, setPhotos] = useState<PhotoFrameProps[]>([]);
  useEffect(() => {
    getCurrentLocation()}, []);
  
    const getCurrentLocation= async ()=>{
       let {status} = await requestForegroundPermissionsAsync(); 
      console.log(status);
       if(status !== 'granted'){
        Alert.alert('Permission denied', 'Allow the app to use the location services', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
       }}
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={{flexDirection: 'row-reverse', justifyContent: 'space-between', width: 300}}>
      <TouchableOpacity style={{transform: [{translateY: 25}], zIndex: 1}} onPress={() => setCameraFace(cameraFace === CameraFace.front ? CameraFace.back : CameraFace.front)}>
        <MaterialIcons name="flip-camera-android" size={24} color="black" />
      </TouchableOpacity>
      </View>
      <CameraView ref={(r) => cameraRef = r} facing={cameraFace} animateShutter={true} style={{ width: 300, height: 300 }} />
        <TouchableOpacity onPress={() => cameraRef.takePictureAsync({ onPictureSaved: (photo) => {
          console.log(photo);
          getCurrentPositionAsync().then((location) => {
            setPhotos([...photos, {uri: photo.uri, location}]);
          });
         }})} style={{transform: [{translateY: -25}], zIndex: 1, backgroundColor: 'white', borderRadius: 50, padding: 10}}>
        <SimpleLineIcons name="camera" size={24} color="black" />
        </TouchableOpacity>
      <View style={{flexDirection: 'row', flexWrap: 'wrap', width: 300, backgroundColor: 'grey', minWidth: 100, minHeight: 100}}>
        <Text style={{color: 'white', width: 300}}>Photos:</Text>
        {photos.map((photo, index) => <PhotoFrame key={index} {...photo} />)}
      </View>
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
