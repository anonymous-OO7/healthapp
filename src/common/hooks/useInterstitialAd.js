/**
 * useInterstitialAd Hook
 *
 * Custom hook for managing interstitial ads with navigation
 */

import { useState, useCallback, useEffect } from 'react';
import { AdService } from '../../components/molecules/AdService';

export const useInterstitialAd = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdReady, setIsAdReady] = useState(false);

  useEffect(() => {
    // Check ad ready status periodically
    const checkAdStatus = () => {
      setIsAdReady(AdService.isInterstitialReady());
    };

    checkAdStatus();
    const interval = setInterval(checkAdStatus, 1000);

    return () => clearInterval(interval);
  }, []);

  /**
   * Show interstitial ad and execute callback when done
   * @param {Function} onComplete - Callback to execute after ad (or if skipped)
   */
  const showAdThenNavigate = useCallback(async onComplete => {
    setIsLoading(true);

    try {
      const adShown = await AdService.showInterstitialAd(
        // onAdClosed
        () => {
          setIsLoading(false);
          onComplete?.();
        },
        // onAdFailed
        error => {
          console.log('[useInterstitialAd] Ad failed, proceeding:', error);
          setIsLoading(false);
          onComplete?.();
        },
      );

      // If ad wasn't shown (frequency cap, not loaded, etc.)
      if (!adShown) {
        setIsLoading(false);
        onComplete?.();
      }
    } catch (error) {
      console.error('[useInterstitialAd] Error:', error);
      setIsLoading(false);
      onComplete?.();
    }
  }, []);

  return {
    isLoading,
    isAdReady,
    showAdThenNavigate,
  };
};

export default useInterstitialAd;
