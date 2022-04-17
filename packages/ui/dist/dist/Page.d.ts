export class Page extends React.Component<any, any, any> {
    constructor(...args: any[]);
    actionSheetRef: React.RefObject<any>;
    renderHeader(): React.CElement<import("./Common").BoxProps, Box> | null;
    render(): React.CElement<import("./Common").ErrorBoundaryProps, ErrorBoundary>;
}
import React from "react";
import { Box } from "./Box";
import { ErrorBoundary } from "./ErrorBoundary";
