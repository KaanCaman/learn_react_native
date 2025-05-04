import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStaticNavigation} from '@react-navigation/native';
import ContextUsage from './screen/ContextUsage';
import {Image, StyleSheet} from 'react-native';
import ReducerUsage from './screen/ReducerUsage';
import ZustandUsage from './screen/ZustandUsage';

const icons = '../../assets/icon/';

const MyTabs = createBottomTabNavigator({
  screens: {
    ContextUsage: {
      screen: ContextUsage,

      options: {
        tabBarIcon: () => (
          <Image
            style={styles.logo}
            source={require(`${icons}react-icon.png`)}
          />
        ),
        title: 'Context',
      },
    },
    ReducerUsage: {
      screen: ReducerUsage,

      options: {
        tabBarIcon: () => (
          <Image
            style={styles.logo}
            source={require(`${icons}react-icon.png`)}
          />
        ),
        title: 'Reducer',
      },
    },
    ZustandUsage: {
      screen: ZustandUsage,

      options: {
        tabBarIcon: () => (
          <Image
            style={styles.logo}
            source={require(`${icons}zustand-icon.png`)}
          />
        ),
        title: 'Zustand',
      },
    },
  },
});
const Navigation = createStaticNavigation(MyTabs);

const styles = StyleSheet.create({
  logo: {
    width: 32,
    height: 32,
  },
});

export default Navigation;
