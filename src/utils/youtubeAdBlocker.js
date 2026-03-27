// =============================================
// YouTube Ad Blocker Utility
// =============================================

// YouTube ad-related domains to block
export const YOUTUBE_AD_DOMAINS = [
  'doubleclick.net',
  'googlesyndication.com',
  'googleadservices.com',
  'googleads.g.doubleclick.net',
  'pagead2.googlesyndication.com',
  'adservice.google.com',
  'ads.youtube.com',
  'youtube.com/pagead',
  'youtube.com/ptracking',
  'youtube.com/api/stats/ads',
  'youtube.com/api/stats/atr',
  'innovid.com',
  'teads.tv',
  'spotxchange.com',
  'serving-sys.com',
  'moatads.com',
  'adsrvr.org',
  'adnxs.com',
  'taboola.com',
  'outbrain.com',
  'amazon-adsystem.com',
  'criteo.com',
  'pubmatic.com',
  'rubiconproject.com',
  'scorecardresearch.com',
  'facebook.net/signals',
  'connect.facebook.net',
  'google-analytics.com',
  'googletagmanager.com',
];

/**
 * Check if a URL is a YouTube ad request
 */
export function isYouTubeAdUrl(url) {
  if (!url) return false;
  const urlLower = url.toLowerCase();

  // YouTube-specific ad patterns
  const adPatterns = [
    '/pagead/',
    '/ptracking',
    '/api/stats/ads',
    '/api/stats/atr',
    '/get_midroll_',
    'ad_type=',
    '&ad_',
    'adunit=',
    '/youtubei/v1/player/ad',
    'google_ads',
    'innovid.com',
    'doubleclick.net',
    'googlesyndication.com',
    'googleadservices.com',
    'googleads.g.',
    'adservice.google',
    'pagead2.',
    '/ad_break',
    'adsrvr.org',
    'moatads.com',
    'serving-sys.com',
    '/generate_204',
    'play.google.com/log',
    '/log_interaction',
    '&adfmt=',
    'ctier=L', // ad video stream marker
  ];

  return adPatterns.some(pattern => urlLower.includes(pattern));
}

/**
 * Generate the comprehensive YouTube ad-blocking JavaScript
 */
