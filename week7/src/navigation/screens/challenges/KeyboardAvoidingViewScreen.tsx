import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';

/**
 * A simple login screen demonstrating KeyboardAvoidingView
 * Klavye açıldığında input ve butonların görünür kalmasını sağlar
 */
const KeyboardAvoidingViewScreen: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    // Show alert instead of console log
    Alert.alert('Login', `Username: ${username}\nPassword: ${password}`);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 40}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.placeholder}>
            <Text style={styles.title}>Welcome to MyApp</Text>
          </View>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
          </View>
          <View style={styles.placeholder}>
            <Text>Some extra info or links here...</Text>
          </View>
          <View style={styles.placeholder}>
            <Text>Footer content to test scrolling.</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default KeyboardAvoidingViewScreen;

const styles = StyleSheet.create({
  safe: {flex: 1},
  container: {flex: 1},
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  form: {
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 4,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  placeholder: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
