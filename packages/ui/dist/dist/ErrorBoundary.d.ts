export class ErrorBoundary extends React.Component<any, any, any> {
    static getDerivedStateFromError(error: any): {
        error: any;
    };
    constructor(...args: any[]);
    state: {
        error: undefined;
    };
    resetError: () => void;
    componentDidCatch(error: any, info: any): void;
}
import React from "react";
