/**
 * Google AdMob Configuration
 *
 * IMPORTANT: Replace test IDs with your actual AdMob IDs before production release.
 * Test IDs are provided by Google for development purposes.
 *
 * @see https://developers.google.com/admob/android/test-ads
 * @see https://developers.google.com/admob/ios/test-ads
 */

import { Platform } from 'react-native';
import { TestIds } from 'react-native-google-mobile-ads';

// Environment check
const __DEV__ = process.env.NODE_ENV === 'development';

// Your actual AdMob IDs (replace these with your real IDs)
const PRODUCTION_IDS = {
  ANDROID: {
    APP_ID: 'ca-app-pub-2888315269414105/6936250229',
    BANNER: 'ca-app-pub-2888315269414105/9070447874',
    INTERSTITIAL: 'ca-app-pub-XXXXXXXXXXXXXXXX/BBBBBBBBBB',
    REWARDED: 'ca-app-pub-2888315269414105/6936250229',
    NATIVE: 'ca-app-pub-XXXXXXXXXXXXXXXX/DDDDDDDDDD',
    APP_OPEN: 'ca-app-pub-XXXXXXXXXXXXXXXX/EEEEEEEEEE',
  },
  IOS: {
    APP_ID: 'ca-app-pub-XXXXXXXXXXXXXXXX~ZZZZZZZZZZ',
    BANNER: 'ca-app-pub-2888315269414105/9070447874',
    INTERSTITIAL: 'ca-app-pub-XXXXXXXXXXXXXXXX/GGGGGGGGGG',
    REWARDED: 'ca-app-pub-2888315269414105/6936250229',
    NATIVE: 'ca-app-pub-XXXXXXXXXXXXXXXX/IIIIIIIIII',
    APP_OPEN: 'ca-app-pub-XXXXXXXXXXXXXXXX/JJJJJJJJJJ',
  },
};

// Test Ad Unit IDs (provided by Google)
const TEST_IDS = {
  BANNER: TestIds.BANNER,
  INTERSTITIAL: TestIds.INTERSTITIAL,
  REWARDED: TestIds.REWARDED,
  NATIVE: TestIds.NATIVE,
  APP_OPEN: TestIds.APP_OPEN,
};

/**
 * Get the appropriate ad unit ID based on platform and environment
 */
const getAdUnitId = adType => {
  if (__DEV__) {
    return TEST_IDS[adType];
  }

  const platformIds =
    Platform.OS === 'ios' ? PRODUCTION_IDS.IOS : PRODUCTION_IDS.ANDROID;

  return platformIds[adType];
};

export const AdConfig = {
  // Ad Unit IDs
  BANNER_AD_UNIT_ID: getAdUnitId('BANNER'),
  INTERSTITIAL_AD_UNIT_ID: getAdUnitId('INTERSTITIAL'),
  REWARDED_AD_UNIT_ID: getAdUnitId('REWARDED'),
  NATIVE_AD_UNIT_ID: getAdUnitId('NATIVE'),
  APP_OPEN_AD_UNIT_ID: getAdUnitId('APP_OPEN'),

  // Ad Configuration
  AD_REQUEST_CONFIG: {
    requestNonPersonalizedAdsOnly: false, // Set to true for GDPR compliance if needed
    keywords: ['food', 'recipes', 'cooking', 'kitchen'],
  },

  // Frequency Capping (to comply with AdMob policies)
  INTERSTITIAL_FREQUENCY: {
    MIN_INTERVAL_MS: 30000,
    MAX_PER_SESSION: 20, // Maximum 5 interstitials per session
    CLICKS_BEFORE_FIRST_AD: 3, // Show first ad after 3 recipe clicks
  },

  // Banner Configuration
  BANNER_CONFIG: {
    REFRESH_INTERVAL: 30000, // Refresh every 30 seconds (minimum allowed)
  },

  // Development mode
  IS_DEVELOPMENT: __DEV__,
};

export default AdConfig;
