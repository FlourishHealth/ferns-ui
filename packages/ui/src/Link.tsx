import React from "react";
import {Text} from "./Text";
import {LinkProps} from "./Common";

interface LinkState {}

export class Link extends React.Component<LinkProps, LinkState> {
  constructor(props: LinkProps) {
    super(props);
    this.state = {};
  }

  render() {
    return <Text>{this.props.children}</Text>;
  }
}
