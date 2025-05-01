import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screen/Home';
import PropDrilling from '../screen/PropDrilling';
import Details from '../screen/Details';

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screenOptions: {
    headerStyle: {backgroundColor: 'tomato'},
  },
  screens: {
    Home: {
      screen: Home,
      options: {
        title: 'Home - Week4',
      },
    },
    PropDrilling,
    Details,
  },
});

const Navigation = createStaticNavigation(RootStack);
export default Navigation;
export type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    export interface RootParamList extends RootStackParamList {}
  }
}
