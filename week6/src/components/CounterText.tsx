import {StyleSheet, Text} from 'react-native';
import React from 'react';

interface Props {
  text: string;
}

const CounterText: React.FC<Props> = ({text}) => {
  return <Text style={styles.text}>{text} 🕯️</Text>;
};

export default CounterText;

const styles = StyleSheet.create({
  text: {
    fontSize: 48,
    fontWeight: 'bold',
  },
});
