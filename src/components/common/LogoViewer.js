import React from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';

import Logo from '../../assets/images/Acko-Insurance.svg';

import LoginImg from '../../assets/images/LoginImg.svg';

import Svg ,{Path,Defs,G}  from 'react-native-svg';







const LogoViewer = ({Logosource , containerstyle, logostyle}) => {

  return (



      <View style={containerstyle}>
           <Logosource  height={logostyle.height}  width = {logostyle.width}/>
      </View>

    

  );
};

export default LogoViewer;
