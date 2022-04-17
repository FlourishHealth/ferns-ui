import React from "react";
import { ActivityIndicator, KeyboardAvoidingView } from "react-native";
import { Box } from "./Box";
import { Unifier } from "./Unifier";
export class Body extends React.Component {
    renderBody() {
        return (React.createElement(Box, { scroll: this.props.scroll, height: "100%", avoidKeyboard: true }, React.createElement(Box, { padding: this.props.padding !== undefined ? this.props.padding : 5, height: this.props.height || "100%" }, this.props.loading === true && (React.createElement(ActivityIndicator, { size: "large", color: Unifier.theme.darkGray })), this.props.children)));
    }
    render() {
        if (this.props.avoidKeyboard === false) {
            return this.renderBody();
        }
        else {
            return React.createElement(KeyboardAvoidingView, { behavior: "position" }, this.renderBody());
        }
    }
}
//# sourceMappingURL=Body.js.map
//# sourceMappingURL=Body.js.map