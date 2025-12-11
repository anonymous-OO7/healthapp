import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');
const VIDEO_HEIGHT = SCREEN_WIDTH * (9 / 16);

const DetailsScreenStyle = StyleSheet.create({
  // --- Main Container ---
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
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
    left: 15,
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

  navBarContainer: {
    height: 56,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(4),
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navTitle: {
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
    fontSize: responsiveFontSize(3),
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
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
    fontWeight: '700',
  },
  categoryText: {
    fontSize: responsiveFontSize(1.7),
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
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 6,
  },

  // Full Screen Button Container
  fullScreenButtonContainer: {
    marginTop: 10,
  },
  fullScreenButtonContent: {
    height: responsiveHeight(4.5),
    paddingHorizontal: responsiveWidth(3),
  },
  fullScreenButtonLabel: {
    fontSize: responsiveFontSize(1.5),
  },

  description: {
    fontSize: responsiveFontSize(1.7),
    fontFamily: 'Rubik-Regular',
    lineHeight: 24,
    marginTop: 15,
    marginBottom: 10,
  },

  // --- Tab Bar ---
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    marginTop: 10,
    marginHorizontal: responsiveWidth(5),
    paddingBottom: 10,
  },
  tabChip: {
    marginRight: responsiveWidth(3),
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
    fontFamily: 'Poppins-SemiBold',
  },
  sectionBadge: {
    fontSize: responsiveFontSize(1.4),
    fontWeight: '600',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  // --- Ingredients List with Chips ---
  ingredientsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  ingredientChip: {
    marginRight: responsiveWidth(2),
    marginBottom: responsiveHeight(1),
  },

  // Add All Button Container
  addAllButtonContainer: {
    marginTop: 10,
    marginBottom: 10,
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
    fontFamily: 'Rubik-Regular',
    flex: 1,
    lineHeight: 24,
  },

  // Video List Items
  videoListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    padding: 12,
    marginBottom: 14,
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
    marginBottom: 4,
    lineHeight: 20,
  },
  videoListChannel: {
    fontSize: 12,
    marginBottom: 3,
  },
  videoListMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  videoListSub: {
    fontSize: 11,
  },
  nowPlayingChip: {
    paddingHorizontal: 8,
    paddingVertical: 3,
  },

  // Empty State
  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
  },

  // Bottom Banner (NOTE: This is unused in the new DetailsScreen.js, but kept for completeness if future use is intended)
  bottomBannerContainer: {
    position: 'relative',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    borderTopWidth: 1,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
    paddingBottom: Platform.OS === 'ios' ? 20 : 4,
  },
  bottomBanner: {
    backgroundColor: 'transparent',
  },
});

export { VIDEO_HEIGHT, SCREEN_WIDTH, SCREEN_HEIGHT };
export default DetailsScreenStyle;
