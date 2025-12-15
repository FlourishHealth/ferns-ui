import {DemoConfiguration} from "@config";
import {EmojiSelector} from "ferns-ui";

import {EmojiSelectorDemo} from "../stories";

export const EmojiSelectorConfiguration: DemoConfiguration = {
  name: "Emoji selector",
  component: EmojiSelector,
  related: ["Text field", "Chat", "Reactions"],
  description: "A grid-based emoji picker with categories, search, and recent history.",
  a11yNotes: [
    "Ensure emoji choices are keyboard and screen-reader accessible.",
    "Provide clear focus states when navigating between emoji and category tabs.",
  ],
  category: "Component",
  status: {
    documentation: "inProgress",
    figma: "planned",
    ios: "inProgress",
    android: "inProgress",
    web: "inProgress",
  },
  additionalDocumentation: [],
  interfaceName: "EmojiSelectorProps",
  usage: {
    do: [
      "Use in contexts where users need to choose an emoji, such as reactions or messages.",
      "Pair with clear labels or helper text explaining what the emoji selection controls.",
    ],
    doNot: [
      "Do not rely on emoji alone to convey critical information.",
      "Avoid overwhelming users with too many custom categories.",
    ],
  },
  props: {},
  demo: EmojiSelectorDemo,
  demoOptions: {
    controls: {},
  },
  stories: {
    "Emoji Selector": {render: EmojiSelectorDemo},
  },
};
