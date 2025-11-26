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

// Styles & Assets
import HomeScreenStyle from './HomeScreenStyle';
import { Colors } from '../../assets/colors';
import dataArray from '../../assets/data/data';
import categories from '../../assets/data/categories';
import { recipies } from '../../assets/data';

// Components
import LogoViewer from '../../components/common/LogoViewer';
import SearchClick from '../../components/molecules/SearchClick';
import VegNon from '../../components/common/VegNon';
import LanguageSwitcher from '../../components/LanguageSwitcher';

// Icons
import { Help, ProteinSvg, StarRating } from '../../assets/images/SvgImages';

/**
 * Food Card Component
 */
const FoodCard = ({ food, onPress, t }) => {
  // 1. Get Localized Recipe Name
  const getLocalizedRecipeName = () => {
    const safeName = (food.name || '').toLowerCase().replace(/\s+/g, '');
    const key = `recipes.items.${safeName}.name`;
    const translated = t(key, { defaultValue: '' });
    return translated && translated !== key
      ? translated
      : food.display || food.name;
  };

  // 2. Get Localized Category Name
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
        {/* Image Section */}
        <View style={HomeScreenStyle.cardImageContainer}>
          <Image
            source={{ uri: food.image }}
            style={HomeScreenStyle.cardImage}
            resizeMode="cover"
          />
          {/* Optional: Rating Badge on Image */}
          <View style={HomeScreenStyle.ratingBadge}>
            <LogoViewer
              Logosource={StarRating}
              containerstyle={{ width: 10, height: 10 }}
              logostyle={{ width: 10, height: 10 }}
            />
            <Text style={HomeScreenStyle.ratingBadgeText}>{food.rating}</Text>
          </View>
        </View>

        {/* Text Section */}
        <View style={HomeScreenStyle.cardContent}>
          <Text style={HomeScreenStyle.cardTitle} numberOfLines={1}>
            {getLocalizedRecipeName()}
          </Text>
          <Text style={HomeScreenStyle.cardSubTitle} numberOfLines={1}>
            {getLocalizedCategory()}
          </Text>

          {/* Footer Info (Veg/Time/Cals) */}
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
 * Language Toggle Button Component
 */
const LanguageToggleButton = ({ currentLang, onPress }) => {
  return (
    <TouchableOpacity
      style={HomeScreenStyle.languageButton}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={HomeScreenStyle.languageButtonText}>
        {currentLang === 'en' ? ' 🇺🇸' : '🇮🇳'}
      </Text>
    </TouchableOpacity>
  );
};

/**
 * Main Home Screen
 */
const HomeScreen = props => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();

  const [currentList, setCurrentList] = useState(dataArray);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState('all');
  const [showLanguageModal, setShowLanguageModal] = useState(false);

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

  const gotoDetail = food => {
    navigation.navigate('DetailsScreen', {
      food: food,
      list: recipies[food.name] || [],
    });
  };

  const handleFilter = useCallback(selected_category => {
    setSelectedCategoryIndex(selected_category);
    if (selected_category === 'all') {
      setCurrentList(dataArray);
    } else {
      const filteredData = dataArray.filter(
        item => item.category === selected_category,
      );
      setCurrentList(filteredData);
    }
  }, []);

  // --- Header Component ---
  const renderHeader = () => (
    <View style={HomeScreenStyle.headerWrapper}>
      {/* Top Section */}
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
          <LanguageToggleButton
            currentLang={i18n.language}
            onPress={() => setShowLanguageModal(true)}
          />
          <Image
            source={{
              uri: 'https://static.vecteezy.com/system/resources/previews/019/900/322/non_2x/happy-young-cute-illustration-face-profile-png.png',
            }}
            style={HomeScreenStyle.profileImage}
          />
        </View>
      </View>

      {/* Search Section */}
      <View style={HomeScreenStyle.searchSection}>
        <View style={HomeScreenStyle.searchBoxWrapper}>
          <SearchClick placeholder={t('search.placeholder')} />
        </View>
        <TouchableOpacity style={HomeScreenStyle.filterBtn} activeOpacity={0.8}>
          {/* Replaced Help with Filter icon concept (sliders) */}
          <LogoViewer
            Logosource={Help}
            containerstyle={{ width: 20, height: 20 }}
            logostyle={{ width: 20, height: 20, tintColor: Colors.white }}
          />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <View style={HomeScreenStyle.sectionHeader}>
        <Text style={HomeScreenStyle.sectionTitle}>
          {t('home.topCategories')}
        </Text>
        <TouchableOpacity>
          <Text style={HomeScreenStyle.seeAllText}>{t('home.seeAll')}</Text>
        </TouchableOpacity>
      </View>

      <View>
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
                onPress={() => handleFilter(category.category)}
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

      {/* Popular Recipes Title */}
      <View style={[HomeScreenStyle.sectionHeader, { marginTop: 20 }]}>
        <Text style={HomeScreenStyle.sectionTitle}>
          {t('home.popularRecipes')}
        </Text>
        <TouchableOpacity>
          <Text style={HomeScreenStyle.seeAllText}>{t('home.seeAll')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyList = () => (
    <View style={HomeScreenStyle.emptyContainer}>
      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/11329/11329060.png',
        }}
        style={{ width: 100, height: 100, opacity: 0.5, marginBottom: 20 }}
      />
      <Text style={HomeScreenStyle.emptyText}>{t('messages.noResults')}</Text>
      <TouchableOpacity
        style={HomeScreenStyle.resetButton}
        onPress={() => handleFilter('all')}
      >
        <Text style={HomeScreenStyle.resetButtonText}>{t('filters.all')}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={HomeScreenStyle.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={currentList}
          keyExtractor={(item, index) => `recipe-${item.id || index}`}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmptyList}
          renderItem={({ item }) => (
            <FoodCard food={item} onPress={gotoDetail} t={t} />
          )}
          columnWrapperStyle={HomeScreenStyle.columnWrapper}
          contentContainerStyle={HomeScreenStyle.flatListContent}
        />
      </SafeAreaView>

      <Modal
        visible={showLanguageModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <View style={HomeScreenStyle.modalOverlay}>
          <View style={HomeScreenStyle.modalContent}>
            <LanguageSwitcher onClose={() => setShowLanguageModal(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;
