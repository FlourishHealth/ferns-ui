import React from "react";
import {ActivityIndicator, KeyboardAvoidingView} from "react-native";

import {Box} from "./Box";
import {BodyProps} from "./Common";
import {Unifier} from "./Unifier";

export class Body extends React.Component<BodyProps, {}> {
  renderBody() {
    return (
      <Box avoidKeyboard height="100%" scroll={this.props.scroll}>
        <Box
          height={this.props.height || "100%"}
          padding={this.props.padding !== undefined ? this.props.padding : 5}
        >
          {this.props.loading === true && (
            <ActivityIndicator color={Unifier.theme.darkGray} size="large" />
          )}
          {this.props.children}
        </Box>
      </Box>
    );
  }

  render() {
    if (this.props.avoidKeyboard === false) {
      return this.renderBody();
    } else {
      return <KeyboardAvoidingView behavior="position">{this.renderBody()}</KeyboardAvoidingView>;
    }
  }
}
