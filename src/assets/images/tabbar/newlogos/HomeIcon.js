import React from 'react';

import Svg, { Path, G, Defs, ClipPath } from 'react-native-svg';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const HomeIcon = props => {
  return (
    <Svg
      width={responsiveWidth(9)}
      height={responsiveHeight(9)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M20.04 6.82l-5.76-4.03c-1.57-1.1-3.98-1.04-5.49.13L3.78 6.83c-1 .78-1.79 2.38-1.79 3.64v6.9c0 2.55 2.07 4.63 4.62 4.63h10.78c2.55 0 4.62-2.07 4.62-4.62V10.6c0-1.35-.87-3.01-1.97-3.78zM12.75 18c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-3c0-.41.34-.75.75-.75s.75.34.75.75v3z"
        fill={props.fill}
      />
    </Svg>
  );
};

export default HomeIcon;
