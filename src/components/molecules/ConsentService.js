/**
 * ConsentService - GDPR Consent Management
 *
 * Required for apps that show personalized ads to EU users.
 */

import { AdsConsent, AdsConsentStatus } from 'react-native-google-mobile-ads';

class ConsentServiceClass {
  constructor() {
    this.consentStatus = null;
    this.isConsentRequired = false;
  }

  /**
   * Check and request consent if needed
   */
  async checkAndRequestConsent() {
    try {
      // Get current consent info
      const consentInfo = await AdsConsent.requestInfoUpdate();

      this.isConsentRequired = consentInfo.isConsentFormAvailable;
      this.consentStatus = consentInfo.status;

      console.log('[ConsentService] Consent status:', this.consentStatus);
      console.log('[ConsentService] Form available:', this.isConsentRequired);

      // If consent is required and not determined, show form
      if (
        this.isConsentRequired &&
        consentInfo.status === AdsConsentStatus.REQUIRED
      ) {
        const formResult = await AdsConsent.showForm();
        this.consentStatus = formResult.status;
        console.log('[ConsentService] Form result:', formResult.status);
      }

      return this.consentStatus;
    } catch (error) {
      console.error('[ConsentService] Error:', error);
      return AdsConsentStatus.UNKNOWN;
    }
  }

  /**
   * Check if personalized ads can be shown
   */
  canShowPersonalizedAds() {
    return (
      this.consentStatus === AdsConsentStatus.OBTAINED ||
      this.consentStatus === AdsConsentStatus.NOT_REQUIRED
    );
  }

  /**
   * Reset consent (for testing)
   */
  async resetConsent() {
    try {
      await AdsConsent.reset();
      console.log('[ConsentService] Consent reset');
    } catch (error) {
      console.error('[ConsentService] Reset error:', error);
    }
  }
}

export const ConsentService = new ConsentServiceClass();
export default ConsentService;
