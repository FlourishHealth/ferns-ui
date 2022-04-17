import * as Sentry from "@sentry/react-native";
import React from "react";
import { ErrorPage } from "./ErrorPage";
export class ErrorBoundary extends React.Component {
    constructor() {
        super(...arguments);
        this.state = { error: undefined };
        this.resetError = () => {
            this.setState({ error: undefined });
        };
    }
    static getDerivedStateFromError(error) {
        console.warn("[ErrorBoundary] Derived error", error);
        return { error };
    }
    componentDidCatch(error, info) {
        console.warn("[ErrorBoundary] Caught error", error);
        Sentry.captureException(error);
        if (this.props.onError) {
            this.props.onError(error, info.componentStack);
        }
    }
    render() {
        const error = this.state.error;
        if (error) {
            return React.createElement(ErrorPage, { error: error, resetError: this.resetError });
        }
        return this.props.children;
    }
}
//# sourceMappingURL=ErrorBoundary.js.map