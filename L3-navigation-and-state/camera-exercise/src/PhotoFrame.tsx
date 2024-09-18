import { LocationObject } from "expo-location";
import { Animated, Image, Text, View} from "react-native";
export interface PhotoFrameProps {
  uri: string;
  location?: LocationObject;
}

function PhotoFrame(photo: PhotoFrameProps) {
    console.log("component: ", photo);
  return (
    <View>
    <Image source={{uri: photo.uri}} style={{width: 100, height: 100}} />
    <Text>lati:  {photo.location?.coords.latitude}</Text>
    <Text>long: {photo.location?.coords.longitude}</Text>
    </View>
  );
}
export default PhotoFrame;