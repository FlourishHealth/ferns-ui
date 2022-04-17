import React from "react";
import {ActivityIndicator, View} from "react-native";
import {SpinnerProps} from "./Common";
import {Unifier} from "./Unifier";

export class LoadingOverlay extends React.Component<SpinnerProps, {}> {
  componentId?: string = undefined;
  async showHide() {
    if (this.componentId) {
      try {
        await Unifier.navigation.dismissOverlay();
      } catch (e) {
        console.debug(`[spinner] could not dismiss spinner overlay`, e);
      }
    }
  }

  componentDidMount() {
    this.showHide();
  }

  componentDidUpdate() {
    this.showHide();
  }

  componentWillUnmount() {
    this.showHide();
  }

  render() {
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Unifier.theme["white"],
          opacity: 0.5,
        }}
      >
        <Spinner />
      </View>
    );
  }
}

interface SpinnerState {
  show: boolean;
}
export class Spinner extends React.Component<SpinnerProps, SpinnerState> {
  state = {show: false};

  // The delay is for perceived performance so you should rarely need to remove it.
  componentDidMount() {
    setTimeout(() => this.setState({show: true}), 300);
  }

  render() {
    if (!this.state.show) {
      return null;
    }
    let size: "small" | "large" = this.props.size === "sm" ? "small" : "large";
    return <ActivityIndicator color={this.props.color || "darkGray"} size={size} />;
  }
}
