import React from "react";
import { Box } from "./Box";
import { Spinner } from "./Spinner";
import { Unifier } from "./Unifier";
import { FlatList } from "./FlatList";
import { View } from "react-native";
import { mediaQueryLargerThan } from "./MediaQuery";
import { IconButton } from "./IconButton";
// A component for rendering a list on one side and a details view on the right for large screens,
// and a scrollable list where clicking an item takes you the details view.
export class SplitPage extends React.Component {
    constructor() {
        super(...arguments);
        this.state = { selectedId: undefined };
        this.actionSheetRef = React.createRef();
        this.renderItem = (itemInfo) => {
            return (React.createElement(Box, { onClick: () => {
                    this.setState({ selectedId: itemInfo.index });
                } }, this.props.renderListViewItem(itemInfo)));
        };
        this.renderList = () => {
            var _a, _b;
            if (!mediaQueryLargerThan("sm") && this.state.selectedId) {
                return null;
            }
            return (React.createElement(View, { style: {
                    width: mediaQueryLargerThan("sm") ? (_a = this.props.listViewWidth) !== null && _a !== void 0 ? _a : 300 : "100%",
                    maxWidth: mediaQueryLargerThan("sm") ? (_b = this.props.listViewWidth) !== null && _b !== void 0 ? _b : 300 : "100%",
                    flexGrow: 1,
                    flexShrink: 0,
                    display: "flex",
                    flexDirection: "column",
                } },
                this.props.renderListViewHeader && this.props.renderListViewHeader(),
                React.createElement(FlatList, { data: this.props.listViewData, renderItem: this.renderItem, keyExtractor: (item) => item.id, extraData: this.props.listViewExtraData })));
        };
        this.renderListContent = () => {
            return (React.createElement(Box, { flex: "grow", padding: 2 },
                !mediaQueryLargerThan("sm") && (React.createElement(Box, { width: "100%" },
                    React.createElement(IconButton, { icon: "times", accessibilityLabel: "close", iconColor: "darkGray", onClick: () => this.setState({ selectedId: undefined }) }))),
                this.props.renderContent(this.state.selectedId)));
        };
    }
    render() {
        return (React.createElement(Box, { avoidKeyboard: true, keyboardOffset: this.props.keyboardOffset, display: "flex", width: "100%", height: "100%", flex: "grow", direction: "row", color: this.props.color || "lightGray" },
            this.props.loading === true && React.createElement(Spinner, { size: "md", color: Unifier.theme.darkGray }),
            this.renderList(),
            this.renderListContent()));
    }
}
//# sourceMappingURL=SplitPage.js.map