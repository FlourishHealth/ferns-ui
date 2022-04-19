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
        return (React.createElement(Box, { alignItems: "center", direction: "column", display: "flex", height: "100%", justifyContent: "center", padding: 6, width: "100%" },
            React.createElement(Text, { align: "center", color: "red", size: "lg", weight: "bold" }, "Oops!"),
            React.createElement(Box, { paddingY: 3 },
                React.createElement(Text, { align: "center" }, "There's an error. Sorry! Josh just got a notification about the error so he can fix it as soon as possible!")),
            React.createElement(Box, { paddingY: 3 },
                React.createElement(Text, null, this.props.error.toString())),
            React.createElement(Button, { color: "blue", text: "Try again", onClick: this.props.resetError })));
    }
}
//# sourceMappingURL=ErrorPage.js.map