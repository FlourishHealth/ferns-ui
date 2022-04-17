import React from "react";
import { TextFieldProps } from "./Common";
interface TapToEditState {
    showEdit: boolean;
}
export declare class TapToEdit extends React.Component<TextFieldProps, TapToEditState> {
    state: {
        showEdit: boolean;
    };
    render(): JSX.Element;
}
export {};
