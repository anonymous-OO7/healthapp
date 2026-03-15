import * as React from 'react';
import { View, StyleSheet, DimensionValue } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import type { StyleProp, ViewStyle, TextStyle } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { useTheme } from '../../themes';

interface Props {
  // Existing props
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

  // Dimension props
  width?: DimensionValue;
  height?: DimensionValue;
  minWidth?: DimensionValue;
  maxWidth?: DimensionValue;
  fullWidth?: boolean;

  // Spacing props
  paddingHorizontal?: number;
  paddingVertical?: number;
  marginTop?: number;
  marginBottom?: number;
  marginHorizontal?: number;
  marginVertical?: number;

  // Border props
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;

  // Text props
  fontSize?: number;
  fontWeight?: TextStyle['fontWeight'];
  autoAdjustFont?: boolean; // NEW: Enable/disable auto font adjustment

  // Size presets
  size?: 'small' | 'medium' | 'large';

  // Shadow
  elevation?: number;
  noShadow?: boolean;

  // Press effect
  activeOpacity?: number;
}

const Button: React.FC<Props> = ({
  // Existing props
  disabled = false,
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

  // Dimension props
  width,
  height,
  minWidth,
  maxWidth,
  fullWidth = false,
  paddingHorizontal,
  paddingVertical,
  marginTop,
  marginBottom,
  marginHorizontal,
  marginVertical,
  borderRadius,
  borderWidth,
  borderColor,
  fontSize,
  fontWeight,
  autoAdjustFont = true, // Default enabled
  size = 'medium',
  elevation = 5,
  noShadow = false,
  activeOpacity = 0.7,

  ...props
}) => {
  const { colors, fonts } = useTheme();

  // Size presets with proportional values
  const getSizePreset = () => {
    switch (size) {
      case 'small':
        return {
          height: responsiveHeight(4.5),
          paddingHorizontal: responsiveWidth(3),
          paddingVertical: responsiveHeight(0.8),
          fontSize: responsiveFontSize(1.6),
          minFontSize: 10,
        };
      case 'large':
        return {
          height: responsiveHeight(7),
          paddingHorizontal: responsiveWidth(6),
          paddingVertical: responsiveHeight(1.5),
          fontSize: responsiveFontSize(2.2),
          minFontSize: 14,
        };
      case 'medium':
      default:
        return {
          height: responsiveHeight(6),
          paddingHorizontal: responsiveWidth(5),
          paddingVertical: responsiveHeight(1.2),
          fontSize: responsiveFontSize(2),
          minFontSize: 12,
        };
    }
  };

  const sizePreset = getSizePreset();

  // Calculate auto-adjusted font size based on height
  const getAutoAdjustedFontSize = (): number => {
    // If fontSize is explicitly provided, use it
    if (fontSize !== undefined) {
      return fontSize;
    }

    // If height is provided and autoAdjustFont is enabled
    if (autoAdjustFont && height !== undefined && typeof height === 'number') {
      // Font size = ~35-40% of button height for good readability
      const calculatedFontSize = Math.floor(height * 0.35);

      // Clamp between min and max values
      const minFont = 10;
      const maxFont = 24;

      return Math.max(minFont, Math.min(maxFont, calculatedFontSize));
    }

    // If width is provided, consider it for font sizing
    if (autoAdjustFont && width !== undefined && typeof width === 'number') {
      // Estimate font size based on width and text length
      const textLength = (children?.toString() || btntext).length;
      const availableWidth =
        width - (paddingHorizontal ?? sizePreset.paddingHorizontal) * 2;

      // Rough calculation: each character ~60% of font size in width
      const calculatedFontSize = Math.floor(
        availableWidth / (textLength * 0.6),
      );

      // Clamp between min and max values
      const minFont = 10;
      const maxFont = 24;

      return Math.max(minFont, Math.min(maxFont, calculatedFontSize));
    }

    // Default to size preset
    return sizePreset.fontSize;
  };

  // Calculate auto-adjusted padding based on dimensions
  const getAutoAdjustedPadding = () => {
    let hPadding = paddingHorizontal ?? sizePreset.paddingHorizontal;
    let vPadding = paddingVertical ?? sizePreset.paddingVertical;

    if (autoAdjustFont) {
      // Adjust padding proportionally to height
      if (height !== undefined && typeof height === 'number') {
        vPadding = Math.max(4, Math.floor(height * 0.15));
      }

      // Adjust padding proportionally to width
      if (width !== undefined && typeof width === 'number') {
        hPadding = Math.max(8, Math.floor(width * 0.1));
      }
    }

    return { hPadding, vPadding };
  };

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

  // Calculate ripple color
  const rippleColor = colors.ripple ?? `${resolvedActiveColor}40`;

  // Get auto-adjusted values
  const adjustedFontSize = getAutoAdjustedFontSize();
  const { hPadding, vPadding } = getAutoAdjustedPadding();

  // Build dynamic button style
  const dynamicButtonStyle: ViewStyle = {};

  if (width !== undefined) dynamicButtonStyle.width = width;
  if (minWidth !== undefined) dynamicButtonStyle.minWidth = minWidth;
  if (maxWidth !== undefined) dynamicButtonStyle.maxWidth = maxWidth;
  if (fullWidth) dynamicButtonStyle.width = '100%';
  if (borderRadius !== undefined) {
    dynamicButtonStyle.borderRadius = borderRadius;
  } else if (height !== undefined && typeof height === 'number') {
    // Auto border radius based on height
    dynamicButtonStyle.borderRadius = Math.min(height * 0.2, 12);
  }
  if (borderWidth !== undefined) dynamicButtonStyle.borderWidth = borderWidth;
  if (borderColor !== undefined) dynamicButtonStyle.borderColor = borderColor;
  if (marginTop !== undefined) dynamicButtonStyle.marginTop = marginTop;
  if (marginBottom !== undefined)
    dynamicButtonStyle.marginBottom = marginBottom;
  if (marginHorizontal !== undefined)
    dynamicButtonStyle.marginHorizontal = marginHorizontal;
  if (marginVertical !== undefined)
    dynamicButtonStyle.marginVertical = marginVertical;

  if (noShadow) {
    dynamicButtonStyle.elevation = 0;
    dynamicButtonStyle.shadowOpacity = 0;
  } else if (elevation !== 5) {
    dynamicButtonStyle.elevation = elevation;
  }

  // Build dynamic content style
  const dynamicContentStyle: ViewStyle = {
    minHeight: height ?? sizePreset.height,
    height: height ?? sizePreset.height,
    paddingHorizontal: hPadding,
    paddingVertical: vPadding,
    justifyContent: 'center',
    alignItems: 'center',
  };

  // Build dynamic label style
  const dynamicLabelStyle: TextStyle = {
    fontSize: adjustedFontSize,
    textAlignVertical: 'center',
    includeFontPadding: false,
    lineHeight: adjustedFontSize * 1.2, // Proper line height
    marginVertical: 0,
    marginHorizontal: 0,
    paddingVertical: 0,
  };

  if (fontWeight !== undefined) {
    dynamicLabelStyle.fontWeight = fontWeight;
  }

  return (
    <View style={buttonctn}>
      <PaperButton
        mode={resolvedMode}
        buttonColor={buttonColor}
        onPress={onclick}
        disabled={disabled}
        loading={loading}
        textColor={resolvedTextColor}
        contentStyle={[dynamicContentStyle, contentStyle]}
        labelStyle={[
          ButtonStyles.labelStyle,
          { color: resolvedTextColor, fontFamily: fonts.button },
          dynamicLabelStyle,
          labelStyle,
        ]}
        style={[
          ButtonStyles.buttonStyle,
          { shadowColor: colors.shadow },
          variant === 'outline' && {
            borderColor: disabled ? colors.disabled : colors.buttonOutline,
            borderWidth: 1,
          },
          dynamicButtonStyle,
          style,
        ]}
        rippleColor={rippleColor}
        uppercase={false}
        compact={false}
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
    overflow: 'hidden',
  },
  labelStyle: {
    textAlign: 'center',
    letterSpacing: 0.3,
  },
});

export default Button;
