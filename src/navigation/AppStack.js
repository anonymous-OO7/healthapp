import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/OnboardingScreen/OnboardingScreen.js';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import RecipieScreen from '../screens/RecipieScreen/RecipieScreen.js';
import AccountSetup from '../screens/AccountSetup/AccountSetup.js';
import DashBoard from '../screens/Dashboard/Dashboard.js';
import SearchPage from '../screens/SearchPage/SearchPage.js';
import LandingScreen from '../screens/Landing/Landing.js';
import CartScreen from '../../src/screens/CartScreen/CartScreen.js';
import HealthHistoryScreen from '../../src/screens/HealthHistory/HealthHistoryScreen.js';
import WorkoutCompleteScreen from '../../src/screens/WorkoutScreens/WorkoutCompleteScreen.js';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
    >
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="DashBoard" component={DashBoard} />
      <Stack.Screen name="HomeScreen" component={RecipieScreen} />
      <Stack.Screen name="SearchPage" component={SearchPage} />
      <Stack.Screen name="AccountSetup" component={AccountSetup} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen
        name="HealthHistory"
        component={HealthHistoryScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="WorkoutComplete"
        component={WorkoutCompleteScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
