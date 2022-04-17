import React from "react";
import { OnChangeCallback } from "./Common";
interface DateTimeActionSheetProps {
    value?: string;
    mode?: "date" | "time";
    onChange: OnChangeCallback;
    actionSheetRef: React.RefObject<any>;
}
interface DateTimeActionSheetState {
}
export declare class DateTimeActionSheet extends React.Component<DateTimeActionSheetProps, DateTimeActionSheetState> {
    constructor(props: DateTimeActionSheetProps);
    render(): JSX.Element;
}
export {};
