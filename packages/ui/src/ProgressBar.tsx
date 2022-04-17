import React from "react";
import {View} from "react-native";
import {ProgressBarProps} from "./Common";
import {Unifier} from "./Unifier";

interface ProgressBarState {}

export class ProgressBar extends React.Component<ProgressBarProps, ProgressBarState> {
  constructor(props: ProgressBarProps) {
    super(props);
    this.state = {};
  }

  render() {
    // console.log("PROGRESS", Unifier.theme[this.props.color], `${this.props.completed / 100}%`);
    return (
      <View
        style={{
          width: "100%",
          height: 6,
        }}
      >
        <View
          style={{
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            height: 6,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: Unifier.theme[this.props.color],
            backgroundColor: Unifier.theme[this.props.color],
            opacity: 0.3,
          }}
        ></View>
        <View
          style={{
            width: `${Math.min(this.props.completed / 100, 1) * 100}%`,
            position: "absolute",
            top: 0,
            left: 0,
            height: 6,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: Unifier.theme[this.props.color],
            backgroundColor: Unifier.theme[this.props.color],
            opacity: 1,
          }}
        />
      </View>
    );
  }
}
