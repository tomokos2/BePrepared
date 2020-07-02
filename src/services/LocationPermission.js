import {PermissionsAndroid} from 'react-native';
import Constants from 'expo-constants';

const requestLocationPermission = async () => {
  try {
    // A dialog to explain why the permission is necessary
    const rationale = {
      title: 'BePrepared Location Permission',
      message:
        'BePrepared requests access to your location to provide accurate weather data.',
      buttonNegative: 'No',
      buttonPositive: 'OK',
    };

    // Async wait until the user clicks a resposne
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      rationale,
    );

    // Take response and do things accordingly
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export default requestLocationPermission;
