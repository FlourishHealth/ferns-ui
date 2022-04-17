export class FormLine extends React.Component<any, any, any> {
    constructor(props: any);
    state: {
        editing: boolean;
        value: string;
    };
    renderMultiBoolean(): React.FunctionComponentElement<{}>;
    renderBooleanField(): React.FunctionComponentElement<{}>;
    renderTextField(): React.FunctionComponentElement<{}>;
    renderTextArea(): React.FunctionComponentElement<{}>;
    renderSelect(): React.FunctionComponentElement<{}>;
    render(): React.CElement<import("./Common").BoxProps, Box>;
}
import React from "react";
import { Box } from "./Box";
