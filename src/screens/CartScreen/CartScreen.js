import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StatusBar,
  SafeAreaView,
  Modal,
  Alert,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useTranslation } from 'react-i18next';

// Context
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../themes';

// Styles & Assets
import createCartScreenStyle from './CartScreenStyle';
import LogoViewer from '../../components/common/LogoViewer';
import { BackSvg } from '../../assets/images/SvgImages';
import Toast from '../../components/Toast';

const UNITS = [
  'piece',
  'pieces',
  'gram',
  'kg',
  'ml',
  'liter',
  'cup',
  'tbsp',
  'tsp',
  'bunch',
  'packet',
  'can',
];

const CartScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { colors, fonts } = useTheme();
  const styles = createCartScreenStyle(colors, fonts);

  const {
    cartItems,
    addCustomItem,
    removeFromCart,
    updateQuantity,
    updateUnit,
    toggleChecked,
    clearCart,
    clearCheckedItems,
    getCartStats,
    sortCart,
  } = useCart();

  // State
  const [customItemName, setCustomItemName] = useState('');
  const [customQuantity, setCustomQuantity] = useState('1');
  const [sortBy, setSortBy] = useState('addedAt');
  const [unitModalVisible, setUnitModalVisible] = useState(false);
  const [selectedItemForUnit, setSelectedItemForUnit] = useState(null);

  // Toast State
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const stats = getCartStats();

  // Show Toast
  const showToast = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  // Handle Add Custom Item
  const handleAddCustomItem = () => {
    if (!customItemName.trim()) {
      showToast('Please enter item name', 'warning');
      return;
    }

    addCustomItem(customItemName.trim(), parseInt(customQuantity) || 1);
    showToast(`"${customItemName}" added to cart`, 'success');
    setCustomItemName('');
    setCustomQuantity('1');
    Keyboard.dismiss();
  };

  // Handle Sort
  const handleSort = type => {
    setSortBy(type);
    sortCart(type);
  };

  // Open Unit Picker
  const openUnitPicker = item => {
    setSelectedItemForUnit(item);
    setUnitModalVisible(true);
  };

  // Handle Unit Change
  const handleUnitChange = unit => {
    if (selectedItemForUnit) {
      updateUnit(selectedItemForUnit.id, unit);
      showToast(`Unit changed to ${unit}`, 'info');
    }
    setUnitModalVisible(false);
    setSelectedItemForUnit(null);
  };

  // Confirm Clear All
  const confirmClearAll = () => {
    Alert.alert(
      'Clear Shopping Cart',
      'Are you sure you want to remove all items?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => {
            clearCart();
            showToast('Cart cleared', 'info');
          },
        },
      ],
    );
  };

  // Confirm Clear Checked
  const confirmClearChecked = () => {
    if (stats.checked === 0) {
      showToast('No checked items to remove', 'info');
      return;
    }

    Alert.alert(
      'Remove Checked Items',
      `Remove ${stats.checked} checked items from cart?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          onPress: () => {
            clearCheckedItems();
            showToast(`${stats.checked} items removed`, 'success');
          },
        },
      ],
    );
  };

  // Render Header
  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <LogoViewer
          Logosource={BackSvg}
          containerstyle={{ width: 18, height: 18 }}
          logostyle={{ width: 18, height: 18, tintColor: colors.black }}
        />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Shopping Cart</Text>

      <View style={styles.headerRight} />
    </View>
  );

  // Render Stats Bar
  const renderStatsBar = () => (
    <View style={styles.statsBar}>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{stats.total}</Text>
        <Text style={styles.statLabel}>Total</Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statItem}>
        <Text style={[styles.statNumber, styles.statNumberChecked]}>
          {stats.checked}
        </Text>
        <Text style={styles.statLabel}>Completed</Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statItem}>
        <Text style={[styles.statNumber, styles.statNumberPending]}>
          {stats.pending}
        </Text>
        <Text style={styles.statLabel}>Pending</Text>
      </View>
    </View>
  );

  // Render Sort Bar
  const renderSortBar = () => (
    <View style={styles.sortBar}>
      {[
        { key: 'addedAt', label: 'Recent' },
        { key: 'name', label: 'Name' },
        { key: 'recipe', label: 'Recipe' },
        { key: 'checked', label: 'Status' },
      ].map(option => (
        <TouchableOpacity
          key={option.key}
          style={[
            styles.sortButton,
            sortBy === option.key && styles.sortButtonActive,
          ]}
          onPress={() => handleSort(option.key)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.sortButtonText,
              sortBy === option.key && styles.sortButtonTextActive,
            ]}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderAddCustomSection = () => (
    <View style={styles.addCustomSection}>
      <Text style={styles.addCustomTitle}>Add Custom Item</Text>
      <View style={styles.addCustomInputRow}>
        <TextInput
          style={styles.addCustomInput}
          placeholder="Enter item name..."
          placeholderTextColor={colors.textSecondary || '#999'}
          value={customItemName}
          onChangeText={setCustomItemName}
          returnKeyType="done"
          onSubmitEditing={handleAddCustomItem}
        />
        <TextInput
          style={styles.addCustomQuantityInput}
          placeholder="Qty"
          placeholderTextColor={colors.textSecondary || '#999'}
          value={customQuantity}
          onChangeText={setCustomQuantity}
          keyboardType="numeric"
          maxLength={3}
        />
        <TouchableOpacity
          style={styles.addCustomButton}
          onPress={handleAddCustomItem}
          activeOpacity={0.7}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCartItem = ({ item }) => (
    <View style={[styles.cartItem, item.isChecked && styles.cartItemChecked]}>
      <TouchableOpacity
        style={[
          styles.checkButton,
          item.isChecked && styles.checkButtonChecked,
        ]}
        onPress={() => toggleChecked(item.id)}
        activeOpacity={0.7}
      >
        {item.isChecked && <Text style={styles.checkMark}>✓</Text>}
      </TouchableOpacity>

      <View style={styles.itemContent}>
        <Text
          style={[styles.itemName, item.isChecked && styles.itemNameChecked]}
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <View style={styles.itemMeta}>
          <Text
            style={[
              styles.itemRecipe,
              item.isCustom && styles.itemRecipeCustom,
            ]}
          >
            {item.isCustom ? 'Custom' : item.recipeName || 'Recipe'}
          </Text>

          <TouchableOpacity
            onPress={() => openUnitPicker(item)}
            activeOpacity={0.7}
          >
            <Text style={styles.unitText}>{item.unit || 'Unit'} ▼</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.id, item.quantity - 1)}
          activeOpacity={0.7}
        >
          <Text style={styles.quantityButtonText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.id, item.quantity + 1)}
          activeOpacity={0.7}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          removeFromCart(item.id);
          showToast(`"${item.name}" removed`, 'error');
        }}
        activeOpacity={0.7}
      >
        <Text style={styles.deleteIcon}>×</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🛒</Text>
      <Text style={styles.emptyTitle}>Your cart is empty</Text>
      <Text style={styles.emptySubtitle}>
        Add ingredients from recipes or add custom items above
      </Text>
      <TouchableOpacity
        style={styles.emptyButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <Text style={styles.emptyButtonText}>Browse Recipes</Text>
      </TouchableOpacity>
    </View>
  );

  const renderBottomActions = () => {
    if (stats.total === 0) return null;

    return (
      <View style={styles.bottomActions}>
        <TouchableOpacity
          style={[
            styles.bottomButton,
            styles.clearCheckedButton,
            stats.checked === 0 && styles.bottomButtonDisabled,
          ]}
          onPress={confirmClearChecked}
          activeOpacity={0.7}
          disabled={stats.checked === 0}
        >
          <Text style={styles.bottomButtonIcon}>✓</Text>
          <Text style={styles.bottomButtonText}>
            Clear Completed ({stats.checked})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.bottomButton, styles.clearAllButton]}
          onPress={confirmClearAll}
          activeOpacity={0.7}
        >
          <Text style={styles.bottomButtonIcon}>×</Text>
          <Text style={styles.bottomButtonText}>Clear All</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderUnitModal = () => (
    <Modal
      visible={unitModalVisible}
      transparent
      animationType="slide"
      onRequestClose={() => setUnitModalVisible(false)}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setUnitModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHandle} />
          <Text style={styles.modalTitle}>Select Unit</Text>
          {UNITS.map(unit => (
            <TouchableOpacity
              key={unit}
              style={styles.unitOption}
              onPress={() => handleUnitChange(unit)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.unitOptionText,
                  selectedItemForUnit?.unit === unit && styles.unitOptionActive,
                ]}
              >
                {unit.charAt(0).toUpperCase() + unit.slice(1)}
              </Text>
              {selectedItemForUnit?.unit === unit && (
                <Text style={styles.unitCheckMark}>✓</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <Toast
        visible={toastVisible}
        message={toastMessage}
        type={toastType}
        onHide={() => setToastVisible(false)}
      />

      {renderHeader()}

      {stats.total > 0 && (
        <>
          {renderStatsBar()}
          {renderSortBar()}
        </>
      )}

      {renderAddCustomSection()}

      <FlatList
        data={cartItems}
        keyExtractor={item => item.id}
        renderItem={renderCartItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
      />
      {renderBottomActions()}
      {renderUnitModal()}
    </SafeAreaView>
  );
};

export default CartScreen;
