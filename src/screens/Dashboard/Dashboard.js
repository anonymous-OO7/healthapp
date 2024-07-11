import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../HomeScreen/HomeScreen';
import AccountSetup from '../AccountSetup/AccountSetup';

//iconsnew
import HomeIcon from '../../assets/images/tabbar/newlogos/HomeIcon';
import StoreIcon from '../../assets/images/tabbar/newlogos/StoreIcon';
import JobsIcon from '../../assets/images/tabbar/newlogos/JobsIcon';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const tabHeight = windowHeight * (10 / 100);

import Comingsoon from '../../components/molecules/Comingsoon';

const Tab = createBottomTabNavigator();

const DashBoard = props => {
  console.log(props, 'PROPS IN DASHBOARD');
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: '#ffffff',
        tabBarShowLabel: false,
        keyboardHidesTabBar: false,
        tabBarStyle: {
          borderTopWidth: 0,
          position: 'absolute',
          height: tabHeight,
          borderStyle: 'solid',
          borderColor: '#E2E2E2',
          overflow: 'visible',
          elevation: 20,
          shadowColor: '#000000',
          shadowOpacity: 0.8,
          shadowRadius: 2,
          shadowOffset: {
            height: 2,
            width: 2,
          },
        },
      }}>
      <Tab.Screen
        name="Home"
        children={() => <HomeScreen props={props} />}
        options={{
          tabBarIcon: ({focused}) => {
            if (focused) {
              return <HomeIcon fill={'#7452D6'} />;
            } else {
              return <HomeIcon fill={'#333'} />;
            }
          },
        }}
      />
      {/* 
      <Tab.Screen
        name="ClipsSCreen"
        children={() => <AccountSetup props={props} />}
        options={{
          tabBarIcon: ({focused}) => {
            if (focused) {
              return <ClipIcon fill= {"#7452D6"} />;

            } else {
              return <ClipIcon fill= {"#333"} />;
            }
          },
        }}
      /> */}

      <Tab.Screen
        name="StoreScreen"
        children={() => <Comingsoon props={props} />}
        options={{
          tabBarIcon: ({focused}) => {
            if (focused) {
              // return <WatchlistActive />;
              return <StoreIcon fill={'#7452D6'} />;
            } else {
              return <StoreIcon fill={'#333'} />;
            }
          },
        }}
      />

      <Tab.Screen
        name="JobsScreen"
        children={() => <Comingsoon props={props} />}
        options={{
          tabBarIcon: ({focused}) => {
            if (focused) {
              // return <BellActive />;
              return <JobsIcon fill={'#7452D6'} />;
            } else {
              return <JobsIcon fill={'#333'} />;
            }
          },
        }}
      />
    </Tab.Navigator>
  );
};
export default DashBoard;
