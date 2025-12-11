import {
  Theme,
  ThemeSpacing,
  ThemeFonts,
  ThemeFontSizes,
  ThemeBorderRadius,
} from './types';

const spacing: ThemeSpacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

const fonts: ThemeFonts = {
  poppins: {
    thin: 'Poppins-Thin',
    extraLight: 'Poppins-ExtraLight',
    light: 'Poppins-Light',
    regular: 'Poppins-Regular',
    medium: 'Poppins-Medium',
    semiBold: 'Poppins-SemiBold',
    bold: 'Poppins-Bold',
    extraBold: 'Poppins-ExtraBold',
    black: 'Poppins-Black',
    thinItalic: 'Poppins-ThinItalic',
    extraLightItalic: 'Poppins-ExtraLightItalic',
    lightItalic: 'Poppins-LightItalic',
    regularItalic: 'Poppins-Italic',
    mediumItalic: 'Poppins-MediumItalic',
    semiBoldItalic: 'Poppins-SemiBoldItalic',
    boldItalic: 'Poppins-BoldItalic',
    extraBoldItalic: 'Poppins-ExtraBoldItalic',
    blackItalic: 'Poppins-BlackItalic',
  },

  roboto: {
    thin: 'Roboto-Thin',
    light: 'Roboto-Light',
    regular: 'Roboto-Regular',
    medium: 'Roboto-Medium',
    bold: 'Roboto-Bold',
    black: 'Roboto-Black',
    thinItalic: 'Roboto-ThinItalic',
    lightItalic: 'Roboto-LightItalic',
    regularItalic: 'Roboto-Italic',
    mediumItalic: 'Roboto-MediumItalic',
    boldItalic: 'Roboto-BoldItalic',
    blackItalic: 'Roboto-BlackItalic',
  },

  rubik: {
    light: 'Rubik-Light',
    regular: 'Rubik-Regular',
    medium: 'Rubik-Medium',
    semiBold: 'Rubik-SemiBold',
    bold: 'Rubik-Bold',
    extraBold: 'Rubik-ExtraBold',
    black: 'Rubik-Black',
    lightItalic: 'Rubik-LightItalic',
    regularItalic: 'Rubik-Italic',
    mediumItalic: 'Rubik-MediumItalic',
    semiBoldItalic: 'Rubik-SemiBoldItalic',
    boldItalic: 'Rubik-BoldItalic',
    extraBoldItalic: 'Rubik-ExtraBoldItalic',
    blackItalic: 'Rubik-BlackItalic',
  },

  heading: 'Poppins-Bold',
  subheading: 'Poppins-SemiBold',
  body: 'Poppins-Regular',
  bodyBold: 'Poppins-Medium',
  caption: 'Roboto-Regular',
  button: 'Poppins-SemiBold',
  label: 'Roboto-Medium',
};

const fontSizes: ThemeFontSizes = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

const borderRadius: ThemeBorderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

// Light Theme
export const lightTheme: Theme = {
  dark: false,
  colors: {
    // Primary Colors
    primary: '#007FFF',
    secondary: '#fedac5',

    // Background Colors
    background: '#f2f2f2',
    surface: '#ffffff',
    card: '#ffffff',

    // Text Colors
    text: '#333333',
    textSecondary: '#666666',
    textTertiary: '#999999',
    textInverse: '#ffffff',
    textDisabled: '#B2B7C6',

    // Border & Divider
    border: '#E5E5E5',
    divider: '#EEEFF3',

    // Status Colors
    error: '#dc143c',
    success: '#228b22',
    warning: '#F55A00',
    info: '#128FAE',

    // Base Colors
    white: '#ffffff',
    black: '#1F222B',
    orange: '#F55A00',
    fadeOrange: '#FBB891',
    blueShade: '#128FAE',
    lightGrey: '#B2B7C6',
    superLight: '#F7F8FC',
    darkGrey: '#D8DAE4',
    grey: '#908e8c',

    buttonPrimary: '#007FFF',
    buttonSecondary: '#fedac5',
    buttonDisabled: '#D8DAE4',
    buttonText: '#ffffff',
    buttonTextDisabled: '#999999',
    buttonOutline: '#007FFF',
    buttonOutlineText: '#007FFF',
    buttonDanger: '#dc143c',
    buttonSuccess: '#228b22',

    // Chip Colors
    chipBackground: '#E1E3E9',
    chipBackgroundSelected: '#3498db',
    chipBackgroundDisabled: '#F7F8FC',
    chipText: '#333333',
    chipTextSelected: '#ffffff',
    chipTextDisabled: '#B2B7C6',
    chipBorder: '#E1E3E9',
    chipBorderSelected: '#3498db',
    chipIcon: '#666666',
    chipIconSelected: '#ffffff',

    // Disabled State
    disabled: '#D8DAE4',
    disabledText: '#999999',

    inputBackground: '#F7F8FC',
    inputBorder: '#E1E3E9',
    inputBorderFocused: '#007FFF',
    inputText: '#333333',
    inputPlaceholder: '#B2B7C6',
    inputError: '#dc143c',
    inputDisabled: '#E5E5E5',

    // Header Colors
    headerBackground: '#ffffff',
    headerText: '#333333',
    headerIcon: '#333333',

    // Tab Bar Colors
    tabBarBackground: '#ffffff',
    tabBarActive: '#007FFF',
    tabBarInactive: '#B2B7C6',

    // Other UI Elements
    badge: '#E1E3E9',
    badgeText: '#333333',
    sliderUnselect: '#EEEFF3',
    sliderSelect: '#007FFF',
    notificationText: '#70737C',
    slatebackground: '#7b68ee',
    nonveg: '#dc143c',
    veg: '#228b22',

    // Shadow
    shadow: '#000000',
    shadowColor: '#000000',

    // Status Bar
    statusBar: 'dark-content',

    // Link Colors
    link: '#007FFF',
    linkPressed: '#2980b9',

    // Miscellaneous
    regular: '#333333',
    overlay: 'rgba(0, 0, 0, 0.5)',
    ripple: 'rgba(52, 152, 219, 0.2)',
  },
  spacing,
  fonts,
  fontSizes,
  borderRadius,
};

