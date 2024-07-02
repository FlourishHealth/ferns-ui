import * as React from "react";
import Svg, {Path} from "react-native-svg";

import {CustomSvgProps} from "../Common";
export const OutOfOfficeIcon = ({doNotDisturb, ...props}: CustomSvgProps) => (
  <Svg fill="none" height={33} width={30} {...props}>
    <Path
      d="M28.5 18c0 7.456-6.044 13.5-13.5 13.5S1.5 25.456 1.5 18 7.544 4.5 15 4.5 28.5 10.544 28.5 18Z"
      fill="#fff"
      stroke="#fff"
      strokeWidth={3}
    />
    <Path
      d="M26 18c0 6.075-4.925 11-11 11S4 24.075 4 18 8.925 7 15 7s11 4.925 11 11Z"
      fill="#D33232"
    />
    <Path d="M9 18h12" stroke="#fff" strokeLinecap="round" strokeWidth={4} />
    {doNotDisturb && (
      <>
        <Path
          d="M18 4h8l-8 6.857h8"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={8}
        />
        <Path
          d="M18 4h8l-8 6.857h8"
          stroke="#D33232"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
        />
      </>
    )}
  </Svg>
);
