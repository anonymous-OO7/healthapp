// src/screens/DetailsScreen/DetailsScreen.js
import React, { useState, useCallback } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';
import YoutubePlayer from 'react-native-youtube-iframe';
import { useTranslation } from 'react-i18next';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

// Assets & Components
import { Colors } from '../../assets/colors';
import LogoViewer from '../../components/common/LogoViewer';
import { BackSvg, HeartSvg, StarRating } from '../../assets/images/SvgImages';

const DetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { t, i18n } = useTranslation();

  // Data from Navigation
  const food = route.params?.food;
  const videoList = route.params?.list || [];

  // State
  const [activeTab, setActiveTab] = useState('ingredients'); // ingredients | steps | videos
  const [playing, setPlaying] = useState(false);

  // --- Translation Helpers ---
  const getLocalizedName = () => {
    const safeName = (food.name || '').toLowerCase().replace(/\s+/g, '');
    const key = `recipes.items.${safeName}.name`;
    const translated = t(key, { defaultValue: '' });
    return translated && translated !== key
      ? translated
      : food.display || food.name;
  };

  const getLocalizedDescription = () => {
    const safeName = (food.name || '').toLowerCase().replace(/\s+/g, '');
    const key = `recipes.items.${safeName}.description`;
    const translated = t(key, { defaultValue: '' });
    return translated && translated !== key ? translated : food.desc || '';
  };

  // --- Video Player Logic ---
  const onStateChange = useCallback(state => {
    if (state === 'ended') setPlaying(false);
  }, []);

  // --- Tab Content Renderers ---
  const renderIngredients = () => (
    <View style={styles.sectionBody}>
      {food.ingredients?.map((item, index) => (
        <View key={index} style={styles.listItem}>
          <View style={styles.bullet} />
          <Text style={styles.listText}>{item}</Text>
        </View>
      ))}
    </View>
  );

  const renderSteps = () => (
    <View style={styles.sectionBody}>
      {food.steps?.map((item, index) => (
        <View key={index} style={styles.stepItem}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepNumber}>{index + 1}</Text>
          </View>
          <Text style={styles.stepText}>{item}</Text>
        </View>
      ))}
    </View>
  );

  const renderVideos = () => (
    <View style={styles.sectionBody}>
      {videoList && videoList.length > 0 ? (
        videoList.map((videoId, index) => (
          <View key={index} style={styles.videoWrapper}>
            <YoutubePlayer
              height={220}
              play={playing}
              videoId={videoId}
              onChangeState={onStateChange}
            />
          </View>
        ))
      ) : (
        <Text style={styles.emptyText}>{t('messages.noResults')}</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      {/* --- 1. Header Image & Nav --- */}
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: food.image }}
          style={styles.headerImage}
          resizeMode="cover"
        />
        <View style={styles.imageOverlay} />

        <SafeAreaView style={styles.navBar}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.goBack()}
          >
            <LogoViewer
              Logosource={BackSvg}
              containerstyle={styles.iconBox}
              logostyle={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <LogoViewer
              Logosource={HeartSvg}
              containerstyle={styles.iconBox}
              logostyle={styles.icon}
            />
          </TouchableOpacity>
        </SafeAreaView>
      </View>

      {/* --- 2. White Content Sheet --- */}
      <View style={styles.contentSheet}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }}
        >
          {/* Title & Rating */}
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.titleText}>{getLocalizedName()}</Text>
              <Text style={styles.categoryText}>{food.category}</Text>
            </View>
            <View style={styles.ratingBox}>
              <LogoViewer
                Logosource={StarRating}
                containerstyle={{ width: 15, height: 15 }}
                logostyle={{ width: 15, height: 15 }}
              />
              <Text style={styles.ratingText}>{food.rating}</Text>
            </View>
          </View>

          {/* Description */}
          <Text style={styles.descText}>{getLocalizedDescription()}</Text>

          {/* --- 3. Tabs --- */}
          <View style={styles.tabContainer}>
            {['ingredients', 'steps', 'videos'].map(tab => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tabButton,
                  activeTab === tab && styles.activeTab,
                ]}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab && styles.activeTabText,
                  ]}
                >
                  {tab === 'videos'
                    ? t('actions.watchVideo')
                    : t(`recipe.${tab}`)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* --- 4. Tab Content --- */}
          {activeTab === 'ingredients' && renderIngredients()}
          {activeTab === 'steps' && renderSteps()}
          {activeTab === 'videos' && renderVideos()}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  // --- Header Styles ---
  headerContainer: {
    height: responsiveHeight(40),
    width: '100%',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  navBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(5),
    paddingTop: responsiveHeight(2), // Adjust for StatusBar
  },
  navButton: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 30,
    padding: 8,
  },
  iconBox: {
    width: 24,
    height: 24,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: Colors.black,
  },

  // --- Content Sheet Styles ---
  contentSheet: {
    flex: 1,
    backgroundColor: Colors.white,
    marginTop: -responsiveHeight(5), // Pull up over image
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: responsiveWidth(6),
    paddingTop: responsiveHeight(3),
  },

  // Typography
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: responsiveHeight(1),
  },
  titleText: {
    fontSize: responsiveFontSize(3),
    fontFamily: 'Poppins-SemiBold',
    color: Colors.black,
    marginBottom: 4,
  },
  categoryText: {
    fontSize: responsiveFontSize(1.8),
    color: Colors.darkGray || 'gray',
    textTransform: 'capitalize',
    fontFamily: 'Poppins-Regular',
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  ratingText: {
    marginLeft: 5,
    fontWeight: 'bold',
    color: '#FFB400',
    fontSize: responsiveFontSize(1.8),
  },
  descText: {
    fontSize: responsiveFontSize(1.8),
    color: '#666',
    lineHeight: 22,
    fontFamily: 'Rubik-Regular',
    marginBottom: responsiveHeight(3),
  },

  // --- Tabs ---
  tabContainer: {
    flexDirection: 'row',
    marginBottom: responsiveHeight(2),
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  tabButton: {
    marginRight: responsiveWidth(6),
    paddingBottom: 10,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: Colors.primary || 'orange',
  },
  tabText: {
    fontSize: responsiveFontSize(2),
    color: '#999',
    fontWeight: '600',
  },
  activeTabText: {
    color: Colors.primary || 'orange',
    color: Colors.black,
  },

  // --- Lists ---
  sectionBody: {
    marginTop: 10,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary || 'orange',
    marginTop: 6,
    marginRight: 12,
  },
  listText: {
    fontSize: responsiveFontSize(1.8),
    color: '#444',
    flex: 1,
    fontFamily: 'Rubik-Regular',
    lineHeight: 20,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 18,
  },
  stepBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumber: {
    fontWeight: 'bold',
    color: '#555',
  },
  stepText: {
    fontSize: responsiveFontSize(1.8),
    color: '#444',
    flex: 1,
    lineHeight: 22,
    fontFamily: 'Rubik-Regular',
  },

  // Video
  videoWrapper: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    backgroundColor: '#000',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
});

export default DetailsScreen;
