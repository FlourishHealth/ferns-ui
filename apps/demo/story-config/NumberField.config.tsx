import {DemoConfiguration} from "@config";
import {
  NumberFieldDecimal,
  NumberFieldDemo,
  NumberFieldDisabledDemo,
  NumberFieldWithErrorMsgDemo,
  NumberFieldWithLabelDemo,
} from "@stories";
import {NumberField} from "ferns-ui";

export const NumberFieldConfiguration: DemoConfiguration = {
  name: "Number field",
  component: NumberField, // Replace with actual component reference
  related: ["Text area"],
  description: "Use the number field to allow a user to input numerical values.",
  a11yNotes: ["The user should be able to use tab to navigate between elements."],
  category: "Component",
  status: {
    documentation: "ready",
    figma: "ready",
    figmaLink:
      "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A23515&mode=design&t=IZ8oGBzUmBzUtZMr-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [],
  interfaceName: "NumberFieldProps",
  usage: {
    do: [
      "Use this component for numerical input. For example, an age or quantity.",
      "If an error is returned, tell the user why.",
      "If the field is disabled, tell the user why.",
    ],
    doNot: ["Do not use this component for text input. Instead, use a text field or text area."],
  },
  props: {},
  demo: NumberFieldWithLabelDemo,
  demoOptions: {},
  stories: {
    "Basic Number Field": {
      render: NumberFieldDemo,
    },
    "Number Field with Label": {
      render: NumberFieldWithLabelDemo,
    },
    "Decimal Field": {
      render: NumberFieldDecimal,
    },
    "Number Field with Error Message": {
      render: NumberFieldWithErrorMsgDemo,
    },
    "Disabled Number Field": {
      render: NumberFieldDisabledDemo,
    },
  },
};
