import {Box, SegmentedControl, Text, useStoredState} from "ferns-ui";
import React, {useState} from "react";

const DefaultControl = () => {
  const [itemIndex, setItemIndex] = useState(0);
  return (
    <Box display="flex" width={300}>
      <SegmentedControl
        items={["One", "Two", "Three Four Five Six Seven"]}
        selectedItemIndex={itemIndex}
        onChange={({activeIndex}) => setItemIndex(activeIndex as number)}
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
        onChange={({activeIndex}) => setItemIndex(activeIndex as number)}
      />
    </Box>
  );
};

const MultiSelectControl = () => {
  const [itemIndexes, setItemIndexes] = useState([0, 1]);

  return (
    <Box display="flex" width="100%">
      <SegmentedControl
        items={["One", "Two", "Three"]}
        multiselect
        selectLimit={itemIndexes.length}
        selectedItemIndexes={itemIndexes}
        size="lg"
        onChange={({activeIndex}) => setItemIndexes([...(activeIndex as number[])])}
      />
    </Box>
  );
};

const PersistentControl = () => {
  const [itemIndex, setItemIndex] = useStoredState("segmented-persistent", 0);

  return (
    <Box display="flex" width="100%">
      <Box padding={6}>
        <Text weight="bold">
          Refresh your page after changing the control to see the persistence.
        </Text>
      </Box>
      <SegmentedControl
        items={["One", "Two", "Three Four Five Six Seven"]}
        selectedItemIndex={itemIndex!}
        onChange={({activeIndex}) => setItemIndex(activeIndex as number)}
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
    MultiSelect() {
      return <MultiSelectControl />;
    },
    PersistentControl() {
      return <PersistentControl />;
    },
  },
};
