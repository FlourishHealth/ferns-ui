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
        let type = this.props.type || "dismiss";
        if (type === "action" && !this.props.onClick) {
            console.warn("Banners with type action require an onClick property.");
        }
        const negativeMargin = (this.props.negativeXMargin || 0) * -4;
        return (React.createElement(Box, { onClick: this.dismiss, paddingY: 2, marginTop: 3, marginBottom: 3, color: this.props.color || "secondaryDark", direction: "row", rounding: this.props.shape, dangerouslySetInlineStyle: {
                __style: {
                    marginLeft: negativeMargin,
                    marginRight: negativeMargin,
                },
            }, width: Unifier.utils.dimensions().width || "100%", paddingX: 3, justifyContent: "between", shadow: true }, React.createElement(Box, { direction: "column", justifyContent: "center", alignItems: "center", flex: "shrink" }, React.createElement(Box, { paddingY: 1 }, React.createElement(Text, { align: "center", color: this.props.textColor || "white", weight: "bold" }, this.props.text)), this.props.subtext && (React.createElement(Box, { paddingY: 1 }, React.createElement(Text, { align: "center", color: this.props.textColor || "white" }, this.props.subtext)))), React.createElement(Box, { display: "block", width: 40, alignItems: "center", justifyContent: "center" }, type === "dismiss" && (React.createElement(IconButton, { prefix: "fas", icon: "times-circle",
            // size="lg"
            onClick: () => this.dismiss(), accessibilityLabel: "", iconColor: (this.props.textColor || "white") })), type === "action" && (React.createElement(IconButton, { prefix: "fas", icon: "arrow-right",
            // size="lg"
            onClick: () => this.props.onClick && this.props.onClick(), accessibilityLabel: "", iconColor: (this.props.textColor || "white") })))));
    }
}
//# sourceMappingURL=Banner.js.map
//# sourceMappingURL=Banner.js.map