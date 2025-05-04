import {StyleSheet, View} from 'react-native';
import React from 'react';
import CounterText from './CounterText';
import CounterButton from './CounterButton';

type Props = {
  counterText: string;
  counterIncrease: () => void;
  counterDecrease: () => void;
};

const CounterArea: React.FC<Props> = ({
  counterText,
  counterIncrease,
  counterDecrease,
}) => {
  return (
    <View style={styles.parent}>
      <CounterText text={counterText} />
      <View style={styles.buttonRow}>
        <CounterButton
          title="+"
          onPress={counterIncrease}
          style={styles.plusButtonStyle}
          textStyle={styles.plusButtonTextStyle}
        />
        <CounterButton
          title="-"
          onPress={counterDecrease}
          style={styles.minusButtonStyle}
          textStyle={styles.minusButtonTextStyle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  plusButtonStyle: {
    backgroundColor: 'midnightblue',
  },
  plusButtonTextStyle: {
    color: 'white',
  },
  minusButtonStyle: {
    backgroundColor: 'gold',
  },
  minusButtonTextStyle: {
    color: 'black',
  },
});
export default CounterArea;
