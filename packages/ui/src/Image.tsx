import React from "react";
import {Dimensions, Image as NativeImage} from "react-native";
import {Box} from "./Box";
import {ImageProps} from "./Common";
const {width: DEVICE_WIDTH} = Dimensions.get("window");

export class Image extends React.Component<ImageProps, {}> {
  resizeMode = (fit?: "cover" | "contain" | "none") => {
    if (!fit || fit === "none") {
      return undefined;
    } else {
      return fit;
    }
  };

  width = () => {
    if (this.props.naturalWidth) {
      return this.props.naturalWidth;
    } else if (this.props.fullWidth) {
      return DEVICE_WIDTH;
    }
    throw new Error("Width required for Image");
  };

  height = () => {
    if (this.props.naturalWidth) {
      return this.props.naturalWidth;
    }
    return this.width() * (9 / 16);
  };

  render() {
    return (
      <Box color={this.props.color}>
        <NativeImage
          resizeMode={this.resizeMode(this.props.fit)}
          style={{
            height: this.height(),
            width: this.width(),
            maxHeight: this.props.maxHeight,
            maxWidth: this.props.maxWidth,
            ...this.props.style,
          }}
          source={{uri: this.props.src, cache: "force-cache"}}
        />
      </Box>
    );
  }
}
