import React from "react";
import { Box } from "./Box";
import { Button } from "./Button";
import { ErrorBoundary } from "./ErrorBoundary";
import { Heading } from "./Heading";
import { IconButton } from "./IconButton";
// import {KeyboardAccessoryNavigation} from "react-native-keyboard-accessory";
import { Spinner } from "./Spinner";
import { Unifier } from "./Unifier";
export class Page extends React.Component {
    constructor() {
        super(...arguments);
        this.actionSheetRef = React.createRef();
    }
    renderHeader() {
        if (!this.props.title && !this.props.backButton) {
            return null;
        }
        return (React.createElement(Box, { direction: "row", display: "flex", width: "100%" },
            this.props.backButton && (React.createElement(Box, { alignItems: "center", display: "block", justifyContent: "center", paddingY: 3 },
                React.createElement(IconButton, { accessibilityLabel: "", icon: "chevron-left", iconColor: "darkGray", prefix: "fas", size: "md", onClick: () => this.props.navigation.goBack() }))),
            this.props.closeButton && (React.createElement(Box, { alignItems: "center", display: "block", justifyContent: "center", paddingY: 3 },
                React.createElement(IconButton, { accessibilityLabel: "", icon: "times", iconColor: "darkGray", prefix: "fas", size: "md", onClick: () => this.props.navigation.goBack() }))),
            Boolean(this.props.title) && (React.createElement(Box, { direction: "column", display: "flex", flex: "grow", justifyContent: "center" },
                React.createElement(Heading, { align: "center" }, this.props.title))),
            this.props.rightButton && (React.createElement(Box, { alignItems: "center", display: "block", justifyContent: "center", paddingY: 3 },
                React.createElement(Button, { color: "gray", text: this.props.rightButton, type: "ghost", onClick: () => this.props.rightButtonOnClick && this.props.rightButtonOnClick() })))));
    }
    render() {
        return (React.createElement(ErrorBoundary, null,
            React.createElement(Box, { alignSelf: "center", avoidKeyboard: true, color: this.props.color || "lightGray", direction: this.props.direction || "column", display: this.props.display || "flex", flex: "grow", keyboardOffset: this.props.keyboardOffset, maxWidth: this.props.maxWidth || 800, padding: this.props.padding !== undefined ? this.props.padding : 2, scroll: this.props.scroll === undefined ? true : this.props.scroll, width: "100%" },
                this.renderHeader(),
                this.props.loading === true && (React.createElement(Spinner, { color: Unifier.theme.darkGray, size: "md" })),
                this.props.children),
            Boolean(this.props.footer) && (React.createElement(Box, { alignSelf: "center", color: this.props.color || "lightGray", direction: this.props.direction || "column", display: this.props.display || "flex", flex: "shrink", marginBottom: 8, maxWidth: this.props.maxWidth || 800, paddingX: this.props.padding !== undefined ? this.props.padding : 6, paddingY: this.props.padding !== undefined ? this.props.padding : 2, width: "100%" }, this.props.footer))));
    }
}
//# sourceMappingURL=Page.js.map