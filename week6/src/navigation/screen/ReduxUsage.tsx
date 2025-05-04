import React from 'react';
import {StyleSheet, View} from 'react-native';
import CounterArea from '../../components/CounterArea';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {configureStore, createSlice} from '@reduxjs/toolkit';

type ReduxState = {counter: number};

const initialState: ReduxState = {counter: 3};
// Create Redux slice / slice oluştur
const slice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increase(state) {
      return {...state, counter: state.counter + 1}; // Artırma
    },

    decrease(state) {
      return {...state, counter: state.counter - 1}; // Azaltma
    },
  },
});

// Configure store / Store ayarla

const store = configureStore({
  reducer: {
    counter: slice.reducer,
  },
});

// Component using Redux hooks / Redux hook'ları ile kullanan bileşen
const ReduxChild: React.FC = () => {
  // Access state with useSelector / useSelector ile state'e eriş
  const value: number = useSelector(
    (state: {counter: ReduxState}) => state.counter.counter,
  );

  // Access dispatch with useDispatch / useDispatch ile dispatch al
  const dispatch = useDispatch();

  console.log(typeof value);
  // Handlers
  const increase = () => dispatch(slice.actions.increase()); // Artırma eylemi
  const decrease = () => dispatch(slice.actions.decrease()); // Azaltma eylemi

  return (
    <View style={styles.container}>
      {/* Render CounterArea with Redux state and handlers */}
      <CounterArea
        counterText={`${value}`} // Display counter / Sayaç değerini göster
        counterIncrease={increase} // Pass increase handler / Artırma fonksiyonunu aktar
        counterDecrease={decrease} // Pass decrease handler / Azaltma fonksiyonunu aktar
      />
    </View>
  );
};

// Root component providing Redux store / Store sağlayan ana bileşen
const ReduxUsage: React.FC = () => (
  <Provider store={store}>
    <ReduxChild />
  </Provider>
);

export default ReduxUsage;

// Styles for the components / Bileşen stilleri
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
