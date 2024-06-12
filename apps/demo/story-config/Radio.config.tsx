import {DemoConfiguration} from "@config";
import {Radio} from "ferns-ui";
import React from "react";
import {RadioDemo, Radios} from "stories/Radio.stories";

export const RadioConfiguration: DemoConfiguration = {
  name: "Radio",
  component: Radio,
  related: ["Radio field", "Checkbox"],
  description:
    "A microcomponent for the radio button itself. Looking for the list? Check out Radio field.",
  a11yNotes: [
    "Labels should be readable by screen readers.",
    "Labels should be able to be clicked or tapped to select a radio field.",
    "Keyboards should be able to tab back and forth between the radio buttons.",
    "The radio buttons should have a focus state.",
  ],
  category: "Component",
  status: {
    documentation: "ready",
    figma: "ready",
    figmaLink:
      "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A23382&mode=design&t=IZ8oGBzUmBzUtZMr-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [{name: "NN/g article", link: "https://www.nngroup.com/articles/"}],
  interfaceName: "RadioProps",
  usage: {
    do: ["Use radio buttons when only one option can be selected from a list."],
    doNot: [
      "Do not use radio buttons when there’s only one option to be selected. Use a checkbox or switch instead.",
    ],
  },
  props: {},
  demo: RadioDemo,
  demoOptions: {
    controls: {
      selected: {
        type: "boolean",
        defaultValue: false,
      },
    },
  },
  stories: {
    Radios: {
      render: () => <Radios />,
    },
  },
};
