// ReducerUsage.tsx
import {StyleSheet, View} from 'react-native';
import React, {useReducer} from 'react';
import CounterArea from '../../components/CounterArea';

// Define the state shape / State yapısını tanımla
type ReducerState = {
  counter: number; // Current counter value / Mevcut sayaç değeri
};

// Define action types as enum / Eylem türlerini enum ile tanımla
enum ReducerAction {
  increase = 'INCREASE', // Increment action / Artırma eylemi
  decrease = 'DECREASE', // Decrement action / Azaltma eylemi
}

// Reducer function to handle state transitions / State geçişlerini yöneten reducer fonksiyonu
function reducer(state: ReducerState, action: ReducerAction): ReducerState {
  switch (action) {
    case ReducerAction.increase:
      // Return new state with incremented counter / Sayaç değerini artırarak yeni state döndür
      return {...state, counter: state.counter + 1};
    case ReducerAction.decrease:
      // Return new state with decremented counter / Sayaç değerini azaltarak yeni state döndür
      return {...state, counter: state.counter - 1};
    default:
      return state; // Fallback for unknown actions / Bilinmeyen eylem için mevcut state'i döndür
  }
}

// Component demonstrating useReducer hook / useReducer kullanımını gösteren bileşen
const ReducerUsage: React.FC = () => {
  // Initialize reducer with state and dispatch / useReducer ile state ve dispatch al
  const [state, dispatch] = useReducer(reducer, {counter: 0});

  return (
    <View style={styles.parent}>
      {/* Pass counter value and dispatch functions to CounterArea */}
      {/* Sayaç değerini ve dispatch fonksiyonlarını CounterArea'a ilet */}
      <CounterArea
        counterText={`${state.counter}`} // Display state.counter as text / state.counter değerini göster
        counterIncrease={() => dispatch(ReducerAction.increase)} // Dispatch increase action / Artırma eylemi dispatch et
        counterDecrease={() => dispatch(ReducerAction.decrease)} // Dispatch decrease action / Azaltma eylemi dispatch et
      />
    </View>
  );
};

// Styles for the component / Bileşen stilleri
const styles = StyleSheet.create({
  parent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ReducerUsage;
