/**
 * Keys used for AsyncStorage operations
 * AsyncStorage işlemlerinde kullanılan anahtarlar
 */
export enum StorageKeys {
  language = 'LANGUAGE', // Key for storing the selected language / Seçilen dili saklamak için anahtar
}

/**
 * Generic interface representing data stored in AsyncStorage
 * AsyncStorage'da saklanan veri yapısını tanımlayan genel arayüz
 * @template T Type of the stored value / Saklanan değerin tipi
 */
export interface StorageData<T> {
  key: StorageKeys; // Storage key defining where to save the data / Verinin kaydedileceği anahtar
  value?: T; // Optional value to store / Saklanacak isteğe bağlı değer
}
