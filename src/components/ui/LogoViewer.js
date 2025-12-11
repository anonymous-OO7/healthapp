import React from "react";
import { SafeAreaView, View } from "react-native";

const LogoViewer = ({ Logosource, containerstyle, logostyle }) => {
  return (
    <View style={containerstyle}>
      <Logosource
        height={logostyle.height}
        width={logostyle.width}
        fill={logostyle.fill}
      />
    </View>
  );
};

export default LogoViewer;
