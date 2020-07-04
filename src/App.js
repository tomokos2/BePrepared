/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Button,
  Platform,
  Image,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import GetWeather from './services/Weather.js';
import requestLocationPermission from './services/LocationPermission.js';
import GetLocation from './services/GetLocation.js';

class App extends React.Component {
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
    this.setWeather();
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

  formatTime = unix => {
    return new Date(unix * 1000).toLocaleTimeString('en-US').substr(0, 5);
  };

  formatDate = unix => {
    return new Date(unix * 1000).toLocaleDateString('en-US');
  };

  setWeather = () => {
    GetWeather(this.lat, this.long).then(data => {
      this.setState(() => ({
        hourlyWeather: data.hourly,
        dailyWeather: data.daily,
      }));
    });
  };

  // componentDidMount() {

  // }

  setPermission = result => {
    this.setState(() => ({
      canAccessLoc: result,
    }));
  };

  render() {
    const hourList = this.state.hourlyWeather.map(hour => {
      return (
        <View style={styles.weatherBox} key={hour.dt}>
          <Text style={styles.sectionDescription}>
            {this.formatTime(hour.dt)}
          </Text>
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
    });
    const dayList = this.state.dailyWeather.map(day => {
      return (
        <View style={styles.weatherBox} key={day.dt}>
          <Text style={styles.sectionDescription}>
            {this.formatDate(day.dt)}
          </Text>
          <Text>{day.weather[0].description}</Text>
          <Image
            source={{
              uri: `http://openweathermap.org/img/wn/${
                day.weather[0].icon
              }@2x.png`,
            }}
            style={styles.image}
          />
          <Text style={styles.sectionDescription}>Min: {day.temp.min} °F</Text>
          <Text style={styles.sectionDescription}>Max: {day.temp.max} °F</Text>
          <Text style={styles.sectionDescription}>Midday: {day.temp.day} °F</Text>
        </View>
      );
    });
    return (
      <NavigationContainer>
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
              {hourList}
            </ScrollView>
            <Text style={styles.sectionTitle}>Weekly Weather</Text>
            <ScrollView horizontal>
              <View>
                <Text style={styles.sectionDescription}>Time:</Text>
                <View style={styles.box} />
                <Text style={styles.sectionDescription}>Temp:</Text>
              </View>
              <View style={styles.pad} />
              {dayList}
            </ScrollView>
          </SafeAreaView>
        </View>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  weatherBox: {
    width: 80,
  },
  pad: {
    width: 20,
  },
  scrollView: {
    backgroundColor: Colors.lighter,
    marginVertical: 10,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  box: {
    height: 58,
  },
  image: {
    width: 40,
    height: 40,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
