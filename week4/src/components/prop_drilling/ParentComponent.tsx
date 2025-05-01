import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ChildComponent from './ChildComponent';

const ParentComponent: React.FC = () => {
  const message = 'Merhaba Prop Drilling!'; // "Hello Prop Drilling!"

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parent Component</Text>
      <ChildComponent message={message} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {padding: 16},
  title: {fontSize: 18, fontWeight: 'bold', marginBottom: 8},
});

export default ParentComponent;
