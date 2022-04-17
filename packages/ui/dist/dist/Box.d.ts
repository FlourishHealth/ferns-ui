export class Box extends React.Component<any, any, any> {
    constructor(props: any);
    BOX_STYLE_MAP: {
        alignItems: (value: any) => {
            alignItems: any;
        };
        alignContent: (value: any) => {
            alignContent: any;
        };
        alignSelf: (value: any) => {
            alignSelf: any;
        };
        color: (value: any) => {
            backgroundColor: any;
        };
        direction: (value: any) => {
            flexDirection: any;
            display: string;
        };
        smDirection: (value: any, all: any) => {
            flexDirection: any;
            display: string;
        } | {
            flexDirection?: undefined;
            display?: undefined;
        };
        mdDirection: (value: any, all: any) => {
            flexDirection: any;
            display: string;
        } | {
            flexDirection?: undefined;
            display?: undefined;
        };
        lgDirection: (value: any, all: any) => {
            flexDirection: any;
            display: string;
        } | {
            flexDirection?: undefined;
            display?: undefined;
        };
        display: (value: any) => {
            flex: undefined;
            flexDirection?: undefined;
        } | {
            flex: number;
            flexDirection: string;
        };
        flex: (value: any) => {
            flexGrow: number;
            flexShrink: number;
            display: string;
            flex?: undefined;
        } | {
            flexShrink: number;
            display: string;
            flexGrow?: undefined;
            flex?: undefined;
        } | {
            flex: number;
            display: string;
            flexGrow?: undefined;
            flexShrink?: undefined;
        };
        justifyContent: (value: any) => {
            justifyContent: any;
        };
        height: (value: any) => {
            height: any;
        };
        margin: (value: any) => {
            margin: number;
        };
        marginRight: (value: any) => {
            marginRight: number;
        };
        marginLeft: (value: any) => {
            marginLeft: number;
        };
        marginTop: (value: any) => {
            marginTop: number;
        };
        marginBottom: (value: any) => {
            marginBottom: number;
        };
        paddingX: (value: any) => {
            paddingLeft: number;
            paddingRight: number;
        };
        paddingY: (value: any) => {
            paddingTop: number;
            paddingBottom: number;
        };
        padding: (value: any) => {
            padding: number;
        };
        position: (value: any) => {
            position: any;
        };
        top: (top: any) => {
            top: number | undefined;
        };
        bottom: (bottom: any) => {
            bottom: number | undefined;
        };
        right: (right: any) => {
            right: number | undefined;
        };
        left: (left: any) => {
            left: number | undefined;
        };
        rounding: (rounding: any, allProps: any) => {
            borderRadius: any;
        };
        overflow: (value: any) => {
            overflow: string;
        } | {
            overflow?: undefined;
        };
        width: (value: any) => {
            width: any;
        };
        wrap: (value: any) => {
            flexWrap: string;
            alignItems: string;
        };
        shadow: (value: any) => {
            shadowColor?: undefined;
            shadowOffset?: undefined;
            shadowRadius?: undefined;
            shadowOpacity?: undefined;
            elevation?: undefined;
        } | {
            shadowColor: string;
            shadowOffset: {
                width: number;
                height: number;
            };
            shadowRadius: number;
            shadowOpacity: number;
            elevation?: undefined;
        } | {
            elevation: number;
            shadowColor?: undefined;
            shadowOffset?: undefined;
            shadowRadius?: undefined;
            shadowOpacity?: undefined;
        };
        border: (value: any) => {
            borderColor?: undefined;
            borderWidth?: undefined;
        } | {
            borderColor: any;
            borderWidth: number;
        };
    };
    scrollRef: any;
    scrollToEnd: () => void;
    scrollTo: (y: any) => void;
    propsToStyle(): {};
    renderBox(): React.CElement<{
        style: false | {};
    }, React.Component<{
        style: false | {};
    }, any, any>>;
    render(): React.CElement<{
        style: {};
        onLayout: any;
        onPress: () => void;
    }, React.Component<{
        style: {};
        onLayout: any;
        onPress: () => void;
    }, any, any>> | React.CElement<{
        style: {};
    }, React.Component<{
        style: {};
    }, any, any>> | React.DetailedReactHTMLElement<{
        horizontal: boolean;
        style: {};
        contentContainerStyle: {
            justifyContent: any;
            alignContent: any;
            alignItems: any;
        };
        keyboardShouldPersistTaps: string;
        ref: any;
        onScroll: (event: React.UIEvent<HTMLInputElement, UIEvent>) => void;
        scrollEventThrottle: number;
    }, HTMLElement> | React.CElement<{
        behavior: string;
        style: {
            flex: number;
            display: string;
        };
        keyboardVerticalOffset: any;
    }, React.Component<{
        behavior: string;
        style: {
            flex: number;
            display: string;
        };
        keyboardVerticalOffset: any;
    }, any, any>>;
}
import React from "react";
