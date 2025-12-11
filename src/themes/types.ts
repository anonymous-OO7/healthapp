export interface ThemeColors {
  // Primary Colors
  primary: string;
  secondary: string;

  // Background Colors
  background: string;
  surface: string;
  card: string;

  // Text Colors
  text: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;
  textDisabled: string;

  // Border & Divider
  border: string;
  divider: string;

  // Status Colors
  error: string;
  success: string;
  warning: string;
  info: string;

  // Base Colors
  white: string;
  black: string;
  orange: string;
  fadeOrange: string;
  blueShade: string;
  lightGrey: string;
  superLight: string;
  darkGrey: string;
  grey: string;

  // Button Colors
  buttonPrimary: string;
  buttonSecondary: string;
  buttonDisabled: string;
  buttonText: string;
  buttonTextDisabled: string;
  buttonOutline: string;
  buttonOutlineText: string;
  buttonDanger: string;
  buttonSuccess: string;

  chipBackground: string;
  chipBackgroundSelected: string;
  chipBackgroundDisabled: string;
  chipText: string;
  chipTextSelected: string;
  chipTextDisabled: string;
  chipBorder: string;
  chipBorderSelected: string;
  chipIcon: string;
  chipIconSelected: string;

  // Disabled State
  disabled: string;
  disabledText: string;

  // Input Colors
  inputBackground: string;
  inputBorder: string;
  inputBorderFocused: string;
  inputText: string;
  inputPlaceholder: string;
  inputError: string;
  inputDisabled: string;

  // Header Colors
  headerBackground: string;
  headerText: string;
  headerIcon: string;

  // Tab Bar Colors
  tabBarBackground: string;
  tabBarActive: string;
  tabBarInactive: string;

  // Other UI Elements
  badge: string;
  badgeText: string;
  sliderUnselect: string;
  sliderSelect: string;
  notificationText: string;
  slatebackground: string;
  nonveg: string;
  veg: string;

  // Shadow
  shadow: string;
  shadowColor: string;

  // Status Bar
  statusBar: 'dark-content' | 'light-content';

  // Link Colors
  link: string;
  linkPressed: string;

  // Miscellaneous
  regular: string;
  overlay: string;
  ripple: string;
}

export interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export interface ThemeFonts {
  poppins: {
    thin: string;
    extraLight: string;
    light: string;
    regular: string;
    medium: string;
    semiBold: string;
    bold: string;
    extraBold: string;
    black: string;
    thinItalic: string;
    extraLightItalic: string;
    lightItalic: string;
    regularItalic: string;
    mediumItalic: string;
    semiBoldItalic: string;
    boldItalic: string;
    extraBoldItalic: string;
    blackItalic: string;
  };
  roboto: {
    thin: string;
    light: string;
    regular: string;
    medium: string;
    bold: string;
    black: string;
    thinItalic: string;
    lightItalic: string;
    regularItalic: string;
    mediumItalic: string;
    boldItalic: string;
    blackItalic: string;
  };
  rubik: {
    light: string;
    regular: string;
    medium: string;
    semiBold: string;
    bold: string;
    extraBold: string;
    black: string;
    lightItalic: string;
    regularItalic: string;
    mediumItalic: string;
    semiBoldItalic: string;
    boldItalic: string;
    extraBoldItalic: string;
    blackItalic: string;
  };
  heading: string;
  subheading: string;
  body: string;
  bodyBold: string;
  caption: string;
  button: string;
  label: string;
}

export interface ThemeFontSizes {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  xxxl: number;
}

export interface ThemeBorderRadius {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  full: number;
}

export interface Theme {
  dark: boolean;
  colors: ThemeColors;
  spacing: ThemeSpacing;
  fonts: ThemeFonts;
  fontSizes: ThemeFontSizes;
  borderRadius: ThemeBorderRadius;
}
