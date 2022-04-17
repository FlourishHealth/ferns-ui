export class Body extends React.Component<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
    renderBody(): React.CElement<import("./Common").BoxProps, Box>;
    render(): React.CElement<import("./Common").BoxProps, Box> | React.CElement<{
        behavior: string;
    }, React.Component<{
        behavior: string;
    }, any, any>>;
}
import React from "react";
import { Box } from "./Box";
