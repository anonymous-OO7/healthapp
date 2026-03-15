import React from 'react';

import Svg, { Path, G, Defs, ClipPath } from 'react-native-svg';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const JobsIcon = props => {
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
        d="M12 11a4 4 0 100-8 4 4 0 000 8zM6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={props.fill}
      />
    </Svg>
  );
};

export default JobsIcon;
