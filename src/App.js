/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Button,
  Platform,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import GetWeather from './services/Weather.js';
import requestLocationPermission from './services/LocationPermission.js';
import GetLocation from './services/GetLocation.js';

class App extends React.Component {
  // state = {
  //   hasLocationPermission: false,
  //   // Default lat long is chicago
  //   lat: 41.8781,
  //   long: -87.623177,
  //   weather: null,
  //   forecast: null,
  // };

  // componenetDidMount() {
  //   let canAccess = requestLocationPermission();
  //   let
  // }

  // setState(weatherData) {
  //   this.setState({
  //     weather: weatherData,
  //   });

  //   let forecast = this.state.weather.hourly;
  //   return forecast.map(hour => {
  //     <Text>
  //       Date: {hour.dt}, Temp: {hour.temp}
  //     </Text>;
  //   });
  // }

  constructor() {
    super();
    this.state = {
      canAccessLoc: false,
      hourlyWeather: [],
      // Default lat long is chicago
      lat: 41.8781,
      long: -87.623177,
    };
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
      console.log('-----------------------------------------');
      console.log(data);
      this.setState(() => ({
        hourlyWeather: data.hourly,
      }));
    });
  };

  componentDidMount() {
    requestLocationPermission().then(result => this.setPermission(result));
  }

  setPermission = result => {
    this.setState(() => ({
      canAccessLoc: result,
    }));
  };

  render() {
    const hourList = this.state.hourlyWeather.map(hour => {
      return (
        <Text key={hour.dt}>
          Date: {hour.dt}, Temp: {hour.temp}
        </Text>
      );
    });
    return (
      <>
        <SafeAreaView>
          <Button onPress={this.setLatLong} title="Print location" />
          <Button onPress={this.setWeather} title="Give me WEather" />
          <Text>
            Lat: {this.state.lat}, Long: {this.state.long}
          </Text>
          <Text>This is permission {this.state.canAccessLoc.toString()}</Text>
          <ScrollView>
            {hourList}
            <Text>WEather shoudl behere </Text>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
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
