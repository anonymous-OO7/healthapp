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
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { SafeAreaView } from 'react-native-safe-area-context';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useTheme } from '../../themes';
import { PrimaryButton } from '../../components/common/AppButton/Button';

const { width, height } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    image: require('../../assets/images/LandingImage1.png'),
    title: 'Discover Recipes',
    subtitle:
      'Explore delicious recipes from around the world and add ingredients to your cart instantly.',
  },
  {
    id: '2',
    image: require('../../assets/images/LandingImage2.png'),
    title: 'Watch & Cook',
    subtitle:
      'Learn with step-by-step video tutorials and cook your favorite dishes with ease.',
  },
  {
    id: '3',
    image: require('../../assets/images/LandingImage3.png'),
    title: 'Workout & Health',
    subtitle:
      'Follow guided workouts, track calories burned, and monitor your health progress.',
  },
];

const LandingScreen = () => {
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const { colors, fonts } = useTheme();
  const styles = createStyles(colors, fonts);

  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex !== SLIDES.length) {
      const offset = nextSlideIndex * width;
      flatListRef?.current?.scrollToOffset({ offset });
      setCurrentSlideIndex(nextSlideIndex);
    } else {
      navigation.replace('DrawerPage');
    }
  };

  const skip = () => {
    const lastSlideIndex = SLIDES.length - 1;
    const offset = lastSlideIndex * width;
    flatListRef?.current?.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };

  const Slide = ({ item }) => {
    return (
      <View style={styles.slideContainer}>
        <View style={styles.imageWrapper}>
          <View style={styles.imageInnerContainer}>
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        </View>
        <View style={styles.textBlock}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />

      {/* Header with Skip Button */}
      <View style={styles.header}>
        {currentSlideIndex < SLIDES.length - 1 && (
          <TouchableOpacity onPress={skip}>
            <Text style={styles.skipText}>Skip</Text>
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
      <View style={styles.footer}>
        {/* Indicators */}
        <View style={styles.indicatorContainer}>
          {SLIDES.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex === index && styles.activeIndicator,
              ]}
            />
          ))}
        </View>

        {/* Action Button */}
        <View style={styles.buttonContainer}>
          <PrimaryButton
            onPress={goNextSlide}
            title={
              currentSlideIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'
            }
            backgroundColor={colors.buttonPrimary}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LandingScreen;

const createStyles = (colors, fonts) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    header: {
      height: 50,
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingHorizontal: 20,
    },
    skipText: {
      color: colors.buttonPrimary,
      fontFamily: fonts?.medium || 'Poppins-Medium',
      fontSize: 15,
    },
    slideContainer: {
      width: width,
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    imageWrapper: {
      width: '90%',
      height: '40%',
      marginTop: 20,
      borderRadius: 24,
      backgroundColor: colors.imageBackground || '#F8F8F8',
      // Shadow for iOS
      shadowColor: colors.black || '#000',
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      // Shadow for Android
      elevation: 10,
      overflow: 'hidden',
    },
    imageInnerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    textBlock: {
      marginTop: 30,
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    title: {
      fontSize: responsiveFontSize(3),
      fontFamily: fonts?.semiBold || 'Poppins-SemiBold',
      color: colors.black,
      textAlign: 'center',
      marginBottom: 12,
      letterSpacing: 0.3,
    },
    subtitle: {
      fontSize: responsiveFontSize(1.8),
      fontFamily: fonts?.regular || 'Poppins-Regular',
      color: colors.grey || '#888888',
      textAlign: 'center',
      lineHeight: 22,
      maxWidth: '90%',
      letterSpacing: 0.2,
    },
    footer: {
      height: height * 0.2,
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
      height: 8,
      width: 8,
      backgroundColor: colors.lightGrey || '#E0E0E0',
      marginHorizontal: 4,
      borderRadius: 4,
    },
    activeIndicator: {
      backgroundColor: colors.buttonPrimary,
      width: 25,
    },
    buttonContainer: {
      marginBottom: 10,
    },
  });
