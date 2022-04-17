import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Unifier } from "./Unifier";
export class LoadingOverlay extends React.Component {
    constructor() {
        super(...arguments);
        this.componentId = undefined;
    }
    async showHide() {
        if (this.componentId) {
            try {
                await Unifier.navigation.dismissOverlay();
            }
            catch (e) {
                console.debug(`[spinner] could not dismiss spinner overlay`, e);
            }
        }
    }
    componentDidMount() {
        this.showHide();
    }
    componentDidUpdate() {
        this.showHide();
    }
    componentWillUnmount() {
        this.showHide();
    }
    render() {
        return (React.createElement(View, { style: {
                width: "100%",
                height: "100%",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: Unifier.theme["white"],
                opacity: 0.5,
            } },
            React.createElement(Spinner, null)));
    }
}
export class Spinner extends React.Component {
    constructor() {
        super(...arguments);
        this.state = { show: false };
    }
    // The delay is for perceived performance so you should rarely need to remove it.
    componentDidMount() {
        setTimeout(() => this.setState({ show: true }), 300);
    }
    render() {
        if (!this.state.show) {
            return null;
        }
        let size = this.props.size === "sm" ? "small" : "large";
        return React.createElement(ActivityIndicator, { color: this.props.color || "darkGray", size: size });
    }
}
//# sourceMappingURL=Spinner.js.map