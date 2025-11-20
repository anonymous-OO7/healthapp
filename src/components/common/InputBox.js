import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';




const InputBox = ({
  props,
  inputplaceholder = 'default placeholder',
  onChangeText = text => {
    console.log('Default On texthandler  ' + text);
  },
}) => {





  return (

    <View>
      <TextInput
        onChangeText={onChangeText}
        style={InputBoxstyles.textInput}
        placeholder={inputplaceholder}
      />
    </View>

    
  );
};

const InputBoxstyles = StyleSheet.create({
  textInput: {
    marginTop: responsiveHeight(1),
    width: responsiveWidth(80),
    marginLeft: responsiveWidth(8),
    borderBottomColor: 'white',
    padding: 0,
    margin: 0,
    borderBottomWidth: 1,
    marginBottom: responsiveHeight(1),
    fontSize: responsiveFontSize(1.7),
    borderBottomWidth: 1,
    borderBottomColor: '#D6D6D6',
  },
});

export default InputBox;
