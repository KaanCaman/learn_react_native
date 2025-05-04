import {StyleSheet, View} from 'react-native';
import React from 'react';
import CounterArea from '../../components/CounterArea';
import {create} from 'zustand';

// Define state and actions / State ve aksiyonların tiplerini tanımla
type State = {
  counter: number; // Current counter value / Sayaç değeri
};

type Action = {
  increase: (num: number) => void; // Set counter to specific value / Sayaç değerini ayarlama fonksiyonu
  decrease: (num: number) => void; // Set counter to specific value / Sayaç değerini ayarlama fonksiyonu
};

// Create Zustand store combining state and actions
// Store oluştur: state ve action'ları birleştir
const useCounterStore = create<State & Action>(set => ({
  counter: 2, // Initial value / Başlangıç değeri
  increase: num => set(() => ({counter: num})), // Update counter to num / Sayaç değerini num olarak ayarla
  decrease: num => set(() => ({counter: num})), // Update counter to num / Sayaç değerini num olarak ayarla
}));

// Component demonstrating Zustand usage
// Zustand kullanımını gösteren bileşen
const ZustandUsage: React.FC = () => {
  // Retrieve store state and actions
  // Store'daki state ve action'ları al
  const store = useCounterStore();

  return (
    <View style={styles.parent}>
      {/* Render CounterArea with store data and actions */}
      {/* Store verisi ve fonksiyonları ile CounterArea bileşenini render et */}
      <CounterArea
        counterText={`${store.counter}`} // Display current counter / Mevcut sayaç değerini göster
        counterIncrease={() => store.increase(store.counter + 1)} // Increase counter by 1 / Sayaç değerini +1 artır
        counterDecrease={() => store.decrease(store.counter - 1)} // Decrease counter by 1 / Sayaç değerini -1 azalt
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

export default ZustandUsage;
