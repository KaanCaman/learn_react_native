// IBANInput.tsx
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, TextInput, Text, StyleSheet, TextInputProps} from 'react-native';

/**
 * Controlled input that accepts only TR IBAN numbers,
 * digits input only, with fixed "TR" prefix, without regex.
 *
 * TR IBAN numaralarını kabul eden kontrollü giriş bileşeni,
 * sadece rakam girişi, sabit "TR" öneki ile, regex kullanmadan.
 */
const IBANInput: React.FC<TextInputProps> = props => {
  // Only store digits after 'TR'
  // 'TR'den sonraki rakamları sakla
  const [digits, setDigits] = useState<string>('');
  const [error, setError] = useState<string>('');

  //
  const {t} = useTranslation();

  // Format the display: "TR" + groups of 4 digits separated by spaces
  // Görüntüyü biçimlendir: "TR" + her 4 rakamdan sonra boşluk
  const formatDisplay = (value: string) => {
    let result = 'TR';

    // Add spaces between groups of 4 digits
    // Her 4 rakam grubunun arasına boşluk ekle
    for (let i = 0; i < value.length; i += 4) {
      const chunk = value.slice(i, i + 4);
      result += ' ' + chunk;
    }

    return result;
  };

  // Validate IBAN length
  // IBAN uzunluğunu doğrula
  const isValidLength = (value: string) => {
    return value.length === 24;
  };

  // Handle input changes
  // Giriş değişikliklerini işle
  const handleChange = (text: string) => {
    // Extract only digits and handle the TR prefix
    // Sadece rakamları çıkar ve TR önekini işle
    let processed = text;

    // Remove TR prefix if present
    // TR öneki varsa kaldır
    if (processed.startsWith('TR')) {
      processed = processed.substring(2);
    }

    // Keep only digits (0-9)
    // Sadece rakamları (0-9) tut
    let onlyDigits = '';
    for (let i = 0; i < processed.length; i++) {
      const char = processed.charAt(i);
      if (char >= '0' && char <= '9') {
        onlyDigits += char;
      }
    }

    // Limit to 24 digits
    // 24 rakamla sınırla
    const limitedDigits = onlyDigits.substring(0, 24);

    // Update state
    // Durumu güncelle
    setDigits(limitedDigits);

    // Validate and update error state
    // Doğrula ve hata durumunu güncelle
    if (limitedDigits.length === 0) {
      // Empty field - no error
      // Boş alan - hata yok
      setError('');
    } else if (limitedDigits.length < 24) {
      // Incomplete IBAN - show error
      // Eksik IBAN - hata göster
      setError(t('IBANInput.missingIBAN'));
    } else {
      // Valid IBAN length - no error
      // Geçerli IBAN uzunluğu - hata yok
      setError('');
    }
  };

  // Validate on blur/submit
  // Alan dışına çıkıldığında/gönderme anında doğrula
  const handleValidate = () => {
    // Don't show errors for empty fields
    // Boş alanlar için hata gösterme
    if (digits.length === 0) {
      setError('');
      return;
    }

    // Validate IBAN length
    // IBAN uzunluğunu doğrula
    if (!isValidLength(digits)) {
      setError(t('IBANInput.invalidIBAN'));
    } else {
      setError('');
    }
  };

  return (
    <View style={styles.parent}>
      <TextInput
        {...props}
        value={formatDisplay(digits)}
        onChangeText={handleChange}
        onBlur={handleValidate}
        onEndEditing={handleValidate}
        onSubmitEditing={handleValidate}
        placeholder="TR 0000 0000 0000 0000 0000 00"
        keyboardType="numeric"
        returnKeyType={'done'}
        returnKeyLabel={t('IBANInput.done')}
        maxLength={32} // TR + 6 spaces + 24 digits (TR + 6 boşluk + 24 rakam)
        style={[styles.input, error ? styles.inputError : null, props.style]}
      />
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default IBANInput;

const styles = StyleSheet.create({
  parent: {
    margin: 8,
  },
  input: {
    width: '95%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
  },
  inputError: {
    borderColor: 'red',
  },
  error: {
    color: 'red',
    marginTop: 4,
    fontSize: 14,
  },
});
