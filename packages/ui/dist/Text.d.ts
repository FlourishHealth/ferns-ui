import React from "react";
import { TextProps } from "./Common";
export declare class Text extends React.Component<TextProps, {}> {
    fontSizes: {
        sm: number;
        md: number;
        lg: number;
    };
    propsToStyle(): any;
    render(): JSX.Element;
}
