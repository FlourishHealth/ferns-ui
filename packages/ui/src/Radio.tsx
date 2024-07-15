import React from "react";
import {View} from "react-native";

import {RadioProps} from "./Common";
import {useTheme} from "./Theme";

export const Radio = ({selected}: RadioProps): React.ReactElement => {
  const {theme} = useTheme();
  return (
    <View
      style={{
        height: 16,
        width: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: theme.text.secondaryDark,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {selected ? (
        <View
          style={{
            height: 10,
            width: 10,
            borderRadius: 6,
            backgroundColor: theme.text.secondaryDark,
          }}
        />
      ) : null}
    </View>
  );
};
