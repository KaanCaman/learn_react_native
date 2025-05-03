import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStaticNavigation} from '@react-navigation/native';
import ContextUsage from './screen/ContextUsage';
import {Image, StyleSheet} from 'react-native';
import ReducerUsage from './screen/ReducerUsage';

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
