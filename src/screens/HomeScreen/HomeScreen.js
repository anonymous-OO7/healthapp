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
  Dimensions,
  StatusBar,
} from 'react-native';

import { useNavigation } from '@react-navigation/core';
import { responsiveWidth } from 'react-native-responsive-dimensions';

// Styles & Assets
import HomeScreenStyle from './HomeScreenStyle';
import { Colors } from '../../assets/colors';
import dataArray from '../../assets/data/data';
import categories from '../../assets/data/categories';
import { recipies } from '../../assets/data'; // Check spelling 'recipies' vs 'recipes'
import { getGreeting } from '../../utils/UtilFunctions';

// Components
import LogoViewer from '../../components/common/LogoViewer';
import SearchClick from '../../components/molecules/SearchClick';
import VegNon from '../../components/common/VegNon';

// Icons
import { Help, ProteinSvg, StarRating } from '../../assets/images/SvgImages';

const { width } = Dimensions.get('window');

/**
 * Render Item for the Food Card
 * Extracted outside for better performance (avoids re-creation on render)
 */
const FoodCard = ({ food, onPress }) => {
  return (
    <TouchableHighlight
      underlayColor={Colors.white}
      activeOpacity={0.95}
      onPress={() => onPress(food)}
      style={HomeScreenStyle.cardContainer}
    >
      <View style={{ flex: 1 }}>
        {/* Image Section */}
        <View style={HomeScreenStyle.cardImageContainer}>
          <Image
            source={{ uri: food.image }}
            style={HomeScreenStyle.cardImage}
            resizeMode="cover"
          />
        </View>

        {/* Text Section */}
        <View style={HomeScreenStyle.cardContent}>
          <Text style={HomeScreenStyle.cardTitle} numberOfLines={1}>
            {food.display}
          </Text>
          <Text style={HomeScreenStyle.cardSubTitle} numberOfLines={1}>
            {food.category}
          </Text>
        </View>

        {/* Footer Info Section - Pushed to bottom of card */}
        <View style={HomeScreenStyle.cardFooter}>
          {/* Veg/Non-Veg Icon */}
          <VegNon disabled={food.veg} />

          {/* Rating */}
          <View style={HomeScreenStyle.ratingContainer}>
            <LogoViewer
              Logosource={StarRating}
              containerstyle={{ width: 12, height: 12 }}
              logostyle={HomeScreenStyle.iconSmall}
            />
            <Text style={HomeScreenStyle.ratingText}>{food.rating}</Text>
          </View>

          {/* Protein/Calories Icon */}
          <LogoViewer
            Logosource={ProteinSvg}
            containerstyle={{ width: 14, height: 14 }}
            logostyle={HomeScreenStyle.iconSmall}
          />
        </View>
      </View>
    </TouchableHighlight>
  );
};

const HomeScreen = props => {
  const navigation = useNavigation();
  const [currentList, setCurrentList] = useState(dataArray);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState('all');

  // Navigation Handler
  const gotoDetail = food => {
    navigation.navigate('DetailsScreen', {
      food: food,
      list: recipies[food.name] || [], // Handle potential undefined
    });
  };

  // Filter Logic
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

  /**
   * Header Component
   * Contains Greeting, Search, and Horizontal Categories
   * This scrolls WITH the list.
   */
  const renderHeader = () => (
    <View>
      {/* Top Section: Greeting & Profile */}
      <View style={HomeScreenStyle.headerContainer}>
        <View>
          <Text style={HomeScreenStyle.greetingText}>{getGreeting()},</Text>
          <Text style={HomeScreenStyle.mainTitleText}>
            What do you want today?
          </Text>
        </View>
        <Image
          source={{
            uri: 'https://static.vecteezy.com/system/resources/previews/019/900/322/non_2x/happy-young-cute-illustration-face-profile-png.png',
          }}
          style={HomeScreenStyle.profileImage}
        />
      </View>

      {/* Search Section */}
      <View style={HomeScreenStyle.searchContainer}>
        <View style={{ flex: 1 }}>
          <SearchClick />
        </View>
        <TouchableOpacity
          style={HomeScreenStyle.sortButton}
          activeOpacity={0.8}
        >
          <LogoViewer
            Logosource={Help}
            containerstyle={{ width: 20, height: 20 }}
            logostyle={{ width: 20, height: 20 }}
          />
        </TouchableOpacity>
      </View>

      {/* Categories Section */}
      <Text style={HomeScreenStyle.sectionTitle}>Top Categories</Text>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={HomeScreenStyle.categoryScrollContainer}
        >
          {categories.map((category, index) => {
            const isSelected = selectedCategoryIndex === category.category;
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => handleFilter(category.category)}
              >
                <View
                  style={[
                    HomeScreenStyle.categoryBtn,
                    {
                      backgroundColor: isSelected
                        ? Colors.primary
                        : Colors.secondary,
                    },
                  ]}
                >
                  <View style={HomeScreenStyle.categoryIconContainer}>
                    <Image
                      source={category.image}
                      style={{ height: 25, width: 25, resizeMode: 'contain' }}
                    />
                  </View>
                  <Text
                    style={[
                      HomeScreenStyle.categoryText,
                      { color: isSelected ? Colors.white : Colors.primary },
                    ]}
                  >
                    {category.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );

  return (
    <View style={HomeScreenStyle.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.slatebackground}
      />

      {/* Fixed Decorative Background */}
      <View style={HomeScreenStyle.ovalBackground} />

      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={currentList}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          // Use the Header Component here so it scrolls with content
          ListHeaderComponent={renderHeader}
          renderItem={({ item }) => (
            <FoodCard food={item} onPress={gotoDetail} />
          )}
          // Padding for Grid items to be centered
          columnWrapperStyle={{
            justifyContent: 'space-between',
            paddingHorizontal: responsiveWidth(2),
          }}
          // Vital: Add padding at bottom so Floating Tab Bar doesn't cover content
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
