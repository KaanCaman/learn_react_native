import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

// Return app
const App = (): React.JSX.Element => {
  // Ekranın ortasına 'Hello World !'.
  // Write 'Hello World !' in the center of the screen.
  return (
    <View style={myStyle.view}>
      <Text style={myStyle.text}>Hello World ! </Text>
    </View>
  );
};

// Style
const myStyle = StyleSheet.create({
  view: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'bisque',
  },

  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rebeccapurple',
    fontStyle: 'italic',
  },
});

export default App;
