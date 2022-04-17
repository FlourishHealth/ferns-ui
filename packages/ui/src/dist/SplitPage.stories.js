import React from "react";
import { SplitPage } from "./SplitPage";
import { Text } from "./Text";
import { storiesOf } from "@storybook/react-native";
storiesOf("Split Page", module).add("Split", () => (React.createElement(SplitPage, { navigation: {}, renderListViewItem: (item) => React.createElement(Text, null,
        "name: ",
        item.item.name), listViewData: [{ name: "user1" }, { name: "user2" }] })));
//# sourceMappingURL=SplitPage.stories.js.map