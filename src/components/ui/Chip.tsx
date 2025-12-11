import * as React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { useTheme } from '../../themes';

interface ChipProps {
  label: string;
  selected?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  selectedStyle?: StyleProp<ViewStyle>;
  selectedTextStyle?: StyleProp<TextStyle>;
  showBorder?: boolean;
}

const Chip: React.FC<ChipProps> = ({
  label,
  selected = false,
  disabled = false,
  onPress,
  icon,
  rightIcon,
  style,
  textStyle,
  selectedStyle,
  selectedTextStyle,
  showBorder = true,
}) => {
  const { colors, fonts } = useTheme();

  const getBackgroundColor = () => {
    if (disabled) return colors.chipBackgroundDisabled;
    if (selected) return colors.chipBackgroundSelected;
    return colors.chipBackground;
  };

  const getTextColor = () => {
    if (disabled) return colors.chipTextDisabled;
    if (selected) return colors.chipTextSelected;
    return colors.chipText;
  };

  const getBorderColor = () => {
    if (disabled) return colors.chipBorder;
    if (selected) return colors.chipBorderSelected;
    return colors.chipBorder;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.chip,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: showBorder ? getBorderColor() : 'transparent',
          borderWidth: showBorder ? 1 : 0,
        },
        style,
        selected && selectedStyle,
      ]}
    >
      {icon && (
        <View style={styles.iconContainer}>
          {React.cloneElement(icon as React.ReactElement, {
            color: selected ? colors.chipIconSelected : colors.chipIcon,
          })}
        </View>
      )}

      <Text
        style={[
          styles.label,
          {
            color: getTextColor(),
            fontFamily: fonts.poppins.medium,
          },
          textStyle,
          selected && selectedTextStyle,
        ]}
      >
        {label}
      </Text>

      {rightIcon && (
        <View style={styles.rightIconContainer}>
          {React.cloneElement(rightIcon as React.ReactElement, {
            color: selected ? colors.chipIconSelected : colors.chipIcon,
          })}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1),
    borderRadius: responsiveHeight(3),
    marginRight: responsiveWidth(2),
  },
  label: {
    fontSize: responsiveFontSize(1.8),
    textAlign: 'center',
  },
  iconContainer: {
    marginRight: responsiveWidth(1.5),
  },
  rightIconContainer: {
    marginLeft: responsiveWidth(1.5),
  },
});

export default Chip;
