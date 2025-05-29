import {Animated, Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';

// Starts the animation using timing API
// timing API'sini kullanarak animasyonu başlatır
function timing(
  value: Animated.Value,
  toValue: number,
): Animated.CompositeAnimation {
  return Animated.timing(value, {
    toValue,
    duration: 1000,
    useNativeDriver: true,
  });
}

const BasicAnimation = () => {
  // Create a ref for the animated value
  // Animasyonlu değer için bir ref oluşturur
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Run fade-in animation on mount
    // Bileşen yüklendiğinde fade-in animasyonunu çalıştırır
    timing(fadeAnim, 1).start();
  }, [fadeAnim]);

  // Function to fade in
  // Opaklığı artırmak için fonksiyon
  const fadeIn = () => timing(fadeAnim, 1).start();
  // Function to fade out
  // Opaklığı azaltmak için fonksiyon
  const fadeOut = () => timing(fadeAnim, 0).start();

  return (
    <View style={styles.container}>
      {/* Animated view container */}
      {/* Animasyonlu görünüm kapsayıcısı */}
      <Animated.View style={[styles.avBasicAnimation, {opacity: fadeAnim}]}>
        <Text style={styles.basicAnimation}>Basic Animation</Text>
      </Animated.View>
      <View style={styles.row}>
        <Button color="#9B69F5" title="FADE IN" onPress={fadeIn} />
        <Button color="#F57AA9" title="FADE OUT" onPress={fadeOut} />
      </View>
    </View>
  );
};

export default BasicAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  basicAnimation: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  avBasicAnimation: {
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#F5827A',
    width: '90%',
  },
  row: {
    marginVertical: 12,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
});
