import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StatusBar, StyleSheet } from 'react-native';
import {
  NavigationContainer,
  DefaultTheme as NavDefaultTheme,
  DarkTheme as NavDarkTheme,
} from '@react-navigation/native';
import i18n from './src/i18n';
import { PaperProvider } from 'react-native-paper';

import { AuthProvider } from './src/setup/app-context-manager/Authcontext';
import AppNav from './src/navigation/AppNav';
import { I18nextProvider } from 'react-i18next';
import { CartProvider } from './src/context/CartContext';
import mobileAds from 'react-native-google-mobile-ads';
import { AdService } from './src/components/molecules/AdService';
import { ConsentService } from './src/components/molecules/ConsentService';
import { FitnessContext } from './src/context/Context';
import { ThemeProvider, useTheme } from './src/themes';

const LoadingScreen = () => {
  const { colors } = useTheme();
  return (
    <View
      style={[styles.loadingContainer, { backgroundColor: colors.background }]}
    >
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

const AppContent = () => {
  const { colors, isDark } = useTheme();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await mobileAds().initialize();
        await ConsentService.checkAndRequestConsent();
        await AdService.initialize();
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
    return <LoadingScreen />;
  }

  const MyNavigationTheme = {
    ...(isDark ? NavDarkTheme : NavDefaultTheme),
    colors: {
      ...(isDark ? NavDarkTheme.colors : NavDefaultTheme.colors),
      primary: colors.primary,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
      notification: colors.error,
    },
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.headerBackground}
      />

      <NavigationContainer theme={MyNavigationTheme}>
        <I18nextProvider i18n={i18n}>
          <FitnessContext>
            <CartProvider>
              <AuthProvider>
                <AppNav />
              </AuthProvider>
            </CartProvider>
          </FitnessContext>
        </I18nextProvider>
      </NavigationContainer>
    </View>
  );
};

const App = () => {
  return (
    <PaperProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
