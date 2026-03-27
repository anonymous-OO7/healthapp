import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  BackHandler,
  Modal,
  Dimensions,
  Switch,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';
import YoutubePlayer from 'react-native-youtube-iframe';
import { WebView } from 'react-native-webview';
import { useTranslation } from 'react-i18next';

import { useCart } from '../../context/CartContext';
import { useTheme } from '../../themes';
import Button from '../../components/ui/Button';
import Chip from '../../components/ui/Chip';

import DetailsScreenStyle, { VIDEO_HEIGHT } from './DetailsScreenStyle';
import LogoViewer from '../../components/common/LogoViewer';
import {
  AddCircleSVG,
  BackSvg,
  CircleCheckSVG,
  CloseCircleSVG,
  StarRating,
} from '../../assets/images/SvgImages';
import Toast from '../../components/Toast';
import categories from '../../assets/data/categories';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

// Ad Blocking imports
import {
  YOUTUBE_AD_BLOCK_SCRIPT,
  getAdBlockWebViewProps,
  generateAdFreeYouTubeHTML,
  isYouTubeAdUrl,
} from '../../utils/youtubeAdBlocker';

// =============================================
// Player Mode: 'iframe' (default) or 'webview' (stronger ad blocking)
// =============================================
const PLAYER_MODES = {
  IFRAME: 'iframe',
  WEBVIEW: 'webview',
};

const DetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { t, i18n } = useTranslation();
  const { colors, fonts } = useTheme();
  const { addToCart, removeByName, isInCart, getCartStats } = useCart();
  const playerRef = useRef(null);
  const webViewRef = useRef(null);
  const currentLanguage = i18n.language;

  // Data
  const food = route.params?.food;
  const videoList = useMemo(() => {
    return food?.meta?.video?.playlist || [];
  }, [food?.meta?.video?.playlist]);
  const [dimensions, setDimensions] = useState(() => {
    const { width, height } = Dimensions.get('screen');
    return { width, height };
  });

  const [activeTab, setActiveTab] = useState('recipe');
  const [playing, setPlaying] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [videoMetadata, setVideoMetadata] = useState({});

  // Ad Blocking State
  const [playerMode, setPlayerMode] = useState(PLAYER_MODES.WEBVIEW);
  const [adBlockEnabled, setAdBlockEnabled] = useState(true);
  const [adsBlocked, setAdsBlocked] = useState(0);

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const cartStats = getCartStats();

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ screen }) => {
      setDimensions({
        width: screen.width,
        height: screen.height,
      });
    });
    return () => subscription?.remove();
  }, []);

  const getLocalizedContent = useCallback(
    key => {
      const content = food?.content || {};
      const localizedValue =
        content[currentLanguage]?.[key] || content.en?.[key];
      return localizedValue || '';
    },
    [food, currentLanguage],
  );

  const getLocalizedName = useCallback(() => {
    return getLocalizedContent('title');
  }, [getLocalizedContent]);

  const getLocalizedDescription = useCallback(() => {
    return getLocalizedContent('description');
  }, [getLocalizedContent]);

  const getLocalizedCategoryName = useCallback(() => {
    const primaryCategorySlug = food?.meta?.categoryIds?.[0];
    if (!primaryCategorySlug) return '';

    const translationKey = `categories.items.${primaryCategorySlug}.name`;
    const translated = t(translationKey, { defaultValue: '' });

    const categoryObject = categories.find(
      c => c.category === primaryCategorySlug,
    );
    const fallbackName = categoryObject
      ? categoryObject.display
      : primaryCategorySlug.charAt(0).toUpperCase() +
        primaryCategorySlug.slice(1);

    return translated && translated !== translationKey
      ? translated
      : fallbackName;
  }, [food, t]);

  const generateDefaultMetadata = useCallback(() => {
    const metadata = {};
    const recipeTitle = getLocalizedName();
    videoList.forEach((videoId, index) => {
      metadata[videoId] = {
        title: `${recipeTitle} - Video ${index + 1}`,
        channelTitle: 'Recipe Channel',
        duration: '',
      };
    });
    setVideoMetadata(metadata);
  }, [videoList, getLocalizedName]);

  useEffect(() => {
    if (videoList && videoList.length > 0) {
      setCurrentVideoId(videoList[0]);
      generateDefaultMetadata();
    }
  }, [videoList, generateDefaultMetadata]);

  useEffect(() => {
    const backAction = () => {
      if (isFullScreen) {
        setIsFullScreen(false);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [isFullScreen]);

  const getYouTubeThumbnail = videoId => {
    return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
  };

  const showToast = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const handleVideoSelect = videoId => {
    setCurrentVideoId(videoId);
    setPlaying(true);
  };

  const enterFullScreen = () => {
    setIsFullScreen(true);
    setPlaying(true);
  };

  const exitFullScreen = () => {
    setIsFullScreen(false);
  };

  // =============================================
  // Ad-Block WebView Props (for iframe player)
  // =============================================
  const adBlockWebViewProps = useCallback(() => {
    if (!adBlockEnabled) {
      return {
        androidLayerType: 'hardware',
        allowsFullscreenVideo: true,
        scrollEnabled: false,
        mediaPlaybackRequiresUserAction: false,
        allowsInlineMediaPlayback: true,
        style: { opacity: 0.99 },
        pointerEvents: 'auto',
      };
    }

    return getAdBlockWebViewProps({
      androidLayerType: 'hardware',
      allowsFullscreenVideo: true,
      scrollEnabled: false,
      mediaPlaybackRequiresUserAction: false,
      allowsInlineMediaPlayback: true,
      style: { opacity: 0.99 },
      pointerEvents: 'auto',
    });
  }, [adBlockEnabled]);

  // =============================================
  // WebView Request Blocker
  // =============================================
  const handleWebViewRequest = useCallback(
    request => {
      if (!adBlockEnabled) return true;

      if (isYouTubeAdUrl(request.url)) {
        setAdsBlocked(prev => prev + 1);
        console.log('🚫 Blocked YT Ad:', request.url);
        return false;
      }
      return true;
    },
    [adBlockEnabled],
  );

  // =============================================
  // Cart Handlers
  // =============================================
  const handleIngredientPress = ingredientName => {
    if (isInCart(ingredientName)) {
      removeByName(ingredientName);
      showToast(`"${ingredientName}" removed from cart`, 'error');
    } else {
      addToCart(ingredientName, getLocalizedName());
      showToast(`"${ingredientName}" added to cart`, 'success');
    }
  };

  const handleAddAllIngredients = ingredientsData => {
    let addedCount = 0;

    ingredientsData?.forEach(ingredientObj => {
      const ingredientName = ingredientObj.item;
      if (!isInCart(ingredientName)) {
        addToCart(ingredientName, getLocalizedName());
        addedCount++;
      }
    });

    if (addedCount > 0) {
      showToast(`${addedCount} ingredients added to cart`, 'success');
    } else {
      showToast('All ingredients already in cart', 'info');
    }
  };

  const goToCart = () => {
    navigation.navigate('CartScreen');
  };

  // =============================================
  // Toggle Player Mode
  // =============================================
  const togglePlayerMode = () => {
    setPlayerMode(prev =>
      prev === PLAYER_MODES.IFRAME ? PLAYER_MODES.WEBVIEW : PLAYER_MODES.IFRAME,
    );
    setPlaying(false);
    setAdsBlocked(0);
  };

  const renderNavBar = () => (
    <View style={DetailsScreenStyle.navBarContainer}>
      <TouchableOpacity
        style={DetailsScreenStyle.navButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
      >
        <LogoViewer
          Logosource={BackSvg}
          containerstyle={{ width: 20, height: 20 }}
          logostyle={{ width: 20, height: 20, tintColor: colors.black }}
        />
      </TouchableOpacity>

      <Text
        style={[DetailsScreenStyle.navTitle, { color: colors.text }]}
        numberOfLines={1}
      >
        {getLocalizedName()}
      </Text>

      <TouchableOpacity
        style={DetailsScreenStyle.navButton}
        onPress={goToCart}
        activeOpacity={0.8}
      >
        <Text style={{ fontSize: 20 }}>🛒</Text>
        {cartStats.total > 0 && (
          <View
            style={[
              DetailsScreenStyle.cartBadge,
              { backgroundColor: colors.primary },
            ]}
          >
            <Text style={DetailsScreenStyle.cartBadgeText}>
              {cartStats.total}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );

  // =============================================
  // RENDER: WebView-based YouTube Player (Ad-Free)
  // =============================================
  const renderWebViewPlayer = (width, height, isFS = false) => {
    if (!currentVideoId) {
      return (
        <Image
          source={{ uri: food?.meta?.images?.[0] || food?.meta?.thumbnail }}
          style={DetailsScreenStyle.headerImage}
          resizeMode="cover"
        />
      );
    }

    const html = generateAdFreeYouTubeHTML(currentVideoId, playing || isFS);

    return (
      <WebView
        ref={isFS ? null : webViewRef}
        source={{ html }}
        style={{ width, height, backgroundColor: '#000' }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        allowsFullscreenVideo={true}
        scrollEnabled={false}
        thirdPartyCookiesEnabled={false}
        injectedJavaScriptBeforeContentLoaded={
          adBlockEnabled ? YOUTUBE_AD_BLOCK_SCRIPT : undefined
        }
        injectedJavaScriptForMainFrameOnly={false}
        onShouldStartLoadWithRequest={handleWebViewRequest}
        onMessage={event => {
          try {
            const data = JSON.parse(event.nativeEvent.data);
            if (data.type === 'AD_BLOCKED') {
              setAdsBlocked(prev => prev + (data.count || 1));
            }
          } catch {}
        }}
        userAgent="Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
      />
    );
  };

  // =============================================
  // RENDER: Video Section
  // =============================================
  const renderVideoSection = () => (
    <View style={DetailsScreenStyle.videoContainer}>
      {playerMode === PLAYER_MODES.WEBVIEW ? (
        // WebView-based player (stronger ad blocking)
        renderWebViewPlayer(dimensions.width, VIDEO_HEIGHT)
      ) : currentVideoId ? (
        <YoutubePlayer
          ref={playerRef}
          height={VIDEO_HEIGHT}
          width={dimensions.width}
          play={playing && !isFullScreen}
          videoId={currentVideoId}
          onChangeState={onStateChange}
          forceAndroidAutoplay={true}
          initialPlayerParams={{
            modestbranding: true,
            rel: false,
            controls: true,
            fs: false,
            iv_load_policy: 3,
            showClosedCaptions: false,
          }}
          webViewProps={adBlockWebViewProps()}
        />
      ) : (
        <Image
          source={{ uri: food?.meta?.images?.[0] || food?.meta?.thumbnail }}
          style={DetailsScreenStyle.headerImage}
          resizeMode="cover"
        />
      )}

      {/* Ad Block Badge */}
      {adBlockEnabled && (
        <View style={DetailsScreenStyle.adBlockBadge}>
          <Text style={DetailsScreenStyle.adBlockBadgeText}>
            🛡️ {adsBlocked > 0 ? `${adsBlocked} blocked` : 'Ad-Free'}
          </Text>
        </View>
      )}

      {/* Player Mode Toggle */}
      <TouchableOpacity
        style={DetailsScreenStyle.playerModeToggle}
        onPress={togglePlayerMode}
        activeOpacity={0.8}
      >
        <Text style={DetailsScreenStyle.playerModeToggleText}>
          {playerMode === PLAYER_MODES.WEBVIEW ? '🛡️' : '▶️'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderFullScreenModal = () => {
    const screenWidth = dimensions.width;
    const screenHeight = dimensions.height;

    const landscapeWidth = Math.max(screenWidth, screenHeight);
    const landscapeHeight = Math.min(screenWidth, screenHeight);

    const isPortrait = screenHeight > screenWidth;

    let videoWidth = landscapeWidth;
    let videoHeight = landscapeWidth * (9 / 16);

    if (videoHeight > landscapeHeight) {
      videoHeight = landscapeHeight;
      videoWidth = landscapeHeight * (16 / 9);
    }

    return (
      <Modal
        visible={isFullScreen}
        animationType="fade"
        transparent={false}
        onRequestClose={exitFullScreen}
        supportedOrientations={['portrait', 'landscape']}
        statusBarTranslucent={true}
      >
        <StatusBar hidden={true} />
        <View style={DetailsScreenStyle.fullScreenModal}>
          <View
            style={[
              DetailsScreenStyle.fullScreenRotatedContainer,
              {
                width: isPortrait ? screenHeight : screenWidth,
                height: isPortrait ? screenWidth : screenHeight,
                transform: isPortrait ? [{ rotate: '90deg' }] : [],
              },
            ]}
          >
            {/* Full Screen Player */}
            {playerMode === PLAYER_MODES.WEBVIEW ? (
              renderWebViewPlayer(videoWidth, videoHeight, true)
            ) : (
              <YoutubePlayer
                height={videoHeight}
                width={videoWidth}
                play={playing && isFullScreen}
                videoId={currentVideoId}
                onChangeState={onStateChange}
                forceAndroidAutoplay={true}
                initialPlayerParams={{
                  modestbranding: true,
                  rel: false,
                  controls: true,
                  fs: false,
                  iv_load_policy: 3,
                  showClosedCaptions: false,
                }}
                webViewProps={adBlockWebViewProps()}
              />
            )}

            {/* Exit Full Screen Button */}
            <TouchableOpacity
              style={DetailsScreenStyle.fullScreenExitBtn}
              onPress={exitFullScreen}
              activeOpacity={0.8}
            >
              <Text style={DetailsScreenStyle.fullScreenExitText}>✕</Text>
            </TouchableOpacity>

            {/* Ad Block Badge in Fullscreen */}
            {adBlockEnabled && adsBlocked > 0 && (
              <View style={DetailsScreenStyle.fullScreenAdBadge}>
                <Text style={DetailsScreenStyle.adBlockBadgeText}>
                  🛡️ {adsBlocked} blocked
                </Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
    );
  };

  // =============================================
  // RENDER: Ad Block Settings Bar
  // =============================================
  const renderAdBlockBar = () => (
    <View
      style={[
        DetailsScreenStyle.adBlockBar,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      <View style={DetailsScreenStyle.adBlockBarLeft}>
        <Text style={[DetailsScreenStyle.adBlockBarIcon]}>🛡️</Text>
        <View>
          <Text
            style={[DetailsScreenStyle.adBlockBarTitle, { color: colors.text }]}
          >
            Ad Blocker
          </Text>
          <Text
            style={[
              DetailsScreenStyle.adBlockBarSubtitle,
              { color: colors.textSecondary },
            ]}
          >
            {playerMode === PLAYER_MODES.WEBVIEW
              ? 'WebView Mode (Strongest)'
              : 'Iframe Mode (Standard)'}
          </Text>
        </View>
      </View>

      <View style={DetailsScreenStyle.adBlockBarRight}>
        {/* Player mode toggle */}
        <TouchableOpacity
          style={[
            DetailsScreenStyle.modeChip,
            {
              backgroundColor:
                playerMode === PLAYER_MODES.WEBVIEW
                  ? colors.primary + '20'
                  : colors.chipBackground,
              borderColor:
                playerMode === PLAYER_MODES.WEBVIEW
                  ? colors.primary
                  : colors.border,
            },
          ]}
          onPress={togglePlayerMode}
          activeOpacity={0.7}
        >
          <Text
            style={[
              DetailsScreenStyle.modeChipText,
              {
                color:
                  playerMode === PLAYER_MODES.WEBVIEW
                    ? colors.primary
                    : colors.textSecondary,
              },
            ]}
          >
            {playerMode === PLAYER_MODES.WEBVIEW ? '🛡️ WV' : '▶️ IF'}
          </Text>
        </TouchableOpacity>

        {/* Ad block toggle */}
        <Switch
          value={adBlockEnabled}
          onValueChange={val => {
            setAdBlockEnabled(val);
            setAdsBlocked(0);
            showToast(
              val ? 'Ad blocker enabled' : 'Ad blocker disabled',
              val ? 'success' : 'error',
            );
          }}
          trackColor={{ false: '#555', true: colors.primary + '80' }}
          thumbColor={adBlockEnabled ? colors.primary : '#ccc'}
          ios_backgroundColor="#555"
        />
      </View>
    </View>
  );

  const renderRecipeTab = () => {
    const ingredientsData =
      food?.content[currentLanguage]?.ingredients ||
      food?.content.en.ingredients ||
      [];
    const steps =
      food?.content[currentLanguage]?.steps || food?.content.en.steps || [];

    const inCartCount =
      ingredientsData.filter(ingObj => isInCart(ingObj.item)).length || 0;

    return (
      <View style={DetailsScreenStyle.sectionContainer}>
        <View style={DetailsScreenStyle.sectionHeaderRow}>
          <Text
            style={[DetailsScreenStyle.sectionHeader, { color: colors.text }]}
          >
            🥗 {t('recipe.ingredients')}
          </Text>

          <Button
            disabled={false}
            onclick={() => handleAddAllIngredients(ingredientsData)}
            btntext="Add All"
            width={responsiveWidth(20)}
            height={responsiveHeight(3)}
          />
          <Text
            style={[
              DetailsScreenStyle.sectionBadge,
              {
                color: colors.primary,
                backgroundColor: colors.chipBackground,
              },
            ]}
          >
            {inCartCount}/{ingredientsData.length} in cart
          </Text>
        </View>

        <View style={DetailsScreenStyle.ingredientsList}>
          {ingredientsData.map((ingredientObj, index) => {
            const ingredientName = ingredientObj.item;
            const inCart = isInCart(ingredientName);

            return (
              <Chip
                key={`ing-${index}`}
                label={ingredientName}
                selected={inCart}
                onPress={() => handleIngredientPress(ingredientName)}
                rightIcon={
                  <>
                    {inCart ? (
                      <LogoViewer
                        Logosource={CircleCheckSVG}
                        containerstyle={DetailsScreenStyle.loginImgContainer}
                        logostyle={DetailsScreenStyle.loginImg}
                      />
                    ) : (
                      <LogoViewer
                        Logosource={AddCircleSVG}
                        containerstyle={DetailsScreenStyle.loginImgContainer}
                        logostyle={DetailsScreenStyle.addItem}
                      />
                    )}
                  </>
                }
                style={DetailsScreenStyle.ingredientChip}
                showBorder={true}
              />
            );
          })}
        </View>

        <View style={{ height: 30 }} />
        <Text
          style={[DetailsScreenStyle.sectionHeader, { color: colors.text }]}
        >
          👨‍🍳 {t('recipe.steps')} ({steps.length})
        </Text>
        <View style={{ height: 30 }} />

        {steps.map((item, index) => (
          <View key={`step-${index}`} style={DetailsScreenStyle.stepRow}>
            <View
              style={[
                DetailsScreenStyle.stepBadge,
                { backgroundColor: colors.primary },
              ]}
            >
              <Text style={DetailsScreenStyle.stepNumber}>{index + 1}</Text>
            </View>
            <Text
              style={[
                DetailsScreenStyle.stepText,
                { color: colors.textSecondary },
              ]}
            >
              {item?.text}
            </Text>
          </View>
        ))}
        <View style={{ height: 30 }} />
      </View>
    );
  };

  const renderVideoListTab = () => (
    <View style={DetailsScreenStyle.sectionContainer}>
      <Text style={[DetailsScreenStyle.sectionHeader, { color: colors.text }]}>
        Available Videos ({videoList.length})
      </Text>

      {videoList && videoList.length > 0 ? (
        videoList.map((videoId, index) => {
          const isActive = videoId === currentVideoId;
          const meta = videoMetadata[videoId] || {};

          return (
            <TouchableOpacity
              key={`vid-${index}`}
              style={[
                DetailsScreenStyle.videoListItem,
                {
                  backgroundColor: colors.surface,
                  borderColor: isActive ? colors.primary : colors.border,
                  borderWidth: isActive ? 2 : 1,
                },
              ]}
              onPress={() => handleVideoSelect(videoId)}
              activeOpacity={0.8}
            >
              <View style={DetailsScreenStyle.videoListThumbnail}>
                <Image
                  source={{ uri: getYouTubeThumbnail(videoId) }}
                  style={DetailsScreenStyle.thumbnailImage}
                  resizeMode="cover"
                />
                <View style={DetailsScreenStyle.playIconOverlay}>
                  <Text style={{ color: '#FFF', fontSize: 16 }}>▶</Text>
                </View>
                {adBlockEnabled && (
                  <View style={DetailsScreenStyle.thumbnailAdFreeBadge}>
                    <Text style={DetailsScreenStyle.thumbnailAdFreeText}>
                      🛡️
                    </Text>
                  </View>
                )}
              </View>

              <View style={DetailsScreenStyle.videoListTextContainer}>
                <Text
                  style={[
                    DetailsScreenStyle.videoListTitle,
                    { color: colors.text },
                  ]}
                  numberOfLines={2}
                >
                  {meta.title || `Video ${index + 1}`}
                </Text>
                <Text
                  style={[
                    DetailsScreenStyle.videoListChannel,
                    { color: colors.textSecondary },
                  ]}
                  numberOfLines={1}
                >
                  {meta.channelTitle || 'Recipe Channel'}
                </Text>
                <View style={DetailsScreenStyle.videoListMeta}>
                  {isActive && (
                    <Chip
                      label="▶ PLAYING"
                      selected={true}
                      style={DetailsScreenStyle.nowPlayingChip}
                      showBorder={false}
                    />
                  )}
                  {!isActive && (
                    <Text
                      style={[
                        DetailsScreenStyle.videoListSub,
                        { color: colors.textTertiary },
                      ]}
                    >
                      Tap to play
                    </Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        })
      ) : (
        <Text
          style={[DetailsScreenStyle.emptyText, { color: colors.textTertiary }]}
        >
          {t('messages.noResults')}
        </Text>
      )}
    </View>
  );

  const renderTabBar = () => (
    <View
      style={[DetailsScreenStyle.tabBar, { borderBottomColor: colors.divider }]}
    >
      <Chip
        label="Recipe"
        selected={activeTab === 'recipe'}
        onPress={() => setActiveTab('recipe')}
        style={[DetailsScreenStyle.tabChip]}
        showBorder={false}
      />
      <Chip
        label={` Videos (${videoList.length})`}
        selected={activeTab === 'videos'}
        onPress={() => setActiveTab('videos')}
        style={DetailsScreenStyle.tabChip}
        showBorder={false}
      />
    </View>
  );

  return (
    <SafeAreaView
      style={[
        DetailsScreenStyle.safeArea,
        { backgroundColor: colors.background },
      ]}
    >
      <StatusBar
        barStyle={colors.statusBar}
        backgroundColor={colors.background}
      />

      <Toast
        visible={toastVisible}
        message={toastMessage}
        type={toastType}
        onHide={() => setToastVisible(false)}
      />

      {renderFullScreenModal()}

      {renderNavBar()}

      {renderVideoSection()}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={DetailsScreenStyle.scrollContent}
      >
        {renderAdBlockBar()}
        <View style={DetailsScreenStyle.infoSection}>
          <View style={DetailsScreenStyle.titleRow}>
            <View style={DetailsScreenStyle.titleTextContainer}>
              <Text
                style={[DetailsScreenStyle.titleText, { color: colors.text }]}
              >
                {getLocalizedName()}
              </Text>
              <Text
                style={[
                  DetailsScreenStyle.categoryText,
                  { color: colors.textSecondary },
                ]}
              >
                {getLocalizedCategoryName()}
              </Text>
            </View>

            <View style={DetailsScreenStyle.rightActionsContainer}>
              <View
                style={[
                  DetailsScreenStyle.ratingBadge,
                  { backgroundColor: colors.warning + '20' },
                ]}
              >
                <LogoViewer
                  Logosource={StarRating}
                  containerstyle={{ width: 14, height: 14 }}
                  logostyle={{ width: 14, height: 14 }}
                />
                <Text
                  style={[
                    DetailsScreenStyle.ratingText,
                    { color: colors.warning },
                  ]}
                >
                  {food?.meta?.rating}
                </Text>
              </View>

              {currentVideoId && (
                <Button
                  disabled={false}
                  onclick={enterFullScreen}
                  btntext="Full Screen"
                  variant="outline"
                  buttonctn={DetailsScreenStyle.fullScreenButtonContainer}
                  contentStyle={DetailsScreenStyle.fullScreenButtonContent}
                  labelStyle={DetailsScreenStyle.fullScreenButtonLabel}
                />
              )}
            </View>
          </View>

          <Text
            style={[
              DetailsScreenStyle.description,
              { color: colors.textSecondary },
            ]}
          >
            {getLocalizedDescription()}
          </Text>
        </View>

        {renderTabBar()}

        {activeTab === 'recipe' ? renderRecipeTab() : renderVideoListTab()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsScreen;
