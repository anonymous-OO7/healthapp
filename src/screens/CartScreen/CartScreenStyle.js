import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const createCartScreenStyle = (colors, fonts) => {
  const Theme = {
    background: colors.background || '#FAFAFA',
    white: colors.white || '#FFFFFF',
    textMain: colors.black || '#1A1A1A',
    textSecondary: colors.grey || '#666666',
    textTertiary: colors.lightGrey || '#999999',
    primary: colors.buttonPrimary || '#FF6B35',
    success: colors.success || '#4CAF50',
    error: colors.error || '#E53935',
    warning: colors.warning || '#FF9800',
    divider: colors.divider || '#F0F0F0',
    blue: colors.blue || '#1976D2',
  };

  return StyleSheet.create({
    // --- Main Container ---
    safeArea: {
      flex: 1,
      backgroundColor: Theme.background,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },

    // --- Header ---
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: responsiveWidth(4),
      paddingVertical: 14,
      backgroundColor: Theme.white,
      borderBottomWidth: 1,
      borderBottomColor: Theme.divider,
    },
    backButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: Theme.divider,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerTitle: {
      fontSize: responsiveFontSize(2.2),
      fontFamily: fonts?.semiBold || 'Poppins-SemiBold',
      color: Theme.textMain,
      letterSpacing: 0.3,
    },
    headerRight: {
      width: 36,
    },

    // --- Stats Bar ---
    statsBar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 14,
      backgroundColor: Theme.white,
      borderBottomWidth: 1,
      borderBottomColor: Theme.divider,
      marginBottom: 8,
    },
    statItem: {
      alignItems: 'center',
      flex: 1,
    },
    statDivider: {
      width: 1,
      backgroundColor: Theme.divider,
      marginVertical: 4,
    },
    statNumber: {
      fontSize: responsiveFontSize(2.4),
      fontFamily: fonts?.medium || 'Poppins-Medium',
      color: Theme.textMain,
    },
    statLabel: {
      fontSize: responsiveFontSize(1.3),
      fontFamily: fonts?.regular || 'Poppins-Regular',
      color: Theme.textSecondary,
      marginTop: 2,
      letterSpacing: 0.2,
    },
    statNumberChecked: {
      color: Theme.success,
    },
    statNumberPending: {
      color: Theme.primary,
    },

    // --- Sort & Filter Bar ---
    sortBar: {
      flexDirection: 'row',
      paddingHorizontal: responsiveWidth(4),
      paddingVertical: 10,
      backgroundColor: Theme.white,
      borderBottomWidth: 1,
      borderBottomColor: Theme.divider,
      marginBottom: 8,
    },
    sortButton: {
      paddingHorizontal: 14,
      paddingVertical: 7,
      borderRadius: 18,
      backgroundColor: Theme.divider,
      marginRight: 8,
    },
    sortButtonActive: {
      backgroundColor: Theme.primary,
    },
    sortButtonText: {
      fontSize: responsiveFontSize(1.4),
      fontFamily: fonts?.medium || 'Poppins-Medium',
      color: Theme.textSecondary,
      letterSpacing: 0.2,
    },
    sortButtonTextActive: {
      color: Theme.white,
    },

    // --- Add Custom Item ---
    addCustomSection: {
      backgroundColor: Theme.white,
      padding: 14,
      marginHorizontal: responsiveWidth(4),
      marginBottom: 8,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: Theme.divider,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.04,
      shadowRadius: 2,
      elevation: 1,
      marginTop: responsiveHeight(1),
    },
    addCustomTitle: {
      fontSize: responsiveFontSize(1.7),
      fontFamily: fonts?.medium || 'Poppins-Medium',
      color: Theme.textMain,
      marginBottom: 10,
      letterSpacing: 0.2,
    },
    addCustomInputRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    addCustomInput: {
      flex: 1,
      height: 44,
      backgroundColor: Theme.divider,
      borderRadius: 10,
      paddingHorizontal: 14,
      fontSize: responsiveFontSize(1.6),
      fontFamily: fonts?.regular || 'Poppins-Regular',
      marginRight: 8,
      color: Theme.textMain,
    },
    addCustomQuantityInput: {
      width: 55,
      height: 44,
      backgroundColor: Theme.divider,
      borderRadius: 10,
      paddingHorizontal: 8,
      fontSize: responsiveFontSize(1.6),
      fontFamily: fonts?.regular || 'Poppins-Regular',
      textAlign: 'center',
      marginRight: 8,
      color: Theme.textMain,
    },
    addCustomButton: {
      height: 44,
      width: 44,
      backgroundColor: Theme.primary,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    addButtonText: {
      fontSize: responsiveFontSize(2.2),
      fontFamily: fonts?.regular || 'Poppins-Regular',
      color: Theme.white,
    },

    // --- List & Cart Item ---
    listContent: {
      paddingHorizontal: responsiveWidth(4),
      paddingTop: 8,
      paddingBottom: 110,
    },
    cartItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Theme.white,
      borderRadius: 14,
      padding: 12,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: Theme.divider,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.04,
      shadowRadius: 2,
      elevation: 1,
    },
    cartItemChecked: {
      backgroundColor: '#F1F8F2',
      borderColor: Theme.success,
      opacity: 0.9,
    },
    checkButton: {
      width: 28,
      height: 28,
      borderRadius: 14,
      borderWidth: 1.5,
      borderColor: Theme.textTertiary,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    checkButtonChecked: {
      backgroundColor: Theme.success,
      borderColor: Theme.success,
    },
    checkMark: {
      color: Theme.white,
      fontSize: responsiveFontSize(1.5),
      fontFamily: fonts?.medium || 'Poppins-Medium',
    },
    itemContent: {
      flex: 1,
      marginRight: 8,
    },
    itemName: {
      fontSize: responsiveFontSize(1.7),
      fontFamily: fonts?.medium || 'Poppins-Medium',
      color: Theme.textMain,
      marginBottom: 2,
      letterSpacing: 0.1,
    },
    itemNameChecked: {
      textDecorationLine: 'line-through',
      color: Theme.textTertiary,
    },
    itemMeta: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemRecipe: {
      fontSize: responsiveFontSize(1.2),
      fontFamily: fonts?.regular || 'Poppins-Regular',
      color: Theme.primary,
      backgroundColor: '#FFF5F0',
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 6,
      marginRight: 8,
      letterSpacing: 0.1,
    },
    itemRecipeCustom: {
      backgroundColor: '#E8F4FD',
      color: Theme.blue,
    },
    unitText: {
      fontSize: responsiveFontSize(1.3),
      fontFamily: fonts?.regular || 'Poppins-Regular',
      color: Theme.textSecondary,
      paddingVertical: 2,
      paddingHorizontal: 4,
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Theme.divider,
      borderRadius: 18,
      paddingHorizontal: 2,
      width: 90,
    },
    quantityButton: {
      width: 28,
      height: 28,
      alignItems: 'center',
      justifyContent: 'center',
    },
    quantityButtonText: {
      fontSize: responsiveFontSize(2),
      fontFamily: fonts?.regular || 'Poppins-Regular',
      color: Theme.primary,
    },
    quantityText: {
      fontSize: responsiveFontSize(1.6),
      fontFamily: fonts?.medium || 'Poppins-Medium',
      color: Theme.textMain,
      marginHorizontal: 2,
      minWidth: 18,
      textAlign: 'center',
    },
    deleteButton: {
      padding: 6,
      marginLeft: 4,
    },
    deleteIcon: {
      fontSize: responsiveFontSize(2.2),
      fontFamily: fonts?.regular || 'Poppins-Regular',
      color: Theme.error,
    },

    // --- Unit Picker Modal ---
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: Theme.white,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
      paddingBottom: 36,
    },
    modalHandle: {
      width: 40,
      height: 4,
      backgroundColor: Theme.divider,
      borderRadius: 2,
      alignSelf: 'center',
      marginBottom: 16,
    },
    modalTitle: {
      fontSize: responsiveFontSize(2),
      fontFamily: fonts?.semiBold || 'Poppins-SemiBold',
      color: Theme.textMain,
      marginBottom: 8,
      textAlign: 'center',
      letterSpacing: 0.2,
    },
    unitOption: {
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: Theme.divider,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    unitOptionText: {
      fontSize: responsiveFontSize(1.7),
      fontFamily: fonts?.regular || 'Poppins-Regular',
      color: Theme.textMain,
      letterSpacing: 0.2,
    },
    unitOptionActive: {
      color: Theme.primary,
      fontFamily: fonts?.medium || 'Poppins-Medium',
    },
    unitCheckMark: {
      color: Theme.primary,
      fontSize: responsiveFontSize(1.6),
      fontFamily: fonts?.medium || 'Poppins-Medium',
    },

    // --- Empty State ---
    emptyContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 70,
    },
    emptyIcon: {
      fontSize: 70,
      marginBottom: 18,
      opacity: 0.35,
    },
    emptyTitle: {
      fontSize: responsiveFontSize(2.2),
      fontFamily: fonts?.semiBold || 'Poppins-SemiBold',
      color: Theme.textMain,
      marginBottom: 6,
      letterSpacing: 0.2,
    },
    emptySubtitle: {
      fontSize: responsiveFontSize(1.5),
      fontFamily: fonts?.regular || 'Poppins-Regular',
      color: Theme.textSecondary,
      textAlign: 'center',
      paddingHorizontal: 40,
      lineHeight: 20,
      letterSpacing: 0.1,
    },
    emptyButton: {
      marginTop: 28,
      backgroundColor: Theme.primary,
      paddingHorizontal: 32,
      paddingVertical: 12,
      borderRadius: 12,
    },
    emptyButtonText: {
      color: Theme.white,
      fontFamily: fonts?.medium || 'Poppins-Medium',
      fontSize: responsiveFontSize(1.6),
      letterSpacing: 0.3,
    },

    // --- Bottom Actions ---
    bottomActions: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: Theme.white,
      paddingHorizontal: responsiveWidth(4),
      paddingVertical: 14,
      borderTopWidth: 1,
      borderTopColor: Theme.divider,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    bottomButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      borderRadius: 10,
      marginHorizontal: 4,
      minHeight: 46,
    },
    bottomButtonDisabled: {
      opacity: 0.5,
    },
    clearCheckedButton: {
      backgroundColor: Theme.success,
    },
    clearAllButton: {
      backgroundColor: Theme.error,
    },
    bottomButtonIcon: {
      fontSize: responsiveFontSize(1.6),
      fontFamily: fonts?.regular || 'Poppins-Regular',
      color: Theme.white,
    },
    bottomButtonText: {
      color: Theme.white,
      fontFamily: fonts?.medium || 'Poppins-Medium',
      marginLeft: 6,
      fontSize: responsiveFontSize(1.4),
      letterSpacing: 0.2,
    },
  });
};

export default createCartScreenStyle;
