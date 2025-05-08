import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  Alert,
  TextInput,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import useAppContext from '../../../hooks/useAppContext';
import {asyncStorage} from '../../../data/storage/asyncStorage';
import {StorageKeys} from '../../../types/data';
import {LocalizationState} from '../../../types/localization';

// Component for custom localization handling
// Özel lokalizasyon (dil) işlemlerini yöneten bileşen
const CustomLocalization: React.FC = () => {
  // Loading indicator state
  // Yükleniyor göstergesi durumu
  const [change, setChange] = useState<boolean>(false);

  // Input text state for dynamic translation example
  // Dinamik çeviri örneği için input metin durumu
  const [text, setText] = useState<string>('');

  // useTranslation hook from react-i18next for translation functions
  // Çeviri fonksiyonları için react-i18next kullanımı
  const {t, i18n} = useTranslation();

  // Access setter from custom AppContext hook to update global state
  // Küresel state'i güncellemek için custom useAppContext hook'un setter'ı
  const {set} = useAppContext();

  /**
   * Handles language switch when button is pressed
   * Butona basıldığında dil değişimini yönetir
   */
  const handleButton = async () => {
    setChange(prev => !prev); // Toggle loading state / Yükleniyor durumunu değiştir
    const language = i18n.language === 'tr' ? 'en' : 'tr'; // Determine next language / Gelecek dili belirle
    try {
      // Update global context state with new language
      // Küresel context state'ini güncelle
      set({
        localizationState: {lang: language},
      });

      // Save new language preference to AsyncStorage
      // Yeni dil tercihlerini AsyncStorage'a kaydet
      await asyncStorage.set<LocalizationState>({
        key: StorageKeys.language,
        value: {lang: language},
      });

      // Change i18n language to update UI translations
      // Arayüz çevirilerini güncellemek için i18n dilini değiştir
      i18n.changeLanguage(language);
    } catch (error) {
      // Show alert on error / Hata durumunda uyarı göster
      Alert.alert('Error', `${error}`);
    } finally {
      setChange(prev => !prev); // Toggle loading state off / Yükleniyor durumunu kapat
    }
  };

  return (
    <View style={styles.parent}>
      {/* Instruction text for localization */}
      {/* Lokalizasyon için açıklayıcı metin */}
      <Text style={styles.text}>{t('customLocalization.text')}</Text>

      {/* Show loader or localization switch button */}
      {/* Yükleyici veya dil değiştirme butonu göster */}
      {change ? (
        <ActivityIndicator />
      ) : (
        <Button title={t('customLocalization.button')} onPress={handleButton} />
      )}

      {/* Input field to demonstrate dynamic translations */}
      {/* Dinamik çeviri örneği için metin girişi */}
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText} // Update text state / Metin durumunu güncelle
        placeholder={t('customLocalization.placeholder')} // Input placeholder translation / Giriş yeri metni çevirisi
      />

      {/* Display translated dynamic text with parameter */}
      {/* Parametreli dinamik çeviriyi göster */}
      <Text>{t('customLocalization.dynamic', {value: text})}</Text>
    </View>
  );
};

export default CustomLocalization;

// Styles for the component
// Bileşen için stil tanımları
const styles = StyleSheet.create({
  parent: {
    flex: 1, // Fill available space / Boş alanı doldur
    gap: 12, // Spacing between elements / Bileşenler arası boşluk
    justifyContent: 'center', // Center vertically / Dikey ortala
    alignItems: 'center', // Center horizontally / Yatay ortala
  },
  text: {
    fontSize: 24, // Instruction text size / Açıklama metni boyutu
    textAlign: 'center', // Center text / Metni ortala
    fontWeight: '300', // Light font weight / İnce font ağırlığı
  },
  input: {
    width: '80%', // Input width relative to parent / Ebeveyne göre genişlik
    height: 60, // Input height / Yükseklik
    borderColor: 'black', // Border color / Kenar rengi
    borderWidth: 1, // Border width / Kenar kalınlığı
    borderRadius: 12, // Rounded corners / Yuvarlatılmış köşeler
    padding: 12, // Inner padding / İç boşluk
  },
});
