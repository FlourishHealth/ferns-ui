import React from "react";
import { SpinnerProps } from "./Common";
export declare class LoadingOverlay extends React.Component<SpinnerProps, {}> {
    componentId?: string;
    showHide(): Promise<void>;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
interface SpinnerState {
    show: boolean;
}
export declare class Spinner extends React.Component<SpinnerProps, SpinnerState> {
    state: {
        show: boolean;
    };
    componentDidMount(): void;
    render(): JSX.Element | null;
}
export {};
