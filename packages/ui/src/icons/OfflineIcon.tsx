import * as React from "react";
import Svg, {Path} from "react-native-svg";

import {CustomSvgProps} from "../Common";
export const OfflineIcon = ({doNotDisturb, ...props}: CustomSvgProps) => (
  <Svg fill="none" height={33} width={30} {...props}>
    <Path
      d="M28.5 18c0 7.456-6.044 13.5-13.5 13.5S1.5 25.456 1.5 18 7.544 4.5 15 4.5 28.5 10.544 28.5 18Z"
      fill="#2B6072"
      stroke="#fff"
      strokeWidth={3}
    />
    <Path
      d="M24.5 18a9.5 9.5 0 1 1-19 0 9.5 9.5 0 0 1 19 0Z"
      fill="#fff"
      stroke="#9A9A9A"
      strokeWidth={5}
    />
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
          stroke="#9A9A9A"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
        />
      </>
    )}
  </Svg>
);
