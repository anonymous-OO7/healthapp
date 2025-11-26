import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext();

const CART_STORAGE_KEY = '@shopping_cart';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from AsyncStorage on app start
  useEffect(() => {
    loadCart();
  }, []);

  // Save cart to AsyncStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      saveCart();
    }
  }, [cartItems]);

  const loadCart = async () => {
    try {
      const savedCart = await AsyncStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.log('Error loading cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveCart = async () => {
    try {
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.log('Error saving cart:', error);
    }
  };

  // Add item to cart
  const addToCart = (item, recipeName = '') => {
    const existingItem = cartItems.find(
      cartItem => cartItem.name.toLowerCase() === item.toLowerCase(),
    );

    if (existingItem) {
      // Item already exists, increase quantity
      updateQuantity(existingItem.id, existingItem.quantity + 1);
      return { success: true, message: 'Quantity updated', isNew: false };
    } else {
      // Add new item
      const newItem = {
        id: Date.now().toString(),
        name: item,
        quantity: 1,
        unit: 'piece',
        isChecked: false,
        recipeName: recipeName,
        addedAt: new Date().toISOString(),
        isCustom: false,
      };
      setCartItems(prev => [...prev, newItem]);
      return { success: true, message: 'Added to cart', isNew: true };
    }
  };

  // Add custom item
  const addCustomItem = (name, quantity = 1, unit = 'piece') => {
    const newItem = {
      id: Date.now().toString(),
      name: name,
      quantity: quantity,
      unit: unit,
      isChecked: false,
      recipeName: 'Custom',
      addedAt: new Date().toISOString(),
      isCustom: true,
    };
    setCartItems(prev => [...prev, newItem]);
    return { success: true, message: 'Custom item added' };
  };

  // Remove item from cart
  const removeFromCart = itemId => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
    return { success: true, message: 'Removed from cart' };
  };

  // Remove by name (for ingredient toggle)
  const removeByName = name => {
    setCartItems(prev =>
      prev.filter(item => item.name.toLowerCase() !== name.toLowerCase()),
    );
    return { success: true, message: 'Removed from cart' };
  };

  // Update quantity
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  // Update unit
  const updateUnit = (itemId, newUnit) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, unit: newUnit } : item,
      ),
    );
  };

  // Toggle checked status
  const toggleChecked = itemId => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, isChecked: !item.isChecked } : item,
      ),
    );
  };

  // Check if item is in cart
  const isInCart = name => {
    return cartItems.some(
      item => item.name.toLowerCase() === name.toLowerCase(),
    );
  };

  // Get item by name
  const getItemByName = name => {
    return cartItems.find(
      item => item.name.toLowerCase() === name.toLowerCase(),
    );
  };

  // Clear all items
  const clearCart = () => {
    setCartItems([]);
  };

  // Clear only checked items
  const clearCheckedItems = () => {
    setCartItems(prev => prev.filter(item => !item.isChecked));
  };

  // Get cart statistics
  const getCartStats = () => {
    const total = cartItems.length;
    const checked = cartItems.filter(item => item.isChecked).length;
    const pending = total - checked;
    return { total, checked, pending };
  };

  // Sort cart items
  const sortCart = (sortBy = 'addedAt') => {
    const sorted = [...cartItems].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'checked') return a.isChecked - b.isChecked;
      if (sortBy === 'recipe') return a.recipeName.localeCompare(b.recipeName);
      return new Date(b.addedAt) - new Date(a.addedAt);
    });
    setCartItems(sorted);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isLoading,
        addToCart,
        addCustomItem,
        removeFromCart,
        removeByName,
        updateQuantity,
        updateUnit,
        toggleChecked,
        isInCart,
        getItemByName,
        clearCart,
        clearCheckedItems,
        getCartStats,
        sortCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
