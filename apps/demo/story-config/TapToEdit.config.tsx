import {DemoConfiguration} from "@config";
import {TapDemo, TapStory} from "@stories";
import {TapToEdit} from "ferns-ui";

export const TapToEditConfiguration: DemoConfiguration = {
  name: "Tap to edit",
  component: TapToEdit,
  related: ["Tap to edit pattern", "Address tap-to-edit pattern"],
  description:
    "This element allows the user to see information and interact with an icon to edit it. See the pattern here.",
  a11yNotes: [
    "The user should be able to tab to the tap-to-edit icon and press enter/space to interact with it.",
    "The user should be able to tap the label as well to interact with the element.",
  ],
  category: "Component",
  status: {
    documentation: "ready",
    figma: "ready",
    figmaLink:
      "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A23478&mode=design&t=IZ8oGBzUmBzUtZMr-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [],
  interfaceName: "TapToEditProps",
  usage: {
    do: [
      "Display the information that will be edited.",
      "If needed, update the font color to font-link.",
    ],
    doNot: ["Do not replace the icon."],
  },
  props: {},
  demo: TapDemo,
  demoOptions: {},
  stories: {
    "Tap to edit": {render: TapStory},
  },
};
