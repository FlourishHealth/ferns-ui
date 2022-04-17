import { IconButton } from "./IconButton";
import React from "react";
import { Box } from "./Box";
import { Button } from "./Button";
import { Text } from "./Text";
import { Unifier } from "./Unifier";
export class HeaderButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (React.createElement(Box, { marginRight: 2 }, React.createElement(Button, { text: this.props.text, type: "ghost", color: "primary", onClick: this.props.onClick })));
    }
}
export class SearchButton extends React.Component {
    render() {
        return (React.createElement(Box, null, React.createElement(IconButton, { icon: "search", prefix: "fas", onClick: this.props.onClick, accessibilityLabel: "search", iconColor: this.props.color || "white" })));
    }
}
export class BackButton extends React.Component {
    render() {
        return (React.createElement(Box, { width: 50, paddingX: 3, justifyContent: "center", alignItems: "center" }, React.createElement(IconButton, { prefix: "fas", icon: "chevron-left", size: "md", onClick: () => this.props.onBack && this.props.onBack(), accessibilityLabel: "", iconColor: "white" })));
    }
}
export class FilterButton extends React.Component {
    render() {
        return React.createElement(Button, { type: "ghost", color: "white", text: "Filter", onClick: this.props.onClick });
    }
}
export class EditButton extends React.Component {
    render() {
        return (React.createElement(IconButton, { icon: "pen", prefix: "fas", onClick: this.props.onClick, accessibilityLabel: "edit", iconColor: this.props.color }));
    }
}
export class UseButton extends React.Component {
    render() {
        return (React.createElement(Button, { onClick: () => {
                Unifier.utils.haptic();
                this.props.onClick();
            }, text: "Use" }));
    }
}
export class AddTabButton extends React.Component {
    render() {
        return (React.createElement(Box, { width: 62, height: 62, color: "blue", onClick: this.props.onClick }, React.createElement(Text, { color: "darkGray" }, "Add")));
    }
}
//# sourceMappingURL=HeaderButtons.js.map
//# sourceMappingURL=HeaderButtons.js.map