export const generateYouTubeAdBlockScript = () => {
  return `
(function() {
  'use strict';

  // ==========================================
  // 1. CSS - Hide all ad elements instantly
  // ==========================================
  var adSelectors = [
    '.video-ads',
    '.ytp-ad-module',
    '.ytp-ad-overlay-container',
    '.ytp-ad-skip-button-container',
    '.ytp-ad-text',
    '.ytp-ad-preview-container',
    '.ytp-ad-player-overlay',
    '.ytp-ad-player-overlay-instream-info',
    '.ytp-ad-action-interstitial',
    '.ytp-ad-overlay-slot',
    '.ytp-ad-message-container',
    '.ytp-ad-overlay-close-button',
    '.ytp-ad-overlay-ad-info-button-container',
    '.ytp-ad-survey',
    '.ytp-ad-badge',
    '.ad-showing',
    '#player-ads',
    '#masthead-ad',
    '#merch-shelf',
    '#offer-module',
    '#promo-info',
    '#promo-title',
    '#related-chip-cloud',
    '#ad-text',
    '#ad-badge',
    'ytd-promoted-sparkles-web-renderer',
    'ytd-promoted-video-renderer',
    'ytd-display-ad-renderer',
    'ytd-companion-slot-renderer',
    'ytd-action-companion-ad-renderer',
    'ytd-in-feed-ad-layout-renderer',
    'ytd-ad-slot-renderer',
    'ytd-banner-promo-renderer',
    'ytd-video-masthead-ad-v3-renderer',
    'ytd-primetime-promo-renderer',
    'ytd-mealbar-promo-renderer',
    'tp-yt-paper-dialog',
    '[id*="google_ads"]',
    '[class*="adsbygoogle"]',
    'iframe[src*="doubleclick"]',
    'iframe[src*="googlesyndication"]',
    '.ytp-paid-content-overlay',
    '.ytp-cards-teaser',
    '.iv-branding',
    '.annotation',
  ];

  var style = document.createElement('style');
  style.id = '__yt_adblock__';
  style.textContent = adSelectors.map(function(s) {
    return s + '{display:none!important;visibility:hidden!important;height:0!important;width:0!important;overflow:hidden!important;position:absolute!important;z-index:-9999!important;pointer-events:none!important;}';
  }).join('\\n');

  if (document.head) {
    document.head.appendChild(style);
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      document.head.appendChild(style);
    });
  }

  // ==========================================
  // 2. DOM - Remove ad elements
  // ==========================================
  function removeAdElements() {
    adSelectors.forEach(function(selector) {
      try {
        document.querySelectorAll(selector).forEach(function(el) {
          el.remove();
        });
      } catch(e) {}
    });
  }

  // ==========================================
  // 3. Auto-skip ads (click skip button)
  // ==========================================
  function autoSkipAds() {
    // Click skip button
    var skipSelectors = [
      '.ytp-ad-skip-button',
      '.ytp-ad-skip-button-modern',
      '.ytp-skip-ad-button',
      'button.ytp-ad-skip-button-modern',
      '.ytp-ad-skip-button-slot button',
      '[id*="skip-button"]',
    ];

    skipSelectors.forEach(function(sel) {
      var btn = document.querySelector(sel);
      if (btn) {
        btn.click();
        btn.dispatchEvent(new Event('click', { bubbles: true }));
      }
    });

    // Close overlay ads
    var closeBtn = document.querySelector('.ytp-ad-overlay-close-button');
    if (closeBtn) closeBtn.click();

    // Dismiss promo banners
    var dismissSelectors = [
      '#dismiss-button button',
      '.ytd-mealbar-promo-renderer #dismiss-button button',
      'tp-yt-paper-dialog #dismiss-button button',
      'ytmusic-popup-container tp-yt-paper-dialog #dismiss-button button',
    ];

    dismissSelectors.forEach(function(sel) {
      var btn = document.querySelector(sel);
      if (btn) btn.click();
    });

    // Force-skip video ads by seeking to end
    var adShowingContainer = document.querySelector('.ad-showing');
    if (adShowingContainer) {
      var vid = adShowingContainer.querySelector('video');
      if (vid) {
        vid.currentTime = vid.duration || 9999;
        vid.playbackRate = 16;
      }
    }

    // Also check video directly
    var video = document.querySelector('video');
    if (video) {
      var playerContainer = video.closest('.html5-video-player');
      if (playerContainer && playerContainer.classList.contains('ad-interruption')) {
        video.currentTime = video.duration || 9999;
        video.playbackRate = 16;
      }
    }
  }

  // ==========================================
  // 4. Block ad network requests (XHR/Fetch)
  // ==========================================
  var adPatterns = [
    '/pagead/', '/ptracking', '/api/stats/ads',
    '/api/stats/atr', 'doubleclick.net', 'googlesyndication.com',
    'googleadservices.com', 'googleads.g.doubleclick.net',
    '/get_midroll_', 'ad_type=', 'adunit=',
    '/youtubei/v1/player/ad', 'innovid.com', 'moatads.com',
    'adservice.google', 'pagead2.', '/ad_break',
    'serving-sys.com', 'adsrvr.org', 'scorecardresearch',
    '/generate_204', 'play.google.com/log',
    '/log_interaction', '&adfmt=',
  ];

  function isAdRequest(url) {
    if (!url) return false;
    var u = url.toString().toLowerCase();
    return adPatterns.some(function(p) { return u.includes(p); });
  }

  // Override XMLHttpRequest
  var _origOpen = XMLHttpRequest.prototype.open;
  var _origSend = XMLHttpRequest.prototype.send;

  XMLHttpRequest.prototype.open = function(method, url) {
    this.__adblock_url = url;
    if (isAdRequest(url)) {
      this.__adblock_blocked = true;
      return;
    }
    return _origOpen.apply(this, arguments);
  };

  XMLHttpRequest.prototype.send = function() {
    if (this.__adblock_blocked) {
      Object.defineProperty(this, 'status', { value: 200, writable: false });
      Object.defineProperty(this, 'readyState', { value: 4, writable: false });
      Object.defineProperty(this, 'responseText', { value: '{}', writable: false });
      Object.defineProperty(this, 'response', { value: '{}', writable: false });
      var self = this;
      setTimeout(function() {
        if (self.onload) self.onload();
        if (self.onreadystatechange) self.onreadystatechange();
      }, 0);
      return;
    }
    return _origSend.apply(this, arguments);
  };

  // Override Fetch
  if (window.fetch) {
    var _origFetch = window.fetch;
    window.fetch = function(resource, init) {
      var url = typeof resource === 'string' ? resource : (resource && resource.url) || '';
      if (isAdRequest(url)) {
        return Promise.resolve(new Response('{}', {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }));
      }
      return _origFetch.apply(this, arguments);
    };
  }

  // ==========================================
  // 5. Block ad script injection
  // ==========================================
  var _origCreateElement = document.createElement.bind(document);
  document.createElement = function(tagName) {
    var el = _origCreateElement(tagName);
    if (tagName.toLowerCase() === 'script') {
      var _origSetAttr = el.setAttribute.bind(el);
      el.setAttribute = function(name, value) {
        if (name === 'src' && isAdRequest(value)) return;
        return _origSetAttr(name, value);
      };
    }
    return el;
  };

  // ==========================================
  // 6. Block popup windows
  // ==========================================
  var _origOpen = window.open;
  window.open = function(url) {
    if (!url || isAdRequest(url)) return null;
    return _origOpen.apply(this, arguments);
  };

  // ==========================================
  // 7. Block sendBeacon tracking
  // ==========================================
  if (navigator.sendBeacon) {
    var _origBeacon = navigator.sendBeacon.bind(navigator);
    navigator.sendBeacon = function(url, data) {
      if (isAdRequest(url)) return true;
      return _origBeacon(url, data);
    };
  }

  // ==========================================
  // 8. MutationObserver for dynamic ads
  // ==========================================
  function setupObserver() {
    if (!document.body) {
      setTimeout(setupObserver, 100);
      return;
    }
    var observer = new MutationObserver(function(mutations) {
      var hasNew = mutations.some(function(m) { return m.addedNodes.length > 0; });
      if (hasNew) {
        removeAdElements();
        autoSkipAds();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // ==========================================
  // INIT
  // ==========================================
  function init() {
    removeAdElements();
    setupObserver();
    // Run auto-skip every 300ms
    setInterval(autoSkipAds, 300);
    // Periodic cleanup every 2s
    setInterval(removeAdElements, 2000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.addEventListener('load', function() {
    removeAdElements();
    autoSkipAds();
  });

  true;
})();
`;
};

