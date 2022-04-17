export class Button extends React.Component<any, any, any> {
    constructor(...args: any[]);
    state: {
        loading: boolean;
    };
    HEIGHTS: {
        sm: number;
        md: number;
        lg: number;
    };
    getBackgroundColor(color: any): any;
    getTextColor(color: any): any;
    getBorderColor(color: any): any;
    render(): React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
}
import React from "react";
