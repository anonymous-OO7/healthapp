import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { defaultTheme } from './themes';

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    console.warn(
      'useTheme must be used within a ThemeProvider. Using default theme.',
    );
    return {
      theme: defaultTheme,
      themeMode: 'system' as const,
      isDark: false,
      setThemeMode: () => {},
      toggleTheme: () => {},
      colors: defaultTheme.colors,
      spacing: defaultTheme.spacing,
      fonts: defaultTheme.fonts,
      fontSizes: defaultTheme.fontSizes,
      borderRadius: defaultTheme.borderRadius,
    };
  }

  return context;
};

export const useColors = () => {
  const { colors } = useTheme();
  return colors;
};

export const useSpacing = () => {
  const { spacing } = useTheme();
  return spacing;
};

export const useFonts = () => {
  const { fonts } = useTheme();
  return fonts;
};

export const useIsDark = () => {
  const { isDark } = useTheme();
  return isDark;
};
