// src/components/LanguageSwitcher.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const languages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  // Add more languages as needed
  // { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  // { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  // { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  // { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
];

const LanguageSwitcher = ({ onClose }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = async langCode => {
    await i18n.changeLanguage(langCode);
    if (onClose) {
      onClose();
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{t('settings.selectLanguage')}</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Current Language */}
      <View style={styles.currentLangContainer}>
        <Text style={styles.currentLangLabel}>
          {t('settings.currentLanguage')}:
        </Text>
        <Text style={styles.currentLangValue}>
          {languages.find(l => l.code === i18n.language)?.nativeName ||
            'English'}
        </Text>
      </View>

      {/* Language List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {languages.map(lang => {
          const isSelected = i18n.language === lang.code;
          return (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.languageItem,
                isSelected && styles.selectedLanguage,
              ]}
              onPress={() => changeLanguage(lang.code)}
              activeOpacity={0.7}
            >
              <Text style={styles.flag}>{lang.flag}</Text>
              <View style={styles.languageInfo}>
                <Text
                  style={[
                    styles.languageNativeName,
                    isSelected && styles.selectedText,
                  ]}
                >
                  {lang.nativeName}
                </Text>
                <Text style={styles.languageEnglishName}>{lang.name}</Text>
              </View>
              {isSelected && (
                <View style={styles.checkmarkContainer}>
                  <Text style={styles.checkmark}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: responsiveWidth(5),
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
  },

  title: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: '700',
    color: '#000',
  },

  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeButtonText: {
    fontSize: responsiveFontSize(2),
    color: '#666',
  },

  currentLangContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    padding: 12,
    borderRadius: 10,
    marginBottom: responsiveHeight(2),
  },

  currentLangLabel: {
    fontSize: responsiveFontSize(1.6),
    color: '#666',
  },

  currentLangValue: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '600',
    color: '#FF6B35',
    marginLeft: 8,
  },

  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: '#F5F5F5',
  },

  selectedLanguage: {
    backgroundColor: '#FFF3EE',
    borderWidth: 2,
    borderColor: '#FF6B35',
  },

  flag: {
    fontSize: responsiveFontSize(3),
    marginRight: 15,
  },

  languageInfo: {
    flex: 1,
  },

  languageNativeName: {
    fontSize: responsiveFontSize(2),
    fontWeight: '600',
    color: '#000',
  },

  selectedText: {
    color: '#FF6B35',
  },

  languageEnglishName: {
    fontSize: responsiveFontSize(1.5),
    color: '#888',
    marginTop: 2,
  },

  checkmarkContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkmark: {
    color: '#FFF',
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold',
  },
});

export default LanguageSwitcher;
