/**
 * Core Components Challenge / Temel Bileşenler Challenge'ı
 * Contains 3 mini challenges / 3 mini challenge içerir
 */
import {Alert, Button, StyleSheet, Text, View} from 'react-native';

const CoreComponents = () => {
  return (
    <View style={styles.coreContainer}>
      <One />
      <Two />
      <Three />
    </View>
  );
};

// Challenge 1: Center text in View / View içinde metni ortala
const One = () => {
  return (
    <View style={styles.challengeOneContainer}>
      <Text>1 - Kaan</Text>
    </View>
  );
};

// Challenge 2: Nested bold text / İç içe kalın metin
const Two = () => {
  return (
    <Text>
      2 - <Text style={styles.challengeTwoTextStyle}>Pijamalı </Text> hasta,{' '}
      <Text style={styles.challengeTwoTextStyle}>yağız </Text> şoföre çabucak{' '}
      <Text style={styles.challengeTwoTextStyle}>güvendi.</Text>
    </Text>
  );
};

// Challenge 3: Button with alert / Uyarılı buton
const Three = () => {
  return (
    <Button
      title="3 - Show Alert"
      onPress={() => {
        Alert.alert('Hello world!', 'Selam Dünya');
      }}
    />
  );
};

// Styles / Stil Tanımları
const styles = StyleSheet.create({
  // Center content / İçeriği ortala
  challengeOneContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Bold text style / Kalın metin stili
  challengeTwoTextStyle: {
    fontWeight: 'bold',
  },

  coreContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
});

export default CoreComponents;
