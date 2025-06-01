import React, {useRef, useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Easing,
  Dimensions,
  TouchableWithoutFeedback,
  Alert,
  GestureResponderEvent,
  Text,
} from 'react-native';

// Sabitler için enum tanımlamaları
// Enum definitions for constants
enum BallConfig {
  SIZE = 50, // Topun boyutu / Ball size
  MIN_BOUNCE_DISTANCE_MULTIPLIER = 1.3, // Minimum sekme mesafesi çarpanı / Minimum bounce distance multiplier
}

enum StripConfig {
  HEIGHT = 50, // Yatay şeridin yüksekliği / Horizontal strip height
  THICKNESS = 20, // Şeridin kalınlığı / Strip thickness
  GROUND_OFFSET = 120, // Zemin offset değeri / Ground offset value
}

enum InfoPanelConfig {
  HEIGHT = 150, // Bilgi paneli yüksekliği / Info panel height
  PADDING = 15, // İç boşluk / Internal padding
  DIVIDER_HEIGHT = 2, // Ayırıcı çizgi yüksekliği / Divider line height
}

enum AnimationConfig {
  INITIAL_FALL_DURATION = 1000, // Başlangıç düşüş süresi / Initial fall duration
  BOUNCE_DURATION = 500, // Sekme süresi / Bounce duration
  QUICK_BOUNCE_DURATION = 300, // Hızlı sekme süresi / Quick bounce duration
  FINAL_SETTLE_DURATION = 100, // Son yerleşme süresi / Final settle duration
  BOUNCE_HEIGHT_FACTOR = 0.6, // Sekme yükseklik faktörü / Bounce height factor
  BOUNCE_DURATION_FACTOR = 0.7, // Sekme süre faktörü / Bounce duration factor
  MAX_BOUNCE_COUNT = 3, // Maksimum sekme sayısı / Maximum bounce count
}

enum Colors {
  BACKGROUND = '#f0f0f0', // Arka plan rengi / Background color
  BALL = '#FF6347', // Top rengi / Ball color
  STRIP = '#4CAF50', // Şerit rengi / Strip color
  SHADOW = '#000', // Gölge rengi / Shadow color
  INFO_PANEL = '#ffffff', // Bilgi paneli arka plan / Info panel background
  INFO_TEXT = '#333333', // Bilgi metni rengi / Info text color
  DIVIDER = '#cccccc', // Ayırıcı çizgi rengi / Divider line color
}

enum AlertMessages {
  BOUNCING_WARNING_TITLE = 'Uyarı', // Warning title
  BOUNCING_WARNING_MESSAGE = 'Top zaten sekiyor! Lütfen animasyonun bitmesini bekleyin.', // Warning message
  INVALID_AREA_TITLE = 'Hata', // Error title
  INVALID_AREA_MESSAGE = 'Topu şeridin üzerinde veya altında başlatamazsınız! Daha yüksek bir noktaya tıklayın.', // Invalid area message
  INSUFFICIENT_SPACE_MESSAGE = 'Topun sekmesi için yeterli alan yok! Daha yüksek bir noktaya tıklayın.', // Insufficient space message
}

// Ekran boyutlarını alıyoruz
// Getting screen dimensions
const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');

// Animasyon durumları için enum
// Enum for animation states
enum AnimationState {
  IDLE = 'idle', // Boşta / Idle
  BOUNCING = 'bouncing', // Sekiyor / Bouncing
  INITIALIZING = 'initializing', // Başlatılıyor / Initializing
}

// Bilgi paneli verileri için interface
// Interface for info panel data
interface InfoPanelData {
  animationState: string;
  lastBounceCount: number;
  totalBounces: number;
}

// Topun konumu için interface
// Interface for ball position
interface BallPosition {
  x: number;
  y: number;
}

// Sekme parametreleri için interface
// Interface for bounce parameters
interface BounceParameters {
  initialY: number;
  finalGroundY: number;
  totalDistance: number;
  bounceCount: number;
  bounceHeightFactor: number;
}

