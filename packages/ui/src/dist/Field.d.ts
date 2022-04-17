import React from "react";
import { FieldProps } from "./Common";
interface State {
    value: any;
}
export declare class Field extends React.Component<FieldProps, State> {
    constructor(props: FieldProps);
    UNSAFE_componentWillReceiveProps(nextProps: FieldProps): void;
    handleChange: (value: string) => void;
    handleSwitchChange: (value: boolean) => void;
    validate: () => boolean;
    renderField(): JSX.Element | null;
    render(): JSX.Element;
}
export {};
