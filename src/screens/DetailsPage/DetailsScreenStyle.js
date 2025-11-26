import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import {
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { Colors } from '../../assets/colors';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');

const VIDEO_HEIGHT = SCREEN_WIDTH * (9 / 16);

const Theme = {
  background: '#FFFFFF',
  textMain: '#1A1A1A',
  textSecondary: '#666666',
  primary: Colors.primary || '#FF6B35',
  divider: '#F0F0F0',
  success: '#4CAF50',
};

const DetailsScreenStyle = StyleSheet.create({
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

  // --- Fullscreen Modal (Landscape) ---
  fullScreenModal: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenRotatedContainer: {
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    pointerEvents: 'box-none',
  },
  fullScreenExitBtn: {
    position: 'absolute',
    top: 15,
    left: 15, // Changed from right: 15 to left: 15
    zIndex: 9999,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  fullScreenExitText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
  },

  // --- Top Navigation Bar ---
  navBarContainer: {
    height: 56,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(4),
    backgroundColor: Theme.background,
    borderBottomWidth: 1,
    borderBottomColor: Theme.divider,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  navTitle: {
    flex: 1,
    fontSize: responsiveFontSize(2),
    fontWeight: '600',
    color: Theme.textMain,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: Theme.primary,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },

  // --- Video Section ---
  videoContainer: {
    width: SCREEN_WIDTH,
    height: VIDEO_HEIGHT,
    backgroundColor: '#000',
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },

  // --- Main Content ---
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },

  // Title Section
  infoSection: {
    paddingHorizontal: responsiveWidth(5),
    paddingTop: 20,
    paddingBottom: 10,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  titleText: {
    fontSize: responsiveFontSize(2.6),
    fontFamily: 'Poppins-SemiBold',
    color: Theme.textMain,
    fontWeight: '700',
  },
  categoryText: {
    fontSize: responsiveFontSize(1.7),
    color: Theme.textSecondary,
    fontFamily: 'Poppins-Regular',
    textTransform: 'capitalize',
    marginTop: 4,
  },
  rightActionsContainer: {
    alignItems: 'flex-end',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFB400',
    marginLeft: 6,
  },
  fullScreenButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.primary,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 10,
  },
  fullScreenButtonText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 6,
  },
  description: {
    fontSize: responsiveFontSize(1.7),
    color: Theme.textSecondary,
    fontFamily: 'Rubik-Regular',
    lineHeight: 24,
    marginTop: 15,
    marginBottom: 10,
  },

  // --- Tab Bar ---
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Theme.divider,
    marginTop: 10,
    marginHorizontal: responsiveWidth(5),
  },
  tabItem: {
    marginRight: 20,
    paddingVertical: 12,
  },
  activeTabItem: {
    borderBottomWidth: 3,
    borderBottomColor: Theme.primary,
  },
  tabText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '600',
    color: '#999',
    fontFamily: 'Poppins-Medium',
  },
  activeTabText: {
    color: Theme.textMain,
  },

  // --- Content Sections ---
  sectionContainer: {
    paddingHorizontal: responsiveWidth(5),
    paddingTop: 20,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionHeader: {
    fontSize: responsiveFontSize(2.1),
    fontWeight: '700',
    color: Theme.textMain,
    fontFamily: 'Poppins-SemiBold',
  },
  sectionBadge: {
    fontSize: responsiveFontSize(1.4),
    color: Theme.primary,
    fontWeight: '600',
    backgroundColor: '#FFF5F0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  // --- Ingredients List (Single Row Design) ---
  ingredientsList: {
    marginBottom: 10,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
  },
  ingredientRowInCart: {
    backgroundColor: '#E8F5E9',
    borderColor: Theme.success,
  },
  ingredientName: {
    flex: 1,
    fontSize: responsiveFontSize(1.8),
    color: Theme.textMain,
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
    marginRight: 12,
  },
  ingredientNameInCart: {
    color: Theme.success,
    fontWeight: '600',
  },
  ingredientAction: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Theme.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ingredientActionInCart: {
    backgroundColor: Theme.success,
  },
  ingredientActionIcon: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Steps List
  stepRow: {
    flexDirection: 'row',
    marginBottom: 18,
  },
  stepBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Theme.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    marginTop: 2,
  },
  stepNumber: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  stepText: {
    fontSize: responsiveFontSize(1.7),
    color: '#444',
    fontFamily: 'Rubik-Regular',
    flex: 1,
    lineHeight: 24,
  },

  // Video List Items
  videoListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 14,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Theme.divider,
  },
  videoListThumbnail: {
    width: 120,
    height: 75,
    backgroundColor: '#222',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  playIconOverlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoListTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  videoListTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Theme.textMain,
    marginBottom: 4,
    lineHeight: 20,
  },
  videoListChannel: {
    fontSize: 12,
    color: Theme.textSecondary,
    marginBottom: 3,
  },
  videoListMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  videoListSub: {
    fontSize: 11,
    color: Theme.textSecondary,
  },
  activeVideoItem: {
    borderColor: Theme.primary,
    borderWidth: 2,
    backgroundColor: '#FFF8F5',
  },
  nowPlayingBadge: {
    backgroundColor: Theme.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginRight: 8,
  },
  nowPlayingText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
  },

  // Add All Button
  addAllButton: {
    backgroundColor: Theme.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: Theme.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addAllButtonIcon: {
    fontSize: 18,
  },
  addAllButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },

  // Empty State
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 30,
    fontSize: 16,
  },
});

export { VIDEO_HEIGHT, SCREEN_WIDTH, SCREEN_HEIGHT };
export default DetailsScreenStyle;
