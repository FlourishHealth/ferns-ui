import React from "react";
import { OnChangeCallback } from "./Common";
interface HeightActionSheetProps {
    value?: string;
    onChange: OnChangeCallback;
    actionSheetRef: React.RefObject<any>;
}
interface HeightActionSheetState {
    feet: string;
    inches: string;
}
export declare class HeightActionSheet extends React.Component<HeightActionSheetProps, HeightActionSheetState> {
    constructor(props: HeightActionSheetProps);
    render(): JSX.Element;
}
export {};
