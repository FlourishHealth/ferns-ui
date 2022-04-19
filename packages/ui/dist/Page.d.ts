import React from "react";
import { Color, UnsignedUpTo12 } from "./Common";
interface PageProps {
    navigation: any;
    scroll?: boolean;
    loading?: boolean;
    display?: "flex" | "none" | "block" | "inlineBlock";
    title?: string;
    backButton?: boolean;
    closeButton?: boolean;
    direction?: "row" | "column";
    padding?: UnsignedUpTo12;
    color?: Color;
    maxWidth?: number | string;
    keyboardOffset?: number;
    footer?: any;
    rightButton?: string;
    rightButtonOnClick?: () => void;
    children?: any;
}
export declare class Page extends React.Component<PageProps, {}> {
    actionSheetRef: React.RefObject<any>;
    renderHeader(): JSX.Element | null;
    render(): JSX.Element;
}
export {};
