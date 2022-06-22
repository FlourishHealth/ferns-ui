import {Box, SegmentedControl} from "ferns-ui";
import React, {useState} from "react";

const DefaultControl = () => {
  const [itemIndex, setItemIndex] = useState(0);
  return (
    <Box display="flex" width="100%">
      <SegmentedControl
        items={["One", "Two", "Three"]}
        selectedItemIndex={itemIndex}
        onChange={({activeIndex}) => setItemIndex(activeIndex)}
      />
    </Box>
  );
};

const LargeControl = () => {
  const [itemIndex, setItemIndex] = useState(0);
  return (
    <Box display="flex" width="100%">
      <SegmentedControl
        items={["One", "Two", "Three"]}
        selectedItemIndex={itemIndex}
        size="lg"
        onChange={({activeIndex}) => setItemIndex(activeIndex)}
      />
    </Box>
  );
};

export const SegmentedControlStories = {
  title: "Segmented Control",
  component: SegmentedControl,
  stories: {
    DefaultControl() {
      return <DefaultControl />;
    },
    LargeControl() {
      return <LargeControl />;
    },
  },
};
