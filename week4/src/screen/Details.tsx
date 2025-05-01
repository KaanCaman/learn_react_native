import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {StaticScreenProps, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigation';

type DetailsNavProp = NativeStackNavigationProp<RootStackParamList, 'Details'>;

type Props = StaticScreenProps<{
  detailText?: string;
}>;

const Details: React.FC<Props> = ({route}) => {
  const navigation = useNavigation<DetailsNavProp>();
  const {detailText} = route.params;
  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <Button title="Push" onPress={() => navigation.push('Details', {})} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button title="PopTo Home" onPress={() => navigation.popTo('Home')} />
      <Button title="PopToTop" onPress={() => navigation.popToTop()} />
      {detailText && <Text style={styles.propsText}>{detailText}</Text>}
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  propsText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
