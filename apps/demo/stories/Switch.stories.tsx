import {StorybookContainer} from "@components";
import {DemoConfiguration} from "@config";
import {Box, Switch, WithLabel} from "ferns-ui";
import React from "react";

const SwitchDemo = () => {
  return (
    <WithLabel label="Switch With A Label">
      <Switch id="withLabel" switched onChange={() => {}} />
    </WithLabel>
  );
};

const SwitchForms = (): React.ReactElement => {
  const [boolean, setBoolean] = React.useState(false);
  const [withLabel, setWithLabel] = React.useState(false);
  const [primary, setPrimary] = React.useState(false);
  const [small, setSmall] = React.useState(false);

  return (
    <StorybookContainer>
      <Box direction="column" display="flex" height="100%" width="100%">
        <Switch id="check" switched={boolean} onChange={(result) => setBoolean(result)} />
        <WithLabel label="With A Label">
          <Switch id="withLabel" switched={withLabel} onChange={setWithLabel} />
        </WithLabel>

        <WithLabel label="Primary Color">
          <Switch
            id="primary"
            label="Primary Color"
            labelColor="primary"
            // color="primary"
            switched={primary}
            onChange={setPrimary}
          />
        </WithLabel>
        <WithLabel label="Small">
          <Switch
            id="small"
            label="Small"
            switched={small}
            // size="sm"
            onChange={setSmall}
          />
        </WithLabel>
      </Box>
    </StorybookContainer>
  );
};

export const SwitchConfiguration: DemoConfiguration = {
  name: "Switch",
  component: Switch,
  related: ["Boolean field", "Checkbox"],
  description:
    "This is a microcomponent. Use Switch for single cell options that can be turned on and off only. If you have a cell with multiple options that can be activated, consider using Checkbox.",
  a11yNotes: [
    "Users should be able to use the tab key to focus on the switch, and then the enter/space keys to interact with it.",
    "Switches should have labels that can be read by screen readers.",
    "Users should be able to click the labels to interact with the toggle.",
  ],
  category: ["Form", "Input"],
  status: {
    documentation: "ready",
    figma: "ready",
    figmaLink:
      "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A23394&mode=design&t=IZ8oGBzUmBzUtZMr-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [{name: "NN/g article", link: "https://www.nngroup.com/articles/"}],
  interfaceName: "SwitchProps",
  usage: {
    do: [
      "Use a boolean field for a binary option that can be either active or inactive.",
      "Use this for an immediate state change. For example, turning off airplane mode.",
      "Communicate why a boolean field is disabled.",
      "Be concise; this is microcopy.",
    ],
    doNot: [
      "Do not use boolean to choose between non-binary options. Instead, use a multiselect (checkbox) or radio field.",
      "Do not truncate text.",
    ],
  },
  props: {},
  demo: SwitchDemo,
  demoOptions: {},
  stories: {
    Switches: {render: SwitchForms},
  },
  testMatrix: {},
  testMatrixDefaultProps: {},
};
