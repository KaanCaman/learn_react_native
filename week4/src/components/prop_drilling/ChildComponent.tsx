import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import GrandChildComponent from './GrandChildComponent';

interface ChildProps {
  message: string;
}

const ChildComponent: React.FC<ChildProps> = ({message}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Child Component</Text>
      <Text style={styles.message}>Mesaj: {message}</Text>
      <GrandChildComponent message={message} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {padding: 16, backgroundColor: '#f0f0f0'},
  title: {fontSize: 16, fontWeight: '600', marginBottom: 4},
  message: {fontSize: 14, marginBottom: 8},
});

export default ChildComponent;
