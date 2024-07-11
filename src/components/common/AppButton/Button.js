import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {Colors} from '../../../assets/colors.js';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

const PrimaryButton = ({title, onPress = () => {}}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={style.btnContainer}>
        <Text style={style.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
const SecondaryButton = ({title, onPress = () => {}}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View
        style={{...style.btnContainer, backgroundColor: Colors.PrimaryButton}}>
        <Text style={{...style.title, color: Colors.primary}}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  title: {
    color: Colors.black,
    fontSize: responsiveFontSize(2),
    fontFamily: 'Poppins-Regular',
  },
  btnContainer: {
    backgroundColor: Colors.orange,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {PrimaryButton, SecondaryButton};
