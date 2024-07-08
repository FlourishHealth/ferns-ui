import * as React from "react";
import Svg, {Path} from "react-native-svg";

import {CustomSvgProps} from "../Common";

export const MobileIcon = ({doNotDisturb, ...props}: CustomSvgProps) => {
  return (
    <Svg fill="none" height={33} viewBox="0 0 33 45" width={30} {...props}>
      <Path d="M3 7h24v35H3z" fill="#fff" />
      <Path
        d="M8.864 5.5A5.867 5.867 0 0 0 3 11.364v26.182a5.867 5.867 0 0 0 5.864 5.863h15.272A5.867 5.867 0 0 0 30 37.546V11.364A5.867 5.867 0 0 0 24.136 5.5H8.864Zm1.5 7.364h12.272v18.818H10.364V12.864Z"
        fill="#3EA45C"
        stroke="#fff"
        strokeWidth={3}
      />
      <Path
        d="M14.622 37.249h3.768a.789.582 0 0 1 .789.582.789.582 0 0 1-.789.581h-3.779a.789.582 0 0 1-.789-.581.8.582 0 0 1 .8-.582Z"
        fill="#fff"
        stroke="#fff"
      />
      {doNotDisturb && (
        <>
          <Path
            d="M21 4h8l-8 6.857h8"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={8}
          />
          <Path
            d="M21 4h8l-8 6.857h8"
            stroke="#3EA45C"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
          />
        </>
      )}
    </Svg>
  );
};
