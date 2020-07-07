import React from 'react';
import {Text, View, Image} from 'react-native';
import styles from '../styles/HomeStyles.js';

export const HourForecast = ({hour}) => {
  return (
    <View style={styles.weatherBox} key={hour.dt}>
      <Text style={styles.sectionDescription}>{formatTime(hour.dt)}</Text>
      <Text>{hour.weather[0].description}</Text>
      <Image
        source={{
          uri: `http://openweathermap.org/img/wn/${
            hour.weather[0].icon
          }@2x.png`,
        }}
        style={styles.image}
      />
      <Text style={styles.sectionDescription}>{hour.temp} °F</Text>
    </View>
  );
};

let formatTime = unix => {
  return new Date(unix * 1000).toLocaleTimeString('en-US').substr(0, 5);
};
