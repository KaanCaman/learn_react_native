import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppButton from '../../components/AppButton';
import {useNavigation} from '@react-navigation/native';

function Home() {
  const nav = useNavigation();
  return (
    <View style={styles.container}>
      <AppButton
        title={'Basic Animation'}
        onPress={() => nav.navigate('BasicAnimation')}
      />
      <AppButton
        title={'Transform Object'}
        onPress={() => nav.navigate('TransformObject')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Home;
