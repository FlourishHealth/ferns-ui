import React from "react";
import { Box } from "./Box";
import { ErrorBoundary } from "./ErrorBoundary";
// import {KeyboardAccessoryNavigation} from "react-native-keyboard-accessory";
import { Spinner } from "./Spinner";
import { Unifier } from "./Unifier";
import { FlatList } from "./FlatList";
// A component for rendering a list on one side and a details view on the right for large screens,
// and a scrollable list where clicking an item takes you the details view.
export class SplitPage extends React.Component {
    constructor() {
        super(...arguments);
        this.actionSheetRef = React.createRef();
    }
    render() {
        return (React.createElement(ErrorBoundary, null, React.createElement(Box, { avoidKeyboard: true, keyboardOffset: this.props.keyboardOffset, display: "flex", width: "100%", height: "100%", flex: "grow", direction: "row", color: this.props.color || "lightGray" }, this.props.loading === true && (React.createElement(Spinner, { size: "md", color: Unifier.theme.darkGray })), React.createElement(Box, { width: 300, maxWidth: 300, flex: "shrink", direction: "column", scroll: true }, this.props.renderListViewHeader && this.props.renderListViewHeader(), React.createElement(FlatList, { data: this.props.listViewData, renderItem: this.props.renderListViewItem, keyExtractor: (item) => item.id, extraData: this.props.listViewExtraData })), React.createElement(Box, { flex: "grow", padding: 2 }, this.props.children))));
    }
}
//# sourceMappingURL=SplitPage.js.map
//# sourceMappingURL=SplitPage.js.map