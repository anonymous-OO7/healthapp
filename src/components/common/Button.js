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

const Button = ({
  disabled = true,
  onclick = () => {
    console.log('checking  default logingg in!');
  },
  buttonctn,
  btntext = 'Button',
}) => {
  return (
    <View style={buttonctn}>
      <TouchableOpacity
        onPress={onclick}
        disabled={disabled}
        style={[
          Buttonstyles.buttonstyle,
          {backgroundColor: disabled ? '#D6D6D6' : '#007FFF'},
        ]}>
        <Text style={Buttonstyles.title}>{btntext}</Text>
      </TouchableOpacity>
    </View>
  );
};

const Buttonstyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#eaeaea',
  },
  title: {
    borderRadius: 6,
    color: 'black',
    textAlign: 'center',
    fontSize: responsiveFontSize(2),
    fontFamily: 'Rubik-Regular',
  },
  buttonstyle: {
    backgroundColor: '#D6D6D6',
    height: responsiveHeight(6),
    borderRadius: responsiveHeight(1),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});

export default Button;
