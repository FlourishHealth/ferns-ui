import React from "react";
import { HeadingProps } from "./Common";
export declare class Heading extends React.Component<HeadingProps, {}> {
    fontSizes: {
        sm: number;
        md: number;
        lg: number;
    };
    propsToStyle(): any;
    render(): JSX.Element;
}
