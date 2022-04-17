import React from "react";
import { Text } from "./Text";
export class Link extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return React.createElement(Text, null, this.props.children);
    }
}
//# sourceMappingURL=Link.js.map