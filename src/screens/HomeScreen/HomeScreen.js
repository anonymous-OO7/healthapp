import React, { useState, useCallback } from 'react';
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
} from 'react-native';

import { useNavigation } from '@react-navigation/core';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { useTranslation } from 'react-i18next';

import HomeScreenStyle from './HomeScreenStyle';
import { Colors } from '../../assets/colors';
import dataArray from '../../assets/data/data';
import categories from '../../assets/data/categories';
import { recipies } from '../../assets/data';

import LogoViewer from '../../components/common/LogoViewer';
import SearchClick from '../../components/molecules/SearchClick';
import VegNon from '../../components/common/VegNon';
import LanguageSwitcher from '../../components/LanguageSwitcher';

import { Help, ProteinSvg, StarRating } from '../../assets/images/SvgImages';

/**
 * Food Card Component
 */
const FoodCard = ({ food, onPress, t }) => {
  const getLocalizedRecipeName = () => {
    const safeName = (food.name || '').toLowerCase().replace(/\s+/g, '');
    const key = `recipes.items.${safeName}.name`;
    const translated = t(key, { defaultValue: '' });
    return translated && translated !== key
      ? translated
      : food.display || food.name;
  };

  const getLocalizedCategory = () => {
    const safeCategory = (food.category || '')
      .toLowerCase()
      .replace(/\s+/g, '');
    const key = `categories.items.${safeCategory}.name`;
    const translated = t(key, { defaultValue: '' });
    return translated && translated !== key
      ? translated
      : food.category.charAt(0).toUpperCase() + food.category.slice(1);
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
            source={{ uri: food.image }}
            style={HomeScreenStyle.cardImage}
            resizeMode="cover"
          />
          <View style={HomeScreenStyle.ratingBadge}>
            <LogoViewer
              Logosource={StarRating}
              containerstyle={{ width: 10, height: 10 }}
              logostyle={{ width: 10, height: 10 }}
            />
            <Text style={HomeScreenStyle.ratingBadgeText}>{food.rating}</Text>
          </View>
        </View>
        <View style={HomeScreenStyle.cardContent}>
          <Text style={HomeScreenStyle.cardTitle} numberOfLines={1}>
            {getLocalizedRecipeName()}
          </Text>
          <Text style={HomeScreenStyle.cardSubTitle} numberOfLines={1}>
            {getLocalizedCategory()}
          </Text>
          <View style={HomeScreenStyle.cardFooter}>
            <View style={HomeScreenStyle.metaRow}>
              <VegNon disabled={food.veg} size={14} />
              <View style={HomeScreenStyle.verticalDivider} />
              <Text style={HomeScreenStyle.timeText}>
                {food.deliveryTime || '30 min'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

/**
 * Diet Filter Picker Modal
 */
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
          <Text style={HomeScreenStyle.modalTitle}>Select Diet Type</Text>
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

  const [currentList, setCurrentList] = useState(dataArray);

  // --- Filter States ---
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState('all');
  const [dietFilter, setDietFilter] = useState('all'); // 'all', 'veg', 'non-veg'

  // --- Modals ---
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showDietModal, setShowDietModal] = useState(false);

  // --- Translations ---
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
    return translated && translated !== translationKey
      ? translated
      : categoryKey === 'all'
      ? 'All'
      : categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1);
  };

  // --- Filtering Logic ---
  const applyFilters = useCallback((category, diet) => {
    let result = dataArray;

    // 1. Filter by Category
    if (category !== 'all') {
      result = result.filter(item => item.category === category);
    }

    // 2. Filter by Diet
    if (diet !== 'all') {
      const isVegRequired = diet === 'veg';
      result = result.filter(item => item.veg === isVegRequired);
    }

    setCurrentList(result);
  }, []);

  const handleCategoryPress = category => {
    setSelectedCategoryIndex(category);
    applyFilters(category, dietFilter);
  };

  const handleDietSelect = diet => {
    setDietFilter(diet);
    applyFilters(selectedCategoryIndex, diet);
  };

  const gotoDetail = food => {
    navigation.navigate('DetailsScreen', {
      food: food,
      list: recipies[food.name] || [],
    });
  };

  const resetFilters = () => {
    setSelectedCategoryIndex('all');
    setDietFilter('all');
    setCurrentList(dataArray);
  };

  // Helper to get Diet Icon/Color for the header button
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
        barStyle="dark-content"
        backgroundColor={Colors.slatebackground || '#FAFAFA'}
      />

      {/* --- FIXED HEADER SECTION --- */}
      <View style={HomeScreenStyle.fixedHeaderContainer}>
        <View style={HomeScreenStyle.headerWrapper}>
          {/* Top Bar: Greeting + Controls */}
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
              {/* Diet Selector Dropdown Button */}
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

              {/* Language Selector Button */}
              <TouchableOpacity
                style={HomeScreenStyle.headerIconBtn}
                onPress={() => setShowLanguageModal(true)}
                activeOpacity={0.7}
              >
                <Text style={HomeScreenStyle.headerBtnText}>
                  {i18n.language === 'en' ? '🇺🇸' : '🇮🇳'}
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

          {/* Search & Filter Icon */}
          <View style={HomeScreenStyle.searchSection}>
            <View style={HomeScreenStyle.searchBoxWrapper}>
              <SearchClick placeholder={t('search.placeholder')} />
            </View>
            <TouchableOpacity
              style={HomeScreenStyle.filterBtn}
              activeOpacity={0.8}
            >
              <LogoViewer
                Logosource={Help}
                containerstyle={{ width: 20, height: 20 }}
                logostyle={{ width: 20, height: 20, tintColor: '#FFF' }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories Horizontal List */}
        <View style={HomeScreenStyle.categorySection}>
          <View style={HomeScreenStyle.sectionHeader}>
            <Text style={HomeScreenStyle.sectionTitle}>
              {t('home.topCategories')}
            </Text>
            <TouchableOpacity>
              <Text style={HomeScreenStyle.seeAllText}>{t('home.seeAll')}</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={HomeScreenStyle.categoryListContainer}
          >
            {categories.map((category, index) => {
              const isSelected = selectedCategoryIndex === category.category;
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  onPress={() => handleCategoryPress(category.category)}
                  style={[
                    HomeScreenStyle.categoryPill,
                    isSelected && HomeScreenStyle.categoryPillSelected,
                  ]}
                >
                  <View style={HomeScreenStyle.categoryIconBox}>
                    <Image
                      source={category.image}
                      style={HomeScreenStyle.categoryIcon}
                    />
                  </View>
                  <Text
                    style={[
                      HomeScreenStyle.categoryText,
                      isSelected && HomeScreenStyle.categoryTextSelected,
                    ]}
                  >
                    {getLocalizedCategoryName(category.category)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>

      {/* --- SCROLLABLE RECIPE LIST --- */}
      <View style={HomeScreenStyle.recipeListContainer}>
        <View style={HomeScreenStyle.listTitleRow}>
          <Text style={HomeScreenStyle.sectionTitle}>
            {t('home.popularRecipes')}
          </Text>
          <TouchableOpacity>
            <Text style={HomeScreenStyle.seeAllText}>{t('home.seeAll')}</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={currentList}
          keyExtractor={(item, index) => `recipe-${item.id || index}`}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={HomeScreenStyle.flatListContent}
          columnWrapperStyle={HomeScreenStyle.columnWrapper}
          renderItem={({ item }) => (
            <FoodCard food={item} onPress={gotoDetail} t={t} />
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
                  {t('filters.all')}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      {/* --- MODALS --- */}

      {/* 1. Language Modal */}
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

      {/* 2. Diet Selection Modal */}
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
