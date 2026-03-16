import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../themes';

// Local Imports
import VegNon from '../common/VegNon';
import LogoViewer from '../common/LogoViewer';
import { StarRating } from '../../assets/images/SvgImages';
import categories from '../../assets/data/categories';

// Utility Import
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const { width } = Dimensions.get('window');
const HORIZONTAL_PADDING_SPACE = 40;
const GAP_BETWEEN_CARDS = 15;
const CARD_WIDTH = (width - HORIZONTAL_PADDING_SPACE - GAP_BETWEEN_CARDS) / 2;

const FoodCard = ({ food, onPress }) => {
  const { t, i18n } = useTranslation();
  const { colors, fonts } = useTheme();
  const styles = createStyles(colors, fonts);
  const i18nLanguage = i18n.language;

  const localizedTitle =
    food.content[i18nLanguage]?.title || food.content.en.title;
  const deliveryTime = food.meta.totalTimeString || '30 min';
  const rating = food.meta.rating;
  const isVeg = food.meta.isVeg;
  const thumbnailUrl = food.meta.thumbnail || food.meta.images[0];
  const difficulty = food.meta.difficulty;

  const getLocalizedPrimaryCategoryName = () => {
    const primaryCategorySlug = food.meta.categoryIds?.[0];
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
      underlayColor={colors.chipBackground || '#F5F5F5'}
      activeOpacity={0.8}
      onPress={() => onPress(food)}
      style={styles.cardContainer}
    >
      <View style={styles.cardInner}>
        {/* Image and Badges */}
        <View style={styles.cardImageContainer}>
          <Image
            source={{ uri: thumbnailUrl }}
            style={styles.cardImage}
            resizeMode="cover"
          />

          {/* Rating Badge */}
          <View style={styles.ratingBadge}>
            <LogoViewer
              Logosource={StarRating}
              containerstyle={styles.starContainer}
              logostyle={[
                styles.starIcon,
                { tintColor: colors.warning || '#FFC107' },
              ]}
            />
            <Text style={styles.ratingBadgeText}>{rating}</Text>
          </View>

          {/* Difficulty Badge */}
          <View style={styles.difficultyBadge}>
            <Text style={styles.difficultyBadgeText}>
              {t(`difficulty.${difficulty}`)}
            </Text>
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.cardContent}>
          {/* Title */}
          <Text style={styles.cardTitle} numberOfLines={1}>
            {localizedTitle}
          </Text>

          {/* Category/Subtitle */}
          <Text style={styles.cardSubTitle} numberOfLines={1}>
            {getLocalizedPrimaryCategoryName()}
          </Text>

          {/* Footer - Veg/Non-Veg & Time */}
          <View style={styles.cardFooter}>
            <View style={styles.metaRow}>
              <VegNon isVeg={isVeg} size={14} />

              <View style={styles.verticalDivider} />

              <Text style={styles.timeText}>{deliveryTime}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const createStyles = (colors, fonts) =>
  StyleSheet.create({
    cardContainer: {
      width: CARD_WIDTH,
      marginBottom: 18,
      borderRadius: 14,
    },
    cardInner: {
      backgroundColor: colors.white || '#FFFFFF',
      borderRadius: 14,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 6,
      elevation: 4,
      overflow: 'hidden',
    },
    cardImageContainer: {
      height: 115,
      width: '100%',
      position: 'relative',
    },
    cardImage: {
      width: '100%',
      height: '100%',
    },

    // --- Badges ---
    ratingBadge: {
      position: 'absolute',
      top: 8,
      right: 8,
      backgroundColor: colors.white || '#FFFFFF',
      paddingHorizontal: 7,
      paddingVertical: 3,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    starContainer: {
      width: 10,
      height: 10,
    },
    starIcon: {
      width: 10,
      height: 10,
    },
    ratingBadgeText: {
      fontSize: responsiveFontSize(1.3),
      fontFamily: fonts?.semiBold || 'Poppins-SemiBold',
      color: colors.text || '#1A1A1A',
      marginLeft: 3,
    },
    difficultyBadge: {
      position: 'absolute',
      top: 8,
      left: 8,
      backgroundColor: (colors.buttonPrimary || '#7452D6') + 'E0',
      paddingHorizontal: 7,
      paddingVertical: 3,
      borderRadius: 8,
    },
    difficultyBadgeText: {
      fontSize: responsiveFontSize(1.1),
      fontFamily: fonts?.medium || 'Poppins-Medium',
      color: '#FFFFFF',
      textTransform: 'uppercase',
      letterSpacing: 0.3,
    },

    // --- Content ---
    cardContent: {
      padding: 10,
      paddingTop: 8,
    },
    cardTitle: {
      fontSize: responsiveFontSize(1.7),
      fontFamily: fonts?.semiBold || 'Poppins-SemiBold',
      color: colors.text || '#1A1A1A',
      marginBottom: 2,
      letterSpacing: 0.1,
    },
    cardSubTitle: {
      fontSize: responsiveFontSize(1.35),
      fontFamily: fonts?.regular || 'Poppins-Regular',
      color: colors.textSecondary || '#666666',
      marginBottom: 8,
      textTransform: 'capitalize',
      letterSpacing: 0.1,
    },

    // --- Footer/Meta ---
    cardFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    metaRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    verticalDivider: {
      width: 1,
      height: 12,
      marginHorizontal: 8,
      backgroundColor: colors.border || '#E0E0E0',
    },
    timeText: {
      fontSize: responsiveFontSize(1.3),
      fontFamily: fonts?.medium || 'Poppins-Medium',
      color: colors.textTertiary || '#999999',
      letterSpacing: 0.2,
    },
  });

export default FoodCard;
