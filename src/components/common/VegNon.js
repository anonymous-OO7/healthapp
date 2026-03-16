import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { NonSvg, VegSvg } from '../../assets/svgs/SvgImages';
import LogoViewer from './LogoViewer';
import { useTheme } from '../../themes';

const VegNon = ({ isVeg = true, size = 14, showLabel = false }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors, size);

  return (
    <View style={styles.container}>
      <LogoViewer
        Logosource={isVeg ? VegSvg : NonSvg}
        containerstyle={styles.iconContainer}
        logostyle={styles.icon}
      />
      {showLabel && (
        <Text
          style={[
            styles.labelText,
            {
              color: isVeg
                ? colors.veg || '#2E7D32'
                : colors.nonveg || '#C62828',
            },
          ]}
        >
          {isVeg ? 'VEG' : 'NON-VEG'}
        </Text>
      )}
    </View>
  );
};

const createStyles = (colors, size) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
    },
    icon: {
      height: size,
      width: size,
    },
    labelText: {
      fontSize: responsiveFontSize(1.3),
      fontFamily: 'Poppins-Medium',
      marginLeft: 4,
      textTransform: 'uppercase',
      letterSpacing: 0.3,
    },
  });

export default VegNon;
