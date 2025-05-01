import React from 'react';
import {Text, View} from 'react-native';

interface GrandChildProps {
  message: string;
}

const GrandChildComponent: React.FC<GrandChildProps> = ({message}) => {
  // En derindeki bileşen mesajı ekrana basar
  // The deepest component renders the message
  return (
    <View>
      <Text>Grandchild Component</Text>
      <Text>Final Mesaj: {message}</Text>
    </View>
  );
};

export default GrandChildComponent;
