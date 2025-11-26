import { StyleSheet, Dimensions, Platform } from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { Colors } from '../../assets/colors';

const { width } = Dimensions.get('window');

// Define a clean palette for this screen if Colors file is missing some
const Theme = {
  background: '#FAFAFA', // Very light gray, easier on eyes than pure white
  white: '#FFFFFF',
  textMain: '#1A1A1A',
  textSecondary: '#8E8E93',
  primary: Colors.primary || '#FF6B35',
  divider: '#EFEFEF',
  shadow: '#000',
};

const HomeScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.background,
  },

  // --- FlatList Structure ---
  flatListContent: {
    paddingBottom: 100,
    paddingHorizontal: responsiveWidth(4),
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },

  // --- Header Section ---
  headerWrapper: {
    paddingTop: Platform.OS === 'android' ? 10 : 0,
    marginBottom: 10,
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  greetingText: {
    fontSize: responsiveFontSize(1.8),
    color: Theme.textSecondary,
    fontFamily: 'Poppins-Regular',
    marginBottom: 2,
  },

  mainTitleText: {
    fontSize: responsiveFontSize(2.6),
    color: Theme.textMain,
    fontFamily: 'Poppins-SemiBold', // Assuming you have fonts, else fontWeight: '700'
    fontWeight: '700',
  },

  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: Theme.white,
    marginLeft: 12,
  },

  languageButton: {
    backgroundColor: Theme.white,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Theme.divider,
  },
  languageButtonText: {
    fontSize: 18,
  },

  // --- Search Bar ---
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  searchBoxWrapper: {
    flex: 1,
    marginRight: 12,
    // Assuming SearchClick has its own internal styling,
    // but usually we want a container height here
    height: 50,
    justifyContent: 'center',
  },
  filterBtn: {
    width: 50,
    height: 50,
    backgroundColor: Theme.primary,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Theme.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  // --- Section Headers ---
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: responsiveFontSize(2.2),
    color: Theme.textMain,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '700',
  },
  seeAllText: {
    fontSize: responsiveFontSize(1.7),
    color: Theme.primary,
    fontFamily: 'Poppins-Medium',
    fontWeight: '600',
  },

  // --- Categories ---
  categoryListContainer: {
    paddingRight: 20,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.white,
    paddingVertical: 8,
    paddingHorizontal: 8,
    paddingRight: 16,
    borderRadius: 40,
    marginRight: 12,
    borderWidth: 1,
    borderColor: Theme.divider,
  },
  categoryPillSelected: {
    backgroundColor: Theme.primary,
    borderColor: Theme.primary,
    shadowColor: Theme.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  categoryIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Theme.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  categoryIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  categoryText: {
    fontSize: responsiveFontSize(1.7),
    color: Theme.textMain,
    fontFamily: 'Poppins-Medium',
    fontWeight: '600',
  },
  categoryTextSelected: {
    color: Theme.white,
  },

  // --- Food Card ---
  cardContainer: {
    width: (width - responsiveWidth(8) - 15) / 2, // Precise calculation: (Screen - padding - gap) / 2
    marginBottom: 20,
    borderRadius: 20,
  },
  cardInner: {
    backgroundColor: Theme.white,
    borderRadius: 20,
    // Professional Soft Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3, // Subtle on Android
    overflow: 'hidden', // Ensures image clips to radius
  },
  cardImageContainer: {
    height: 130,
    width: '100%',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  ratingBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1A1A1A',
    marginLeft: 4,
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: responsiveFontSize(1.8),
    color: Theme.textMain,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '700',
    marginBottom: 2,
  },
  cardSubTitle: {
    fontSize: responsiveFontSize(1.5),
    color: Theme.textSecondary,
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verticalDivider: {
    width: 1,
    height: 12,
    backgroundColor: '#DDD',
    marginHorizontal: 8,
  },
  timeText: {
    fontSize: 12,
    color: Theme.textSecondary,
    fontWeight: '500',
  },

  // --- Empty State ---
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: responsiveFontSize(2),
    color: Theme.textSecondary,
    marginBottom: 20,
  },
  resetButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
    backgroundColor: Theme.primary,
  },
  resetButtonText: {
    color: Theme.white,
    fontWeight: '600',
  },

  // --- Modal ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)', // Darker, cleaner overlay
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Theme.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingBottom: 40,
    minHeight: '30%',
  },
});

export default HomeScreenStyle;
