import Geolocation from 'react-native-geolocation-service';

export default async hasPermission => {
  let coords = [];
  try {
    if (hasPermission) {
      await Geolocation.getCurrentPosition(
        position => {
          console.log(position);
          return position.coords;
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
          return coords;
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } else {
      return coords;
    }
  } catch (err) {
    console.warn('Did not get phone location correctly');
    return {latitude: 0, longitude: 0};
  }
};
