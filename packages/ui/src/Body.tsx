import React from "react";
import {ActivityIndicator, KeyboardAvoidingView} from "react-native";
import {Box} from "./Box";
import {BodyProps} from "./Common";
import {Unifier} from "./Unifier";

export class Body extends React.Component<BodyProps, {}> {
  renderBody() {
    return (
      <Box scroll={this.props.scroll} height="100%" avoidKeyboard={true}>
        <Box
          padding={this.props.padding !== undefined ? this.props.padding : 5}
          height={this.props.height || "100%"}
        >
          {this.props.loading === true && (
            <ActivityIndicator size="large" color={Unifier.theme.darkGray} />
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
