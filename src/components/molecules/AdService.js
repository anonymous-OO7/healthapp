/**
 * AdService - Centralized Ad Management
 *
 * This service handles all ad-related operations including:
 * - Loading and showing interstitial ads
 * - Loading and showing rewarded ads
 * - Frequency capping
 * - Error handling
 * - Analytics tracking
 *
 * @module AdService
 */

import {
  InterstitialAd,
  RewardedAd,
  AdEventType,
  RewardedAdEventType,
} from 'react-native-google-mobile-ads';
import { AdConfig } from '../../utils/AdConfig';

class AdServiceClass {
  constructor() {
    this.interstitialAd = null;
    this.rewardedAd = null;
    this.isInterstitialLoaded = false;
    this.isRewardedLoaded = false;
    this.lastInterstitialTime = 0;
    this.interstitialCount = 0;
    this.clickCount = 2;
    this.listeners = [];
    this.isInitialized = false;
  }

  /**
   * Initialize the ad service
   * Should be called once when app starts
   */
  async initialize() {
    if (this.isInitialized) {
      console.log('[AdService] Already initialized');
      return;
    }

    try {
      console.log('[AdService] Initializing...');

      // Load interstitial ad
      this.loadInterstitialAd();

      // Load rewarded ad
      this.loadRewardedAd();

      this.isInitialized = true;
      console.log('[AdService] Initialized successfully');
    } catch (error) {
      console.error('[AdService] Initialization error:', error);
    }
  }

  /**
   * Load Interstitial Ad
   */
  loadInterstitialAd() {
    try {
      // Clean up existing ad
      if (this.interstitialAd) {
        this.listeners.forEach(unsubscribe => unsubscribe());
        this.listeners = [];
      }

      this.interstitialAd = InterstitialAd.createForAdRequest(
        AdConfig.INTERSTITIAL_AD_UNIT_ID,
        AdConfig.AD_REQUEST_CONFIG,
      );

      const unsubscribeLoaded = this.interstitialAd.addAdEventListener(
        AdEventType.LOADED,
        () => {
          console.log('[AdService] Interstitial ad loaded');
          this.isInterstitialLoaded = true;
        },
      );

      const unsubscribeClosed = this.interstitialAd.addAdEventListener(
        AdEventType.CLOSED,
        () => {
          console.log('[AdService] Interstitial ad closed');
          this.isInterstitialLoaded = false;
          // Preload next ad
          this.loadInterstitialAd();
        },
      );

      const unsubscribeError = this.interstitialAd.addAdEventListener(
        AdEventType.ERROR,
        error => {
          console.error('[AdService] Interstitial ad error:', error);
          this.isInterstitialLoaded = false;
          // Retry loading after delay
          // setTimeout(() => this.loadInterstitialAd(), 30000);
        },
      );

      this.listeners.push(
        unsubscribeLoaded,
        unsubscribeClosed,
        unsubscribeError,
      );

      this.interstitialAd.load();
      console.log('[AdService] Loading interstitial ad...');
    } catch (error) {
      console.error('[AdService] Error loading interstitial:', error);
    }
  }

  /**
   * Load Rewarded Ad
   */
  loadRewardedAd() {
    try {
      this.rewardedAd = RewardedAd.createForAdRequest(
        AdConfig.REWARDED_AD_UNIT_ID,
        AdConfig.AD_REQUEST_CONFIG,
      );

      const unsubscribeLoaded = this.rewardedAd.addAdEventListener(
        RewardedAdEventType.LOADED,
        () => {
          console.log('[AdService] Rewarded ad loaded');
          this.isRewardedLoaded = true;
        },
      );

      const unsubscribeClosed = this.rewardedAd.addAdEventListener(
        AdEventType.CLOSED,
        () => {
          console.log('[AdService] Rewarded ad closed');
          this.isRewardedLoaded = false;
          this.loadRewardedAd();
        },
      );

      this.rewardedAd.load();
      console.log('[AdService] Loading rewarded ad...');
    } catch (error) {
      console.error('[AdService] Error loading rewarded ad:', error);
    }
  }

  /**
   * Check if interstitial ad can be shown (frequency capping)
   */

