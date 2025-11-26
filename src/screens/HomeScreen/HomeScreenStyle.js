import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { Colors } from '../../assets/colors';

const { width } = Dimensions.get('window');

const Theme = {
  background: '#FAFAFA',
  white: '#FFFFFF',
  textMain: '#1A1A1A',
  textSecondary: '#8E8E93',
  primary: Colors.primary || '#FF6B35',
  divider: '#EFEFEF',
  shadow: '#000',
  green: '#4CAF50',
  red: '#E53935',
};

const HomeScreenStyle = StyleSheet.create({
  // --- Main Container ---
  safeArea: {
    flex: 1,
    backgroundColor: Theme.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: Theme.background,
  },

  // --- Fixed Header Section ---
  fixedHeaderContainer: {
    backgroundColor: Theme.background,
    zIndex: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.03)',
  },

  headerWrapper: {
    paddingHorizontal: responsiveWidth(4),
    paddingTop: 10,
  },

  // --- Top Bar (Greeting + Controls) ---
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
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
    fontSize: responsiveFontSize(2.4),
    color: Theme.textMain,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '700',
  },

  // --- Header Buttons (Lang & Diet) ---
  headerIconBtn: {
    backgroundColor: Theme.white,
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Theme.divider,
    marginLeft: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Theme.white,
    marginLeft: 12,
  },
  headerBtnText: {
    fontSize: 16,
  },

  // --- Search Bar ---
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  searchBoxWrapper: {
    flex: 1,
    marginRight: 12,
    height: 45,
    justifyContent: 'center',
  },
  filterBtn: {
    width: 45,
    height: 45,
    backgroundColor: Theme.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Theme.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  // --- Categories Horizontal Scroll ---
  categorySection: {
    marginBottom: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: responsiveWidth(4),
  },
  sectionTitle: {
    fontSize: responsiveFontSize(2),
    color: Theme.textMain,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '700',
  },
  seeAllText: {
    fontSize: responsiveFontSize(1.6),
    color: Theme.primary,
    fontFamily: 'Poppins-Medium',
    fontWeight: '600',
  },
  categoryListContainer: {
    paddingHorizontal: responsiveWidth(4),
    paddingBottom: 10,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.white,
    paddingVertical: 6,
    paddingHorizontal: 6,
    paddingRight: 14,
    borderRadius: 30,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Theme.divider,
  },
  categoryPillSelected: {
    backgroundColor: Theme.primary,
    borderColor: Theme.primary,
  },
  categoryIconBox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Theme.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  categoryIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  categoryText: {
    fontSize: responsiveFontSize(1.6),
    color: Theme.textMain,
    fontFamily: 'Poppins-Medium',
    fontWeight: '600',
  },
  categoryTextSelected: {
    color: Theme.white,
  },

  // --- Recipe List Section ---
  recipeListContainer: {
    flex: 1,
    backgroundColor: Theme.background,
  },
  flatListContent: {
    paddingTop: 10,
    paddingBottom: 100,
    paddingHorizontal: responsiveWidth(4),
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  listTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(4),
    marginTop: 10,
    marginBottom: 10,
  },

  // --- Food Card ---
  cardContainer: {
    width: (width - responsiveWidth(8) - 15) / 2,
    marginBottom: 20,
    borderRadius: 16,
  },
  cardInner: {
    backgroundColor: Theme.white,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
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
  ratingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1A1A1A',
    marginLeft: 4,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: responsiveFontSize(1.7),
    color: Theme.textMain,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '700',
    marginBottom: 2,
  },
  cardSubTitle: {
    fontSize: responsiveFontSize(1.4),
    color: Theme.textSecondary,
    marginBottom: 8,
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
    height: 10,
    backgroundColor: '#DDD',
    marginHorizontal: 6,
  },
  timeText: {
    fontSize: 11,
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
    fontSize: responsiveFontSize(1.8),
    color: Theme.textSecondary,
    marginBottom: 20,
  },
  resetButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    backgroundColor: Theme.primary,
  },
  resetButtonText: {
    color: Theme.white,
    fontWeight: '600',
  },

  // --- Common Modal Styles ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center', // Center for small popups
    alignItems: 'center',
  },
  // Language Modal (Bottom Sheet style)
  modalContentBottom: {
    width: '100%',
    backgroundColor: Theme.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingBottom: 40,
    position: 'absolute',
    bottom: 0,
  },
  // Diet Picker Modal (Center Popup style)
  modalContentCenter: {
    width: '80%',
    backgroundColor: Theme.white,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
    color: Theme.textMain,
  },
  dietOptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Theme.divider,
  },
  dietOptionDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 15,
  },
  dietOptionText: {
    fontSize: 16,
    color: Theme.textMain,
    fontWeight: '500',
  },
});

export default HomeScreenStyle;
