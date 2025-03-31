import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CoreComponents from './challenge/core_components/CoreComponents';
import Styling from './challenge/styling/Styling';

const App = () => {
  // Toggle state between components / Bileşenler arası geçiş state'i
  const [toggle, setToggle] = useState<boolean>(true);

  return (
    <View style={styles.container}>
      {/* Conditional rendering based on toggle / Toggle'a göre koşullu render */}
      {toggle ? <CoreComponents /> : <Styling />}

      {/* Toggle button with custom FAB style / Özel FAB stili ile geçiş butonu */}
      <TouchableOpacity
        style={styles.fabContainer}
        onPress={() => setToggle(!toggle)}>
        <Text>ToggleChallenge</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  // Main container styles / Ana konteyner stilleri
  container: {
    flex: 1, // Full screen height / Tam ekran yüksekliği
  },

  // Custom Floating Action Button / Özel Yüzen Aksiyon Butonu
  fabContainer: {
    position: 'absolute', // Absolute positioning / Mutlak pozisyonlama
    right: 20, // 20px from right / Sağdan 20px
    bottom: 20, // 20px from bottom / Alttan 20px
    backgroundColor: 'olivedrab', // Button color / Buton rengi
    borderRadius: 28, // Rounded corners / Yuvarlatılmış köşeler
    width: 160, // Wider than standard FAB / Standart FAB'tan daha geniş
    height: 60, // Custom height / Özel yükseklik
    justifyContent: 'center', // Vertical center content / Dikeyde ortala
    alignItems: 'center', // Horizontal center content / Yatayda ortala

    // Shadow for iOS / iOS için gölge
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,

    // Elevation for Android / Android için yükseklik
    elevation: 5,
  },
});
