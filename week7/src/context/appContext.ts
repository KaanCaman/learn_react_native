import {createContext} from 'react';
import {LocalizationState} from '../types/localization';

// Define the shape of the global app state
// Uygulamanın genel state yapısını tanımlar
export interface GlobalState {
  localizationState?: LocalizationState; // Holds current localization settings / Mevcut dil ayarlarını tutar
}

// Create a React context for the global state with an empty default value
// Global state için React context oluşturulur, varsayılan değer boş
const AppContext = createContext<GlobalState>({});

export default AppContext; // Export context for usage in provider and consumers
// Provider ve consumer bileşenlerinde kullanmak üzere context dışa aktarılır
