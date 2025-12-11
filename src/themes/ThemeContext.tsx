import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
} from 'react';
import {
  useColorScheme,
  Appearance,
  ActivityIndicator,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeMode } from './types';
import { lightTheme, darkTheme, defaultTheme } from './themes';

const THEME_STORAGE_KEY = '@app_theme_mode';

interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  isDark: boolean;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  colors: Theme['colors'];
  spacing: Theme['spacing'];
  fonts: Theme['fonts'];
  fontSizes: Theme['fontSizes'];
  borderRadius: Theme['borderRadius'];
}

// Create context with default values to prevent undefined errors
export const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  themeMode: 'system',
  isDark: false,
  setThemeMode: () => {},
  toggleTheme: () => {},
  colors: defaultTheme.colors,
  spacing: defaultTheme.spacing,
  fonts: defaultTheme.fonts,
  fontSizes: defaultTheme.fontSizes,
  borderRadius: defaultTheme.borderRadius,
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [isLoading, setIsLoading] = useState(true);

  // Load saved theme mode from storage
  useEffect(() => {
    const loadThemeMode = async () => {
      try {
        const savedMode = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedMode && ['light', 'dark', 'system'].includes(savedMode)) {
          setThemeModeState(savedMode as ThemeMode);
        }
      } catch (error) {
        console.error('Error loading theme mode:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadThemeMode();
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (themeMode === 'system') {
        setThemeModeState('system');
      }
    });

    return () => subscription.remove();
  }, [themeMode]);

  // Determine if dark mode should be active
  const isDark = useMemo(() => {
    if (themeMode === 'system') {
      return systemColorScheme === 'dark';
    }
    return themeMode === 'dark';
  }, [themeMode, systemColorScheme]);

  // Get current theme based on mode
  const theme = useMemo(() => {
    return isDark ? darkTheme : lightTheme;
  }, [isDark]);

  // Save and set theme mode
  const setThemeMode = useCallback(async (mode: ThemeMode) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
      setThemeModeState(mode);
    } catch (error) {
      console.error('Error saving theme mode:', error);
    }
  }, []);

  // Toggle between light and dark
  const toggleTheme = useCallback(() => {
    const newMode = isDark ? 'light' : 'dark';
    setThemeMode(newMode);
  }, [isDark, setThemeMode]);

  const contextValue = useMemo(
    () => ({
      theme,
      themeMode,
      isDark,
      setThemeMode,
      toggleTheme,
      colors: theme.colors,
      spacing: theme.spacing,
      fonts: theme.fonts,
      fontSizes: theme.fontSizes,
      borderRadius: theme.borderRadius,
    }),
    [theme, themeMode, isDark, setThemeMode, toggleTheme],
  );

  // Show loading screen while loading theme
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: defaultTheme.colors.background,
        }}
      >
        <ActivityIndicator size="large" color={defaultTheme.colors.primary} />
      </View>
    );
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
