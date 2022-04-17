import React from "react";
import { SplitPage } from "./SplitPage";
import { Text } from "./Text";
import { storiesOf } from "@storybook/react-native";
import { Box } from "./Box";
storiesOf("Split Page", module).add("Split", () => (React.createElement(SplitPage, { navigation: {}, listViewWidth: 250, renderListViewItem: (item) => (React.createElement(Box, { color: "blue", padding: 2 },
        React.createElement(Text, null,
            "name: ",
            item.item.name))), renderListViewHeader: () => (React.createElement(Box, { padding: 2, color: "red" },
        React.createElement(Text, { weight: "bold" }, "Users:"))), listViewData: Array.from(Array(100).keys()).map((i) => ({ name: `user${i}` })), renderContent: (index) => (React.createElement(Box, { padding: 2, color: "lightGray" },
        index === undefined && React.createElement(Text, { weight: "bold" }, "Nothing selected"),
        index !== undefined && React.createElement(Text, { weight: "bold" },
            "User ",
            index))) })));
//# sourceMappingURL=SplitPage.stories.js.map