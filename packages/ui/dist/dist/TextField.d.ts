export class TextField extends React.Component<any, any, any> {
    constructor(props: any);
    dateActionSheetRef: React.RefObject<any>;
    numberRangeActionSheetRef: React.RefObject<any>;
    decimalRangeActionSheetRef: React.RefObject<any>;
    weightActionSheetRef: React.RefObject<any>;
    keyboardMap: {
        date: string;
        email: string;
        number: string;
        numberRange: string;
        decimalRange: string;
        decimal: string;
        height: string;
        password: string;
        search: string;
        text: string;
        url: any;
        username: string;
    };
    textContentMap: {
        date: string;
        email: string;
        number: string;
        decimal: string;
        decimalRange: string;
        height: string;
        password: string;
        search: string;
        text: string;
        url: any;
        username: string;
    };
    getBorderColor: () => string;
    getHeight: () => any;
    isHandledByModal: () => boolean;
    state: {
        focused: boolean;
        height: any;
    };
    renderIcon(): React.CElement<import("./Common").BoxProps, Box> | null;
    focus(): void;
    isEditable(): boolean;
    render(): React.FunctionComponentElement<{}>;
}
import React from "react";
import { Box } from "./Box";
