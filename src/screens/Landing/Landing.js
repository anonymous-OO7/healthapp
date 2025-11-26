import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../assets/colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

// Reusing your existing button component
import { PrimaryButton } from '../../components/common/AppButton/Button';

const { width, height } = Dimensions.get('window');

// 1. Define the slides data
const SLIDES = [
  {
    id: '1',
    image: require('../../assets/images/onboardImage.png'), // You can use different images for each slide if you have them
    title: 'Discover Recipes',
    subtitle:
      'Explore thousands of delicious recipes and find your next favorite meal.',
  },
  {
    id: '2',
    image: require('../../assets/images/onboardImage.png'), // Replace with a video/play icon image if available
    title: 'Watch & Cook',
    subtitle:
      'Follow along with step-by-step video tutorials for perfect results every time.',
  },
  {
    id: '3',
    image: require('../../assets/images/onboardImage.png'), // Replace with a cart/shopping image if available
    title: 'Smart Shopping',
    subtitle:
      'Add ingredients directly to your cart and never miss an item again.',
  },
];

const LandingScreen = () => {
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Handle Scroll to update indicator
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  // Handle "Next" or "Get Started"
  const goNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex !== SLIDES.length) {
      const offset = nextSlideIndex * width;
      flatListRef?.current?.scrollToOffset({ offset });
      setCurrentSlideIndex(nextSlideIndex);
    } else {
      navigation.replace('DashBoard');
    }
  };

  // Handle "Skip"
  const skip = () => {
    const lastSlideIndex = SLIDES.length - 1;
    const offset = lastSlideIndex * width;
    flatListRef?.current?.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };

  // Render a single slide item
  const Slide = ({ item }) => {
    return (
      <View style={style.slideContainer}>
        <Image source={item.image} style={style.image} resizeMode="contain" />
        <View style={style.textBlock}>
          <Text style={style.title}>{item.title}</Text>
          <Text style={style.subtitle}>{item.subtitle}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={style.container}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />

      {/* Header with Skip Button */}
      <View style={style.header}>
        {currentSlideIndex < SLIDES.length - 1 && (
          <TouchableOpacity onPress={skip}>
            <Text style={style.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Slider List */}
      <FlatList
        ref={flatListRef}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{ height: height * 0.75 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={SLIDES}
        pagingEnabled
        bounces={false}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Slide item={item} />}
      />

      {/* Footer (Indicators + Button) */}
      <View style={style.footer}>
        {/* Indicators */}
        <View style={style.indicatorContainer}>
          {SLIDES.map((_, index) => (
            <View
              key={index}
              style={[
                style.indicator,
                currentSlideIndex === index && style.activeIndicator,
              ]}
            />
          ))}
        </View>

        {/* Action Button */}
        <View style={style.buttonContainer}>
          <PrimaryButton
            onPress={goNextSlide}
            title={
              currentSlideIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LandingScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
  skipText: {
    color: Colors.primary,
    fontFamily: 'Poppins-SemiBold', // Ensure you have this font or use 'fontWeight: "bold"'
    fontSize: 16,
  },
  slideContainer: {
    width: width,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    height: '60%',
    width: '90%',
    marginTop: 20,
  },
  textBlock: {
    marginTop: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: responsiveFontSize(3.5),
    fontFamily: 'Poppins-Bold', // Or fontWeight: 'bold'
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: responsiveFontSize(2),
    fontFamily: 'Poppins-Regular',
    color: Colors.grey || '#666',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: '90%',
  },
  footer: {
    height: height * 0.2, // Bottom 20% of screen
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  indicator: {
    height: 8, // Slightly smaller for cleaner look
    width: 8,
    backgroundColor: '#E0E0E0', // Light grey
    marginHorizontal: 4,
    borderRadius: 4,
  },
  activeIndicator: {
    backgroundColor: Colors.primary,
    width: 25, // Elongated active dot
  },
  buttonContainer: {
    marginBottom: 10,
  },
});
