import React from "react";
import { Dimensions, Image as NativeImage } from "react-native";
import { Box } from "./Box";
const { width: DEVICE_WIDTH } = Dimensions.get("window");
export class Image extends React.Component {
    constructor() {
        super(...arguments);
        this.resizeMode = (fit) => {
            if (!fit || fit === "none") {
                return undefined;
            }
            else {
                return fit;
            }
        };
        this.width = () => {
            if (this.props.naturalWidth) {
                return this.props.naturalWidth;
            }
            else if (this.props.fullWidth) {
                return DEVICE_WIDTH;
            }
            throw new Error("Width required for Image");
        };
        this.height = () => {
            if (this.props.naturalWidth) {
                return this.props.naturalWidth;
            }
            return this.width() * (9 / 16);
        };
    }
    render() {
        return (React.createElement(Box, { color: this.props.color },
            React.createElement(NativeImage, { resizeMode: this.resizeMode(this.props.fit), source: { uri: this.props.src, cache: "force-cache" }, style: Object.assign({ height: this.height(), width: this.width(), maxHeight: this.props.maxHeight, maxWidth: this.props.maxWidth }, this.props.style) })));
    }
}
//# sourceMappingURL=Image.js.map