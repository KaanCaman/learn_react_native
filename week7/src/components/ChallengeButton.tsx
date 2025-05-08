import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

// Props for ChallengeButton: supports all TouchableOpacity props plus custom title and textStyle
// ChallengeButton için Props: tüm TouchableOpacityProps'i ve ek olarak title ile textStyle desteği sağlar
type Props = TouchableOpacityProps & {
  textStyle?: StyleProp<TextStyle>; // Custom text style / Özel metin stili
  title?: string; // Button label text / Buton üzerindeki yazı
};

// A reusable button component for challenge actions
// Tekrar kullanılabilir, challenge işlemleri için buton bileşeni
const ChallengeButton: React.FC<Props> = (props: Props) => {
  return (
    <TouchableOpacity
      {...props}
      // Combine default and custom styles
      // Varsayılan ve gelen style'ları birleştir
      style={[styles.button, props.style]}>
      <Text
        // Combine custom textStyle and default text style
        // Özel textStyle ve varsayılan text stilini birleştir
        style={[props.textStyle, styles.text]}>
        {/* Display title or fallback if undefined */}
        {/* title varsa göster, yoksa yedek metin */}
        {props.title ?? 'undefined challenge'}
      </Text>
    </TouchableOpacity>
  );
};

export default ChallengeButton;

// Default styles for ChallengeButton
// ChallengeButton için varsayılan stil tanımları
const styles = StyleSheet.create({
  button: {
    borderRadius: 14, // Rounded corners / Yuvarlatılmış köşeler
    backgroundColor: 'black', // Button background color / Buton arka plan rengi
    padding: 12, // Inner spacing / İç boşluk
    margin: 10, // Outer spacing / Dış boşluk
    width: '80%', // Width relative to parent / Ebeveyne göre genişlik
    display: 'flex', // Flex container / Flex konteyner
    alignItems: 'center', // Center content horizontally / İçeriği yatayda ortala
    justifyContent: 'center', // Center content vertically / İçeriği dikeyde ortala
  },
  text: {
    fontSize: 18, // Font size / Yazı boyutu
    fontWeight: 'bold', // Bold text / Kalın yazı
    color: 'white', // Text color / Yazı rengi
  },
});
