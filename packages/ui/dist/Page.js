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
        return (React.createElement(Box, { width: "100%", display: "flex", direction: "row" },
            this.props.backButton && (React.createElement(Box, { paddingY: 3, justifyContent: "center", alignItems: "center", display: "block" },
                React.createElement(IconButton, { prefix: "fas", icon: "chevron-left", size: "md", onClick: () => this.props.navigation.goBack(), accessibilityLabel: "", iconColor: "darkGray" }))),
            this.props.closeButton && (React.createElement(Box, { paddingY: 3, justifyContent: "center", alignItems: "center", display: "block" },
                React.createElement(IconButton, { prefix: "fas", icon: "times", size: "md", onClick: () => this.props.navigation.goBack(), accessibilityLabel: "", iconColor: "darkGray" }))),
            Boolean(this.props.title) && (React.createElement(Box, { display: "flex", flex: "grow", justifyContent: "center", direction: "column" },
                React.createElement(Heading, { align: "center" }, this.props.title))),
            this.props.rightButton && (React.createElement(Box, { paddingY: 3, justifyContent: "center", alignItems: "center", display: "block" },
                React.createElement(Button, { type: "ghost", text: this.props.rightButton, color: "gray", onClick: () => this.props.rightButtonOnClick && this.props.rightButtonOnClick() })))));
    }
    render() {
        return (React.createElement(ErrorBoundary, null,
            React.createElement(Box, { scroll: this.props.scroll === undefined ? true : this.props.scroll, padding: this.props.padding !== undefined ? this.props.padding : 2, avoidKeyboard: true, keyboardOffset: this.props.keyboardOffset, display: this.props.display || "flex", width: "100%", flex: "grow", maxWidth: this.props.maxWidth || 800, alignSelf: "center", direction: this.props.direction || "column", color: this.props.color || "lightGray" },
                this.renderHeader(),
                this.props.loading === true && (React.createElement(Spinner, { size: "md", color: Unifier.theme.darkGray })),
                this.props.children),
            Boolean(this.props.footer) && (React.createElement(Box, { width: "100%", maxWidth: this.props.maxWidth || 800, marginBottom: 8, paddingY: this.props.padding !== undefined ? this.props.padding : 2, paddingX: this.props.padding !== undefined ? this.props.padding : 6, display: this.props.display || "flex", flex: "shrink", alignSelf: "center", direction: this.props.direction || "column", color: this.props.color || "lightGray" }, this.props.footer))));
    }
}
//# sourceMappingURL=Page.js.map