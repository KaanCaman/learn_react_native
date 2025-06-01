import React, {useRef} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  PanResponder,
  Dimensions,
  Image,
} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// ZoomImage adında functional component oluşturuyoruz
// Creating a functional component named ZoomImage
export default function ZoomChallenge() {
  // Görselin ölçeklendirme değerini kontrol eden Animated.Value
  // Animated.Value that controls the scale of the image
  const scale = useRef(new Animated.Value(1)).current; // Başlangıç ölçeği 1 (orijinal boyut) // Initial scale is 1 (original size)

  // Mevcut scale değerini takip eden ref (manuel olarak güncellenir)
  // Ref to track current scale value (manually updated)
  const currentScaleValue = useRef(1);

  // İki parmak arasındaki başlangıç mesafesini saklayan ref
  // Ref to store the initial distance between two fingers
  const initialDistance = useRef(0);

  // Jest başladığında ki ölçek değerini saklayan ref
  // Ref to store the scale value when gesture starts
  const initialScale = useRef(1);

  // İki nokta arasındaki mesafeyi hesaplayan yardımcı fonksiyon
  // Helper function to calculate distance between two points
  const getDistance = (touch1: any, touch2: any) => {
    return Math.sqrt(
      Math.pow(touch2.pageX - touch1.pageX, 2) +
        Math.pow(touch2.pageY - touch1.pageY, 2),
    );
  };

  // PanResponder'ı yapılandırıyoruz
  // Configuring PanResponder
  const panResponder = useRef(
    PanResponder.create({
      // Jestin başlamasına izin verip vermediğimizi kontrol eder
      // Controls whether to allow gesture to start
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      // Jest başladığında tetiklenir
      // Triggered when gesture starts
      onPanResponderGrant: event => {
        // Eğer iki parmak varsa, başlangıç mesafesini kaydet
        // If there are two fingers, save the initial distance
        if (event.nativeEvent.touches.length === 2) {
          const touch1 = event.nativeEvent.touches[0];
          const touch2 = event.nativeEvent.touches[1];
          initialDistance.current = getDistance(touch1, touch2);
          initialScale.current = currentScaleValue.current; // Mevcut ölçek değerini kaydet // Save current scale value
        }
      },

      // Jest hareket ettiğinde tetiklenir
      // Triggered when gesture moves
      onPanResponderMove: (event, gestureState) => {
        // İki parmakla yapılan jesti (pinch) algılamak için
        // To detect pinch gesture with two fingers
        if (event.nativeEvent.touches.length === 2) {
          const touch1 = event.nativeEvent.touches[0];
          const touch2 = event.nativeEvent.touches[1];

          // Mevcut mesafeyi hesapla
          // Calculate current distance
          const currentDistance = getDistance(touch1, touch2);

          // Ölçek oranını hesapla (mevcut mesafe / başlangıç mesafesi)
          // Calculate scale ratio (current distance / initial distance)
          const scaleRatio = currentDistance / initialDistance.current;

          // Yeni ölçek değerini hesapla
          // Calculate new scale value
          const newScale = initialScale.current * scaleRatio;

          // Minimum ve maksimum ölçek sınırları koy
          // Set minimum and maximum scale limits
          const clampedScale = Math.max(0.5, Math.min(3, newScale)); // 0.5x ile 3x arasında sınırla // Limit between 0.5x and 3x

          // Ölçek değerini güncelle
          // Update scale value
          scale.setValue(clampedScale);
          currentScaleValue.current = clampedScale; // Manuel takip için güncelle // Update for manual tracking
        }
      },

      // Jest bittiğinde tetiklenir
      // Triggered when gesture ends
      onPanResponderRelease: () => {
        // Jest bittiğinde herhangi bir temizlik işlemi yapabiliriz
        // We can perform any cleanup when gesture ends
        // Örneğin, ölçeği belirli bir değere geri döndürme animasyonu
        // For example, animation to return scale to a specific value
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.imageContainer,
          {
            transform: [{scale: scale}], // Animated.Value'yu ölçeklendirme için kullan // Use Animated.Value for scaling
          },
        ]}
        {...panResponder.panHandlers} // PanResponder jestlerini buraya uygula // Apply PanResponder gestures here
      >
        <Image
          source={require('../../../../week8/fblogo.png')} // Örnek görsel URL'si // Example image URL
          style={styles.image}
          resizeMode="contain" // Görselin boyutuna sığmasını sağlar // Ensures image fits within bounds
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Açık gri arka plan // Light gray background
  },
  imageContainer: {
    width: SCREEN_WIDTH * 0.8, // Ekran genişliğinin %80'i // 80% of screen width
    height: SCREEN_HEIGHT * 0.6, // Ekran yüksekliğinin %60'ı // 60% of screen height
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // Görselin container dışına taşmasını engeller // Prevents image from overflowing container
    borderRadius: 10, // Köşe yuvarlaması // Border radius
    backgroundColor: '#fff', // Beyaz arka plan // White background
    shadowColor: '#000', // Gölge rengi // Shadow color
    shadowOffset: {width: 0, height: 4}, // Gölge konumu // Shadow position
    shadowOpacity: 0.3, // Gölge saydamlığı // Shadow opacity
    shadowRadius: 5, // Gölge bulanıklığı // Shadow blur radius
    elevation: 8, // Android için gölge // Shadow for Android
  },
  image: {
    width: '100%', // Container'ın tamamını kapla // Cover entire container
    height: '100%', // Container'ın tamamını kapla // Cover entire container
  },
});
