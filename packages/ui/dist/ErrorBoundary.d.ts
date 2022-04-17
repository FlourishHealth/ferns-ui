import { ErrorBoundaryProps } from "./Common";
import React from "react";
interface State {
    error?: Error;
}
export declare class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
    state: {
        error: undefined;
    };
    static getDerivedStateFromError(error: Error): {
        error: Error;
    };
    componentDidCatch(error: Error, info: {
        componentStack: string;
    }): void;
    resetError: () => void;
    render(): React.ReactNode;
}
export {};
