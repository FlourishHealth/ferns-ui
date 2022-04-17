import {BlurView} from "@react-native-community/blur";
import React from "react";
import {Platform, View} from "react-native";
import {Box} from "./Box";
import {BlurBoxProps} from "./Common";

export class BlurBox extends React.Component<BlurBoxProps, {}> {
  renderBlur(children: any) {
    if (Platform.OS === "ios") {
      return (
        <BlurView blurType={this.props.blurType || "regular"} style={{borderRadius: 12}}>
          {children}
        </BlurView>
      );
    } else {
      return (
        <View style={{backgroundColor: "rgba(82, 82, 82, 0.7)", borderRadius: 10}}>{children}</View>
      );
    }
  }
  render() {
    const {marginBottom, marginTop, margin, ...props} = this.props;
    return (
      <Box
        marginBottom={marginBottom || 4}
        marginTop={marginTop || 0}
        margin={margin || 0}
        width="100%"
      >
        {this.renderBlur(
          <Box paddingX={4} {...props}>
            {this.props.children}
          </Box>
        )}
      </Box>
    );
  }
}
