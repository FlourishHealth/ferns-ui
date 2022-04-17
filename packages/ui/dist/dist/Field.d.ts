export class Field extends React.Component<any, any, any> {
    constructor(props: any);
    handleChange: (value: any) => void;
    handleSwitchChange: (value: any) => void;
    validate: () => boolean;
    state: {
        value: any;
    };
    UNSAFE_componentWillReceiveProps(nextProps: any): void;
    renderField(): React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> | React.CElement<import("./SelectList").SelectListProps, SelectList> | React.CElement<import("./Common").TextFieldProps, TextArea> | React.CElement<import("./Common").SwitchProps, Switch> | null;
    render(): React.CElement<import("./Common").BoxProps, Box>;
}
import React from "react";
import { SelectList } from "./SelectList";
import { TextArea } from "./TextArea";
import { Switch } from "./Switch";
import { Box } from "./Box";
