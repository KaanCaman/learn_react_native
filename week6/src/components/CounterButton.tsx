import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import React from 'react';

type Props = TouchableOpacityProps & {
  title: string;
  textStyle?: StyleProp<TextStyle>;
};

const CounterButton: React.FC<Props> = ({
  title,
  style,
  textStyle,
  onPress,
}: Props) => {
  return (
    <View>
      <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
    width: 72,
    height: 72,
    padding: 12,
    margin: 6,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    alignItems: 'center',
  },
});

export default CounterButton;
