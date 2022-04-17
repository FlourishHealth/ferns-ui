import React from "react";
import { View } from "react-native";
import { Unifier } from "./Unifier";
export class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        // console.log("PROGRESS", Unifier.theme[this.props.color], `${this.props.completed / 100}%`);
        return (React.createElement(View, { style: {
                width: "100%",
                height: 6,
            } },
            React.createElement(View, { style: {
                    width: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: 6,
                    borderRadius: 6,
                    borderWidth: 1,
                    borderColor: Unifier.theme[this.props.color],
                    backgroundColor: Unifier.theme[this.props.color],
                    opacity: 0.3,
                } }),
            React.createElement(View, { style: {
                    width: `${Math.min(this.props.completed / 100, 1) * 100}%`,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: 6,
                    borderRadius: 6,
                    borderWidth: 1,
                    borderColor: Unifier.theme[this.props.color],
                    backgroundColor: Unifier.theme[this.props.color],
                    opacity: 1,
                } })));
    }
}
//# sourceMappingURL=ProgressBar.js.map