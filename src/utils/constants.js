import { TestIds } from 'react-native-google-mobile-ads';

export const ADS = {
  REWARDED_AD_UNIT_ID: __DEV__
    ? TestIds.REWARDED
    : 'ca-app-pub-2888315269414105/6936250229',

  // For Banner
  BANNER_AD_UNIT_ID: __DEV__
    ? TestIds.BANNER
    : 'ca-app-pub-2888315269414105/9070447874',
};

export const APP = {
  PRIVACY_POLICY_URL: 'https://yourdomain.com/privacy',
};

/**
 * Central Constants Export
 */

export { AdConfig } from './AdConfig';

export const AppConfig = {
  APP_NAME: 'Recipe App',
  VERSION: '1.0.0',
  SUPPORT_EMAIL: 'support@yourapp.com',
};

export const Colors = {
  primary: '#FF6B35',
  secondary: '#2EC4B6',
  background: '#FAFAFA',
  text: '#333333',
  textLight: '#666666',
  white: '#FFFFFF',
  black: '#000000',
  success: '#4CAF50',
  error: '#E53935',
  warning: '#FFC107',
  slatebackground: '#FAFAFA',
};

export const Dimensions = {
  padding: 16,
  margin: 16,
  borderRadius: 12,
};
