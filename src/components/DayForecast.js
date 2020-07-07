import React from 'react';
import {Text, View, Image} from 'react-native';
import styles from '../styles/HomeStyles.js';

export const DayForecast = ({day}) => {
  return (
    <View style={styles.weatherBox}>
      <Text style={styles.sectionDescription}>{formatDate(day.dt)} </Text>
      <Text>{day.weather[0].description}</Text>
      <Image
        source={{
          uri: `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
        }}
        style={styles.image}
      />
      <Text style={styles.sectionDescription}>Min: {day.temp.min} °F</Text>
      <Text style={styles.sectionDescription}>Max: {day.temp.max} °F</Text>
      <Text style={styles.sectionDescription}>Midday: {day.temp.day} °F</Text>
    </View>
  );
};

let formatDate = unix => {
  return new Date(unix * 1000).toLocaleDateString('en-US');
};
