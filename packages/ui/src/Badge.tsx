import React, {useContext} from "react";

import {Box} from "./Box";
import {BadgeProps} from "./Common";
import {Icon} from "./Icon";
import {Text} from "./Text";
import {ThemeContext} from "./Theme";


import { View, StyleSheet } from "react-native";



export const Badge = ({
  text,
  status = "info",
  secondary = false,
  variant = "text",
}: BadgeProps): React.ReactElement => {
  const {theme} = useContext(ThemeContext);




  
// use status to set the color of the badge
if (status === "info") {
  styles.backgroundColor = "info";
  styles.textColor = "white";
} else if (status === "success") {
  styles.backgroundColor = "success";
}
  

  return (
    // <Box
    //   alignItems="baseline"
    //   alignSelf={alignSelf}
    //   color="primary"
    //   direction="row"
    //   height="min-content"
    //   justifyContent="center"
    //   marginLeft={1}
    //   marginTop={direction === "top" ? -1 : 0}
    //   paddingX={2}
    //   paddingY={1}
    //   rounding="md"
    //   width="max-content"
    // >
    // </Box>

    <View style={{
      alignItems: "baseline",
      alignSelf: alignSelf,
    flexDirection: "row",
    height: "min-content",
    justifyContent: "center",
    marginLeft: 1,
    marginTop: direction === "top" ? -1 : 0,
    paddingX: 2,
    paddingY: 1,
    rounding: "md",
    width: "max-content",
  }
}>
      <Icon name="check" size="sm" color="white" />
      <Text color={secondary ? theme.text.primary : theme.text.inverted} fontWeight="bold" />
    </View>


  );
};

