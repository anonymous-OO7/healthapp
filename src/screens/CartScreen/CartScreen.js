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

// Styles & Assets
import CartScreenStyle from './CartScreenStyle';
import { Colors } from '../../assets/colors';
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
    <View style={CartScreenStyle.header}>
      <TouchableOpacity
        style={CartScreenStyle.backButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
      >
        <LogoViewer
          Logosource={BackSvg}
          containerstyle={{ width: 20, height: 20 }}
          logostyle={{ width: 20, height: 20, tintColor: Colors.black }}
        />
      </TouchableOpacity>

      <Text style={CartScreenStyle.headerTitle}>🛒 Shopping Cart</Text>

      <View style={CartScreenStyle.headerRight} />
    </View>
  );

  // Render Stats Bar
  const renderStatsBar = () => (
    <View style={CartScreenStyle.statsBar}>
      <View style={CartScreenStyle.statItem}>
        <Text style={CartScreenStyle.statNumber}>{stats.total}</Text>
        <Text style={CartScreenStyle.statLabel}>Total Items</Text>
      </View>
      <View style={CartScreenStyle.statDivider} />
      <View style={CartScreenStyle.statItem}>
        <Text
          style={[
            CartScreenStyle.statNumber,
            CartScreenStyle.statNumberChecked,
          ]}
        >
          {stats.checked}
        </Text>
        <Text style={CartScreenStyle.statLabel}>Shopped ✓</Text>
      </View>
      <View style={CartScreenStyle.statDivider} />
      <View style={CartScreenStyle.statItem}>
        <Text
          style={[
            CartScreenStyle.statNumber,
            CartScreenStyle.statNumberPending,
          ]}
        >
          {stats.pending}
        </Text>
        <Text style={CartScreenStyle.statLabel}>Pending</Text>
      </View>
    </View>
  );

  // Render Sort Bar
  const renderSortBar = () => (
    <View style={CartScreenStyle.sortBar}>
      {[
        { key: 'addedAt', label: '🕒 Recent' },
        { key: 'name', label: '🔤 Name' },
        { key: 'recipe', label: '🍲 Recipe' },
        { key: 'checked', label: '✓ Status' },
      ].map(option => (
        <TouchableOpacity
          key={option.key}
          style={[
            CartScreenStyle.sortButton,
            sortBy === option.key && CartScreenStyle.sortButtonActive,
          ]}
          onPress={() => handleSort(option.key)}
          activeOpacity={0.8}
        >
          <Text
            style={[
              CartScreenStyle.sortButtonText,
              sortBy === option.key && CartScreenStyle.sortButtonTextActive,
            ]}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderAddCustomSection = () => (
    <View style={CartScreenStyle.addCustomSection}>
      <Text style={CartScreenStyle.addCustomTitle}>➕ Add Custom Item</Text>
      <View style={CartScreenStyle.addCustomInputRow}>
        <TextInput
          style={CartScreenStyle.addCustomInput}
          placeholder="Item name..."
          placeholderTextColor={Colors.textSecondary}
          value={customItemName}
          onChangeText={setCustomItemName}
          returnKeyType="done"
          onSubmitEditing={handleAddCustomItem}
        />
        <TextInput
          style={CartScreenStyle.addCustomQuantityInput}
          placeholder="Qty"
          placeholderTextColor={Colors.textSecondary}
          value={customQuantity}
          onChangeText={setCustomQuantity}
          keyboardType="numeric"
          maxLength={3}
        />
        <TouchableOpacity
          style={CartScreenStyle.addCustomButton}
          onPress={handleAddCustomItem}
          activeOpacity={0.8}
        >
          <Text style={{ fontSize: 20, color: '#FFF', fontWeight: 'bold' }}>
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCartItem = ({ item }) => (
    <View
      style={[
        CartScreenStyle.cartItem,
        item.isChecked && CartScreenStyle.cartItemChecked,
      ]}
    >
      <TouchableOpacity
        style={[
          CartScreenStyle.checkButton,
          item.isChecked && CartScreenStyle.checkButtonChecked,
        ]}
        onPress={() => toggleChecked(item.id)}
        activeOpacity={0.8}
      >
        {item.isChecked && (
          <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 16 }}>
            ✓
          </Text>
        )}
      </TouchableOpacity>

      <View style={CartScreenStyle.itemContent}>
        <Text
          style={[
            CartScreenStyle.itemName,
            item.isChecked && CartScreenStyle.itemNameChecked,
          ]}
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <View style={CartScreenStyle.itemMeta}>
          <Text
            style={[
              CartScreenStyle.itemRecipe,
              item.isCustom && CartScreenStyle.itemRecipeCustom,
            ]}
          >
            {item.isCustom ? '✏️ Custom' : `🍲 ${item.recipeName || 'Recipe'}`}
          </Text>

          <TouchableOpacity onPress={() => openUnitPicker(item)}>
            <Text style={CartScreenStyle.unitText}>
              {item.unit || 'Unit'} ▼
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={CartScreenStyle.quantityContainer}>
        <TouchableOpacity
          style={CartScreenStyle.quantityButton}
          onPress={() => updateQuantity(item.id, item.quantity - 1)}
          activeOpacity={0.8}
        >
          <Text style={CartScreenStyle.quantityButtonText}>−</Text>
        </TouchableOpacity>
        <Text style={CartScreenStyle.quantityText}>{item.quantity}</Text>
        <TouchableOpacity
          style={CartScreenStyle.quantityButton}
          onPress={() => updateQuantity(item.id, item.quantity + 1)}
          activeOpacity={0.8}
        >
          <Text style={CartScreenStyle.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={CartScreenStyle.deleteButton}
        onPress={() => {
          removeFromCart(item.id);
          showToast(`"${item.name}" removed`, 'error');
        }}
        activeOpacity={0.8}
      >
        <Text style={{ fontSize: 18 }}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmptyState = () => (
    <View style={CartScreenStyle.emptyContainer}>
      <Text style={CartScreenStyle.emptyIcon}>🛒</Text>
      <Text style={CartScreenStyle.emptyTitle}>Your cart is empty</Text>
      <Text style={CartScreenStyle.emptySubtitle}>
        Add ingredients from recipes or add custom items above
      </Text>
      <TouchableOpacity
        style={CartScreenStyle.emptyButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
      >
        <Text style={CartScreenStyle.emptyButtonText}>Browse Recipes</Text>
      </TouchableOpacity>
    </View>
  );

  const renderBottomActions = () => {
    if (stats.total === 0) return null;

    return (
      <View style={CartScreenStyle.bottomActions}>
        <TouchableOpacity
          style={[
            CartScreenStyle.bottomButton,
            CartScreenStyle.clearCheckedButton,
            stats.checked === 0 && CartScreenStyle.bottomButtonDisabled,
          ]}
          onPress={confirmClearChecked}
          activeOpacity={0.8}
          disabled={stats.checked === 0}
        >
          <Text style={{ fontSize: 16, color: Colors.white }}>✓</Text>
          <Text style={CartScreenStyle.bottomButtonText}>
            Clear Shopped ({stats.checked})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[CartScreenStyle.bottomButton, CartScreenStyle.clearAllButton]}
          onPress={confirmClearAll}
          activeOpacity={0.8}
        >
          <Text style={{ fontSize: 16, color: Colors.white }}>🗑️</Text>
          <Text style={CartScreenStyle.bottomButtonText}>Clear All</Text>
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
        style={CartScreenStyle.modalOverlay}
        activeOpacity={1}
        onPress={() => setUnitModalVisible(false)}
      >
        <View style={CartScreenStyle.modalContent}>
          <Text style={CartScreenStyle.modalTitle}>Select Unit</Text>
          {UNITS.map(unit => (
            <TouchableOpacity
              key={unit}
              style={CartScreenStyle.unitOption}
              onPress={() => handleUnitChange(unit)}
            >
              <Text
                style={[
                  CartScreenStyle.unitOptionText,
                  selectedItemForUnit?.unit === unit &&
                    CartScreenStyle.unitOptionActive,
                ]}
              >
                {unit.charAt(0).toUpperCase() + unit.slice(1)}
              </Text>
              {selectedItemForUnit?.unit === unit && (
                <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>
                  ✓
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <SafeAreaView style={CartScreenStyle.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

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
        contentContainerStyle={CartScreenStyle.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
      />
      {renderBottomActions()}
      {renderUnitModal()}
    </SafeAreaView>
  );
};

export default CartScreen;
