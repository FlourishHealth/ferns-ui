import {DemoConfiguration} from "@config";
import {Circle, DefaultDemo, Rounded, Rounding, Washed} from "@stories";
import {Mask} from "ferns-ui";

export const MaskConfiguration: DemoConfiguration = {
  name: "Mask",
  component: Mask,
  related: ["Avatar"],
  description:
    "Mask is used to display content in a specific shape. It’s currently not used on the platform, but we might use it eventually.",
  a11yNotes: [],
  category: "Component",
  status: {
    documentation: "ready",
    figma: "notSupported",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [],
  interfaceName: "MaskProps",
  usage: {
    do: [],
    doNot: [],
  },
  props: {},
  demo: DefaultDemo,
  demoOptions: {},
  stories: {
    Circle: {render: Circle},
    Rounding: {render: Rounding},
    Washed: {render: Washed},
    Rounded: {render: Rounded},
  },
};