// BouncingBall adında functional component oluşturuyoruz
// Creating functional component named BouncingBall
export default function BouncingBall() {
  // Topun pozisyonunu kontrol etmek için Animated.ValueXY kullanıyoruz
  // Using Animated.ValueXY to control ball position
  const ballPosition = useRef<Animated.ValueXY>(
    new Animated.ValueXY({x: 0, y: 0}),
  ).current;

  // Animasyon durumunu takip etmek için state
  // State to track animation status
  const [animationState, setAnimationState] = useState<AnimationState>(
    AnimationState.IDLE,
  );

  // Bilgi paneli verileri için state
  // State for info panel data
  const [infoPanelData, setInfoPanelData] = useState<InfoPanelData>({
    animationState: 'Idle',
    lastBounceCount: 0,
    totalBounces: 0,
  });

  // Component yüklendiğinde başlangıç animasyonunu başlat
  // Start initial animation when component mounts
  useEffect(() => {
    startInitialBounce();
  }, []);

  // Bilgi panelini güncelleyen fonksiyon
  // Function to update info panel
  const updateInfoPanel = (
    state: AnimationState,
    lastBounce: number,
    totalBounceIncrement: number,
  ): void => {
    setInfoPanelData(prev => ({
      animationState: getAnimationStateText(state),
      lastBounceCount: lastBounce,
      totalBounces: prev.totalBounces + totalBounceIncrement,
    }));
  };

  // Animasyon durumu metnini döndüren fonksiyon
  // Function to return animation state text
  const getAnimationStateText = (state: AnimationState): string => {
    switch (state) {
      case AnimationState.IDLE:
        return 'Idle';
      case AnimationState.BOUNCING:
        return 'Bouncing';
      case AnimationState.INITIALIZING:
        return 'Initializing';
      default:
        return 'Unknown';
    }
  };

  // Başlangıçtaki animasyon fonksiyonu
  // Initial animation function
  const startInitialBounce = useCallback((): void => {
    setAnimationState(AnimationState.INITIALIZING);
    updateInfoPanel(AnimationState.INITIALIZING, 3, 0);

    // Topu ekranın üstünden başlatıp ortalıyoruz
    // Starting ball from top of screen and centering it
    const startY: number = -BallConfig.SIZE;
    const centerX: number = SCREEN_WIDTH / 2 - BallConfig.SIZE / 2;

    ballPosition.setValue({x: centerX, y: startY});

    // Topun duracağı son Y pozisyonu (şeridin üst kenarı)
    // Final Y position where ball will rest (top edge of strip)
    const finalGroundY: number = calculateFinalGroundY();

    // Başlangıç animasyon dizisi
    // Initial animation sequence
    const initialBounceSequence = createInitialBounceSequence(finalGroundY);

    Animated.sequence(initialBounceSequence).start(() => {
      setAnimationState(AnimationState.IDLE);
      updateInfoPanel(AnimationState.IDLE, 0, 3);
    });
  }, [ballPosition]);

  // Başlangıç animasyon dizisini oluşturan fonksiyon
  // Function to create initial animation sequence
  const createInitialBounceSequence = (
    finalGroundY: number,
  ): Animated.CompositeAnimation[] => {
    return [
      // İlk düşüş: Şeridin üst kenarına kadar zıplayarak düşer
      // First fall: Bounces down to the top edge of the strip
      Animated.timing(ballPosition.y, {
        toValue: finalGroundY,
        duration: AnimationConfig.INITIAL_FALL_DURATION,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
      // İlk sekme: Şeride değdikten sonra biraz yukarı zıplar
      // First bounce: Jumps up a bit after hitting the strip
      Animated.timing(ballPosition.y, {
        toValue: finalGroundY - 100,
        duration: AnimationConfig.BOUNCE_DURATION,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      // İkinci düşüş: Tekrar şeride düşer
      // Second fall: Falls back to strip again
      Animated.timing(ballPosition.y, {
        toValue: finalGroundY,
        duration: AnimationConfig.BOUNCE_DURATION,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
      // İkinci sekme: Daha az yukarı zıplar
      // Second bounce: Jumps less high
      Animated.timing(ballPosition.y, {
        toValue: finalGroundY - 50,
        duration: AnimationConfig.QUICK_BOUNCE_DURATION,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      // Son düşüş ve durma: Şeridin üzerine tamamen iner ve durur
      // Final fall and stop: Completely settles on the strip
      Animated.timing(ballPosition.y, {
        toValue: finalGroundY,
        duration: AnimationConfig.QUICK_BOUNCE_DURATION,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
    ];
  };

  // Final zemin Y pozisyonunu hesaplayan fonksiyon
  // Function to calculate final ground Y position
  const calculateFinalGroundY = (): number => {
    return SCREEN_HEIGHT - BallConfig.SIZE - StripConfig.GROUND_OFFSET * 3;
  };

  // Şeridin üst kenar Y pozisyonunu hesaplayan fonksiyon
  // Function to calculate strip top Y position
  const calculateStripTopY = (): number => {
    return SCREEN_HEIGHT - StripConfig.HEIGHT;
  };

  // Minimum sekme mesafesini hesaplayan fonksiyon
  // Function to calculate minimum bounce distance
  const calculateMinBounceDistance = (): number => {
    return BallConfig.SIZE * BallConfig.MIN_BOUNCE_DISTANCE_MULTIPLIER;
  };

  // Ekran tıklamalarını yöneten fonksiyon
  // Function to handle screen touches
  const handlePress = (event: GestureResponderEvent): void => {
    // Eğer animasyon zaten devam ediyorsa yeni bir animasyon başlatma ve uyarı göster
    // If animation is already running, don't start new animation and show warning
    if (animationState !== AnimationState.IDLE) {
      Alert.alert(
        AlertMessages.BOUNCING_WARNING_TITLE,
        AlertMessages.BOUNCING_WARNING_MESSAGE,
      );
      return;
    }

    // Tıklanan noktanın koordinatlarını al
    // Get coordinates of touched point
    const touchLocation = extractTouchLocation(event);

    // Geçerlilik kontrollerini yap
    // Perform validation checks
    const validationResult = validateTouchLocation(touchLocation);
    if (!validationResult.isValid) {
      Alert.alert(
        AlertMessages.INVALID_AREA_TITLE,
        validationResult.errorMessage!,
      );
      return;
    }

    // Animasyon parametrelerini hesapla
    // Calculate animation parameters
    const bounceParams = calculateBounceParameters(touchLocation);

    // Yeterli alan kontrolü
    // Check for sufficient space
    if (!hasInsufficientSpace(bounceParams.totalDistance)) {
      Alert.alert(
        AlertMessages.INVALID_AREA_TITLE,
        AlertMessages.INSUFFICIENT_SPACE_MESSAGE,
      );
      return;
    }

    // Animasyonu başlat
    // Start animation
    executeBounceAnimation(bounceParams);
  };

  // Dokunma konumunu çıkaran fonksiyon
  // Function to extract touch location
  const extractTouchLocation = (event: GestureResponderEvent): BallPosition => {
    // Dokunma olayından koordinatları çıkarıyoruz
    // Extracting coordinates from touch event
    const {locationX, locationY} = event.nativeEvent;

    /*
    Detaylı Açıklama ve Örnek: / Detailed Explanation and Example:

    Bu fonksiyon, kullanıcının ekranda dokunduğu noktayı alır ve topun konumunu hesaplar.
    This function takes the point where user touched the screen and calculates ball position.

    Kullanıcı Dokunma Noktası: / User Touch Point:
    - Kullanıcı ekranın (200, 300) noktasına dokundu
    - User touched point (200, 300) on screen

    Top Boyutu Hesabı: / Ball Size Calculation:
    - Top boyutu: 50x50 piksel (kare bir alan)
    - Ball size: 50x50 pixels (square area)
    - Topun merkezi dokunulan noktada olmalı
    - Ball center should be at touched point

    Koordinat Dönüşümü: / Coordinate Transformation:
    - X pozisyonu: 200 - (50/2) = 200 - 25 = 175
    - X position: 200 - (50/2) = 200 - 25 = 175
    - Bu, topun sol kenarının X koordinatıdır
    - This is the X coordinate of ball's left edge

    - Y pozisyonu: 300 - (50/2) = 300 - 25 = 275
    - Y position: 300 - (50/2) = 300 - 25 = 275
    - Bu, topun üst kenarının Y koordinatıdır
    - This is the Y coordinate of ball's top edge

    Sonuç: / Result:
    - Top (175, 275) konumunda başlayacak
    - Ball will start at position (175, 275)
    - Böylece topun merkezi (200, 300) noktasında olacak
    - Thus ball's center will be at point (200, 300)
    */

    return {
      x: locationX - BallConfig.SIZE / 2, // Topun merkezini dokunulan noktaya hizalamak için / To align ball center to touched point
      y: locationY - BallConfig.SIZE / 2, // Topun merkezini dokunulan noktaya hizalamak için / To align ball center to touched point
    };
  };

  // Dokunma konumunu doğrulayan fonksiyon
  // Function to validate touch location
  const validateTouchLocation = (
    location: BallPosition,
  ): {
    isValid: boolean;
    errorMessage?: string;
  } => {
    const stripTopY = calculateStripTopY();

    if (location.y + BallConfig.SIZE / 2 >= stripTopY) {
      return {
        isValid: false,
        errorMessage: AlertMessages.INVALID_AREA_MESSAGE,
      };
    }

    return {isValid: true};
  };

  // Sekme parametrelerini hesaplayan fonksiyon
  // Function to calculate bounce parameters
  const calculateBounceParameters = (
    location: BallPosition,
  ): BounceParameters => {
    /*
    Detaylı Açıklama ve Örnek Hesaplama: / Detailed Explanation and Example Calculation:

    Bu fonksiyon, topun sekme davranışını belirleyen tüm parametreleri hesaplar.
    This function calculates all parameters that determine ball's bouncing behavior.

    Temel Veriler: / Basic Data:
    - Ekran yüksekliği: 800px / Screen height: 800px
    - Top boyutu: 50px / Ball size: 50px
    - Şerit yüksekliği: 80px / Strip height: 80px
    - Şerit offset: 120px / Strip offset: 120px

    1. Son Zemin Y Koordinatı Hesabı: / Final Ground Y Coordinate Calculation:
    finalGroundY = SCREEN_HEIGHT - BallConfig.SIZE - StripConfig.GROUND_OFFSET
    finalGroundY = 800 - 50 - 120 = 630px

    Bu, topun son durduğu yeri gösterir (şeridin üst kenarı)
    This shows where the ball finally stops (top edge of strip)

    2. Dokunma Pozisyonu Örneği: / Touch Position Example:
    - Kullanıcı Y=200 noktasına dokundu / User touched at Y=200
    - location.y = 200px (topun üst kenarı) / location.y = 200px (ball's top edge)

    3. Toplam Mesafe Hesabı: / Total Distance Calculation:
    totalDistance = finalGroundY - location.y
    totalDistance = 630 - 200 = 430px

    Bu mesafe topun düşeceği toplam yüksekliktir
    This distance is the total height the ball will fall

    4. Fizik Simülasyonu: / Physics Simulation:
    - 430px yükseklikten düşen bir top gerçek hayatta kaç kez seker?
    - How many times would a ball bounce when dropped from 430px height in real life?
    - Enerji kaybı faktörü: 0.6 (her sekmede %40 enerji kaybı)
    - Energy loss factor: 0.6 (40% energy loss per bounce)

    5. Dinamik Sekme Hesabı: / Dynamic Bounce Calculation:
    calculateDynamicBounceCount(430) fonksiyonu çağrılır
    calculateDynamicBounceCount(430) function is called
    */

    // Topun son duracağı Y pozisyonunu hesaplıyoruz (şeridin üst kenarı)
    // Calculating final Y position where ball will rest (top edge of strip)
    const finalGroundY = calculateFinalGroundY();

    // Topun başlangıç pozisyonundan son pozisyona olan toplam mesafeyi hesaplıyoruz
    // Calculating total distance from initial position to final position
    const totalDistance = finalGroundY - location.y;

    // Mesafeye göre dinamik sekme sayısını hesaplıyoruz
    // Calculating dynamic bounce count based on distance
    const bounceCount = calculateDynamicBounceCount(totalDistance);

    return {
      initialY: location.y,
      finalGroundY,
      totalDistance,
      bounceCount,
      bounceHeightFactor: AnimationConfig.BOUNCE_HEIGHT_FACTOR,
    };
  };

  // Dinamik sekme sayısını hesaplayan fonksiyon
  // Function to calculate dynamic bounce count
  const calculateDynamicBounceCount = (distance: number): number => {
    /*
    Detaylı Fizik Simülasyonu ve Örnek: / Detailed Physics Simulation and Example:

    Bu fonksiyon gerçek fizik yasalarını taklit eder. Bir top yüksekten düştüğünde,
    her sekmede enerji kaybeder ve gitgide daha az yükseğe çıkar.
    This function mimics real physics laws. When a ball falls from height,
    it loses energy with each bounce and rises less high each time.

    Algoritma Mantığı: / Algorithm Logic:
    1. Başlangıç yüksekliği ile başlarız
    2. Her sekmede yükseklik %60'ına düşer (enerji kaybı simülasyonu)
    3. Minimum görünür yükseklik altına düşene kadar sayarız
    4. Maksimum 5 sekme limiti koyarız (performans için)

    Örnek Hesaplama: / Example Calculation:
    Başlangıç mesafesi: 400px / Initial distance: 400px

    Sekme #1: / Bounce #1:
    - Mevcut yükseklik: 400px / Current height: 400px
    - Sonraki yükseklik: 400 * 0.6 = 240px / Next height: 400 * 0.6 = 240px
    - 240px > 10px (minimum) ✓ Sekme sayısı: 1 / Bounce count: 1

    Sekme #2: / Bounce #2:
    - Mevcut yükseklik: 240px / Current height: 240px
    - Sonraki yükseklik: 240 * 0.6 = 144px / Next height: 240 * 0.6 = 144px
    - 144px > 10px (minimum) ✓ Sekme sayısı: 2 / Bounce count: 2

    Sekme #3: / Bounce #3:
    - Mevcut yükseklik: 144px / Current height: 144px
    - Sonraki yükseklik: 144 * 0.6 = 86px / Next height: 144 * 0.6 = 86px
    - 86px > 10px (minimum) ✓ Sekme sayısı: 3 / Bounce count: 3

    Sekme #4: / Bounce #4:
    - Mevcut yükseklik: 86px / Current height: 86px
    - Sonraki yükseklik: 86 * 0.6 = 52px / Next height: 86 * 0.6 = 52px
    - 52px > 10px (minimum) ✓ Sekme sayısı: 4 / Bounce count: 4

    Sekme #5: / Bounce #5:
    - Mevcut yükseklik: 52px / Current height: 52px
    - Sonraki yükseklik: 52 * 0.6 = 31px / Next height: 52 * 0.6 = 31px
    - 31px > 10px (minimum) ✓ Sekme sayısı: 5 / Bounce count: 5

    Sekme #6: / Bounce #6:
    - Mevcut yükseklik: 31px / Current height: 31px
    - Sonraki yükseklik: 31 * 0.6 = 19px / Next height: 31 * 0.6 = 19px
    - 19px > 10px (minimum) ✓ Ama maksimum 5 sekme limiti!
    - 19px > 10px (minimum) ✓ But maximum 5 bounce limit!

    Sonuç: 5 sekme / Result: 5 bounces
    Farklı Mesafeler için Sonuçlar: / Results for Different Distances:
    - 100px → 2 sekme / 100px → 2 bounces
    - 200px → 3 sekme / 200px → 3 bounces
    - 400px → 5 sekme / 400px → 5 bounces
    - 600px → 5 sekme (limit) / 600px → 5 bounces (limit)
    */

    // Fiziksel gerçekçilik için enerji kaybı simülasyonu
    // Energy loss simulation for physical realism
    let currentHeight = distance; // Mevcut yükseklik / Current height
    let bounces = 0; // Sekme sayacı / Bounce counter

    // Görünür sekme için minimum yükseklik eşiği
    // Minimum height threshold for visible bounce
    const minVisibleHeight = BallConfig.SIZE / 5; // 10px (50/5)

    while (
      currentHeight > minVisibleHeight && // Görünür yükseklik kontrolü / Visible height check
      bounces < AnimationConfig.MAX_BOUNCE_COUNT // Maksimum sekme limiti / Maximum bounce limit
    ) {
      bounces++; // Sekme sayısını artır / Increment bounce count
      currentHeight *= AnimationConfig.BOUNCE_HEIGHT_FACTOR; // Enerji kaybını uygula / Apply energy loss
    }

    // En az 1 sekme garantisi / Guarantee at least 1 bounce
    return Math.max(1, bounces);
  };

  // Yeterli alan olup olmadığını kontrol eden fonksiyon
  // Function to check if there's sufficient space
  const hasInsufficientSpace = (distance: number): boolean => {
    return distance >= calculateMinBounceDistance();
  };

  // Sekme animasyonunu çalıştıran fonksiyon
  // Function to execute bounce animation
  const executeBounceAnimation = (params: BounceParameters): void => {
    // Topun başlangıç pozisyonunu ayarla
    // Set ball's initial position
    ballPosition.setValue({
      x: SCREEN_WIDTH / 2 - BallConfig.SIZE / 2,
      y: params.initialY,
    });

    setAnimationState(AnimationState.BOUNCING);
    updateInfoPanel(AnimationState.BOUNCING, params.bounceCount, 0);

    startBounceAnimation(params);
  };

  // Tıklanan yerden zıplama animasyonunu başlatan fonksiyon
  // Function to start bounce animation from clicked position
  const startBounceAnimation = (params: BounceParameters): void => {
    const bounceSequence = createBounceSequence(params);

    Animated.sequence(bounceSequence).start(() => {
      // Animasyon bittiğinde topun yerde kalmasını sağlayan son düşüş
      // Final fall to ensure ball stays on ground when animation ends
      Animated.timing(ballPosition.y, {
        toValue: params.finalGroundY,
        duration: AnimationConfig.FINAL_SETTLE_DURATION,
        easing: Easing.bounce,
        useNativeDriver: true,
      }).start(() => {
        setAnimationState(AnimationState.IDLE);
        updateInfoPanel(AnimationState.IDLE, 0, params.bounceCount);
      });
    });
  };

  // Sekme animasyon dizisini oluşturan fonksiyon
  // Function to create bounce animation sequence
  const createBounceSequence = (
    params: BounceParameters,
  ): Animated.CompositeAnimation[] => {
    const sequence: Animated.CompositeAnimation[] = [];

    for (let i = 0; i < params.bounceCount; i++) {
      // Düşüş animasyonu
      // Fall animation
      sequence.push(
        Animated.timing(ballPosition.y, {
          toValue: params.finalGroundY,
          duration: AnimationConfig.BOUNCE_DURATION,
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
      );

      // Son sekme hariç tüm sekme animasyonları
      // All bounce animations except the last one
      if (i < params.bounceCount - 1) {
        const bounceHeight =
          params.totalDistance * Math.pow(params.bounceHeightFactor, i + 1);

        sequence.push(
          Animated.timing(ballPosition.y, {
            toValue: params.finalGroundY - bounceHeight,
            duration:
              AnimationConfig.BOUNCE_DURATION *
              AnimationConfig.BOUNCE_DURATION_FACTOR,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        );
      }
    }

    return sequence;
  };
  // Component render fonksiyonu
  // Component render function
  return (
    <View style={styles.container}>
      {/* Bilgi Paneli - Info Panel */}
      <View style={styles.infoPanel}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Status:</Text>
          <Text style={styles.infoValue}>{infoPanelData.animationState}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}> Last Bounce:</Text>
          <Text style={styles.infoValue}>{infoPanelData.lastBounceCount}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Total Bounces:</Text>
          <Text style={styles.infoValue}>{infoPanelData.totalBounces}</Text>
        </View>
      </View>

      {/* Ana Oyun Alanı - Main Game Area */}
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.gameArea}>
          {/* Animasyonlu Top - Animated Ball */}
          <Animated.View
            style={[
              styles.ball,
              {
                transform: [
                  {translateX: ballPosition.x},
                  {translateY: ballPosition.y},
                ],
              },
            ]}
          />

          {/* Yatay Şerit - Horizontal Strip */}
          <View style={styles.strip} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

// Stil tanımlamaları
// Style definitions
const styles = StyleSheet.create({
  // Ana konteyner stili
  // Main container style
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },

  // Bilgi paneli ana konteyner stili
  // Info panel main container style
  infoPanel: {
    height: InfoPanelConfig.HEIGHT,
    backgroundColor: Colors.INFO_PANEL,
    paddingHorizontal: InfoPanelConfig.PADDING,
    paddingVertical: InfoPanelConfig.PADDING,
    justifyContent: 'space-around',
    elevation: 3, // Android gölge efekti / Android shadow effect
    shadowColor: Colors.SHADOW, // iOS gölge rengi / iOS shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    zIndex: 1000, // En üstte kalması için / To stay on top
  },

  // Bilgi satırı stili
  // Info row style
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },

  // Bilgi etiketi stili
  // Info label style
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.INFO_TEXT,
    flex: 1,
  },

  // Bilgi değeri stili
  // Info value style
  infoValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.INFO_TEXT,
    textAlign: 'right',
    flex: 1,
  },

  // Ayırıcı çizgi stili
  // Divider line style
  divider: {
    height: InfoPanelConfig.DIVIDER_HEIGHT,
    backgroundColor: Colors.DIVIDER,
    marginVertical: 2,
  },

  // Oyun alanı stili
  // Game area style
  gameArea: {
    flex: 1,
    position: 'relative',
  },

  // Top stili
  // Ball style
  ball: {
    position: 'absolute',
    width: BallConfig.SIZE,
    height: BallConfig.SIZE,
    backgroundColor: Colors.BALL,
    borderRadius: BallConfig.SIZE / 2,
    elevation: 5, // Android gölge efekti / Android shadow effect
    shadowColor: Colors.SHADOW, // iOS gölge ayarları / iOS shadow settings
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    zIndex: 100, // Şeridin üstünde görünmesi için / To appear above strip
  },

  // Yatay şerit stili
  // Horizontal strip style
  strip: {
    position: 'absolute',
    bottom: StripConfig.GROUND_OFFSET - StripConfig.HEIGHT,
    left: 0,
    right: 0,
    height: StripConfig.HEIGHT,
    backgroundColor: Colors.STRIP,
    elevation: 2, // Android gölge efekti / Android shadow effect
    shadowColor: Colors.SHADOW, // iOS gölge ayarları / iOS shadow settings
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.22,
  },
});
