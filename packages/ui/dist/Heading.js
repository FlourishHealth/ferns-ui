import React from "react";
import { Text as NativeText } from "react-native";
import { Unifier } from "./Unifier";
export class Heading extends React.Component {
    constructor() {
        super(...arguments);
        this.fontSizes = {
            sm: 20,
            md: 28,
            lg: 36,
        };
    }
    propsToStyle() {
        const style = {};
        // let font = this.props.font || "primary";
        // if (this.props.bold) {
        //   font += "Bold";
        // }
        style.fontFamily = Unifier.theme.primaryBoldFont;
        style.fontSize = this.fontSizes[this.props.size || "md"];
        if (this.props.align) {
            style.textAlign = this.props.align;
        }
        if (this.props.color) {
            style.color = Unifier.theme[this.props.color];
        }
        else {
            style.color = Unifier.theme.darkGray;
        }
        // TODO: might be useful for wrapping/truncating
        // if (this.props.numberOfLines !== 1 && !this.props.inline) {
        //   style.flexWrap = "wrap";
        // }
        return style;
    }
    render() {
        const lines = 0;
        // if (this.props.numberOfLines) {
        //   lines = this.props.numberOfLines;
        // } else if (this.props.inline) {
        //   lines = 1;
        // }
        return (React.createElement(NativeText, { numberOfLines: lines, style: this.propsToStyle() }, this.props.children));
    }
}
//# sourceMappingURL=Heading.js.map