// FoodCard.js
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

// Local Imports (Update these paths as necessary)
import VegNon from '../common/VegNon';
import LogoViewer from '../common/LogoViewer';
import { StarRating } from '../../assets/images/SvgImages';
import categories from '../../assets/data/categories';

// Utility Import (Assuming these are available in your environment)
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const { width } = Dimensions.get('window');
// Calculate card width for a two-column layout, based on your original logic:
// (Screen Width - Padding/Margin) / 2
const HORIZONTAL_PADDING_SPACE = 40; // Assuming ~2 * responsiveWidth(5) for screen padding
const GAP_BETWEEN_CARDS = 15;
const CARD_WIDTH = (width - HORIZONTAL_PADDING_SPACE - GAP_BETWEEN_CARDS) / 2;

const FoodCard = ({ food, onPress }) => {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
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

  // --- Render ---
  return (
    <TouchableHighlight
      underlayColor={colors.chipBackground}
      activeOpacity={0.8}
      onPress={() => onPress(food)}
      style={styles.cardContainer}
    >
      <View style={[styles.cardInner, { backgroundColor: colors.white }]}>
        {/* Image and Badges */}
        <View style={styles.cardImageContainer}>
          <Image
            source={{ uri: thumbnailUrl }}
            style={styles.cardImage}
            resizeMode="cover"
          />

          {/* Rating Badge */}
          <View style={[styles.ratingBadge, { backgroundColor: colors.white }]}>
            <LogoViewer
              Logosource={StarRating}
              containerstyle={{ width: 10, height: 10 }}
              logostyle={{ width: 10, height: 10, tintColor: colors.warning }}
            />
            <Text style={[styles.ratingBadgeText, { color: colors.text }]}>
              {rating}
            </Text>
          </View>

          {/* Difficulty Badge */}
          <View
            style={[
              styles.difficultyBadge,
              { backgroundColor: colors.primary + 'D0' },
            ]}
          >
            <Text style={styles.difficultyBadgeText}>
              {t(`difficulty.${difficulty}`)}
            </Text>
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.cardContent}>
          {/* Title */}
          <Text
            style={[styles.cardTitle, { color: colors.text }]}
            numberOfLines={1}
          >
            {localizedTitle}
          </Text>

          {/* Category/Subtitle */}
          <Text
            style={[styles.cardSubTitle, { color: colors.textSecondary }]}
            numberOfLines={1}
          >
            {getLocalizedPrimaryCategoryName()}
          </Text>

          {/* Footer - Veg/Non-Veg & Time */}
          <View style={styles.cardFooter}>
            <View style={styles.metaRow}>
              <VegNon isVeg={isVeg} size={14} />

              <View
                style={[
                  styles.verticalDivider,
                  { backgroundColor: colors.border },
                ]}
              />

              <Text style={[styles.timeText, { color: colors.textTertiary }]}>
                {deliveryTime}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    marginBottom: 20,
    borderRadius: 16,
  },
  cardInner: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  cardImageContainer: {
    height: 120,
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
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    marginLeft: 4,
  },
  difficultyBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  difficultyBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFF',
    textTransform: 'uppercase',
  },

  // --- Content ---
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: responsiveFontSize(1.9),
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '700',
    marginBottom: 2,
  },
  cardSubTitle: {
    fontSize: responsiveFontSize(1.5),
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
    textTransform: 'capitalize',
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
  },
  timeText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default FoodCard;
