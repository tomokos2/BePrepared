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
import Geolocation from 'react-native-geolocation-service';

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

  // printLocation() {
  //   if (this.state.hasLocationPermission) {
  //     Geolocation.getCurrentPosition(
  //       position => {
  //         console.log(position);
  //       },
  //       error => {
  //         // See error code charts below.
  //         console.log(error.code, error.message);
  //       },
  //       {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //     );
  //   }
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
      counter: 0,
      num: 2,
    };
  }

  componentDidMount() {
    requestLocationPermission().then(result => this.setPermission(result));
  }

  setPermission = result => {
    this.setState(() => ({
      canAccessLoc: result,
    }));
  };

  addCount = () => {
    this.setState(prevState => ({
      counter: prevState.counter + 1,
    }));
  };

  render() {
    return (
      <>
        <SafeAreaView>
          <Button onPress={this.addCount} title="Click" />
          <Text>{this.state.counter}</Text>
          <Text>This is unchanging {this.state.num}</Text>
          <Text>This is permission {this.state.canAccessLoc.toString()}</Text>
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
