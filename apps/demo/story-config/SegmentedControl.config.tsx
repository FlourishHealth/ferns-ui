import {DemoConfiguration} from "@config";
import {
  DefaultControl,
  LargeControl,
  MultiSelectControl,
  PersistentControl,
  SegmentedControlDemo,
} from "@stories";
import {SegmentedControl} from "ferns-ui";

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
