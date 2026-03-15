import React, { useState, useCallback, useMemo } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  StatusBar,
  Modal,
  Platform,
  Dimensions,
} from 'react-native';

import { useNavigation } from '@react-navigation/core';
import { useTranslation } from 'react-i18next';
import { BannerAdSize } from 'react-native-google-mobile-ads';

import HomeScreenStyle from './HomeScreenStyle';
import { Colors } from '../../assets/colors';
import recipes from '../../assets/data/data';
import categories from '../../assets/data/categories';
import { TestIds } from 'react-native-google-mobile-ads';

import SearchClick from '../../components/molecules/SearchClick';
import DietPickerModal from '../../components/molecules/DietPickerModal';
import FoodCard from '../../components/molecules/FoodCard';

import LanguageSwitcher from '../../components/LanguageSwitcher';
import {
  BannerAdComponent,
  AdLoadingOverlay,
} from '../../components/molecules/ads';
import { useInterstitialAd } from '../../../src/common/hooks/useInterstitialAd';

import Chip from '../../components/ui/Chip';

const ITEMS_PER_ROW = 2;
const ROWS_PER_AD = 3;

const getRowBasedList = list => {
  const result = [];
  let foodBuffer = [];
  let rowIndex = 0;
  let adIndex = 0;

  list.forEach((item, index) => {
    foodBuffer.push(item);

    if (foodBuffer.length === ITEMS_PER_ROW) {
      result.push({
        type: 'row',
        id: `row-${rowIndex}`,
        items: [...foodBuffer],
      });
      foodBuffer = [];
      rowIndex++;

      if (rowIndex % ROWS_PER_AD === 0 && index < list.length - 1) {
        result.push({
          type: 'ad',
          id: `ad-${rowIndex}`,
          adIndex: adIndex,
        });
        adIndex++;
      }
    }
  });

  if (foodBuffer.length > 0) {
    result.push({
      type: 'row',
      id: `row-${rowIndex}`,
      items: [...foodBuffer],
    });
  }

  return result;
};

