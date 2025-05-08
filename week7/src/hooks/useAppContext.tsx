import {useContext, useState} from 'react';
import AppContext, {GlobalState} from '../context/appContext';
import {LocalizationState} from '../types/localization';

/**
 * Custom hook to access and update global application state
 * Global state'i okumak ve güncellemek için özel hook
 */
export default function useAppContext() {
  // Retrieve the initial global state from AppContext
  // AppContext'ten başlangıç state'ini al
  const globalState = useContext(AppContext);

  // If context is not provided, throw an error
  // Context tanımlı değilse hata fırlat
  if (!globalState) {
    throw Error('AppContext not provided');
  }

  // Manage a local copy of global state
  // Global state'in bir kopyasını local state ile yönet
  const [state, setState] = useState<GlobalState>(globalState);

  // Getter for current state
  // Mevcut state'i okuma
  const get = state;

  // Setter function to update state
  // State'i güncelleme fonksiyonu
  const set = setState;

  /**
   * Change the application's language in global state
   * Uygulama dilini global state içinde değiştir
   * @param lang New language selection / Yeni dil seçimi
   */
  const changeLanguage = (lang: LocalizationState) =>
    setState(prev => ({
      ...prev,
      localizationState: lang, // Update localization part of state
    }));

  // Return state and handlers for use in components
  // Bileşenlerde kullanmak üzere state ve fonksiyonları döndür
  return {
    get,
    set,
    changeLanguage,
  };
}
