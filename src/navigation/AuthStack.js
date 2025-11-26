import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/OnboardingScreen/OnboardingScreen.js';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import AccountSetup from '../screens/AccountSetup/AccountSetup.js';
import DashBoard from '../screens/Dashboard/Dashboard.js';
import SearchPage from '../screens/SearchPage/SearchPage.js';
import RecipieList from '../screens/RecipieList/RecipieList.js';
import CategoryItems from '../screens/CategoryItems/CategoryItems.js';
import LandingScreen from '../screens/Landing/Landing.js';
import DetailsScreen from '../screens/DetailsPage/DetailsScreen.js';
import CartScreen from '../../src/screens/CartScreen/CartScreen.js';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
    >
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="DashBoard" component={DashBoard} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="RecipieList" component={RecipieList} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="AccountSetup" component={AccountSetup} />
      <Stack.Screen name="SearchPage" component={SearchPage} />
      <Stack.Screen name="CategoryItems" component={CategoryItems} />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
