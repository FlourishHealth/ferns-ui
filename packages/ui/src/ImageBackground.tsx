import React from "react";
import {ImageBackground as ImageBackgroundNative} from "react-native";

interface ImageBackgroundProps {
  children?: any;
  style?: any;
  source: any;
}

export class ImageBackground extends React.Component<ImageBackgroundProps, {}> {
  render() {
    return <ImageBackgroundNative {...this.props} />;
  }
}
