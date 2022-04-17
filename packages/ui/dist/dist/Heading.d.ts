export class Heading extends React.Component<any, any, any> {
    constructor(...args: any[]);
    fontSizes: {
        sm: number;
        md: number;
        lg: number;
    };
    propsToStyle(): {
        fontFamily: string;
        fontSize: any;
        textAlign: any;
        color: any;
    };
    render(): React.CElement<{
        numberOfLines: number;
        style: {
            fontFamily: string;
            fontSize: any;
            textAlign: any;
            color: any;
        };
    }, React.Component<{
        numberOfLines: number;
        style: {
            fontFamily: string;
            fontSize: any;
            textAlign: any;
            color: any;
        };
    }, any, any>>;
}
import React from "react";
