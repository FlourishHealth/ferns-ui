import React from "react";
interface FormLineProps {
    name: string;
    value: any;
    onSave: (value: any) => void;
    kind: "boolean" | "string" | "textarea" | "select" | "multiboolean";
    options?: (string | undefined)[];
}
interface FormLineState {
    editing: boolean;
    value: any;
}
export declare class FormLine extends React.Component<FormLineProps, FormLineState> {
    constructor(props: FormLineProps);
    renderMultiBoolean(): JSX.Element;
    renderBooleanField(): JSX.Element;
    renderTextField(): JSX.Element;
    renderTextArea(): JSX.Element;
    renderSelect(): JSX.Element;
    render(): JSX.Element;
}
export {};