  canShowInterstitial() {
    const now = Date.now();
    const { MIN_INTERVAL_MS, MAX_PER_SESSION, CLICKS_BEFORE_FIRST_AD } =
      AdConfig.INTERSTITIAL_FREQUENCY;

    // ✅ CHANGE THIS - Check if current click is at the interval (3, 6, 9, etc.)
    if (
      this.clickCount === 0 ||
      this.clickCount % CLICKS_BEFORE_FIRST_AD !== 0
    ) {
      console.log('[AdService] Not at click interval:', this.clickCount);
      return false;
    }

    // Check time since last ad
    if (now - this.lastInterstitialTime < MIN_INTERVAL_MS) {
      console.log('[AdService] Too soon since last ad');
      return false;
    }

    // Check session limit
    if (this.interstitialCount >= MAX_PER_SESSION) {
      console.log('[AdService] Session limit reached');
      return false;
    }

    // Check if ad is loaded
    if (!this.isInterstitialLoaded) {
      console.log('[AdService] Interstitial not loaded');
      return false;
    }

    return true;
  }

  /**
   * Show Interstitial Ad
   * @param {Function} onAdClosed - Callback when ad is closed
   * @param {Function} onAdFailed - Callback when ad fails to show
   * @returns {Promise<boolean>} - Whether ad was shown
   */
  async showInterstitialAd(onAdClosed, onAdFailed) {
    this.clickCount++;
    console.log('[AdService] Click count:', this.clickCount);

    if (!this.canShowInterstitial()) {
      console.log('[AdService] Cannot show interstitial, skipping...');
      onAdClosed?.();
      return false;
    }

    try {
      // Add closed listener for this specific show
      const unsubscribeClosed = this.interstitialAd.addAdEventListener(
        AdEventType.CLOSED,
        () => {
          unsubscribeClosed();
          onAdClosed?.();
        },
      );

      const unsubscribeError = this.interstitialAd.addAdEventListener(
        AdEventType.ERROR,
        error => {
          unsubscribeError();
          console.error('[AdService] Error showing interstitial:', error);
          onAdFailed?.(error);
        },
      );

      await this.interstitialAd.show();

      // Update tracking
      this.lastInterstitialTime = Date.now();
      this.interstitialCount++;

      console.log('[AdService] Interstitial shown successfully');
      return true;
    } catch (error) {
      console.error('[AdService] Error showing interstitial:', error);
      onAdFailed?.(error);
      return false;
    }
  }

  /**
   * Show Rewarded Ad
   * @param {Function} onRewarded - Callback when user earns reward
   * @param {Function} onAdClosed - Callback when ad is closed
   * @param {Function} onAdFailed - Callback when ad fails
   * @returns {Promise<boolean>}
   */
  async showRewardedAd(onRewarded, onAdClosed, onAdFailed) {
    if (!this.isRewardedLoaded) {
      console.log('[AdService] Rewarded ad not loaded');
      onAdFailed?.({ message: 'Ad not loaded' });
      return false;
    }

    try {
      const unsubscribeEarned = this.rewardedAd.addAdEventListener(
        RewardedAdEventType.EARNED_REWARD,
        reward => {
          console.log('[AdService] User earned reward:', reward);
          unsubscribeEarned();
          onRewarded?.(reward);
        },
      );

      const unsubscribeClosed = this.rewardedAd.addAdEventListener(
        AdEventType.CLOSED,
        () => {
          unsubscribeClosed();
          onAdClosed?.();
        },
      );

      await this.rewardedAd.show();
      return true;
    } catch (error) {
      console.error('[AdService] Error showing rewarded ad:', error);
      onAdFailed?.(error);
      return false;
    }
  }

  /**
   * Check if interstitial is loaded
   */
  isInterstitialReady() {
    return this.isInterstitialLoaded;
  }

  /**
   * Check if rewarded is loaded
   */
  isRewardedReady() {
    return this.isRewardedLoaded;
  }

  /**
   * Reset session counters (call when app restarts)
   */
  resetSession() {
    this.interstitialCount = 0;
    this.clickCount = 0;
    this.lastInterstitialTime = 0;
    console.log('[AdService] Session reset');
  }

  /**
   * Cleanup resources
   */
  destroy() {
    this.listeners.forEach(unsubscribe => unsubscribe());
    this.listeners = [];
    this.isInitialized = false;
    console.log('[AdService] Destroyed');
  }
}

// Singleton instance
export const AdService = new AdServiceClass();
export default AdService;
