import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import ChallengeButton from '../../components/ChallengeButton';
import AppContext, {GlobalState} from '../../context/appContext';
import {useNavigation} from '@react-navigation/native';
import {LocalizationState} from '../../types/localization';

import {StorageKeys} from '../../types/data';
import { asyncStorage } from '../../data/storage/asyncStorage';

const HomeView = () => {
  const {t} = useTranslation();
  const nav = useNavigation();
  return (
    <View style={styles.parent}>
      <Text>{t('hello.world')}</Text>
      <ChallengeButton
        title={t('home.challenges.buttons.customLocalization')}
        onPress={() => nav.navigate('CustomLocalization')}
      />
      <ChallengeButton
        title={t('home.challenges.buttons.listUserData')}
        onPress={() => nav.navigate('ListUserData')}
      />
    </View>
  );
};

const Home = () => {
  const initState: GlobalState = {};
  const {i18n} = useTranslation();

  // get local saved language
  useEffect(() => {
    asyncStorage
      .get<LocalizationState>({key: StorageKeys.language})
      .then(value => {
        //
        // value not null
        if (value !== undefined) {
          initState.localizationState = value;
          i18n.changeLanguage(value.lang);
        }
        // set data
        else {
          asyncStorage.set({key: StorageKeys.language, value: i18n.language});
        }
      })
      .catch(err => console.error(err));
  }, [initState, i18n]);

  return (
    <AppContext value={initState}>
      <HomeView />
    </AppContext>
  );
};

export default Home;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
