import {DemoConfiguration} from "@config";
import {Box, SegmentedControl, Text, useStoredState} from "ferns-ui";
import React, {useState} from "react";

const SegmentedControlDemo = () => {
  return (
    <Box display="flex" width="100%">
      <SegmentedControl items={["One", "Two"]} selectedItemIndex={0} onChange={() => {}} />
    </Box>
  );
};

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

export const SegmentedControlConfiguration: DemoConfiguration = {
  name: "Segmented control",
  component: SegmentedControl,
  related: ["Render Content Fn", "Top navigation", "Bottom navigation"],
  description:
    "SegmentedControl may be used to group multiple selections. The controls display the current state and related state. Create layout to convey a clear sense of information hierarchy. When a control is engaged, information below the control should also be updated. Also known as 'Toggle group'.",
  shortDescription:
    "SegmentedControl may be used to group multiple selections. The controls display the current state and related state. ",
  a11yNotes: [],
  category: "Component",
  status: {
    documentation: "ready",
    figma: "ready",
    figmaLink:
      "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A24201&mode=design&t=IZ8oGBzUmBzUtZMr-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [],
  interfaceName: "SegmentedControlProps",
  usage: {
    do: [
      "Use segmented control to separate groups of information into 'screens'.",
      "For mobile controls with more than 3 named screens, use the dot variant.",
    ],
    doNot: ["Do not use more than 3 named screens on mobile."],
  },
  props: {},
  demo: SegmentedControlDemo,
  demoOptions: {},
  stories: {
    Default: {render: DefaultControl},
    Large: {render: LargeControl},
    MultiSelect: {render: MultiSelectControl},
    Persistent: {render: PersistentControl},
  },
};
