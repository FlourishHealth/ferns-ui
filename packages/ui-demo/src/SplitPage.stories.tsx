import {Box, SplitPage, Text} from "ferns-ui";
import React from "react";

export const SplitPageStories = {
  title: "Split Page",
  component: SplitPage,
  stories: {
    Split() {
      return (
        <SplitPage
          listViewData={Array.from(Array(100).keys()).map((i) => ({
            name: `user${i}`,
          }))}
          listViewWidth={250}
          navigation={{}}
          renderContent={(index) => (
            <Box color="lightGray" padding={2}>
              {index === undefined && <Text weight="bold">Nothing selected</Text>}
              {index !== undefined && <Text weight="bold">User {index}</Text>}
            </Box>
          )}
          renderListViewHeader={() => (
            <Box color="red" padding={2}>
              <Text weight="bold">Users:</Text>
            </Box>
          )}
          renderListViewItem={(item) => (
            <Box color="blue" padding={2}>
              <Text>name: {item.item.name}</Text>
            </Box>
          )}
        />
      );
    },
  },
};
