import {StorageData} from '../../types/data';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Save a value to AsyncStorage under the given key
 * Belirtilen anahtar altında AsyncStorage'a veri kaydeder
 * @param data.key Unique storage key / Depolama anahtarı
 * @param data.value Value to store / Saklanacak değer
 * @returns true if successful / Başarılıysa true döner
 */
async function setData<T>(data: StorageData<T>): Promise<boolean> {
  try {
    // Serialize value to JSON and store
    // Değeri JSON formatına çevir ve kaydet
    await AsyncStorage.setItem(data.key, JSON.stringify(data.value));
    return true;
  } catch (error) {
    // Propagate error / Hata fırlatılır
    throw error;
  }
}

/**
 * Retrieve a value from AsyncStorage by key
 * AsyncStorage'dan anahtara göre veri getirir
 * @param data.key Storage key / Depolama anahtarı
 * @returns Parsed value or undefined if not found / Çözülmüş değer veya bulunamazsa undefined
 */
async function getData<T>(data: StorageData<T>): Promise<T | undefined> {
  try {
    // Get JSON string from storage
    // Depolamadan JSON stringini al
    const jsonValue = await AsyncStorage.getItem(data.key);
    // Parse JSON or return undefined
    // JSON'u parse et veya undefined döndür
    return jsonValue != null ? (JSON.parse(jsonValue) as T) : undefined;
  } catch (error) {
    // Propagate error / Hata fırlatılır
    throw error;
  }
}

// Expose set and get functions under asyncStorage namespace
// asyncStorage nesnesi ile set ve get fonksiyonlarını dışa aktar
export const asyncStorage = {
  set: setData,
  get: getData,
};
