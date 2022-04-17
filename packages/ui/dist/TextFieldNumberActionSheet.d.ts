import React from "react";
import { OnChangeCallback } from "./Common";
interface NumberPickerActionSheetProps {
    value?: string;
    mode?: "date" | "time";
    onChange: OnChangeCallback;
    actionSheetRef: React.RefObject<any>;
}
interface NumberPickerActionSheetState {
}
export declare class NumberPickerActionSheet extends React.Component<NumberPickerActionSheetProps, NumberPickerActionSheetState> {
    constructor(props: NumberPickerActionSheetProps);
    render(): JSX.Element;
}
export {};