export const YOUTUBE_AD_BLOCK_SCRIPT = generateYouTubeAdBlockScript();

/**
 * Generate HTML for WebView-based YouTube player with ad blocking
 */
export const generateAdFreeYouTubeHTML = (videoId, autoplay = true) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100%; height: 100%; background: #000; overflow: hidden; }
    #player { width: 100%; height: 100%; }
    iframe { width: 100%; height: 100%; border: none; }

    /* Hide ad elements */
    .video-ads, .ytp-ad-module, .ytp-ad-overlay-container,
    .ytp-ad-skip-button-container, .ytp-ad-text, .ytp-ad-preview-container,
    .ytp-ad-player-overlay, .ad-showing, .ytp-ad-action-interstitial,
    .ytp-ad-overlay-slot, .ytp-ad-message-container,
    [id*="google_ads"], [class*="adsbygoogle"],
    iframe[src*="doubleclick"], iframe[src*="googlesyndication"] {
      display: none !important;
      visibility: hidden !important;
      height: 0 !important;
      width: 0 !important;
    }
  </style>
</head>
<body>
  <div id="player">
    <iframe
      src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=${
    autoplay ? 1 : 0
  }&rel=0&modestbranding=1&iv_load_policy=3&controls=1&fs=1&disablekb=0&playsinline=1&enablejsapi=1"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
  <script>
    ${generateYouTubeAdBlockScript()}
  </script>
</body>
</html>
`;
};

/**
 * Get ad-free webView props for YoutubePlayer component
 */
export const getAdBlockWebViewProps = (existingProps = {}) => {
  return {
    ...existingProps,
    injectedJavaScriptBeforeContentLoaded: YOUTUBE_AD_BLOCK_SCRIPT,
    injectedJavaScript: `
      (function() {
        // Post-load cleanup
        setTimeout(function() {
          var ads = document.querySelectorAll(
            '.video-ads, .ytp-ad-module, .ytp-ad-overlay-container, ' +
            '[id*="google_ads"], .adsbygoogle, .ad-showing'
          );
          ads.forEach(function(el) { el.remove(); });

          // Auto-skip
          var skipBtn = document.querySelector('.ytp-ad-skip-button')
            || document.querySelector('.ytp-ad-skip-button-modern');
          if (skipBtn) skipBtn.click();
        }, 1000);

        setInterval(function() {
          var skipBtn = document.querySelector('.ytp-ad-skip-button')
            || document.querySelector('.ytp-ad-skip-button-modern');
          if (skipBtn) skipBtn.click();

          var video = document.querySelector('.ad-showing video');
          if (video) {
            video.currentTime = video.duration || 9999;
            video.playbackRate = 16;
          }
        }, 500);

        true;
      })();
    `,
    injectedJavaScriptForMainFrameOnly: false,
    thirdPartyCookiesEnabled: false,
  };
};
