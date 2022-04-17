import React from "react";
import {MetaProps} from "./Common";

export class Meta extends React.Component<MetaProps, {}> {
  render() {
    return this.props.children || null;
  }
}
