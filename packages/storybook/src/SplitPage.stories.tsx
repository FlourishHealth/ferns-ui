import React from "react";
import {SplitPage} from "../../ui/src/SplitPage";
import {Text} from "../../ui/src/Text";
import {storiesOf} from "@storybook/react-native";
import {Box} from "../../ui/src/Box";

storiesOf("Split Page", module).add("Split", () => (
  <SplitPage
    navigation={{}}
    listViewWidth={250}
    renderListViewItem={(item) => (
      <Box color="blue" padding={2}>
        <Text>name: {item.item.name}</Text>
      </Box>
    )}
    renderListViewHeader={() => (
      <Box padding={2} color="red">
        <Text weight="bold">Users:</Text>
      </Box>
    )}
    listViewData={Array.from(Array(100).keys()).map((i) => ({name: `user${i}`}))}
    renderContent={(index) => (
      <Box padding={2} color="lightGray">
        {index === undefined && <Text weight="bold">Nothing selected</Text>}
        {index !== undefined && <Text weight="bold">User {index}</Text>}
      </Box>
    )}
  />
));
