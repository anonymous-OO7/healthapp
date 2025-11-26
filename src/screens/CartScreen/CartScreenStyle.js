import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { Colors } from '../../assets/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const Theme = {
  background: '#FAFAFA',
  white: '#FFFFFF',
  textMain: '#1A1A1A',
  textSecondary: '#666666',
  primary: Colors.primary || '#FF6B35',
  success: '#4CAF50',
  error: '#E53935',
  divider: '#F0F0F0',
};

const CartScreenStyle = StyleSheet.create({
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
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '700',
    color: Theme.textMain,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    marginLeft: 15,
    padding: 8,
  },

  // --- Stats Bar ---
  statsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: Theme.white,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Theme.divider,
  },
  statItem: {
    alignItems: 'center',
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
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginRight: 10,
  },
  sortButtonActive: {
    backgroundColor: Theme.primary,
  },
  sortButtonText: {
    fontSize: 12,
    color: Theme.textSecondary,
    marginLeft: 5,
  },
  sortButtonTextActive: {
    color: Theme.white,
  },

  // --- List ---
  listContent: {
    paddingHorizontal: responsiveWidth(4),
    paddingTop: 10,
    paddingBottom: 120,
  },

  // --- Cart Item ---
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.white,
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Theme.divider,
  },
  cartItemChecked: {
    backgroundColor: '#F0FFF0',
    borderColor: Theme.success,
  },
  checkButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: Theme.divider,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  checkButtonChecked: {
    backgroundColor: Theme.success,
    borderColor: Theme.success,
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.textMain,
    marginBottom: 4,
  },
  itemNameChecked: {
    textDecorationLine: 'line-through',
    color: Theme.textSecondary,
  },
  itemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemRecipe: {
    fontSize: 12,
    color: Theme.primary,
    backgroundColor: '#FFF5F0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 8,
  },
  itemRecipeCustom: {
    backgroundColor: '#E3F2FD',
    color: '#1976D2',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 5,
  },
  quantityButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.textMain,
    marginHorizontal: 10,
    minWidth: 25,
    textAlign: 'center',
  },
  deleteButton: {
    padding: 8,
    marginLeft: 10,
  },

  // --- Add Custom Item ---
  addCustomSection: {
    backgroundColor: Theme.white,
    padding: 15,
    marginHorizontal: responsiveWidth(4),
    marginTop: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Theme.divider,
  },
  addCustomTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.textMain,
    marginBottom: 12,
  },
  addCustomInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addCustomInput: {
    flex: 1,
    height: 45,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 14,
    marginRight: 10,
  },
  addCustomQuantityInput: {
    width: 60,
    height: 45,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 10,
    fontSize: 14,
    textAlign: 'center',
    marginRight: 10,
  },
  addCustomButton: {
    height: 45,
    width: 45,
    backgroundColor: Theme.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 18,
    fontWeight: '700',
    color: Theme.textMain,
    marginBottom: 20,
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
    fontWeight: '600',
  },

  // --- Empty State ---
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
    opacity: 0.5,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Theme.textMain,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Theme.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  emptyButton: {
    marginTop: 25,
    backgroundColor: Theme.primary,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  emptyButtonText: {
    color: Theme.white,
    fontWeight: '600',
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
  },
  clearCheckedButton: {
    backgroundColor: Theme.success,
  },
  clearAllButton: {
    backgroundColor: Theme.error,
  },
  bottomButtonText: {
    color: Theme.white,
    fontWeight: '600',
    marginLeft: 8,
  },

  // --- Swipe Actions ---
  swipeAction: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  swipeDelete: {
    backgroundColor: Theme.error,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
});

export default CartScreenStyle;
