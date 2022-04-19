import React from "react";
import { Box } from "./Box";
import { IconButton } from "./IconButton";
import { Text } from "./Text";
import { Unifier } from "./Unifier";
function getKey(id) {
    return `@ReactUnifier:${id}`;
}
export const hideBanner = (id) => {
    console.debug(`[banner] Hiding ${getKey(id)} `);
    Unifier.storage.setItem(getKey(id), "true");
};
export class Banner extends React.Component {
    constructor() {
        super(...arguments);
        this.state = { show: false };
        this.dismiss = () => {
            hideBanner(this.props.id);
            this.setState({ show: false });
        };
    }
    async componentDidMount() {
        const seen = await Unifier.storage.getItem(getKey(this.props.id));
        console.debug(`[banner] ${getKey(this.props.id)} seen? ${seen}`);
        this.setState({ show: !seen });
    }
    render() {
        if (!this.state.show) {
            return null;
        }
        const type = this.props.type || "dismiss";
        if (type === "action" && !this.props.onClick) {
            console.warn("Banners with type action require an onClick property.");
        }
        const negativeMargin = (this.props.negativeXMargin || 0) * -4;
        return (React.createElement(Box, { color: this.props.color || "secondaryDark", dangerouslySetInlineStyle: {
                __style: {
                    marginLeft: negativeMargin,
                    marginRight: negativeMargin,
                },
            }, direction: "row", justifyContent: "between", marginBottom: 3, marginTop: 3, paddingX: 3, paddingY: 2, rounding: this.props.shape, shadow: true, width: Unifier.utils.dimensions().width || "100%", onClick: this.dismiss },
            React.createElement(Box, { alignItems: "center", direction: "column", flex: "shrink", justifyContent: "center" },
                React.createElement(Box, { paddingY: 1 },
                    React.createElement(Text, { align: "center", color: this.props.textColor || "white", weight: "bold" }, this.props.text)),
                this.props.subtext && (React.createElement(Box, { paddingY: 1 },
                    React.createElement(Text, { align: "center", color: this.props.textColor || "white" }, this.props.subtext)))),
            React.createElement(Box, { alignItems: "center", display: "block", justifyContent: "center", width: 40 },
                type === "dismiss" && (React.createElement(IconButton, { accessibilityLabel: "", icon: "times-circle", 
                    // size="lg"
                    iconColor: (this.props.textColor || "white"), prefix: "fas", onClick: () => this.dismiss() })),
                type === "action" && (React.createElement(IconButton, { accessibilityLabel: "", icon: "arrow-right", 
                    // size="lg"
                    iconColor: (this.props.textColor || "white"), prefix: "fas", onClick: () => this.props.onClick && this.props.onClick() })))));
    }
}
//# sourceMappingURL=Banner.js.map