// CustomInjectWebView.tsx
import React, {useState, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

/**
 * WebView injection example with customizable background color
 * Kullanıcının girdiği renge göre WebView sayfa arka planını değiştirir
 */
const CustomInjectWebView: React.FC = () => {
  // State for the applied color and input field
  // Uygulanan renk ve input alanı durumu
  const [color, setColor] = useState<string>('lightblue');
  const [input, setInput] = useState<string>('');

  //
  const {t} = useTranslation();

  // Reference to the WebView to call injectJavaScript
  // WebView referansı, manuel enjeksiyon için
  const webviewRef = useRef<WebView>(null);

  // Script to change the page background color
  // Sayfa arka plan rengini değiştiren JS kodu
  const getScript = (bg: string) => `
    document.body.style.backgroundColor = '${bg}';
  `;

  // Handle Apply button: set new color and inject script
  // Apply butonuna basıldığında yeni rengi state'e ata ve enjeksiyon yap
  const handleApply = () => {
    const bgColor = input.trim() || color;
    setColor(bgColor);
    webviewRef.current?.injectJavaScript(getScript(bgColor));
  };

  return (
    <View style={styles.container}>
      {/* Controls: TextInput and Apply button */}
      {/* Kontroller: Metin girişi ve Uygula butonu */}
      <View style={styles.controls}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder={t('CustomInjectWebView.placeholder')}
          style={styles.input}
        />
        <Button title={t('CustomInjectWebView.apply')} onPress={handleApply} />
      </View>

      {/* WebView with initial injection and dynamic background */}
      {/* WebView, başlangıç enjeksiyonu ve dinamik arka plan rengi */}
      <WebView
        ref={webviewRef}
        source={{uri: 'https://patika.dev'}}
        style={[styles.webview, {backgroundColor: color}]}
        injectedJavaScript={getScript(color)}
      />
    </View>
  );
};

export default CustomInjectWebView;

const styles = StyleSheet.create({
  container: {flex: 1},
  controls: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#f0f0f0',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 8,
    marginRight: 8,
    borderRadius: 4,
  },
  webview: {flex: 1},
});