// Dark Theme
export const darkTheme: Theme = {
  dark: true,
  colors: {
    // Primary Colors
    primary: '#5dade2',
    secondary: '#fedac5',

    // Background Colors
    background: '#121212',
    surface: '#1E1E1E',
    card: '#2C2C2C',

    // Text Colors
    text: '#FFFFFF',
    textSecondary: '#B3B3B3',
    textTertiary: '#808080',
    textInverse: '#121212',
    textDisabled: '#666666',

    // Border & Divider
    border: '#404040',
    divider: '#333333',

    // Status Colors
    error: '#ff6b6b',
    success: '#51cf66',
    warning: '#ffc078',
    info: '#74c0fc',

    // Base Colors
    white: '#ffffff',
    black: '#000000',
    orange: '#ffc078',
    fadeOrange: '#FBB891',
    blueShade: '#74c0fc',
    lightGrey: '#666666',
    superLight: '#2C2C2C',
    darkGrey: '#404040',
    grey: '#666666',

    // Button Colors
    buttonPrimary: '#5dade2',
    buttonSecondary: '#fedac5',
    buttonDisabled: '#404040',
    buttonText: '#ffffff',
    buttonTextDisabled: '#666666',
    buttonOutline: '#5dade2',
    buttonOutlineText: '#5dade2',
    buttonDanger: '#ff6b6b',
    buttonSuccess: '#51cf66',

    chipBackground: '#2C2C2C',
    chipBackgroundSelected: '#5dade2',
    chipBackgroundDisabled: '#1E1E1E',
    chipText: '#FFFFFF',
    chipTextSelected: '#121212',
    chipTextDisabled: '#666666',
    chipBorder: '#404040',
    chipBorderSelected: '#5dade2',
    chipIcon: '#B3B3B3',
    chipIconSelected: '#121212',

    // Disabled State
    disabled: '#404040',
    disabledText: '#666666',

    // Input Colors
    inputBackground: '#2C2C2C',
    inputBorder: '#404040',
    inputBorderFocused: '#5dade2',
    inputText: '#FFFFFF',
    inputPlaceholder: '#808080',
    inputError: '#ff6b6b',
    inputDisabled: '#333333',

    // Header Colors
    headerBackground: '#1E1E1E',
    headerText: '#FFFFFF',
    headerIcon: '#FFFFFF',

    // Tab Bar Colors
    tabBarBackground: '#1E1E1E',
    tabBarActive: '#5dade2',
    tabBarInactive: '#666666',

    // Other UI Elements
    badge: '#404040',
    badgeText: '#FFFFFF',
    sliderUnselect: '#333333',
    sliderSelect: '#5dade2',
    notificationText: '#B3B3B3',
    slatebackground: '#9370db',
    nonveg: '#ff6b6b',
    veg: '#51cf66',

    // Shadow
    shadow: '#000000',
    shadowColor: '#000000',

    // Status Bar
    statusBar: 'light-content',

    // Link Colors
    link: '#5dade2',
    linkPressed: '#007FFF',

    // Miscellaneous
    regular: '#FFFFFF',
    overlay: 'rgba(0, 0, 0, 0.7)',
    ripple: 'rgba(93, 173, 226, 0.2)',
  },
  spacing,
  fonts,
  fontSizes,
  borderRadius,
};

// Default theme (used as fallback)
export const defaultTheme = lightTheme;
