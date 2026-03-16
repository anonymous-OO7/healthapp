import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useTheme } from '../../../themes';

const PrimaryButton = ({
  title,
  onPress = () => {},
  backgroundColor,
  textColor,
  disabled = false,
}) => {
  const { colors, fonts } = useTheme();
  const styles = createStyles(colors, fonts);

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} disabled={disabled}>
      <View
        style={[
          styles.btnContainer,
          { backgroundColor: backgroundColor || colors.buttonPrimary },
          disabled && styles.disabledButton,
        ]}
      >
        <Text
          style={[
            styles.title,
            { color: textColor || colors.white },
            disabled && styles.disabledText,
          ]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const SecondaryButton = ({
  title,
  onPress = () => {},
  backgroundColor,
  textColor,
  disabled = false,
}) => {
  const { colors, fonts } = useTheme();
  const styles = createStyles(colors, fonts);

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} disabled={disabled}>
      <View
        style={[
          styles.btnContainer,
          styles.secondaryBtn,
          backgroundColor && { backgroundColor },
          disabled && styles.disabledButton,
        ]}
      >
        <Text
          style={[
            styles.title,
            { color: textColor || colors.buttonPrimary },
            disabled && styles.disabledText,
          ]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const OutlineButton = ({
  title,
  onPress = () => {},
  borderColor,
  textColor,
  disabled = false,
}) => {
  const { colors, fonts } = useTheme();
  const styles = createStyles(colors, fonts);

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} disabled={disabled}>
      <View
        style={[
          styles.btnContainer,
          styles.outlineBtn,
          { borderColor: borderColor || colors.buttonPrimary },
          disabled && styles.disabledOutlineButton,
        ]}
      >
        <Text
          style={[
            styles.title,
            { color: textColor || colors.buttonPrimary },
            disabled && styles.disabledText,
          ]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const TextButton = ({
  title,
  onPress = () => {},
  textColor,
  disabled = false,
}) => {
  const { colors, fonts } = useTheme();
  const styles = createStyles(colors, fonts);

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} disabled={disabled}>
      <Text
        style={[
          styles.textButton,
          { color: textColor || colors.buttonPrimary },
          disabled && styles.disabledText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const createStyles = (colors, fonts) =>
  StyleSheet.create({
    title: {
      fontSize: responsiveFontSize(2),
      fontFamily: fonts?.semiBold || 'Poppins-SemiBold',
    },
    btnContainer: {
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    secondaryBtn: {
      backgroundColor: colors.buttonSecondary || colors.lightGrey || '#F0F0F0',
    },
    outlineBtn: {
      backgroundColor: 'transparent',
      borderWidth: 2,
    },
    textButton: {
      fontSize: responsiveFontSize(2),
      fontFamily: fonts?.semiBold || 'Poppins-SemiBold',
      textAlign: 'center',
      paddingVertical: 10,
    },
    disabledButton: {
      backgroundColor: colors.disabled || '#CCCCCC',
    },
    disabledOutlineButton: {
      borderColor: colors.disabled || '#CCCCCC',
    },
    disabledText: {
      color: colors.disabledText || '#999999',
    },
  });

export { PrimaryButton, SecondaryButton, OutlineButton, TextButton };
