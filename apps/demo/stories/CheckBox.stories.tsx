import {StorybookContainer} from "@components";
import {DemoConfiguration} from "@config";
import {CheckBox} from "ferns-ui";
import React from "react";

const CheckboxDemo = () => {
  return <CheckBox checked label="Checkbox With A Label" onChange={() => {}} />;
};

const Checkboxes = ({disabled}: {disabled: boolean}): React.ReactElement => {
  const [boolean, setBoolean] = React.useState(false);
  const [withLabel, setWithLabel] = React.useState(false);
  const [primary, setPrimary] = React.useState(false);
  const [small, setSmall] = React.useState(false);
  const [indeterminate, setIndeterminate] = React.useState(false);

  return (
    <StorybookContainer>
      <CheckBox
        checked={boolean}
        disabled={disabled}
        onChange={(result) => setBoolean(result.value)}
      />

      <CheckBox
        checked={withLabel}
        disabled={disabled}
        label="With A Label"
        onChange={(result) => setWithLabel(result.value)}
      />

      <CheckBox
        checked={primary}
        color="primary"
        disabled={disabled}
        label="Primary Color"
        labelColor="primary"
        onChange={(result) => setPrimary(result.value)}
      />

      <CheckBox
        checked={small}
        disabled={disabled}
        label="Small"
        size="sm"
        onChange={(result) => setSmall(result.value)}
      />

      <CheckBox
        disabled={disabled}
        indeterminate={indeterminate}
        label="Indeterminate"
        size="sm"
        onChange={(result) => {
          setIndeterminate(result.value);
        }}
      />
    </StorybookContainer>
  );
};

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
  demoOptions: {},
  stories: {
    Plain: {render: () => <Checkboxes disabled={false} />},
    Disabled: {render: () => <Checkboxes disabled />},
  },
};
