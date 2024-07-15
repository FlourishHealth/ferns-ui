import {DemoConfiguration} from "@config";
import {CheckboxColors, CheckboxDemo, CheckboxSizes} from "@stories";
import {CheckBox} from "ferns-ui";

export const CheckBoxConfiguration: DemoConfiguration = {
  name: "CheckBox",
  component: CheckBox,
  related: ["Multiselect field", "Radio field"],
  description:
    "CheckBox is used for multiple choice selection. They are independent of each other in a list, and therefore, different from RadioButton, one selection does not affect other checkboxes in the same list.",
  shortDescription: "CheckBox is used for multiple choice selection.",
  a11yNotes: [
    "Labels should be readable by screen readers.",
    "Labels should be able to be clicked or tapped to check/uncheck the checkboxes.",
    "Keyboards should be able to tab back and forth between the checkboxes.",
    "The checkboxes should have a focus state.",
  ],
  category: "Component",
  status: {
    documentation: "ready",
    figma: "ready",
    figmaLink:
      "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A23370&mode=design&t=5bL5IFmWuWQlfRWv-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [{name: "NN/g article", link: "https://www.nngroup.com/articles/"}],
  interfaceName: "CheckBoxProps",
  usage: {
    do: [
      "Use a checkbox when selection doesn’t take immediate effect and requires form submission.",
      "Keep text concise.",
      "Use a tooltip if needed.",
    ],
    doNot: [
      "Do NOT use checkboxes if the checkbox will have an immediate state change. Use switches instead.",
    ],
  },
  props: {},
  demo: CheckboxDemo,
  demoOptions: {
    controls: {
      selected: {type: "boolean", defaultValue: true},
      size: {
        type: "select",
        options: [
          {label: "Small", value: "sm"},
          {label: "Medium", value: "md"},
          {label: "Large", value: "lg"},
        ],
        defaultValue: "md",
      },
      bgColor: {
        type: "select",
        options: [
          {label: "Default", value: "default"},
          {label: "Accent", value: "accent"},
          {label: "Black", value: "black"},
        ],
        defaultValue: "default",
      },
    },
  },
  stories: {
    Sizes: {render: CheckboxSizes},
    Colors: {render: CheckboxColors},
  },
};
