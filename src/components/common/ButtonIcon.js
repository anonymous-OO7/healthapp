import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
  Icon,
} from 'react-native';
import LogoViewer from './LogoViewer';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const ButtonIcon = ({disabled, Logosource}) => {
  return (
    <View>
      <TouchableOpacity style={Buttonstyles.btnGoogle}>
        <View style={Buttonstyles.googleBtn}>
          <View style={Buttonstyles.googleIcon}>
            <LogoViewer
              Logosource={Logosource}
              containerstyle={Buttonstyles.logoImgContainer}
              logostyle={Buttonstyles.logoImg}
            />
          </View>
          <Text style={Buttonstyles.viewAllBtnTxt}>Sign in with Google</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Buttonstyles = StyleSheet.create({
  btnGoogle: {
    height: responsiveHeight(6),
    backgroundColor: 'white',
    marginTop: responsiveHeight(2),
    borderRadius: 8,
    borderWidth: 1,
  },
  googleBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  googleIcon: {
    position: 'absolute',
    left: responsiveWidth(1.5),
  },
  viewAllBtnTxt: {
    // fontSize:16,
    fontSize: responsiveFontSize(2),

    lineHeight: 20,
    fontWeight: '500',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'black',
    opacity: 0.8,
  },
  logoImgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImg: {
    height: responsiveHeight(4),
    width: responsiveHeight(6),
  },
});

export default ButtonIcon;
