import {useNavigation} from '@react-navigation/native';
import {Button, StyleSheet, Text, View} from 'react-native';

const Home = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Go Details"
        onPress={() =>
          navigation.navigate('Details', {detailText: 'Home dan geliyorum.'})
        }
      />
      <Button
        title="Go PropDrilling"
        onPress={() => navigation.navigate('PropDrilling')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 22,
  },
});

export default Home;
