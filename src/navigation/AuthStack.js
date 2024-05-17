import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/OnboardingScreen/OnboardingScreen.js';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import AccountSetup from '../screens/AccountSetup/AccountSetup.js';
import DashBoard from '../screens/Dashboard/Dashboard.js';
import SearchPage from '../screens/SearchPage/SearchPage.js';
import RecipieList from '../screens/RecipieList/RecipieList.js';
import CategoryItems from '../screens/CategoryItems/CategoryItems.js';
import DetailsPage from '../screens/DetailsPage/DetailsPage.js';
import LandingScreen from '../screens/Landing/Landing.js';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="DashBoard" component={DashBoard} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="RecipieList" component={RecipieList} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="AccountSetup" component={AccountSetup} />
      <Stack.Screen name="SearchPage" component={SearchPage} />
      <Stack.Screen name="CategoryItems" component={CategoryItems} />
      <Stack.Screen name="DetailsPage" component={DetailsPage} />
    </Stack.Navigator>
  );
};

export default AuthStack;
