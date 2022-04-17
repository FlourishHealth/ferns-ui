import React from "react";
import { OnChangeCallback } from "./Common";
interface DecimalRangeActionSheetProps {
    value: string;
    min: number;
    max: number;
    onChange: OnChangeCallback;
    actionSheetRef: React.RefObject<any>;
}
interface DecimalRangeActionSheetState {
    whole: string;
    decimal: string;
}
export declare class DecimalRangeActionSheet extends React.Component<DecimalRangeActionSheetProps, DecimalRangeActionSheetState> {
    constructor(props: DecimalRangeActionSheetProps);
    render(): JSX.Element;
}
export {};
