/**
 * Google AdMob Configuration
 */

import { Platform } from 'react-native';
import { TestIds } from 'react-native-google-mobile-ads';

const PRODUCTION_IDS = {
  ANDROID: {
    BANNER: 'ca-app-pub-2888315269414105/9070447874',
    INTERSTITIAL: 'ca-app-pub-2888315269414105/6936250229',
    REWARDED: 'ca-app-pub-2888315269414105/6936250229',
    NATIVE: 'ca-app-pub-XXXXXXXXXXXXXXXX/DDDDDDDDDD',
    APP_OPEN: 'ca-app-pub-XXXXXXXXXXXXXXXX/EEEEEEEEEE',
  },
  IOS: {
    BANNER: 'ca-app-pub-2888315269414105/9070447874',
    INTERSTITIAL: 'ca-app-pub-2888315269414105/6936250229',
    REWARDED: 'ca-app-pub-2888315269414105/6936250229',
    NATIVE: 'ca-app-pub-XXXXXXXXXXXXXXXX/IIIIIIIIII',
    APP_OPEN: 'ca-app-pub-XXXXXXXXXXXXXXXX/JJJJJJJJJJ',
  },
};

const TEST_IDS = {
  BANNER: TestIds.BANNER,
  INTERSTITIAL: TestIds.INTERSTITIAL,
  REWARDED: TestIds.REWARDED,
  NATIVE: TestIds.NATIVE,
  APP_OPEN: TestIds.APP_OPEN,
};

const getAdUnitId = adType => {
  if (__DEV__) {
    console.log(`[AdConfig] Using TEST ID for ${adType}`);
    return TEST_IDS[adType];
  }

  console.log(`[AdConfig] Using PRODUCTION ID for ${adType}`);
  const platformIds =
    Platform.OS === 'ios' ? PRODUCTION_IDS.IOS : PRODUCTION_IDS.ANDROID;

  return platformIds[adType];
};

export const AdConfig = {
  BANNER_AD_UNIT_ID: getAdUnitId('BANNER'),
  INTERSTITIAL_AD_UNIT_ID: getAdUnitId('INTERSTITIAL'),
  REWARDED_AD_UNIT_ID: getAdUnitId('REWARDED'),
  NATIVE_AD_UNIT_ID: getAdUnitId('NATIVE'),
  APP_OPEN_AD_UNIT_ID: getAdUnitId('APP_OPEN'),

  AD_REQUEST_CONFIG: {
    requestNonPersonalizedAdsOnly: false,
    keywords: ['food', 'recipes', 'cooking', 'kitchen'],
  },

  INTERSTITIAL_FREQUENCY: {
    MIN_INTERVAL_MS: 30000,
    MAX_PER_SESSION: 20,
    CLICKS_BEFORE_FIRST_AD: 3,
  },

  BANNER_CONFIG: {
    REFRESH_INTERVAL: 30000,
  },

  IS_DEVELOPMENT: __DEV__,
};

export default AdConfig;
