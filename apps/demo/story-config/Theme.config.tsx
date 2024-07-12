import {DemoConfiguration} from "@config";

import {DefaultDemo, ThemeComponentStories, ThemeFontStories} from "../stories";

export const ThemeConfiguration: DemoConfiguration = {
  name: "Theme",
  component: () => null,
  related: [],
  description: "Theme",
  a11yNotes: [""],
  category: "Foundation",
  status: {
    documentation: "ready",
    figma: "ready",
    figmaLink:
      "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A23358&mode=design&t=AKQ8wyFQBA4qC5eF-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [],
  interfaceName: "ThemeProps",
  usage: {
    do: [],
    doNot: [],
  },
  props: {},
  demo: DefaultDemo,
  demoOptions: {},
  stories: {
    ThemeFont: {render: ThemeFontStories},
    ThemeComponent: {render: ThemeComponentStories},
  },
};
