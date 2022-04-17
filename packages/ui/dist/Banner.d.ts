import React from "react";
import { BoxColor, Rounding, TextColor } from "./Common";
export interface BannerProps {
    id: string;
    text: string;
    subtext?: string;
    color?: BoxColor;
    textColor?: TextColor;
    negativeXMargin?: number;
    bold?: boolean;
    shape?: Rounding;
    type?: "dismiss" | "action";
    onClick?: () => void;
}
interface BannerState {
    show: boolean;
}
export declare const hideBanner: (id: string) => void;
export declare class Banner extends React.Component<BannerProps, BannerState> {
    state: {
        show: boolean;
    };
    componentDidMount(): Promise<void>;
    dismiss: () => void;
    render(): JSX.Element | null;
}
export {};
