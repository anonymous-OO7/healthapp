import React from 'react';
import { View, Dimensions, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import HomeScreen from '../HomeScreen/HomeScreen';
import Comingsoon from '../../components/molecules/Comingsoon';
import WorkoutHomeScreen from '../WorkoutScreens/WorkoutHomeScreen';
// Icons
import HomeIcon from '../../assets/images/tabbar/newlogos/HomeIcon';
import StoreIcon from '../../assets/images/tabbar/newlogos/StoreIcon';
import JobsIcon from '../../assets/images/tabbar/newlogos/JobsIcon';
import CartScreen from '../CartScreen/CartScreen';
import WorkoutIconSvg from '../../assets/images/tabbar/newlogos/WorkoutIconSvg';

import CartIcon from '../../assets/images/tabbar/newlogos/CartIcon';

const windowHeight = Dimensions.get('window').height;

const COLORS = {
  primary: '#7452D6',
  inactive: '#A0A0A0',
  background: '#FFFFFF',
  shadow: '#000000',
};

const Tab = createBottomTabNavigator();

const DashBoard = props => {
  const renderIcon = (IconComponent, focused) => (
    <View style={[styles.iconContainer, focused && styles.iconActiveContainer]}>
      <IconComponent fill={focused ? COLORS.primary : COLORS.inactive} />
      {focused && <View style={styles.activeDot} />}
    </View>
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        keyboardHidesTabBar: true,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="Home"
        children={() => <HomeScreen {...props} />}
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
        name="WorkoutHome"
        children={() => <WorkoutHomeScreen {...props} />}
        options={{
          tabBarIcon: ({ focused }) => renderIcon(WorkoutIconSvg, focused),
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
    borderTopWidth: 0,
    elevation: 10,

    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    height: Platform.OS === 'ios' ? 90 : 70,
    borderTopLeftRadius: 20,
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
    marginTop: 4,
  },
});

export default DashBoard;
