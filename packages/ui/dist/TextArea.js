import React from "react";
import { TextField } from "./TextField";
export class TextArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return React.createElement(TextField, Object.assign({}, this.props, { height: 100, multiline: true, rows: 4 }));
    }
}
//# sourceMappingURL=TextArea.js.map