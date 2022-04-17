import React from "react";
import {LayerProps} from "./Common";

interface LayerState {}

// TODO: Flesh out for native.
export class Layer extends React.Component<LayerProps, LayerState> {
  constructor(props: LayerProps) {
    super(props);
    this.state = {};
  }

  render() {
    return this.props.children;
  }
}
