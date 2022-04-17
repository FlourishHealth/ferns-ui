import React from "react";
import { BoxProps } from "./Common";
export declare class Box extends React.Component<BoxProps, {}> {
    BOX_STYLE_MAP: {
        [prop: string]: (value: any, all: {
            [prop: string]: any;
        }) => {
            [style: string]: string | number;
        } | {};
    };
    scrollRef: React.RefObject<unknown>;
    constructor(props: BoxProps);
    scrollToEnd: () => void;
    scrollTo: (y: number) => void;
    propsToStyle(): any;
    renderBox(): JSX.Element;
    render(): JSX.Element;
}
