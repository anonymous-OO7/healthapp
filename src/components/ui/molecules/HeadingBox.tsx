import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import InputBox from "../common/InputBox.tsx";

interface HeadingBoxProps {
  headingText: string;
  inputplaceholder?: string;
  containerstyle?: ViewStyle;
  onInputChange?: (text: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;

  keyboardtype?:
    | "default"
    | "numeric"
    | "email-address"
    | "phone-pad"
    | "decimal-pad";
  inputvalue?: string;
}

const HeadingBox: React.FC<HeadingBoxProps> = ({
  headingText,
  inputplaceholder = "box placeholder",
  containerstyle,
  onInputChange = (text: string) => {},
  keyboardtype = "default",
  inputvalue,
  onBlur,
}) => {
  return (
    <View style={containerstyle}>
      <Text style={HeadingBoxstyles.headingText}>{headingText}</Text>

      <InputBox
        inputplaceholder={inputplaceholder}
        onChangeText={onInputChange}
        keyboardtype={keyboardtype}
        value={inputvalue}
        onBlur={onBlur}
      />
    </View>
  );
};

const HeadingBoxstyles = StyleSheet.create({
  headingText: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: "Rubik-Light",
    color: "black",
    backgroundColor: "white",
    width: responsiveWidth(82),
    marginTop: responsiveHeight(3.7),
  },
});

export default HeadingBox;
