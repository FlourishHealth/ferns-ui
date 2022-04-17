export class LoadingOverlay extends React.Component<any, any, any> {
    constructor(...args: any[]);
    componentId: any;
    showHide(): Promise<void>;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    render(): React.CElement<{
        style: {
            width: string;
            height: string;
            flex: number;
            justifyContent: string;
            alignItems: string;
            backgroundColor: string;
            opacity: number;
        };
    }, React.Component<{
        style: {
            width: string;
            height: string;
            flex: number;
            justifyContent: string;
            alignItems: string;
            backgroundColor: string;
            opacity: number;
        };
    }, any, any>>;
}
export class Spinner extends React.Component<any, any, any> {
    constructor(...args: any[]);
    state: {
        show: boolean;
    };
    componentDidMount(): void;
    render(): React.CElement<{
        color: any;
        size: string;
    }, React.Component<{
        color: any;
        size: string;
    }, any, any>> | null;
}
import React from "react";
