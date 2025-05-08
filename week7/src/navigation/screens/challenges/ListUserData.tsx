import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';

// Define user type based on API response
// API yanıtına göre kullanıcı tipini tanımla
type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

// Screen component to list users from API
// API'den kullanıcı listesini çeken ve listeleyen ekran bileşeni
const ListUserData: React.FC = () => {
  // State for users, loading and error
  // Kullanıcı listesi, yüklenme ve hata durumları
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch users from API using Axios
  // Axios ile API'den kullanıcıları çekme fonksiyonu
  const fetchUsers = async (): Promise<void> => {
    console.log('🔄 fetchUsers started');
    setLoading(true);
    setError(null);
    try {
      // Perform GET request via HTTPS to comply with iOS ATS
      const response = await axios.get<User[]>(
        'https://jsonplaceholder.typicode.com/users',
      );
      console.log('✅ Response:', response.data);
      setUsers(response.data);
    } catch (err: any) {
      // Handle timeout or general errors
      if (err.code === 'ECONNABORTED') {
        console.log('⏱️ Axios timeout');
        setError('Request timed out');
      } else {
        console.log('❌ Axios error:', err);
        setError('Failed to load users');
      }
    } finally {
      setLoading(false);
      console.log('🔄 fetchUsers ended');
    }
  };

  // Fetch users once on component mount
  // Bileşen ilk yüklendiğinde bir kez kullanıcıları çek
  useEffect(() => {
    console.log('🟢 ListUserData mounted');
    fetchUsers();
  }, []);

  async function testFetch() {
    try {
      const res = await fetch('https://104.21.64.1/users');
      console.log('Fetch ok:', await res.json());
    } catch (e) {
      console.log('Fetch error:', e);
    }
  }

  // Render single user item
  // Tek kullanıcı öğesini render et
  const renderItem = ({item}: {item: User}) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.username}>@{item.username}</Text>
      <Text style={styles.email}>{item.email}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Loading indicator / Yükleniyor göstergesi */}
      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {/* Error message / Hata mesajı */}
      {error && <Text style={styles.error}>{error}</Text>}

      {/* User list */}
      {!loading && !error && (
        <FlatList
          data={users}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </SafeAreaView>
  );
};

export default ListUserData;

// Styles for the screen
// Ekran için stil tanımları
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 14,
    color: 'gray',
  },
  email: {
    fontSize: 14,
  },
  error: {
    color: 'red',
    marginVertical: 8,
    textAlign: 'center',
  },
});
