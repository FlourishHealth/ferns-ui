import React from "react";
import { TextField } from "./TextField";
export class TextArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return React.createElement(TextField, Object.assign({}, this.props, { multiline: true, height: 100, rows: 4 }));
    }
}
//# sourceMappingURL=TextArea.js.map
//# sourceMappingURL=TextArea.js.map