import React from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {BackSvg} from '../../assets/svgs/SvgImages';
import LottieView from 'lottie-react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const fontScale = Dimensions.get('window').fontScale;
const Comingsoon = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        style={styles.animationCtn}
        source={require('../../assets/animations/comingsoon.json')}
        autoPlay
        loop
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationCtn: {
    backgroundColor: 'white',
    height: responsiveHeight(30),
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
});
export default Comingsoon;
