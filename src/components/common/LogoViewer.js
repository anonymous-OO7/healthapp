import React from 'react';
import { View} from 'react-native';

const LogoViewer = ({Logosource, containerstyle, logostyle}) => {
  return (
    <View style={containerstyle}>
      <Logosource height={logostyle.height} width={logostyle.width} />
    </View>
  );
};

export default LogoViewer;
