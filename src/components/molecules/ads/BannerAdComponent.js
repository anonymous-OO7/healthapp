/**
 * BannerAdComponent
 *
 * A reusable banner ad component with proper error handling
 * and loading states.
 */

import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { AdConfig } from '../../../utils/AdConfig';

const BannerAdComponent = ({
  size = BannerAdSize.ANCHORED_ADAPTIVE_BANNER,
  containerStyle,
}) => {
  const [isAdLoaded, setIsAdLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleAdLoaded = useCallback(() => {
    console.log('[BannerAd] Ad loaded successfully');
    setIsAdLoaded(true);
    setHasError(false);
  }, []);

  const handleAdFailed = useCallback(error => {
    console.error('[BannerAd] Ad failed to load:', error);
    setIsAdLoaded(false);
    setHasError(true);
  }, []);

  const handleAdOpened = useCallback(() => {
    console.log('[BannerAd] Ad opened');
  }, []);

  const handleAdClosed = useCallback(() => {
    console.log('[BannerAd] Ad closed');
  }, []);

  // Don't render anything if there's an error
  if (hasError) {
    return null;
  }

  return (
    <View
      style={[
        styles.container,
        containerStyle,
        // Hide container when ad is not loaded
        !isAdLoaded && styles.hidden,
      ]}
    >
      <BannerAd
        unitId={AdConfig.BANNER_AD_UNIT_ID}
        size={size}
        requestOptions={AdConfig.AD_REQUEST_CONFIG}
        onAdLoaded={handleAdLoaded}
        onAdFailedToLoad={handleAdFailed}
        onAdOpened={handleAdOpened}
        onAdClosed={handleAdClosed}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
  },
  hidden: {
    opacity: 0,
    height: 0,
    overflow: 'hidden',
    // Alternatively, use absolute positioning to remove from layout
    position: 'absolute',
    width: 0,
  },
});

export default BannerAdComponent;
