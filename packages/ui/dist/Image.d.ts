import React from "react";
import { ImageProps } from "./Common";
export declare class Image extends React.Component<ImageProps, {}> {
    resizeMode: (fit?: "none" | "cover" | "contain" | undefined) => "cover" | "contain" | undefined;
    width: () => any;
    height: () => number;
    render(): JSX.Element;
}
