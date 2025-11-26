import { StyleSheet, Platform, StatusBar } from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { Colors } from '../../assets/colors';

const Theme = {
  background: '#FAFAFA',
  white: '#FFFFFF',
  textMain: '#1A1A1A',
  textSecondary: '#8E8E93',
  primary: Colors.primary || '#FF6B35',
  divider: '#EFEFEF',
};

const CategoryItemsStyle = StyleSheet.create({
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

  // --- Header ---
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(2),
    backgroundColor: Theme.white,
    borderBottomWidth: 1,
    borderBottomColor: Theme.divider,
    marginBottom: 10,
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginRight: 15,
  },
  backIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: Theme.textMain,
  },
  headerTitle: {
    fontSize: responsiveFontSize(2.4),
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '700',
    color: Theme.textMain,
    textTransform: 'capitalize',
  },
  itemCountText: {
    fontSize: responsiveFontSize(1.6),
    color: Theme.textSecondary,
    fontFamily: 'Poppins-Regular',
    marginTop: 2,
  },

  // --- List ---
  listContent: {
    paddingHorizontal: responsiveWidth(4),
    paddingBottom: 40,
    paddingTop: 10,
  },

  // --- Empty State ---
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(20),
  },
  emptyImage: {
    width: 100,
    height: 100,
    opacity: 0.5,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  emptyText: {
    fontSize: responsiveFontSize(2),
    color: Theme.textSecondary,
    fontFamily: 'Poppins-Medium',
  },
});

export default CategoryItemsStyle;
