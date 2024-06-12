import {Box, SegmentedControl, SegmentedControlProps} from "ferns-ui";
import React, {useState} from "react";

export const SegmentedControlDemo = (props: Partial<SegmentedControlProps>) => {
  const [index, setIndex] = useState(0);
  return (
    <Box display="flex" width="100%">
      <SegmentedControl
        items={["One", "Two", "Three"]}
        selectedIndex={index}
        onChange={setIndex}
        {...props}
      />
    </Box>
  );
};

export const DefaultControl = () => {
  const [itemIndex, setItemIndex] = useState(0);
  return (
    <Box display="flex" width={300}>
      <SegmentedControl
        items={["One", "Two", "Three Four Five Six Seven"]}
        selectedIndex={itemIndex}
        onChange={(activeIndex) => setItemIndex(activeIndex as number)}
      />
    </Box>
  );
};

export const LargeControl = () => {
  const [itemIndex, setItemIndex] = useState(0);
  return (
    <Box display="flex" width="100%">
      <SegmentedControl
        items={["One", "Two", "Three"]}
        selectedIndex={itemIndex}
        size="lg"
        onChange={(activeIndex) => setItemIndex(activeIndex as number)}
      />
    </Box>
  );
};

export const OverflowControl = () => {
  const [itemIndex, setItemIndex] = useState(0);
  return (
    <Box display="flex" width={300}>
      <SegmentedControl
        items={["One", "Two", "Three Four Five Six Seven"]}
        selectedIndex={itemIndex}
        onChange={(activeIndex) => setItemIndex(activeIndex as number)}
      />
    </Box>
  );
};
