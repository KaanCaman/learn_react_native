// Styling Challenges / Stil Challenge'ları
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const Styling = () => {
  return (
    <View style={styles.stylingContainer}>
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
      <Text>View{'>'}Text </Text>
    </View>
  );
};

// Challenge 2: Responsive button / Responsive buton
const Two = () => {
  return (
    <TouchableOpacity style={styles.challengeTwoButton}>
      <Text style={styles.challengeTwoText}>Ekran genişliğinin %80'i</Text>
    </TouchableOpacity>
  );
};

// Challenge 3: Card layout / Kart düzeni
const Three = () => {
  return (
    <View style={styles.challengeThreeCard}>
      <Text style={styles.challengeThreeHeader}>Tulum peyniri</Text>
      <Image
        style={styles.challengeThreeImage}
        source={require('./../../assets/tulumPeyniri.jpeg')}
      />
      <Text>Can ERZINCANIN tulum peyniri</Text>
    </View>
  );
};

// Styles / Stil Tanımları
const styles = StyleSheet.create({
  // Main container / Ana konteyner
  stylingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 12,
  },

  // Challenge 1: Centered square / Ortalanmış kare
  challengeOneContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 96,
    height: 96,
    backgroundColor: 'olivedrab',
    borderRadius: 12,
  },

  // Challenge 2: Width 80% button / %80 genişlikte buton
  challengeTwoButton: {
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    padding: 4,
    backgroundColor: 'olivedrab',
  },
  challengeTwoText: {
    fontWeight: 'bold',
  },

  // Challenge 3: Card styling / Kart stili
  challengeThreeCard: {
    backgroundColor: 'lavenderblush',
    display: 'flex',
    alignItems: 'center',
    padding: 12,
    borderWidth: 2,
    borderRadius: 16,
  },
  challengeThreeHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 4,
  },
  challengeThreeImage: {
    width: 260,
    height: 160,
    margin: 6,
  },
});

export default Styling;
