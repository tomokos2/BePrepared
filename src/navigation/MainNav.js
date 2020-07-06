import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

const screens = {
  Home: {
    screen: Home
  }
  Settings: {
    screen: Settings
  }
}

const MainStack = createStackNavigator(screens);
export default createAppContainer(MainStack);