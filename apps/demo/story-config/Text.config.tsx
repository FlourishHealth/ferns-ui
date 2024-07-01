import {DemoConfiguration} from "@config";
import {renderText, TextLinks, Texts, Truncate} from "@stories";
import {Text, TextProps} from "ferns-ui";

export const TextConfiguration: DemoConfiguration = {
  name: "Text",
  component: Text, // Replace with actual component reference
  related: ["Paragraph"],
  description: "",
  a11yNotes: [""],
  category: ["Data Entry", "Form"],
  status: {
    documentation: "ready",
    figma: "inProgress",
    figmaLink: "",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [],
  interfaceName: "TextProps",
  usage: {
    do: [],
    doNot: [],
  },
  props: {},
  demo: (props: TextProps & {text: string}) => {
    const {text, ...rest} = props;
    return renderText(text, rest);
  },
  demoOptions: {},
  stories: {
    Texts: {render: Texts},
    Truncate: {render: Truncate},
    TextLinks: {render: TextLinks},
  },
};
