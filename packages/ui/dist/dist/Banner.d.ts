export function hideBanner(id: any): void;
export class Banner extends React.Component<any, any, any> {
    constructor(...args: any[]);
    state: {
        show: boolean;
    };
    dismiss: () => void;
    componentDidMount(): Promise<void>;
    render(): React.CElement<import("./Common").BoxProps, Box> | null;
}
import React from "react";
import { Box } from "./Box";
