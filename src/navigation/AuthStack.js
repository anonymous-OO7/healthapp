import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/OnboardingScreen/OnboardingScreen.js';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import RecipieScreen from '../screens/RecipieScreen/RecipieScreen.js';
import AccountSetup from '../screens/AccountSetup/AccountSetup.js';
import DashBoard from '../screens/Dashboard/Dashboard.js';
import SearchPage from '../screens/SearchPage/SearchPage.js';
import RecipieList from '../screens/RecipieList/RecipieList.js';
import CategoryItems from '../screens/CategoryItems/CategoryItems.js';
import LandingScreen from '../screens/Landing/Landing.js';
import DetailsScreen from '../screens/DetailsPage/DetailsScreen.js';
import CartScreen from '../../src/screens/CartScreen/CartScreen.js';
import WorkoutHomeScreen from '../screens/WorkoutScreens/WorkoutHomeScreen.js';
import WorkOutScreen from '../screens/WorkoutScreens/WorkOutScreen/WorkOutScreen.js';
import FitScreen from '../screens/WorkoutScreens/FitScreen.js';
import RestScreen from '../screens/WorkoutScreens/RestScreen.js';
import HealthHistoryScreen from '../../src/screens/HealthHistory/HealthHistoryScreen.js';
import WorkoutCompleteScreen from '../../src/screens/WorkoutScreens/WorkoutCompleteScreen.js';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
    >
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="DashBoard" component={DashBoard} />
      <Stack.Screen name="HomeScreen" component={RecipieScreen} />
      <Stack.Screen name="RecipieList" component={RecipieList} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="AccountSetup" component={AccountSetup} />
      <Stack.Screen name="SearchPage" component={SearchPage} />
      <Stack.Screen name="CategoryItems" component={CategoryItems} />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      <Stack.Screen name="CartScreen" component={CartScreen} />

      <Stack.Screen
        name="WorkoutHome"
        component={WorkoutHomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Workout"
        component={WorkOutScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Fit"
        component={FitScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Rest"
        component={RestScreen}
        options={{ headerShown: false }}
      />
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

export default AuthStack;
