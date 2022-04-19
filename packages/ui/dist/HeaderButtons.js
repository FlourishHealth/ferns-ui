import React from "react";
import { Box } from "./Box";
import { Button } from "./Button";
import { IconButton } from "./IconButton";
import { Text } from "./Text";
import { Unifier } from "./Unifier";
export class HeaderButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (React.createElement(Box, { marginRight: 2 },
            React.createElement(Button, { color: "primary", text: this.props.text, type: "ghost", onClick: this.props.onClick })));
    }
}
export class SearchButton extends React.Component {
    render() {
        return (React.createElement(Box, null,
            React.createElement(IconButton, { accessibilityLabel: "search", icon: "search", iconColor: this.props.color || "white", prefix: "fas", onClick: this.props.onClick })));
    }
}
export class BackButton extends React.Component {
    render() {
        return (React.createElement(Box, { alignItems: "center", justifyContent: "center", paddingX: 3, width: 50 },
            React.createElement(IconButton, { accessibilityLabel: "", icon: "chevron-left", iconColor: "white", prefix: "fas", size: "md", onClick: () => this.props.onBack && this.props.onBack() })));
    }
}
export class FilterButton extends React.Component {
    render() {
        return React.createElement(Button, { color: "white", text: "Filter", type: "ghost", onClick: this.props.onClick });
    }
}
export class EditButton extends React.Component {
    render() {
        return (React.createElement(IconButton, { accessibilityLabel: "edit", icon: "pen", iconColor: this.props.color, prefix: "fas", onClick: this.props.onClick }));
    }
}
export class UseButton extends React.Component {
    render() {
        return (React.createElement(Button, { text: "Use", onClick: () => {
                Unifier.utils.haptic();
                this.props.onClick();
            } }));
    }
}
export class AddTabButton extends React.Component {
    render() {
        return (React.createElement(Box, { color: "blue", height: 62, width: 62, onClick: this.props.onClick },
            React.createElement(Text, { color: "darkGray" }, "Add")));
    }
}
//# sourceMappingURL=HeaderButtons.js.map