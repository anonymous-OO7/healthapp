import React, { useState, useCallback, useMemo } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  TouchableHighlight,
  StatusBar,
  Modal,
  Platform,
} from 'react-native';

import { useNavigation } from '@react-navigation/core';
import { useTranslation } from 'react-i18next';
import { BannerAdSize } from 'react-native-google-mobile-ads';

import HomeScreenStyle from './HomeScreenStyle';
import { Colors } from '../../assets/colors';
import recipes from '../../assets/data/data';
import categories from '../../assets/data/categories';

// import { recipies } from '../../assets/data'; // Removing this import

import LogoViewer from '../../components/common/LogoViewer';
import SearchClick from '../../components/molecules/SearchClick';
import VegNon from '../../components/common/VegNon';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import {
  BannerAdComponent,
  AdLoadingOverlay,
} from '../../components/molecules/ads';
import { useInterstitialAd } from '../../../src/common/hooks/useInterstitialAd';

import { StarRating } from '../../assets/images/SvgImages';
import { SCREEN_WIDTH } from '../DetailsPage/DetailsScreenStyle';
import Chip from '../../components/ui/Chip';

const FoodCard = ({ food, onPress, t, i18nLanguage }) => {
  const localizedTitle =
    food.content[i18nLanguage]?.title || food.content.en.title;
  const deliveryTime = food.meta.totalTimeString || '30 min';
  const rating = food.meta.rating;
  const isVeg = food.meta.isVeg;

  const getLocalizedPrimaryCategoryName = () => {
    const primaryCategorySlug = food.meta.categoryIds[0];
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
  };

  return (
    <TouchableHighlight
      underlayColor="transparent"
      activeOpacity={0.9}
      onPress={() => onPress(food)}
      style={HomeScreenStyle.cardContainer}
    >
      <View style={HomeScreenStyle.cardInner}>
        <View style={HomeScreenStyle.cardImageContainer}>
          <Image
            source={{ uri: food.meta.thumbnail || food.meta.images[0] }}
            style={HomeScreenStyle.cardImage}
            resizeMode="cover"
          />
          <View style={HomeScreenStyle.ratingBadge}>
            <LogoViewer
              Logosource={StarRating}
              containerstyle={{ width: 10, height: 10 }}
              logostyle={{ width: 10, height: 10 }}
            />
            <Text style={HomeScreenStyle.ratingBadgeText}>{rating}</Text>
          </View>
        </View>
        <View style={HomeScreenStyle.cardContent}>
          <Text style={HomeScreenStyle.cardTitle} numberOfLines={1}>
            {localizedTitle}
          </Text>
          <Text style={HomeScreenStyle.cardSubTitle} numberOfLines={1}>
            {getLocalizedPrimaryCategoryName()}
          </Text>
          <View style={HomeScreenStyle.cardFooter}>
            <View style={HomeScreenStyle.metaRow}>
              <VegNon isVeg={isVeg} size={14} />
              <View style={HomeScreenStyle.verticalDivider} />
              <Text style={HomeScreenStyle.timeText}>{deliveryTime}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const DietPickerModal = ({
  isVisible,
  onClose,
  onSelect,
  currentFilter,
  t,
}) => {
  const options = [
    { key: 'all', label: t('filters.all'), color: '#999' },
    { key: 'veg', label: t('filters.veg'), color: '#4CAF50' },
    { key: 'non-veg', label: t('filters.nonVeg'), color: '#E53935' },
  ];

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={HomeScreenStyle.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={HomeScreenStyle.modalContentCenter}>
          <Text style={HomeScreenStyle.modalTitle}>
            {t('filters.selectDiet')}
          </Text>
          {options.map(opt => (
            <TouchableOpacity
              key={opt.key}
              style={HomeScreenStyle.dietOptionItem}
              onPress={() => {
                onSelect(opt.key);
                onClose();
              }}
            >
              <View
                style={[
                  HomeScreenStyle.dietOptionDot,
                  { backgroundColor: opt.color },
                ]}
              />
              <Text
                style={[
                  HomeScreenStyle.dietOptionText,
                  currentFilter === opt.key && {
                    fontWeight: '700',
                    color: opt.color,
                  },
                ]}
              >
                {opt.label}
              </Text>
              {currentFilter === opt.key && (
                <Text style={{ marginLeft: 'auto', color: opt.color }}>✓</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
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

  const getLocalizedGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return t('greeting.morning');
    if (hour >= 12 && hour < 17) return t('greeting.afternoon');
    if (hour >= 17 && hour < 21) return t('greeting.evening');
    return t('greeting.night');
  };

  const getLocalizedCategoryName = categoryKey => {
    const safeCategory = (categoryKey || '').toLowerCase().replace(/\s+/g, '');
    const translationKey = `categories.items.${safeCategory}.name`;
    const translated = t(translationKey, { defaultValue: '' });

    if (categoryKey === 'all') return t('filters.all');

    return translated && translated !== translationKey
      ? translated
      : categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1);
  };

  const currentList = useMemo(() => {
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
  }, [recipes, selectedCategorySlug, dietFilter]);

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

  const resetFilters = () => {
    setSelectedCategorySlug('all');
    setDietFilter('all');
  };

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
                {getLocalizedGreeting()},
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
          keyExtractor={item => `recipe-${item.id}`}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            HomeScreenStyle.flatListContent,
            { paddingBottom: 80 },
          ]}
          columnWrapperStyle={HomeScreenStyle.columnWrapper}
          renderItem={({ item }) => (
            <FoodCard
              food={item}
              onPress={gotoDetail}
              t={t}
              i18nLanguage={currentLanguage}
            />
          )}
          ListEmptyComponent={() => (
            <View style={HomeScreenStyle.emptyContainer}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/11329/11329060.png',
                }}
                style={{
                  width: 80,
                  height: 80,
                  opacity: 0.4,
                  marginBottom: 15,
                }}
              />
              <Text style={HomeScreenStyle.emptyText}>
                {t('messages.noResults')}
              </Text>
              <TouchableOpacity
                style={HomeScreenStyle.resetButton}
                onPress={resetFilters}
              >
                <Text style={HomeScreenStyle.resetButtonText}>
                  {t('filters.reset')}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
        <View style={{ width: SCREEN_WIDTH, height: 60 }} />
      </View>

      {/* Bottom Banner Ad */}
      <View style={HomeScreenStyle.bottomBannerContainer}>
        <BannerAdComponent
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          containerStyle={HomeScreenStyle.bottomBanner}
        />
      </View>

      {/* Modals */}
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
