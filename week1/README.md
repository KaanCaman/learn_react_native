# 📱 React Native: Giriş ve Mimari

## React Native Nedir?

React Native, JavaScript ve React kullanarak hem iOS hem de Android için mobil uygulamalar geliştirmenizi sağlayan açık kaynaklı bir frameworktür. Tek bir kod tabanı ile platformlar arası geliştirme yaparak süreci hızlandırır.

### 🚀 Neden React Native?

- **Çapraz Platform**: Tek kod tabanı ile iOS ve Android desteği.
- **Performans**: Yerel bileşenler sayesinde hızlı ve verimli.
- **Hot Reloading**: Gerçek zamanlı değişiklikleri anında görme.
- **Güçlü Topluluk**: Geniş kütüphane ve araç desteği.
- **Maliyet Verimliliği**: Ayrı geliştirme ekiplerine olan ihtiyacı azaltır.

### 🔗 Mimari: Bridge Architecture

React Native, JavaScript kodu ile yerel kod arasında bir "köprü" kullanarak iletişimi sağlar.

- **JavaScript Thread**: Uygulama mantığını işler.
- **Native Thread**: Cihaz özelliklerine erişir.
- **Bridge**: JavaScript ile yerel kod arasında veri aktarımını sağlar.
- **UI Thread**: Kullanıcı arayüzünü render eder.

### ⚙️ Mimari: Bridgeless Architecture 🔥

- Yeni React Native sürümleri, JSI (JavaScript Interface) kullanarak köprüyü ortadan kaldırıyor. Bu, JavaScript ile native kod arasındaki iletişimi hızlandırarak performansı artırıyor.

### 🛠️ Kurulum ve daha fazla bilgi için

- [React Native](https://reactnative.dev/)

---

## React Native: Introduction & Architecture

### 📌 What is React Native?

React Native is an open-source framework that allows you to develop mobile apps for both iOS and Android using JavaScript and React. It enables cross-platform development with a single codebase, making the process faster and more efficient.

### 🚀 Why Use React Native?

- **Cross-Platform**: One codebase for iOS & Android.
- **Performance**: Uses native components for high speed.
- **Hot Reloading**: See real-time updates instantly.
- **Strong Community**: Access to vast libraries and tools.
- **Cost Efficiency**: Reduces the need for separate development teams.

### 🔗 Architecture: Bridge Architecture

React Native connects JavaScript code with native platform code via a "bridge."

- **JavaScript Thread**: Handles app logic.
- **Native Thread**: Manages device-specific functions.
- **Bridge**: Enables communication between JS and native code.
- **UI Thread**: Renders the user interface.

### ⚙️ Architecture: Bridgeless Architecture 🔥

- New versions use JSI (JavaScript Interface) to eliminate the bridge, improving communication speed and app performance.

### 🛠️ For installation and more information

- [React Native](https://reactnative.dev/)
