import React, {useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {SafeAreaView} from 'react-native-safe-area-context';
import {PrimaryButton} from '../../components/common/AppButton/Button';
import {Colors} from '../../assets/colors';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

const LandingScreen = () => {
  const navigation = useNavigation();

  const onSignIn = () => {
    navigation.navigate('DashBoard');
  };

  const onSignUp = () => {
    navigation.navigate('DashBoard');
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
      <View style={{height: 400}}>
        <Image
          style={{
            width: '100%',
            resizeMode: 'contain',
            top: -150,
          }}
          source={require('../../assets/images/onboardImage.png')}
        />
      </View>
      <View style={style.textContainer}>
        <View>
          <Text
            style={{
              fontSize: 32,
              fontFamily: 'Poppins-Regular',
              textAlign: 'center',
              color: Colors.black,
            }}>
            Delicious Food
          </Text>
          <Text
            style={{
              marginTop: 20,
              fontSize: responsiveFontSize(3),
              textAlign: 'center',
              color: Colors.black,
              fontFamily: 'Poppins-Regular',
            }}>
            We help you to find best and delicious food
          </Text>
        </View>
        <View style={style.indicatorContainer}>
          <View style={style.currentIndicator} />
          <View style={style.indicator} />
          <View style={style.indicator} />
        </View>
        <PrimaryButton
          onPress={() => {
            onSignIn();
          }}
          title="Get Started"
        />
      </View>
    </SafeAreaView>
  );
};

export default LandingScreen;

const style = StyleSheet.create({
  textContainer: {
    flex: 1,
    paddingHorizontal: 50,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  indicatorContainer: {
    height: 50,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentIndicator: {
    height: 12,
    width: 30,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    marginHorizontal: 5,
  },
  indicator: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: Colors.grey,
    marginHorizontal: 5,
  },
});
