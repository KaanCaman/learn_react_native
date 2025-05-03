import {StyleSheet, View} from 'react-native';
import React, {createContext, useContext, useState} from 'react';
import CounterArea from '../../components/CounterArea';

// Define the shape of our context state
// Context durumunun tipini tanımla
type BasicCounterContextState = {
  counter: number; // Current counter value / Mevcut sayaç değeri
  increase: () => void; // Function to increment counter / Sayaç artırma fonksiyonu
  decrease: () => void; // Function to decrement counter / Sayaç azaltma fonksiyonu
};

// Initial context value with no-op functions
// Başlangıç değeri (fonksiyonlar boş). Provider olmazsa hata alınmaması için.
const initState: BasicCounterContextState = {
  counter: 0,
  increase: () => {},
  decrease: () => {},
};

// Create context with initial state
// Context oluştur ve başlangıç değerini ata
const BasicCounterContext = createContext<BasicCounterContextState>(initState);

// Child component that consumes context
// Context değerlerini kullanan alt bileşen
const ChildCounterArea: React.FC = () => {
  // Retrieve context state using useContext hook
  // useContext ile context değerlerini al
  const state: BasicCounterContextState = useContext(BasicCounterContext);

  return (
    <View style={styles.parent}>
      {/* Render CounterArea with props from context */}
      {/* Context'ten gelen props ile CounterArea bileşenini render et */}
      <CounterArea
        counterText={`${state.counter}`} // Display current counter / Mevcut sayaç değerini göster
        counterIncrease={state.increase} // Pass increase function / Artırma fonksiyonunu aktar
        counterDecrease={state.decrease} // Pass decrease function / Azaltma fonksiyonunu aktar
      />
    </View>
  );
};

// Screen component providing context
// Ekran bileşeni, context sağlayıcı içerir
const ContextUsage: React.FC = () => {
  // Manage local state for counter
  // Local state: sayaç değeri
  const [counter, setCounter] = useState<number>(0);

  // Function to increase counter
  // Sayaç değerini bir artır
  const increase = () => setCounter(prev => prev + 1);

  // Function to decrease counter
  // Sayaç değerini bir azalt
  const decrease = () => setCounter(prev => prev - 1);

  // Prepare context value
  // Context değerini ilgili fonksiyonlarla bir araya getir
  const contextValue: BasicCounterContextState = {counter, increase, decrease};

  return (
    // Provide context value to children
    // Çocuk bileşenlere context değerini sağla
    <BasicCounterContext.Provider value={contextValue}>
      <ChildCounterArea />
    </BasicCounterContext.Provider>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ContextUsage;
