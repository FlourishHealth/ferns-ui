import React from "react";
import { FieldWithLabelsProps } from "./Common";
export declare type SelectListOptions = {
    label: string;
    value: string | undefined;
}[];
export interface SelectListProps extends FieldWithLabelsProps {
    id?: string;
    name?: string;
    options: SelectListOptions;
    onChange: (value: string) => void;
    value?: string;
    disabled?: boolean;
    size?: "md" | "lg";
    placeholder?: string;
}
export declare class SelectList extends React.Component<SelectListProps, {}> {
    state: {
        showing: boolean;
    };
    render(): JSX.Element;
}
