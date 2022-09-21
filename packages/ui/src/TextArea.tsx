import React from "react";

import {TextAreaProps} from "./Common";
import {TextField} from "./TextField";

export class TextArea extends React.Component<TextAreaProps, {}> {
  constructor(props: TextAreaProps) {
    super(props);
    this.state = {};
  }

  render() {
    const {height, ...props} = this.props;
    return <TextField {...props} height={height ?? 100} multiline />;
  }
}
