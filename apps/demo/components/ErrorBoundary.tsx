// Stuck as a class component because React doesn't support error boundaries in functional
// components yet.
import React, {ReactNode} from "react";
import {Pressable, Text} from "react-native";

interface Props {
  children?: ReactNode;
}

export class ErrorBoundary extends React.Component<Props, {}> {
  state = {error: undefined};

  static getDerivedStateFromError(error: Error) {
    console.warn("[ErrorBoundary] Derived error", error);
    return {error};
  }

  componentDidCatch(error: Error, info: {componentStack: string}) {
    console.warn("[ErrorBoundary] Caught error", error, info?.componentStack);
  }

  resetError = () => {
    this.setState({error: undefined});
  };

  render() {
    const error = this.state.error;
    if (error) {
      return (
        <Pressable onPress={() => this.setState({error: undefined})}>
          <Text>Failed to render. Click to try again.</Text>
        </Pressable>
      );
    }
    return this.props.children;
  }
}
