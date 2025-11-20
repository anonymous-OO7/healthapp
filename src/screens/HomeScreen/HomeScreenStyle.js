import { StyleSheet, Platform, Dimensions } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { Colors } from '../../assets/colors';

const { width } = Dimensions.get('window');

const HomeScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white, // Clean white background
  },
  // The decorative background shape
  ovalBackground: {
    width: width,
    height: responsiveHeight(35), // Extended slightly for better scroll visual
    backgroundColor: Colors.slatebackground || '#F0F4F8', // Fallback color if slatebackground undefined
    borderBottomEndRadius: responsiveWidth(20),
    borderBottomLeftRadius: responsiveWidth(10),
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1, // Puts it behind content
  },

  // Header Text & Profile
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(5),
    marginTop:
      Platform.OS === 'ios' ? responsiveHeight(1) : responsiveHeight(3),
    marginBottom: responsiveHeight(2),
  },
  greetingText: {
    fontSize: responsiveFontSize(2),
    fontFamily: 'Rubik-Regular',
    color: Colors.black,
    opacity: 0.7,
  },
  mainTitleText: {
    fontSize: responsiveFontSize(3),
    fontFamily: 'Rubik-Medium', // Slightly bolder
    color: Colors.black,
    lineHeight: responsiveFontSize(3.8),
    width: responsiveWidth(70),
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: Colors.white,
  },

  // Search & Sort Area
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: responsiveWidth(5),
    alignItems: 'center',
    marginBottom: responsiveHeight(3),
  },
  sortButton: {
    width: responsiveWidth(12),
    height: responsiveWidth(12), // Square aspect ratio
    marginLeft: responsiveWidth(3),
    backgroundColor: Colors.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  // Categories
  sectionTitle: {
    fontSize: responsiveFontSize(2.5),
    fontFamily: 'Poppins-Medium',
    color: Colors.black,
    marginLeft: responsiveWidth(5),
    marginBottom: responsiveHeight(1.5),
  },
  categoryScrollContainer: {
    paddingHorizontal: responsiveWidth(4),
    paddingBottom: responsiveHeight(2),
  },
  categoryBtn: {
    height: responsiveHeight(6),
    paddingHorizontal: responsiveWidth(1.5),
    marginRight: responsiveWidth(3),
    borderRadius: 30,
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'transparent',
    // Shadow for buttons
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  categoryIconContainer: {
    height: 36,
    width: 36,
    backgroundColor: Colors.white,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: responsiveFontSize(1.6),
    marginLeft: responsiveWidth(2),
    marginRight: responsiveWidth(3),
    fontFamily: 'Rubik-Medium',
  },
  // ... keep your existing header styles ...

  // --- CARD STYLES ---
  cardContainer: {
    flex: 1,
    margin: responsiveWidth(2),
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(2),
    backgroundColor: Colors.white,
    borderRadius: 15,

    // Card Shadow
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImageContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  cardImage: {
    height: responsiveHeight(13), // Slightly adjusted height
    width: responsiveWidth(40), // Matches card width better
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  cardContent: {
    paddingHorizontal: 12,
    marginTop: 8,
  },
  cardTitle: {
    fontSize: responsiveFontSize(1.7), // Reduced from 2.0 (looks much cleaner)
    fontFamily: 'Rubik-Medium',
    color: Colors.black,
    letterSpacing: 0.3,
  },
  cardSubTitle: {
    fontSize: responsiveFontSize(1.4), // Reduced from 1.8
    color: Colors.grey,
    fontFamily: 'Poppins-Regular',
    marginTop: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between', // spreads them evenly
    alignItems: 'center',
    marginTop: 12, // Spacing from text
    marginBottom: 12, // Spacing from bottom of card
    paddingHorizontal: 12, // Added padding so icons don't touch the edges
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5', // Lighter background for rating
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  ratingText: {
    color: '#2ecc71',
    fontFamily: 'Rubik-Medium',
    fontSize: 11, // Smaller rating text
    marginLeft: 4,
  },
  iconSmall: {
    height: 14, // Smaller icons
    width: 14,
    resizeMode: 'contain',
  },
});

export default HomeScreenStyle;
