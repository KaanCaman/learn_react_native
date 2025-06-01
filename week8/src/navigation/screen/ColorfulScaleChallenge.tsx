import React, {useRef, useEffect} from 'react';
import {StyleSheet, View, Animated, Easing} from 'react-native';

// const {width: SCREEN_WIDTH} = Dimensions.get('window');

// Başlangıç boyutları ve renkler / Initial sizes and colors
const INITIAL_SIZE: number = 100;
const ANIMATION_DURATION: number = 3000; // Animasyonun toplam süresi (ms) / Total animation duration (ms)

export default function ColorfulScaleChallenge() {
  // Animasyonun ilerlemesini kontrol eden Animated.Value / Animated.Value controlling animation progress
  const animationProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Component yüklendiğinde animasyonu başlat / Start animation when component mounts
    startScaleAnimation();
  }, []);

  const startScaleAnimation = (): void => {
    // Animasyon sekansını tanımla: büyüt, küçült, orijinal boyuta dön
    // Define animation sequence: scale up, scale down, return to original size
    Animated.sequence([
      // 0'dan 0.5'e kadar büyüme (original -> 1.5x)
      // Growing from 0 to 0.5 (original -> 1.5x)
      Animated.timing(animationProgress, {
        toValue: 0.5,
        duration: ANIMATION_DURATION / 3, // Toplam sürenin 1/3'ü / 1/3 of total duration
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      // 0.5'ten 1.0'a kadar küçülme (1.5x -> 0.7x)
      // Shrinking from 0.5 to 1.0 (1.5x -> 0.7x)
      Animated.timing(animationProgress, {
        toValue: 1.0,
        duration: ANIMATION_DURATION / 3, // Toplam sürenin 1/3'ü / 1/3 of total duration
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      // 1.0'dan 1.5'e kadar orijinal boyuta dönme (0.7x -> original)
      // Returning to original size from 1.0 to 1.5 (0.7x -> original)
      Animated.timing(animationProgress, {
        toValue: 1.5, // Bu değer, interpolation'da orijinal boyuta dönmek için kullanılacak
        // This value will be used in interpolation to return to original size
        duration: ANIMATION_DURATION / 3, // Toplam sürenin 1/3'ü / 1/3 of total duration
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Animasyon bittiğinde progress değerini sıfırla (isteğe bağlı, tekrar oynatmak için)
      // Reset progress value when animation ends (optional, for replay)
      // animationProgress.setValue(0);
    });
  };

  // Boyut interpolasyonu / Scale interpolation
  const animatedScale = animationProgress.interpolate({
    inputRange: [0, 0.5, 1.0, 1.5], // Animasyon ilerlemesi / Animation progress
    outputRange: [1, 1.5, 0.7, 1], // Karşılık gelen boyut oranları (1=orijinal, 1.5=büyük, 0.7=küçük)
    // Corresponding scale ratios (1=original, 1.5=large, 0.7=small)
  });

  // Renk interpolasyonu / Color interpolation
  const animatedColor = animationProgress.interpolate({
    inputRange: [0, 0.5, 1.0, 1.5], // Animasyon ilerlemesi / Animation progress
    outputRange: [
      'rgb(255, 99, 71)',
      'rgb(71, 255, 99)',
      'rgb(71, 99, 255)',
      'rgb(255, 99, 71)',
    ], // Renk geçişleri / Color transitions
    // Kırmızı -> Yeşil -> Mavi -> Kırmızı / Red -> Green -> Blue -> Red
  });

  // Animasyonlu stil / Animated style
  const animatedStyle = {
    width: INITIAL_SIZE,
    height: INITIAL_SIZE,
    borderRadius: INITIAL_SIZE / 2, // Dairesel görünüm için / For circular appearance
    backgroundColor: animatedColor, // Interpolasyonlu renk / Interpolated color
    transform: [{scale: animatedScale}], // Interpolasyonlu boyut / Interpolated scale
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  box: {
    // Başlangıç boyutları animatedStyle içinde tanımlandığı için burada sadece temel stiller
    // Only basic styles here since initial sizes are defined in animatedStyle
    justifyContent: 'center',
    alignItems: 'center',
  },
});
