export class BlurBox extends React.Component<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
    renderBlur(children: any): React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> | React.CElement<import("@react-native-community/blur").BlurViewProperties, BlurView>;
    render(): React.CElement<import("./Common").BoxProps, Box>;
}
import React from "react";
import { BlurView } from "@react-native-community/blur";
import { Box } from "./Box";
