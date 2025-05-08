import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import CustomLocalization from './screens/challenges/CustomLocalization';
import ListUserData from './screens/challenges/ListUserData';
import IBANInput from './screens/challenges/IBANInput';

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screens: {
    Home: {
      screen: Home,
      options: {
        title: 'Week7 & Challenges',
      },
    },
    CustomLocalization: {
      screen: CustomLocalization,
      options: {
        title: 'CustomLocalization hallenges',
      },
    },
    ListUserData: {
      screen: ListUserData,
      options: {
        title: 'ListUserData Challenges',
      },
    },
    IBANInput: {
      screen: IBANInput,
      options: {
        title: 'IBAN Challenges',
      },
    },
  },
});

const AppNavigation = createStaticNavigation(RootStack);

export default AppNavigation;

export type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
