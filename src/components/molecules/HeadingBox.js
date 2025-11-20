import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import InputBox from '../common/InputBox';

const HeadingBox = (
  {props, headingText, inputplaceholder = 'box placeholder' ,  onInputChange = (text) => {
    console.log('Default On box texthandler  ' + text);
  }},
 
) => {
  return (
    <View>
      <Text style={HeadingBoxstyles.headingText}>{headingText}</Text>

      <InputBox
        inputplaceholder={inputplaceholder}
        onChangeText={onInputChange}
      />
    </View>
  );
};

const HeadingBoxstyles = StyleSheet.create({
  headingText: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: 'Rubik-Light',
    color: '#333333',
    backgroundColor: 'white',
    width: responsiveWidth(82),
    marginLeft: responsiveWidth(8),
    marginTop: responsiveHeight(3.7),
  },
});

export default HeadingBox;
