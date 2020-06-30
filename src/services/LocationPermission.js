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
      console.log('Location access granted');
    } else {
      console.log('Location access denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

export default requestLocationPermission;
