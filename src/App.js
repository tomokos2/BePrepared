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

  addNew = () => {
    this.setState(() => ({
      newCounter: 0,
    }));
  };

  render() {
    return (
      <>
        <SafeAreaView>
          <Button onPress={this.addCount} title="Click" />
          <Button onPress={this.addNew} title="new click" />
          <Button onPress={this.setLatLong} title="Print location" />
          <Text>
            Lat: {this.state.lat}, Long: {this.state.long}
          </Text>
          <Text>{this.state.counter}</Text>
          <Text>This is unchanging {this.state.num}</Text>
          <Text>This is unchanging {this.state.newCounter}</Text>
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
