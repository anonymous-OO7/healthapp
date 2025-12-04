import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import i18n from './src/i18n';

import { AuthProvider } from './src/setup/app-context-manager/Authcontext';
import AppNav from './src/navigation/AppNav';
import { I18nextProvider } from 'react-i18next';
import { CartProvider } from './src/context/CartContext';
import mobileAds from 'react-native-google-mobile-ads';
import { AdService } from './src/components/molecules/AdService';
import { ConsentService } from './src/components/molecules/ConsentService';
import { Colors } from './src/assets/colors';

const App = () => {
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // 1. Initialize the Google Mobile Ads SDK
        await mobileAds().initialize();
        console.log('[App] Mobile Ads SDK initialized');

        // 2. Check GDPR consent
        await ConsentService.checkAndRequestConsent();
        console.log('[App] Consent checked');

        // 3. Initialize AdService
        await AdService.initialize();
        console.log('[App] AdService initialized');
      } catch (error) {
        console.error('[App] Initialization error:', error);
      } finally {
        setIsInitializing(false);
      }
    };

    initializeApp();

    return () => {
      AdService.destroy();
    };
  }, []);

  if (isInitializing) {
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F5F5F5',
          minHeight: 50,
        }}
      >
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <I18nextProvider i18n={i18n}>
      <CartProvider>
        <AuthProvider>
          <AppNav />
        </AuthProvider>
      </CartProvider>
    </I18nextProvider>
  );
};

export default App;
