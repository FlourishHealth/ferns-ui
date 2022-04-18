import React from "react";
import { TextFieldProps } from "./Common";
interface TextFieldState {
    focused: boolean;
    height: number;
}
export declare class TextField extends React.Component<TextFieldProps, TextFieldState> {
    dateActionSheetRef: React.RefObject<any>;
    numberRangeActionSheetRef: React.RefObject<any>;
    decimalRangeActionSheetRef: React.RefObject<any>;
    weightActionSheetRef: React.RefObject<any>;
    constructor(props: TextFieldProps);
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
        url: string | undefined;
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
        url: string | undefined;
        username: string;
    };
    renderIcon(): JSX.Element | null;
    getBorderColor: () => string;
    getHeight: () => number | "100%";
    focus(): void;
    isEditable(): boolean;
    isHandledByModal: () => boolean;
    render(): JSX.Element;
}
export {};
