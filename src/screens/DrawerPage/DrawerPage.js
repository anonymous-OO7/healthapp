import * as React from 'react';
import {
  Button,
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashBoard from '../Dashboard/Dashboard';
import { FeedBackSVG, Home, Pricing } from '../../assets/images/SvgImages.js';
const windowWidth = Dimensions.get('window').width;

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { Colors } from '../../assets/colors';
import CustomDrawer from '../../components/ui/molecules/CustomDrawer.js';
import TopBack from '../../components/ui/molecules/TopBack.js';
import { windowHeight } from '../../utils/Dimensions.js';
import { useTheme } from '@react-navigation/native';
import FeedbackScreen from '../FeedBack/FeedbackScreen.tsx';
import PricingPage from '../Pricing/PricingScreen.tsx';

const DrawerPage = props => {
  const theme = useTheme();
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      initialRouteName="DashBoard"
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: Colors.activeprimary,
        drawerInactiveBackgroundColor: theme.colors.background,
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          color: theme.colors.textPrimary,
          fontFamily: 'Roboto-Medium',
          fontSize: responsiveFontSize(2),
          marginLeft: -responsiveWidth(1),
        },
        drawerItemStyle: {
          marginHorizontal: responsiveWidth(3),
          marginVertical: responsiveHeight(0.8),
          paddingVertical: responsiveHeight(0.5),
          paddingHorizontal: responsiveWidth(2),
          borderRadius: responsiveWidth(3),
        },
        drawerStyle: {
          paddingTop: responsiveHeight(1),
        },
      }}
    >
      <Drawer.Screen
        name="DashBoard"
        component={DashBoard}
        options={{
          drawerIcon: ({ color }) => <Home color={color} />,
          drawerItemStyle: { height: 0, marginVertical: 0 },
          unmountOnBlur: true,
        }}
      />

      <Drawer.Screen
        name="Pricing"
        component={PricingPage}
        options={{
          drawerIcon: ({ color }) => (
            <Pricing color={color} fill={theme.colors.textPrimary} />
          ),
          drawerItemStyle: {
            marginHorizontal: responsiveWidth(3),
            marginVertical: responsiveHeight(0.8),
            paddingVertical: responsiveHeight(0.5),
            paddingHorizontal: responsiveWidth(2),
            borderRadius: responsiveWidth(3),
          },
        }}
      />
      <Drawer.Screen
        name="FeedBack"
        component={FeedbackScreen}
        options={{
          drawerIcon: ({ color }) => (
            <FeedBackSVG color={color} fill={theme.colors.textPrimary} />
          ),
          drawerItemStyle: {
            marginHorizontal: responsiveWidth(3),
            marginVertical: responsiveHeight(0.8),
            paddingVertical: responsiveHeight(0.5),
            paddingHorizontal: responsiveWidth(2),
            borderRadius: responsiveWidth(3),
          },
        }}
      />
    </Drawer.Navigator>
  );
};

function PricingScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
      <TopBack heading="Pricing" props={props} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: windowWidth,
    height: windowHeight,
    alignItems: 'center',
  },
  animationCtn: {
    backgroundColor: 'white',
    height: responsiveHeight(40),
    width: windowWidth,
  },
  notiText: {
    fontSize: responsiveFontSize(2.2),
    fontFamily: 'Rubik-Regular',
    color: 'black',
    width: windowWidth,
    backgroundColor: 'white',
    textAlign: 'center',
  },
  loginImgContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginImg: {
    height: responsiveHeight(31.7),
    width: responsiveHeight(40.52),
  },
});

export default DrawerPage;
