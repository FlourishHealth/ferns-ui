import {DemoConfiguration} from "@config";
import {SpinnerDemo, SpinnerVariations} from "@stories";
import {Spinner} from "ferns-ui";

export const SpinnerConfiguration: DemoConfiguration = {
  name: "Spinner",
  component: Spinner,
  related: ["Activity Indicator", "Loading"],
  description:
    "This is a microcomponent that’s used to indicate that the system is loading information. It can be used on a loading surface or on a button.",
  a11yNotes: [],
  category: "Component",
  status: {
    documentation: "ready",
    figma: "ready",
    figmaLink:
      "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A23466&mode=design&t=IZ8oGBzUmBzUtZMr-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [],
  interfaceName: "SpinnerProps",
  usage: {
    do: [
      "Use the default colors.",
      "If extra emphasis is needed (and if it’s built) use the other colors.",
    ],
    doNot: ["Do not arbitrarily change the colors or sizing."],
  },
  props: {},
  demo: SpinnerDemo,
  demoOptions: {
    controls: {
      size: {
        type: "select",
        options: [
          {label: "Small", value: "sm"},
          {label: "Medium", value: "md"},
        ],
        defaultValue: "md",
      },
      color: {
        type: "select",
        options: [
          {label: "Secondary", value: "secondary"},
          {label: "Accent", value: "accent"},
          {label: "Light", value: "light"},
          {label: "Dark", value: "dark"},
        ],
        defaultValue: "secondary",
      },
    },
  },
  stories: {
    SpinnerVariations: {render: SpinnerVariations},
  },
};
