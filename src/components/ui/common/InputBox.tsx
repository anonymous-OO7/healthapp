import React, { useCallback } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { Colors } from "../../../assets/colors";

interface InputBoxProps {
  inputplaceholder?: string;
  onChangeText: (text: string) => void;
  keyboardtype?:
    | "default"
    | "numeric"
    | "email-address"
    | "phone-pad"
    | "decimal-pad";
  onfocushandler?: () => void;
  value?: string;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

const InputBox: React.FC<InputBoxProps> = ({
  inputplaceholder = "default placeholder",
  onChangeText = (text: string) => {},
  keyboardtype = "default",
  onfocushandler = () => {},
  value = "",
  onBlur = () => {},
}) => {
  const handleFocus = useCallback(() => {
    if (onfocushandler) {
      onfocushandler();
    }
  }, [onfocushandler]);

  const handleChangeText = useCallback(
    (text: string) => {
      onChangeText(text);
    },
    [onChangeText]
  );

  return (
    <View>
      <TextInput
        onChangeText={handleChangeText}
        style={InputBoxstyles.textInput}
        placeholder={inputplaceholder}
        keyboardType={keyboardtype}
        placeholderTextColor={Colors.textBase}
        onFocus={handleFocus}
        value={value}
        onBlur={onBlur}
      />
    </View>
  );
};

const InputBoxstyles = StyleSheet.create({
  textInput: {
    height: responsiveHeight(5),
    width: responsiveWidth(80),
    padding: 0,
    margin: 0,
    marginBottom: responsiveHeight(1),
    fontSize: responsiveFontSize(1.8),
    fontFamily: "Rubik-Regular",
    borderBottomWidth: responsiveWidth(0.2),
    borderBottomColor: Colors.textBase,
    color: "black",
  },
});

export default InputBox;
