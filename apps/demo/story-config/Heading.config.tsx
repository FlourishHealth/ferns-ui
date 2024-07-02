import {DemoConfiguration} from "@config";
import {Headings, renderHeadingText} from "@stories";
import {HeadingProps} from "ferns-ui";

export const HeadingConfiguration: DemoConfiguration = {
  name: "Heading",
  component: Headings, // Replace with actual component reference
  related: ["Title"],
  description: "",
  a11yNotes: [""],
  category: "Component",
  status: {
    documentation: "ready",
    figma: "inProgress",
    figmaLink: "",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [],
  interfaceName: "HeadingProps",
  usage: {
    do: [],
    doNot: [],
  },
  props: {},
  demo: (props: HeadingProps & {text: string}) => {
    const {text, ...rest} = props;
    return renderHeadingText(text, rest);
  },
  demoOptions: {},
  stories: {
    Headings: {render: Headings},
  },
};
