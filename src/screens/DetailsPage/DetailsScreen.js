import React, { useState, useCallback, useEffect, useRef } from 'react';
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
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';
import YoutubePlayer from 'react-native-youtube-iframe';
import { useTranslation } from 'react-i18next';
import { BannerAdSize } from 'react-native-google-mobile-ads';

// Context
import { useCart } from '../../context/CartContext';

// Styles & Assets
import DetailsScreenStyle, { VIDEO_HEIGHT } from './DetailsScreenStyle';
import { Colors } from '../../assets/colors';
import LogoViewer from '../../components/common/LogoViewer';
import { BackSvg, StarRating } from '../../assets/images/SvgImages';
import Toast from '../../components/Toast';
import { BannerAdComponent } from '../../components/molecules/ads';

const DetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { t } = useTranslation();
  const { addToCart, removeByName, isInCart, getCartStats } = useCart();
  const playerRef = useRef(null);

  // Data
  const food = route.params?.food;
  const videoList = route.params?.list || [];

  // Get current screen dimensions
  const [dimensions, setDimensions] = useState(() => {
    const { width, height } = Dimensions.get('screen');
    return { width, height };
  });

  // State
  const [activeTab, setActiveTab] = useState('recipe');
  const [playing, setPlaying] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [videoMetadata, setVideoMetadata] = useState({});

  // Toast State
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  // Cart Stats
  const cartStats = getCartStats();

  // Listen to dimension changes
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ screen }) => {
      setDimensions({
        width: screen.width,
        height: screen.height,
      });
    });

    return () => subscription?.remove();
  }, []);

  // Initialize Video
  useEffect(() => {
    if (videoList && videoList.length > 0) {
      setCurrentVideoId(videoList[0]);
      generateDefaultMetadata();
    }
  }, [videoList]);

  // Handle Android Back Button
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

  // Generate Default Metadata
  const generateDefaultMetadata = () => {
    const metadata = {};
    videoList.forEach((videoId, index) => {
      metadata[videoId] = {
        title: `${getLocalizedName()} - Video ${index + 1}`,
        channelTitle: 'Recipe Channel',
        duration: '',
      };
    });
    setVideoMetadata(metadata);
  };

  // --- Helper Functions ---
  const getLocalizedName = () => {
    const safeName = (food?.name || '').toLowerCase().replace(/\s+/g, '');
    const key = `recipes.items.${safeName}.name`;
    const translated = t(key, { defaultValue: '' });
    return translated && translated !== key
      ? translated
      : food?.display || food?.name || '';
  };

  const getLocalizedDescription = () => {
    const safeName = (food?.name || '').toLowerCase().replace(/\s+/g, '');
    const key = `recipes.items.${safeName}.description`;
    const translated = t(key, { defaultValue: '' });
    return translated && translated !== key ? translated : food?.desc || '';
  };

  const getYouTubeThumbnail = videoId => {
    return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
  };

  // Show Toast
  const showToast = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  // --- Handlers ---
  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const handleVideoSelect = videoId => {
    setCurrentVideoId(videoId);
    setPlaying(true);
  };

  // Enter Fullscreen
  const enterFullScreen = () => {
    setIsFullScreen(true);
    setPlaying(true);
  };

  // Exit Fullscreen
  const exitFullScreen = () => {
    setIsFullScreen(false);
  };

  // Handle Ingredient Click
  const handleIngredientPress = ingredient => {
    if (isInCart(ingredient)) {
      removeByName(ingredient);
      showToast(`"${ingredient}" removed from cart`, 'error');
    } else {
      addToCart(ingredient, getLocalizedName());
      showToast(`"${ingredient}" added to cart`, 'success');
    }
  };

  // Add All Ingredients
  const handleAddAllIngredients = () => {
    let addedCount = 0;
    food?.ingredients?.forEach(ingredient => {
      if (!isInCart(ingredient)) {
        addToCart(ingredient, getLocalizedName());
        addedCount++;
      }
    });

    if (addedCount > 0) {
      showToast(`${addedCount} ingredients added to cart`, 'success');
    } else {
      showToast('All ingredients already in cart', 'info');
    }
  };

  // Navigate to Cart
  const goToCart = () => {
    navigation.navigate('CartScreen');
  };

  // --- Render Components ---

  // 1. Nav Bar
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
          logostyle={{ width: 20, height: 20, tintColor: Colors.black }}
        />
      </TouchableOpacity>

      <Text style={DetailsScreenStyle.navTitle} numberOfLines={1}>
        {getLocalizedName()}
      </Text>

      {/* Cart Button with Badge */}
      <TouchableOpacity
        style={DetailsScreenStyle.navButton}
        onPress={goToCart}
        activeOpacity={0.8}
      >
        <Text style={{ fontSize: 20 }}>🛒</Text>
        {cartStats.total > 0 && (
          <View style={DetailsScreenStyle.cartBadge}>
            <Text style={DetailsScreenStyle.cartBadgeText}>
              {cartStats.total}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );

  // 2. Video Section
  const renderVideoSection = () => (
    <View style={DetailsScreenStyle.videoContainer}>
      {currentVideoId ? (
        <YoutubePlayer
          ref={playerRef}
          height={VIDEO_HEIGHT}
          width={dimensions.width}
          play={playing && !isFullScreen}
          videoId={currentVideoId}
          onChangeState={onStateChange}
          forceAndroidAutoplay={true}
          webViewProps={{
            androidLayerType: 'hardware',
            allowsFullscreenVideo: true,
            scrollEnabled: false,
            mediaPlaybackRequiresUserAction: false,
            allowsInlineMediaPlayback: true,
            style: { opacity: 0.99 },
            pointerEvents: 'auto',
          }}
        />
      ) : (
        <Image
          source={{ uri: food?.image }}
          style={DetailsScreenStyle.headerImage}
          resizeMode="cover"
        />
      )}
    </View>
  );

  // 3. Fullscreen Video Modal (Landscape with rotation)
  const renderFullScreenModal = () => {
    const screenWidth = dimensions.width;
    const screenHeight = dimensions.height;

    // Landscape dimensions
    const landscapeWidth = Math.max(screenWidth, screenHeight);
    const landscapeHeight = Math.min(screenWidth, screenHeight);

    // Check if device is currently in portrait
    const isPortrait = screenHeight > screenWidth;

    // Calculate video dimensions maintaining 16:9 aspect ratio
    // Fit video to available height to prevent overflow
    let videoWidth = landscapeWidth;
    let videoHeight = landscapeWidth * (9 / 16);

    // If calculated height exceeds available height, fit to height instead
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
            {/* Video Player */}
            <YoutubePlayer
              height={videoHeight}
              width={videoWidth}
              play={playing && isFullScreen}
              videoId={currentVideoId}
              onChangeState={onStateChange}
              forceAndroidAutoplay={true}
              webViewProps={{
                androidLayerType: 'hardware',
                allowsFullscreenVideo: true,
                scrollEnabled: false,
                style: { opacity: 0.99 },
              }}
              initialPlayerParams={{
                modestbranding: false,
                rel: false,
                controls: true,
                fs: false,
                iv_load_policy: 3,
                showClosedCaptions: false,
              }}
            />

            {/* Exit Button */}
            <TouchableOpacity
              style={DetailsScreenStyle.fullScreenExitBtn}
              onPress={exitFullScreen}
              activeOpacity={0.8}
            >
              <Text style={DetailsScreenStyle.fullScreenExitText}>✕</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const renderRecipeTab = () => {
    const inCartCount =
      food?.ingredients?.filter(ing => isInCart(ing)).length || 0;

    return (
      <View style={DetailsScreenStyle.sectionContainer}>
        {/* Ingredients Section Header */}
        <View style={DetailsScreenStyle.sectionHeaderRow}>
          <Text style={DetailsScreenStyle.sectionHeader}>
            🥗 {t('recipe.ingredients')}
          </Text>
          <Text style={DetailsScreenStyle.sectionBadge}>
            {inCartCount}/{food?.ingredients?.length || 0} in cart
          </Text>
        </View>

        {/* Ingredients List - Grid Layout */}
        <View style={DetailsScreenStyle.ingredientsList}>
          {food?.ingredients?.map((ingredient, index) => {
            const inCart = isInCart(ingredient);

            return (
              <TouchableOpacity
                key={`ing-${index}`}
                style={[
                  DetailsScreenStyle.ingredientRow,
                  inCart && DetailsScreenStyle.ingredientRowInCart,
                ]}
                onPress={() => handleIngredientPress(ingredient)}
                activeOpacity={0.7}
              >
                {/* Ingredient Name (Left Side) */}
                <Text
                  style={[
                    DetailsScreenStyle.ingredientName,
                    inCart && DetailsScreenStyle.ingredientNameInCart,
                  ]}
                  numberOfLines={2} // Allow 2 lines so long names don't cut off immediately
                >
                  {ingredient}
                </Text>

                {/* Add/Remove Icon (Right Side - Smaller) */}
                <View
                  style={[
                    DetailsScreenStyle.ingredientAction,
                    inCart && DetailsScreenStyle.ingredientActionInCart,
                  ]}
                >
                  <Text style={DetailsScreenStyle.ingredientActionIcon}>
                    {inCart ? '✓' : '+'}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
          {/* Ghost items to keep grid alignment correct for last row */}
          <View style={DetailsScreenStyle.ghostItem} />
          <View style={DetailsScreenStyle.ghostItem} />
        </View>

        {/* Add All Button */}
        <TouchableOpacity
          style={DetailsScreenStyle.addAllButton}
          onPress={handleAddAllIngredients}
          activeOpacity={0.8}
        >
          <Text style={DetailsScreenStyle.addAllButtonIcon}>🛒</Text>
          <Text style={DetailsScreenStyle.addAllButtonText}>
            Add All to Cart
          </Text>
        </TouchableOpacity>

        <View style={{ height: 30 }} />

        {/* Steps Section */}
        <Text style={DetailsScreenStyle.sectionHeader}>
          👨‍🍳 {t('recipe.steps')} ({food?.steps?.length || 0})
        </Text>
        {food?.steps?.map((item, index) => (
          <View key={`step-${index}`} style={DetailsScreenStyle.stepRow}>
            <View style={DetailsScreenStyle.stepBadge}>
              <Text style={DetailsScreenStyle.stepNumber}>{index + 1}</Text>
            </View>
            <Text style={DetailsScreenStyle.stepText}>{item}</Text>
          </View>
        ))}
      </View>
    );
  };

  // 5. Videos Tab
  const renderVideoListTab = () => (
    <View style={DetailsScreenStyle.sectionContainer}>
      <Text style={DetailsScreenStyle.sectionHeader}>
        🎬 Available Videos ({videoList.length})
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
                isActive && DetailsScreenStyle.activeVideoItem,
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
              </View>

              <View style={DetailsScreenStyle.videoListTextContainer}>
                <Text
                  style={DetailsScreenStyle.videoListTitle}
                  numberOfLines={2}
                >
                  {meta.title || `Video ${index + 1}`}
                </Text>
                <Text
                  style={DetailsScreenStyle.videoListChannel}
                  numberOfLines={1}
                >
                  {meta.channelTitle || 'Recipe Channel'}
                </Text>
                <View style={DetailsScreenStyle.videoListMeta}>
                  {isActive && (
                    <View style={DetailsScreenStyle.nowPlayingBadge}>
                      <Text style={DetailsScreenStyle.nowPlayingText}>
                        ▶ PLAYING
                      </Text>
                    </View>
                  )}
                  <Text style={DetailsScreenStyle.videoListSub}>
                    {isActive ? '' : 'Tap to play'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })
      ) : (
        <Text style={DetailsScreenStyle.emptyText}>
          {t('messages.noResults')}
        </Text>
      )}
    </View>
  );

  // --- Main Render ---
  return (
    <SafeAreaView style={DetailsScreenStyle.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Toast */}
      <Toast
        visible={toastVisible}
        message={toastMessage}
        type={toastType}
        onHide={() => setToastVisible(false)}
      />

      {/* Fullscreen Modal */}
      {renderFullScreenModal()}

      {/* Nav Bar */}
      {renderNavBar()}
      <View style={DetailsScreenStyle.bottomBannerContainer}>
        <BannerAdComponent
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          containerStyle={DetailsScreenStyle.bottomBanner}
        />
      </View>

      {/* Video Section */}
      {renderVideoSection()}

      {/* Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={DetailsScreenStyle.scrollContent}
      >
        {/* Info Section */}
        <View style={DetailsScreenStyle.infoSection}>
          <View style={DetailsScreenStyle.titleRow}>
            <View style={DetailsScreenStyle.titleTextContainer}>
              <Text style={DetailsScreenStyle.titleText}>
                {getLocalizedName()}
              </Text>
              <Text style={DetailsScreenStyle.categoryText}>
                {food?.category}
              </Text>
            </View>

            <View style={DetailsScreenStyle.rightActionsContainer}>
              <View style={DetailsScreenStyle.ratingBadge}>
                <LogoViewer
                  Logosource={StarRating}
                  containerstyle={{ width: 14, height: 14 }}
                  logostyle={{ width: 14, height: 14 }}
                />
                <Text style={DetailsScreenStyle.ratingText}>
                  {food?.rating}
                </Text>
              </View>

              {currentVideoId && (
                <TouchableOpacity
                  style={DetailsScreenStyle.fullScreenButton}
                  onPress={enterFullScreen}
                  activeOpacity={0.8}
                >
                  <Text style={{ fontSize: 14 }}>📺</Text>
                  <Text style={DetailsScreenStyle.fullScreenButtonText}>
                    Full Screen
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <Text style={DetailsScreenStyle.description}>
            {getLocalizedDescription()}
          </Text>
        </View>

        {/* Tabs */}
        <View style={DetailsScreenStyle.tabBar}>
          <TouchableOpacity
            style={[
              DetailsScreenStyle.tabItem,
              activeTab === 'recipe' && DetailsScreenStyle.activeTabItem,
            ]}
            onPress={() => setActiveTab('recipe')}
          >
            <Text
              style={[
                DetailsScreenStyle.tabText,
                activeTab === 'recipe' && DetailsScreenStyle.activeTabText,
              ]}
            >
              📋 Recipe
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              DetailsScreenStyle.tabItem,
              activeTab === 'videos' && DetailsScreenStyle.activeTabItem,
            ]}
            onPress={() => setActiveTab('videos')}
          >
            <Text
              style={[
                DetailsScreenStyle.tabText,
                activeTab === 'videos' && DetailsScreenStyle.activeTabText,
              ]}
            >
              🎬 Videos ({videoList.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === 'recipe' ? renderRecipeTab() : renderVideoListTab()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsScreen;
