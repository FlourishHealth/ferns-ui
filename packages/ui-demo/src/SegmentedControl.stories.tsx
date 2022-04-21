import { Box, SegmentedControl } from "ferns-ui";
import React from "react";

export const SegmentedControlStories = {
  title: "Segmented Control",
  component: SegmentedControl,
  stories: {
    "Default Control": function () {
      const [itemIndex, setItemIndex] = React.useState(0);
      return (
        <Box display="flex" width="100%">
          <SegmentedControl
            items={["One", "Two", "Three"]}
            selectedItemIndex={itemIndex}
            onChange={({ activeIndex }) => setItemIndex(activeIndex)}
          />
        </Box>
      );
    },
    "Large Control": function () {
      const [itemIndex, setItemIndex] = React.useState(0);
      return (
        <Box display="flex" width="100%">
          <SegmentedControl
            items={["One", "Two", "Three"]}
            selectedItemIndex={itemIndex}
            size="lg"
            onChange={({ activeIndex }) => setItemIndex(activeIndex)}
          />
        </Box>
      );
    },
  },
};
