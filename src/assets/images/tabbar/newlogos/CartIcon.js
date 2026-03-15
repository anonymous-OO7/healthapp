import React from 'react';

import Svg, { Path, G, Defs, ClipPath } from 'react-native-svg';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const CartIcon = props => {
  return (
    <Svg
      width={responsiveWidth(10)}
      height={responsiveHeight(10)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M7.5 18a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM16.5 18a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"
        strokeWidth={1.5}
        fill={props.fill}
      />
      <Path
        d="M11 9H8M2 3l.265.088c1.32.44 1.98.66 2.357 1.184C5 4.796 5 5.492 5 6.883V9.5c0 2.828 0 4.243.879 5.121.878.879 2.293.879 5.121.879h2m6 0h-2"
        strokeWidth={1.5}
        strokeLinecap="round"
        fill={props.fill}
      />
      <Path
        d="M5 6h3m-2.5 7h10.522c.96 0 1.439 0 1.815-.248.375-.248.564-.688.942-1.57l.429-1c.81-1.89 1.214-2.833.77-3.508C19.532 6 18.505 6 16.45 6H12"
        strokeWidth={1.5}
        strokeLinecap="round"
        fill={props.fill}
      />
    </Svg>
  );
};

export default CartIcon;
