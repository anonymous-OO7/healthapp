// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import translations directly
import enCommon from './locales/en/common.json';
import enRecipes from './locales/en/recipes.json';
import enCategories from './locales/en/categories.json';

import hiCommon from './locales/hi/common.json';
import hiRecipes from './locales/hi/recipes.json';
import hiCategories from './locales/hi/categories.json';

const LANGUAGE_KEY = '@app_language';

// Combine all translations
const resources = {
  en: {
    translation: {
      ...enCommon,
      recipes: enRecipes,
      categories: enCategories,
    },
  },
  hi: {
    translation: {
      ...hiCommon,
      recipes: hiRecipes,
      categories: hiCategories,
    },
  },
};

// Language detector
const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async callback => {
    try {
      const savedLang = await AsyncStorage.getItem(LANGUAGE_KEY);
      console.log('Detected language:', savedLang || 'en');
      callback(savedLang || 'en');
    } catch (error) {
      console.log('Language detection error:', error);
      callback('en');
    }
  },
  init: () => {},
  cacheUserLanguage: async language => {
    try {
      await AsyncStorage.setItem(LANGUAGE_KEY, language);
    } catch (error) {
      console.log('Error saving language:', error);
    }
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3', // ⚠️ Required for Android
    resources,
    fallbackLng: 'en',
    debug: __DEV__, // Enable debug in development
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

// Log to verify initialization
console.log('i18n initialized with languages:', Object.keys(resources));
console.log('Current language:', i18n.language);

export default i18n;
