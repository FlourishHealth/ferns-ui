import {DemoConfiguration} from "@config";
import {SliderDemo, SliderWithIconsDemo, SliderWithLabelsDemo, SliderWithSmileysDemo, SliderWithValueDemo} from "@stories";
import {Slider} from "ferns-ui";

export const SliderConfiguration: DemoConfiguration = {
  name: "Slider",
  component: Slider,
  related: ["Number field"],
  description:
    "Use the slider component to allow users to select a numeric value from a range by dragging a thumb along a track.",
  a11yNotes: [
    "The slider should be keyboard accessible.",
    "The slider should provide clear visual feedback of the current value.",
  ],
  category: "Component",
  status: {
    documentation: "ready",
    figma: "planned",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [],
  interfaceName: "SliderProps",
  usage: {
    do: [
      "Use sliders for selecting values from a continuous range.",
      "Show the current value when precision is important.",
      "Use appropriate step values for the range.",
      "Provide helper text to explain the purpose of the slider.",
    ],
    doNot: [
      "Don't use sliders for precise numeric input; use NumberField instead.",
      "Don't use sliders when there are many discrete options; use SelectField instead.",
    ],
  },
  props: {},
  demo: SliderDemo,
  demoOptions: {},
  stories: {
    "Basic Slider": {
      render: SliderDemo,
    },
    "Slider with Emojis Display": {
      render: SliderWithSmileysDemo,
    },
    "Slider with Value Display": {
      render: SliderWithValueDemo,
    },
    "Slider with Icons": {
      render: SliderWithIconsDemo,
    },
    "Slider with Labels": {
      render: SliderWithLabelsDemo,
    },
  },
};

