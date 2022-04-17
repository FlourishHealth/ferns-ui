import React from "react";
import { ButtonProps, Color } from "./Common";
interface ButtonState {
    loading: boolean;
}
export declare class Button extends React.Component<ButtonProps, ButtonState> {
    state: {
        loading: boolean;
    };
    HEIGHTS: {
        sm: number;
        md: number;
        lg: number;
    };
    getBackgroundColor(color: string): string;
    getTextColor(color: Color): Color;
    getBorderColor(color: string): string;
    render(): JSX.Element;
}
export {};
