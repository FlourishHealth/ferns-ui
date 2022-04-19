import React from "react";
import { ActivityIndicator, KeyboardAvoidingView } from "react-native";
import { Box } from "./Box";
import { Unifier } from "./Unifier";
export class Body extends React.Component {
    renderBody() {
        return (React.createElement(Box, { avoidKeyboard: true, height: "100%", scroll: this.props.scroll },
            React.createElement(Box, { height: this.props.height || "100%", padding: this.props.padding !== undefined ? this.props.padding : 5 },
                this.props.loading === true && (React.createElement(ActivityIndicator, { color: Unifier.theme.darkGray, size: "large" })),
                this.props.children)));
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