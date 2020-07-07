/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';

import React from 'react';
import {SafeAreaView, ScrollView, Button, View, Text} from 'react-native';

import GetWeather from '../services/Weather.js';
import requestLocationPermission from '../services/LocationPermission.js';
import GetLocation from '../services/GetLocation.js';
import {DayForecast} from './DayForecast.js';
import {HourForecast} from './HourForecast.js';
import styles from '../styles/HomeStyles.js';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      canAccessLoc: false,
      hourlyWeather: [],
      dailyWeather: [],
      // Default lat long is chicago
      lat: 41.8781,
      long: -87.623177,
    };

    requestLocationPermission().then(result => this.setPermission(result));
  }

  setLatLong = () => {
    GetLocation(this.state.canAccessLoc).then(coords => {
      const {latitude, longitude} = coords;
      this.setState(() => ({
        lat: latitude,
        long: longitude,
      }));
    });
  };

  setWeather = () => {
    GetWeather(this.lat, this.long).then(data => {
      this.setState(() => ({
        hourlyWeather: data.hourly,
        dailyWeather: data.daily,
      }));
    });
  };

  componentDidMount() {
    this.setWeather();
  }

  setPermission = result => {
    this.setState(() => ({
      canAccessLoc: result,
    }));
  };

  render() {
    return (
      <>
        <View style={{backgroundColor: '#C1D6C9'}}>
          <SafeAreaView>
            <Button onPress={this.setLatLong} title="Print location" />
            <Button onPress={this.setWeather} title="Give me WEather" />
            <Text>
              Lat: {this.state.lat}, Long: {this.state.long}
            </Text>
            <Text>This is permission {this.state.canAccessLoc.toString()}</Text>
            <Text style={styles.sectionTitle}>Hourly Weather</Text>
            <ScrollView horizontal>
              <View>
                <Text style={styles.sectionDescription}>Time:</Text>
                <View style={styles.box} />
                <Text style={styles.sectionDescription}>Temp:</Text>
              </View>
              <View style={styles.pad} />
              {this.state.hourlyWeather.map(h => {
                return <HourForecast hour={h} key={h.dt}/>;
              })}
            </ScrollView>
            <Text style={styles.sectionTitle}>Weekly Weather</Text>
            <ScrollView horizontal>
              <View>
                <Text style={styles.sectionDescription}>Time:</Text>
                <View style={styles.box} />
                <Text style={styles.sectionDescription}>Temp:</Text>
              </View>
              <View style={styles.pad} />
              {this.state.dailyWeather.map(d => {
                return <DayForecast day={d} key={d.dt} />;
              })}
            </ScrollView>
          </SafeAreaView>
        </View>
      </>
    );
  }
}
