import {DemoConfiguration} from "@config";
import {BoxColors, BoxDemo, FlexBox} from "@stories";
import {Box} from "ferns-ui";

export const BoxConfiguration: DemoConfiguration = {
  name: "Box",
  component: Box,
  related: ["Div", "View"],
  description:
    "Box is a component primitive that can be used to build the foundation of pretty much any other component. It keeps details like spacing, borders and colors consistent with the rest of Gestalt, while allowing the developer to focus on the content. Also known as “div” or “view”.",
  shortDescription:
    "Box is a component primitive that can be used to build the foundation of pretty much any other component.",
  a11yNotes: [
    "Setting display='visuallyHidden' on Box allows for an element to be visually hidden but still be read by screen readers.",
    "The ‘visually-hidden’ CSS technique applies absolute positioning to the element. For a correct implementation, make sure the ‘visually-hidden’ element is correctly contained within a relative-positioned Box.",
  ],
  category: "Foundation",
  status: {
    documentation: "ready",
    figma: "notSupported",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [],
  interfaceName: "BoxProps",
  usage: {
    do: [
      "Use Box as a building block when creating components or layouts that do not rely on flexbox.",
      "Use padding before you use margins, as padding will compose better and won’t collapse.",
      "Design on a grid of 8pt (2, 4, 8, 12, etc).",
      "Box is very similar to Figma’s Auto-layout functionality. Check that out here.",
    ],
    doNot: ["Avoid using arbitrary div elements. Prioritize using Box."],
  },
  props: {},
  demo: BoxDemo,
  demoOptions: {},
  stories: {
      FlexBox: {render: FlexBox},
    Colors: {render: BoxColors},
  },
};
