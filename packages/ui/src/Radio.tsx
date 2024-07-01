import React, {useContext} from "react";
import {View} from "react-native";

import {RadioProps} from "./Common";
import {ThemeContext} from "./Theme";

export const Radio = ({selected}: RadioProps): React.ReactElement => {
  const {theme} = useContext(ThemeContext);
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
