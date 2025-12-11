import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import type { StyleProp, ViewStyle, TextStyle } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { useTheme } from '../../themes';

interface Props {
  disabled?: boolean;
  onclick?: () => void;
  buttonctn?: StyleProp<ViewStyle>;
  btntext?: string;
  loading?: boolean;
  mode?: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';
  contentStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  activeColor?: string;
  disabledColor?: string;
  textColor?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
}

const Button: React.FC<Props> = ({
  disabled = true,
  onclick = () => {},
  buttonctn,
  btntext = 'Button',
  loading = false,
  mode = 'contained',
  contentStyle,
  labelStyle,
  children,
  style,
  activeColor,
  disabledColor,
  textColor,
  variant = 'primary',
  ...props
}) => {
  const { colors, fonts } = useTheme();

  const getVariantColors = () => {
    switch (variant) {
      case 'secondary':
        return { active: colors.buttonSecondary, text: colors.text };
      case 'danger':
        return { active: colors.buttonDanger, text: colors.buttonText };
      case 'success':
        return { active: colors.buttonSuccess, text: colors.buttonText };
      case 'outline':
        return { active: 'transparent', text: colors.buttonOutlineText };
      case 'primary':
      default:
        return { active: colors.buttonPrimary, text: colors.buttonText };
    }
  };

  const variantColors = getVariantColors();

  const resolvedActiveColor = activeColor ?? variantColors.active;
  const resolvedDisabledColor = disabledColor ?? colors.disabled;
  const resolvedTextColor = disabled
    ? colors.buttonTextDisabled
    : textColor ?? variantColors.text;

  const buttonColor = disabled ? resolvedDisabledColor : resolvedActiveColor;
  const resolvedMode = variant === 'outline' ? 'outlined' : mode;

  return (
    <View style={buttonctn}>
      <PaperButton
        mode={resolvedMode}
        buttonColor={buttonColor}
        onPress={onclick}
        disabled={disabled}
        loading={loading}
        textColor={resolvedTextColor}
        contentStyle={[ButtonStyles.contentStyle, contentStyle]}
        labelStyle={[
          ButtonStyles.labelStyle,
          { color: resolvedTextColor, fontFamily: fonts.button },
          labelStyle,
        ]}
        style={[
          ButtonStyles.buttonStyle,
          { shadowColor: colors.shadow },
          variant === 'outline' && {
            borderColor: disabled ? colors.disabled : colors.buttonOutline,
            borderWidth: 1,
          },
          style,
        ]}
        rippleColor={colors.ripple}
        {...props}
      >
        {children || btntext}
      </PaperButton>
    </View>
  );
};

const ButtonStyles = StyleSheet.create({
  buttonStyle: {
    borderRadius: responsiveHeight(1),
    elevation: 5,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  contentStyle: {
    height: responsiveHeight(6),
    paddingHorizontal: responsiveWidth(5),
  },
  labelStyle: {
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
  },
});

export default Button;
