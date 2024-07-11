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
import { NonSvg, VegSvg } from '../../assets/svgs/SvgImages';
import LogoViewer from './LogoViewer';
import { Colors } from '../../assets/colors';

const VegNon = ({
  disabled = true,
}) => {
  return (
    <View style={VegNonstyles.container}>



        <LogoViewer
          Logosource={disabled == true ? VegSvg: NonSvg}
          containerstyle={VegNonstyles.loginImgContainer}
          logostyle={VegNonstyles.loginImg}
        />
        {/* {
          disabled == true ? <Text style={VegNonstyles.vegText}>VEG</Text> :<Text style={[VegNonstyles.vegText,{color:Colors.nonveg}]}>NON VEG</Text>
        } */}
    
    </View>
  );
};

const VegNonstyles = StyleSheet.create({
  container: {
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    alignContent:"center",
    backgroundColor:"white",
    justifyContent:"center"

  },
  loginImgContainer:{
    backgroundColor:"white",
    alignItems:"center",
    justifyContent:"center",
    width:responsiveWidth(3)
  },
  loginImg:{
    height:responsiveHeight(3),
    width:responsiveHeight(3),

  },
  vegText:{
    fontSize: responsiveFontSize(1.4),
    fontFamily: 'Rubik-Medium',
    lineHeight: responsiveFontSize(3.4),
    color: Colors.veg,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default VegNon;
