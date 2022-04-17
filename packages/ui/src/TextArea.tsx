import React from "react";
import {TextAreaProps} from "./Common";
import {TextField} from "./TextField";

export class TextArea extends React.Component<TextAreaProps, {}> {
  constructor(props: TextAreaProps) {
    super(props);
    this.state = {};
  }

  render() {
    return <TextField {...this.props} multiline={true} height={100} rows={4} />;
  }
}
