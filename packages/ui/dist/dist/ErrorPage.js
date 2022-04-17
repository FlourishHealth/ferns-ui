import React from "react";
import { Box } from "./Box";
import { Button } from "./Button";
import { Text } from "./Text";
export class ErrorPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (React.createElement(Box, { height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", direction: "column", padding: 6 }, React.createElement(Text, { color: "red", size: "lg", weight: "bold", align: "center" }, "Oops!"), React.createElement(Box, { paddingY: 3 }, React.createElement(Text, { align: "center" }, "There's an error. Sorry! Josh just got a notification about the error so he can fix it as soon as possible!")), React.createElement(Box, { paddingY: 3 }, React.createElement(Text, null, this.props.error.toString())), React.createElement(Button, { text: "Try again", color: "blue", onClick: this.props.resetError })));
    }
}
//# sourceMappingURL=ErrorPage.js.map
//# sourceMappingURL=ErrorPage.js.map