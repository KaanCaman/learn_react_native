import {Animated, Easing, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';

// SpinAnimation rotates the image continuously
// SpinAnimation görseli sürekli döndürür
const SpinAnimation = (): React.JSX.Element => {
  // Animated value for rotation
  // Döndürme için animasyon değeri
  const spinAnim = useRef<Animated.Value>(new Animated.Value(0)).current;

  // Interpolates the animated value to degrees for rotation
  // Animasyon değerini döndürme için dereceye çevirir
  const spinInterpolate = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    // Starts the looped rotation animation on mount
    // Bileşen yüklendiğinde döngüsel döndürme animasyonunu başlatır
    const loop = Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1907,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [spinAnim]);

  return (
    // Container for spin animation
    // Döndürme animasyonu için kapsayıcı
    <View style={styles.spinAnimation}>
      {/* Image that rotates based on animated value */}
      {/* Animasyon değerine göre dönen görsel */}
      <Animated.Image
        source={require('../../../../week8/fblogo.png')}
        style={[
          styles.spinAnimation,
          {
            transform: [{rotate: spinInterpolate}],
          },
        ]}
      />
    </View>
  );
};

// GrowingAnimation scales view up and down in a loop
// GrowingAnimation bileşeni döngüsel olarak büyütüp küçültür
const GrowingAnimation = (): React.JSX.Element => {
  // Animated value for scale
  // Ölçek için animasyon değeri
  const growAnim = useRef<Animated.Value>(new Animated.Value(0.5)).current;

  useEffect(() => {
    // Sequence of springs to animate scale and loop indefinitely
    // Ölçeği yaylarla animasyon sırasına sokar ve sonsuza dek döngü yapar
    const loop = Animated.loop(
      Animated.sequence([
        Animated.spring(growAnim, {
          toValue: 1.2,
          friction: 3,
          useNativeDriver: true,
        }),
        Animated.spring(growAnim, {
          toValue: 0.5,
          friction: 5,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [growAnim]);

  return (
    // Animated view that scales
    // Ölçeklenen animasyonlu görünüm
    <Animated.View
      style={[
        styles.growingAnimation,
        {
          transform: [{scale: growAnim}],
        },
      ]}>
      {/* Text inside growing animation */}
      {/* Büyüyen animasyon içindeki metin */}
      <Text style={styles.growingAnimationText}>Fenerbahce</Text>
    </Animated.View>
  );
};

// Main component that renders both animations
// Her iki animasyonu da render eden ana bileşen
const TransformObject = (): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <SpinAnimation />
      <GrowingAnimation />
    </View>
  );
};

export default TransformObject;

// Styles for the components
// Bileşenler için stiller
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 18,
  },

  spinAnimation: {
    width: 197,
    height: 197,
    resizeMode: 'contain',
  },

  growingAnimation: {
    padding: 20,
    backgroundColor: '#CE7AF5',
  },
  growingAnimationText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});
