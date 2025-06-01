import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screen/Home';
import BasicAnimation from './screen/BasicAnimation';
import TransformObject from './screen/TransformObject';
import BouncingBallChallenge from './screen/BouncingBallChallenge';
import ColorfulScaleChallenge from './screen/ColorfulScaleChallenge';

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screenOptions: {
    headerStyle: {
      backgroundColor: '#F5C0F4',
    },
  },
  screens: {
    Home,
    BasicAnimation,
    TransformObject,
    BouncingBallChallenge,
    ColorfulScaleChallenge,
  },
});

const AppNavgation = createStaticNavigation(RootStack);

export type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export default AppNavgation;
