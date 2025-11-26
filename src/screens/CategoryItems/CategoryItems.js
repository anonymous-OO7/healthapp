import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/core';
import { useTranslation } from 'react-i18next';

// Styles & Data
import CategoryItemsStyle from './CategoryItemsStyle';
import dataArray from '../../assets/data/data';
import { recipies } from '../../assets/data'; // Ensure this imports your video list object

// Components
import DishCategory from '../../components/molecules/DishCategory';
import LogoViewer from '../../components/common/LogoViewer';
import { BackSvg } from '../../assets/images/SvgImages';

const CategoryItems = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { t } = useTranslation();

  // Get category from params (default to 'all' if undefined)
  const categoryCurrent = route.params?.category || 'all';

  const [currentList, setCurrentList] = useState([]);

  useEffect(() => {
    filterData();
  }, [categoryCurrent]);

  const filterData = () => {
    let filtered = [];
    if (categoryCurrent === 'all') {
      filtered = dataArray;
    } else {
      // Case-insensitive comparison
      filtered = dataArray.filter(
        item => item.category?.toLowerCase() === categoryCurrent.toLowerCase(),
      );
    }
    setCurrentList(filtered);
  };

  // --- Navigation Handler ---
  const gotoDetail = food => {
    // Get the video list for this food item
    const videoList = recipies[food.name] || [];

    navigation.navigate('DetailsScreen', {
      food: food,
      list: videoList,
    });
  };

  // Helper for Title Translation
  const getLocalizedCategoryTitle = () => {
    if (categoryCurrent === 'all') return t('filters.all');

    const safeCategory = categoryCurrent.toLowerCase().replace(/\s+/g, '');
    const key = `categories.items.${safeCategory}.name`;
    const translated = t(key, { defaultValue: '' });

    return translated && translated !== key
      ? translated
      : categoryCurrent.charAt(0).toUpperCase() + categoryCurrent.slice(1);
  };

  const renderHeader = () => (
    <View style={CategoryItemsStyle.headerContainer}>
      <TouchableOpacity
        style={CategoryItemsStyle.backButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <LogoViewer
          Logosource={BackSvg}
          containerstyle={{ width: 20, height: 20 }}
          logostyle={{ width: 20, height: 20, tintColor: '#000' }}
        />
      </TouchableOpacity>
      <View>
        <Text style={CategoryItemsStyle.headerTitle}>
          {getLocalizedCategoryTitle()}
        </Text>
        <Text style={CategoryItemsStyle.itemCountText}>
          {currentList.length}{' '}
          {currentList.length === 1 ? t('recipe.recipe') : t('recipe.recipes')}{' '}
          {t('messages.found')}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={CategoryItemsStyle.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {renderHeader()}

      <View style={CategoryItemsStyle.container}>
        <FlatList
          data={currentList}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : index.toString()
          }
          contentContainerStyle={CategoryItemsStyle.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            // Wrap DishCategory in TouchableOpacity to handle navigation
            <TouchableOpacity
              activeOpacity={0.95}
              onPress={() => gotoDetail(item)}
              style={{ marginBottom: 15 }} // Add spacing between items
            >
              {/* Pass 't' to localize text inside DishCategory if needed */}
              <DishCategory info={item} />
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => (
            <View style={CategoryItemsStyle.emptyContainer}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/11329/11329060.png',
                }}
                style={CategoryItemsStyle.emptyImage}
              />
              <Text style={CategoryItemsStyle.emptyText}>
                {t('messages.noResults')}
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default CategoryItems;
