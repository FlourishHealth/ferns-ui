import React from "react";

import {LinkProps} from "./Common";
import {Text} from "./Text";

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
