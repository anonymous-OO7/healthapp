import React from 'react';
import { View, Dimensions, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import HomeScreen from '../HomeScreen/HomeScreen';
import Comingsoon from '../../components/molecules/Comingsoon';

// Icons
import HomeIcon from '../../assets/images/tabbar/newlogos/HomeIcon';
import StoreIcon from '../../assets/images/tabbar/newlogos/StoreIcon';
import JobsIcon from '../../assets/images/tabbar/newlogos/JobsIcon';
import CartScreen from '../CartScreen/CartScreen';

import CartIcon from '../../assets/images/tabbar/newlogos/CartIcon';

const windowHeight = Dimensions.get('window').height;

// Colors - Centralized for consistency
const COLORS = {
  primary: '#7452D6',
  inactive: '#A0A0A0', // Softer gray than #333
  background: '#FFFFFF',
  shadow: '#000000',
};

const Tab = createBottomTabNavigator();

const DashBoard = props => {
  // Helper to render icons cleanly
  const renderIcon = (IconComponent, focused) => (
    <View style={[styles.iconContainer, focused && styles.iconActiveContainer]}>
      <IconComponent fill={focused ? COLORS.primary : COLORS.inactive} />
      {/* Optional: Add a small dot below active icon for a modern touch */}
      {focused && <View style={styles.activeDot} />}
    </View>
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        keyboardHidesTabBar: true, // Usually better UX to hide tab on keyboard open
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="Home"
        children={() => <HomeScreen {...props} />} // Spread props cleaner
        options={{
          tabBarIcon: ({ focused }) => renderIcon(HomeIcon, focused),
        }}
      />

      <Tab.Screen
        name="CartScreen"
        children={() => <CartScreen {...props} />}
        options={{
          tabBarIcon: ({ focused }) => renderIcon(CartIcon, focused),
        }}
      />

      <Tab.Screen
        name="JobsScreen"
        children={() => <Comingsoon {...props} />}
        options={{
          tabBarIcon: ({ focused }) => renderIcon(JobsIcon, focused),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.background,
    borderTopWidth: 0, // Removes the ugly default line
    elevation: 10, // Android Shadow

    // iOS Shadow & Layout
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: -4, // Shadow casts upwards
    },
    shadowOpacity: 0.1, // Subtle shadow
    shadowRadius: 4,

    // Height & Spacing
    height: Platform.OS === 'ios' ? 90 : 70, // Fixed heights are safer than percentages
    borderTopLeftRadius: 20, // Rounded top corners look modern
    borderTopRightRadius: 20,
    paddingTop: 10,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: 50,
  },
  activeDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: COLORS.primary,
    marginTop: 4, // Spacing between icon and dot
  },
});

export default DashBoard;
