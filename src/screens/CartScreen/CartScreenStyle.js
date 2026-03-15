import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import { Colors } from '../../assets/colors'; // Assuming Colors is an object with color codes

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Explicit Theme Definition for clarity and consistency
const Theme = {
  background: '#FAFAFA',
  white: '#FFFFFF',
  textMain: '#1A1A1A',
  textSecondary: '#666666',
  textTertiary: '#999999',
  primary: Colors.primary || '#FF6B35', // Use imported primary color
  success: Colors.success || '#4CAF50',
  error: Colors.error || '#E53935',
  warning: Colors.warning || '#FF9800',
  divider: '#F0F0F0',
  blue: '#1976D2',
};

const CartScreenStyle = StyleSheet.create({
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
    paddingVertical: 15,
    backgroundColor: Theme.white,
    borderBottomWidth: 1,
    borderBottomColor: Theme.divider,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Theme.divider,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: '800',
    color: Theme.textMain,
  },
  headerRight: {
    width: 40, // Match backButton width for balanced layout
  },

  // --- Stats Bar ---
  statsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: Theme.white,
    borderBottomWidth: 1,
    borderBottomColor: Theme.divider,
    marginBottom: 10,
  },
  statItem: {
    alignItems: 'center',
    flex: 1, // Ensure even spacing
  },
  statDivider: {
    width: 1,
    backgroundColor: Theme.divider,
    marginVertical: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: Theme.textMain,
  },
  statLabel: {
    fontSize: 12,
    color: Theme.textSecondary,
    marginTop: 4,
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
    marginBottom: 10,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Theme.divider,
    marginRight: 10,
  },
  sortButtonActive: {
    backgroundColor: Theme.primary,
  },
  sortButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: Theme.textSecondary,
  },
  sortButtonTextActive: {
    color: Theme.white,
  },

  // --- Add Custom Item ---
  addCustomSection: {
    backgroundColor: Theme.white,
    padding: 15,
    marginHorizontal: responsiveWidth(4),
    marginBottom: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Theme.divider,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    marginTop: responsiveHeight(1),
  },
  addCustomTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.textMain,
    marginBottom: 12,
  },
  addCustomInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addCustomInput: {
    flex: 1,
    height: 48,
    backgroundColor: Theme.divider,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 15,
    marginRight: 10,
    color: Theme.textMain,
  },
  addCustomQuantityInput: {
    width: 60,
    height: 48,
    backgroundColor: Theme.divider,
    borderRadius: 12,
    paddingHorizontal: 10,
    fontSize: 15,
    textAlign: 'center',
    marginRight: 10,
    color: Theme.textMain,
  },
  addCustomButton: {
    height: 48,
    width: 48,
    backgroundColor: Theme.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // --- List & Cart Item (FIXED FOR OVERLAP) ---
  listContent: {
    paddingHorizontal: responsiveWidth(4),
    paddingTop: 10,
    paddingBottom: 120,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.white,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Theme.divider,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cartItemChecked: {
    backgroundColor: '#E8F5E9', // Lighter green tint
    borderColor: Theme.success,
  },
  checkButton: {
    width: 32, // Slightly larger touch target
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Theme.textTertiary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  checkButtonChecked: {
    backgroundColor: Theme.success,
    borderColor: Theme.success,
  },
  itemContent: {
    flex: 1, // Takes up remaining space
    marginRight: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.textMain,
    marginBottom: 2,
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
    fontSize: 11,
    color: Theme.primary,
    backgroundColor: '#FFF5F0',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 8,
    marginRight: 8,
    fontWeight: '500',
  },
  itemRecipeCustom: {
    backgroundColor: '#E3F2FD',
    color: Theme.blue,
  },
  unitText: {
    fontSize: 12,
    color: Theme.textSecondary,
    fontWeight: '500',
    padding: 2,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.divider,
    borderRadius: 20,
    paddingHorizontal: 2,
    width: 100, // Fixed width for controls to prevent wrapping
  },
  quantityButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    color: Theme.primary,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.textMain,
    marginHorizontal: 2,
    minWidth: 20,
    textAlign: 'center',
  },
  deleteButton: {
    padding: 8,
    marginLeft: 5,
  },

  // --- Unit Picker Modal ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Theme.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Theme.textMain,
    marginBottom: 10,
    textAlign: 'center',
  },
  unitOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Theme.divider,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  unitOptionText: {
    fontSize: 16,
    color: Theme.textMain,
  },
  unitOptionActive: {
    color: Theme.primary,
    fontWeight: '700',
  },

  // --- Empty State ---
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
    opacity: 0.4,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Theme.textMain,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 15,
    color: Theme.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  emptyButton: {
    marginTop: 30,
    backgroundColor: Theme.primary,
    paddingHorizontal: 35,
    paddingVertical: 14,
    borderRadius: 30,
  },
  emptyButtonText: {
    color: Theme.white,
    fontWeight: '700',
    fontSize: 16,
  },

  // --- Bottom Actions ---
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Theme.white,
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: 15,
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
    paddingVertical: 14,
    borderRadius: 12,
    marginHorizontal: 5,
    minHeight: 50,
  },
  bottomButtonDisabled: {
    opacity: 0.6,
  },
  clearCheckedButton: {
    backgroundColor: Theme.success,
  },
  clearAllButton: {
    backgroundColor: Theme.error,
  },
  bottomButtonText: {
    color: Theme.white,
    fontWeight: '700',
    marginLeft: 8,
    fontSize: 14,
  },
});

export default CartScreenStyle;
