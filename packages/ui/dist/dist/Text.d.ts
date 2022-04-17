export class Text extends React.Component<any, any, any> {
    constructor(...args: any[]);
    fontSizes: {
        sm: number;
        md: number;
        lg: number;
    };
    propsToStyle(): {
        fontFamily: any;
        fontSize: any;
        textAlign: any;
        color: any;
    };
    render(): React.CElement<{
        numberOfLines: number;
        style: {
            fontFamily: any;
            fontSize: any;
            textAlign: any;
            color: any;
        };
    }, React.Component<{
        numberOfLines: number;
        style: {
            fontFamily: any;
            fontSize: any;
            textAlign: any;
            color: any;
        };
    }, any, any>> | React.CElement<{
        linkDefault: boolean;
    }, React.Component<{
        linkDefault: boolean;
    }, any, any>>;
}
import React from "react";