const HomeScreen = props => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const { isLoading: isAdLoading, showAdThenNavigate } = useInterstitialAd();

  const [selectedCategorySlug, setSelectedCategorySlug] = useState('all');
  const [dietFilter, setDietFilter] = useState('all');

  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showDietModal, setShowDietModal] = useState(false);

  const getLocalizedGreeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return t('greeting.morning');
    if (hour >= 12 && hour < 17) return t('greeting.afternoon');
    if (hour >= 17 && hour < 21) return t('greeting.evening');
    return t('greeting.night');
  }, [t]);

  const getLocalizedCategoryName = categoryKey => {
    const safeCategory = (categoryKey || '').toLowerCase().replace(/\s+/g, '');
    const translationKey = `categories.items.${safeCategory}.name`;
    const translated = t(translationKey, { defaultValue: '' });

    if (categoryKey === 'all') return t('filters.all');

    return translated && translated !== translationKey
      ? translated
      : categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1);
  };

  const filteredRecipes = useMemo(() => {
    let result = recipes;

    if (selectedCategorySlug !== 'all') {
      result = result.filter(item =>
        item.meta.categoryIds.includes(selectedCategorySlug),
      );
    }

    if (dietFilter !== 'all') {
      const isVegRequired = dietFilter === 'veg';
      result = result.filter(item => item.meta.isVeg === isVegRequired);
    }

    return result;
  }, [selectedCategorySlug, dietFilter]);

  const currentList = useMemo(
    () => getRowBasedList(filteredRecipes),
    [filteredRecipes],
  );

  const handleCategoryPress = categorySlug => {
    setSelectedCategorySlug(categorySlug);
  };

  const handleDietSelect = diet => {
    setDietFilter(diet);
  };

  const gotoDetail = useCallback(
    food => {
      const navigationData = {
        food: food,
      };

      showAdThenNavigate(() => {
        navigation.navigate('DetailsScreen', navigationData);
      });
    },
    [navigation, showAdThenNavigate],
  );

  const getDietIconInfo = () => {
    switch (dietFilter) {
      case 'veg':
        return { text: '🥬', borderColor: '#4CAF50' };
      case 'non-veg':
        return { text: '🥩', borderColor: '#E53935' };
      default:
        return { text: '🍽️', borderColor: '#EFEFEF' };
    }
  };

  const dietInfo = getDietIconInfo();

  const PRODUCTION_AD_UNIT_IDS = [
    'ca-app-pub-2888315269414105/2637642671',
    'ca-app-pub-2888315269414105/9861526576',
    'ca-app-pub-2888315269414105/7235363236',
    'ca-app-pub-2888315269414105/9501793290',
    'ca-app-pub-2888315269414105/6385315994',
    'ca-app-pub-2888315269414105/3759152656',
  ];

  const getAdUnitId = adIndex => {
    if (__DEV__) {
      return TestIds.BANNER;
    }
    return PRODUCTION_AD_UNIT_IDS[adIndex % PRODUCTION_AD_UNIT_IDS.length];
  };

  const renderFoodRow = items => {
    return (
      <View style={HomeScreenStyle.foodRow}>
        {items.map((food, index) => (
          <View
            key={food.id}
            style={[
              HomeScreenStyle.foodCardWrapper,
              index === 0 && HomeScreenStyle.foodCardFirst,
              index === items.length - 1 && HomeScreenStyle.foodCardLast,
            ]}
          >
            <FoodCard
              food={food}
              onPress={gotoDetail}
              t={t}
              i18nLanguage={currentLanguage}
            />
          </View>
        ))}
        {items.length < ITEMS_PER_ROW && (
          <View style={HomeScreenStyle.foodCardPlaceholder} />
        )}
      </View>
    );
  };

  const renderAd = adIndex => {
    const unitId = getAdUnitId(adIndex);

    return (
      <View style={HomeScreenStyle.inFeedAdContainer}>
        <BannerAdComponent
          size={BannerAdSize.MEDIUM_RECTANGLE}
          containerStyle={HomeScreenStyle.inFeedAd}
          unitId={unitId}
        />
      </View>
    );
  };

  const renderListItem = ({ item }) => {
    if (item.type === 'ad') {
      return renderAd();
    }

    if (item.type === 'row') {
      return renderFoodRow(item.items);
    }

    return null;
  };

  const renderListFooter = () => {
    return <View style={{ height: 100 }} />;
  };

  return (
    <SafeAreaView style={HomeScreenStyle.safeArea}>
      <StatusBar
        barStyle={Platform.OS === 'android' ? 'dark-content' : 'light-content'}
        backgroundColor={Colors.slatebackground || '#FAFAFA'}
      />

      <AdLoadingOverlay
        visible={isAdLoading}
        message={t('ads.loading') || 'Loading...'}
      />

      <View style={HomeScreenStyle.fixedHeaderContainer}>
        <View style={HomeScreenStyle.headerWrapper}>
          <View style={HomeScreenStyle.topBar}>
            <View style={{ flex: 1 }}>
              <Text style={HomeScreenStyle.greetingText}>
                {getLocalizedGreeting},
              </Text>
              <Text style={HomeScreenStyle.mainTitleText}>
                {t('home.whatDoYouWant')}
              </Text>
            </View>

            <View style={HomeScreenStyle.topBarRight}>
              <TouchableOpacity
                style={[
                  HomeScreenStyle.headerIconBtn,
                  { borderColor: dietInfo.borderColor },
                ]}
                onPress={() => setShowDietModal(true)}
                activeOpacity={0.7}
              >
                <Text style={{ fontSize: 18 }}>{dietInfo.text}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={HomeScreenStyle.headerIconBtn}
                onPress={() => setShowLanguageModal(true)}
                activeOpacity={0.7}
              >
                <Text style={HomeScreenStyle.headerBtnText}>
                  {currentLanguage === 'en' ? '🇺🇸' : '🇮🇳'}
                </Text>
              </TouchableOpacity>
              <Image
                source={{
                  uri: 'https://static.vecteezy.com/system/resources/previews/019/900/322/non_2x/happy-young-cute-illustration-face-profile-png.png',
                }}
                style={HomeScreenStyle.profileImage}
              />
            </View>
          </View>

          <View style={HomeScreenStyle.searchSection}>
            <View style={HomeScreenStyle.searchBoxWrapper}>
              <SearchClick placeholder={t('search.placeholder')} />
            </View>
          </View>
        </View>

        <View style={HomeScreenStyle.categorySection}>
          <View style={HomeScreenStyle.sectionHeader}>
            <Text style={HomeScreenStyle.sectionTitle}>
              {t('home.topCategories')}
            </Text>
            <TouchableOpacity onPress={() => console.log('See All Categories')}>
              <Text style={HomeScreenStyle.seeAllText}>{t('home.seeAll')}</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={HomeScreenStyle.categoryListContainer}
          >
            {categories.map(category => {
              const isSelected = selectedCategorySlug === category.category;
              return (
                <Chip
                  key={category.category}
                  label={getLocalizedCategoryName(category.category)}
                  selected={isSelected}
                  onPress={() => handleCategoryPress(category.category)}
                  showBorder={true}
                />
              );
            })}
          </ScrollView>
        </View>
      </View>

      <View style={HomeScreenStyle.recipeListContainer}>
        <FlatList
          data={currentList}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={HomeScreenStyle.flatListContent}
          renderItem={renderListItem}
          ListFooterComponent={renderListFooter}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          windowSize={10}
          initialNumToRender={6}
        />
      </View>

      <View style={HomeScreenStyle.bottomBannerContainer}>
        <BannerAdComponent
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          containerStyle={HomeScreenStyle.bottomBanner}
        />
      </View>

      <Modal
        visible={showLanguageModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <View style={HomeScreenStyle.modalOverlay}>
          <View style={HomeScreenStyle.modalContentBottom}>
            <LanguageSwitcher onClose={() => setShowLanguageModal(false)} />
          </View>
        </View>
      </Modal>
      <DietPickerModal
        isVisible={showDietModal}
        onClose={() => setShowDietModal(false)}
        onSelect={handleDietSelect}
        currentFilter={dietFilter}
        t={t}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
