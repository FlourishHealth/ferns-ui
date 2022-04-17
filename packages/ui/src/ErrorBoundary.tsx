import * as Sentry from "@sentry/react-native";
import {ErrorBoundaryProps} from "./Common";
import React from "react";
import {ErrorPage} from "./ErrorPage";

interface State {
  error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
  state = {error: undefined};

  static getDerivedStateFromError(error: Error) {
    console.warn("[ErrorBoundary] Derived error", error);
    return {error};
  }

  componentDidCatch(error: Error, info: {componentStack: string}) {
    console.warn("[ErrorBoundary] Caught error", error);
    Sentry.captureException(error);

    if (this.props.onError) {
      this.props.onError(error, info.componentStack);
    }
  }

  resetError = () => {
    this.setState({error: undefined});
  };

  render() {
    const error = this.state.error;
    if (error) {
      return <ErrorPage error={error} resetError={this.resetError} />;
    }
    return this.props.children;
  }
}
