// UTILE ?????????????
// ANDROID PERMISSIONS FOR API >= 23
import {PermissionsAndroid} from 'react-native';

export async function requestLocationPermission() {
    console.log("HELLO PERMISSION")
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

