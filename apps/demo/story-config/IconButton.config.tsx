import {DemoConfiguration} from "@config";
import {
  AllButtonIconVariants,
  ConfirmationIconButton,
  IconButtonDemo,
  LoadingIconButton,
} from "@stories";
import {IconButton} from "ferns-ui";

export const IconButtonConfiguration: DemoConfiguration = {
  name: "IconButton",
  component: IconButton,
  related: ["Buttons", "Icons", "Actions"],
  description: "Icon buttons allow users to take actions and make choices with a single tap.",
  a11yNotes: [
    "Ensure that each IconButton has an appropriate accessibilityLabel that describes the action it performs.",
    "If the button has a confirmation dialog, indicate this with an appropriate accessibilityHint.",
    "When using icons, provide clear and consistent iconography that users can easily understand.",
  ],
  category: "Component",
  status: {
    documentation: "ready",
    figma: "ready",
    figmaLink:
      "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A23358&mode=design&t=AKQ8wyFQBA4qC5eF-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [
    {name: "Icon Guidelines", link: "https://www.nngroup.com/articles/icon-guidelines/"},
  ],
  interfaceName: "IconButtonProps",
  usage: {
    do: [
      "Use to trigger an action or progression within a task or flow.",
      "Use concise, descriptive icons that are easily recognizable.",
      "Provide accessible labels that describe the button's action.",
    ],
    doNot: [
      "Do not use without an accessible label.",
      "Avoid using icons that are not easily recognizable or understood by users.",
    ],
  },
  props: {},
  demo: IconButtonDemo,
  demoOptions: {
    controls: {
      variant: {
        type: "select",
        defaultValue: "primary",
        options: [
          {label: "Primary", value: "primary"},
          {label: "Secondary", value: "secondary"},
          {label: "Muted", value: "muted"},
          {label: "Destructive", value: "destructive"},
        ],
      },
      iconName: {
        type: "select",
        defaultValue: "plus",
        options: [
          {label: "Plus", value: "plus"},
          {label: "Check", value: "check"},
          {label: "Arrow", value: "arrow-down-short-wide"},
          {label: "Minus", value: "minus"},
          {label: "Close", value: "close"},
          {label: "Info", value: "info"},
          {label: "Trash", value: "trash"},
          {label: "Edit", value: "edit"},
          {label: "Download", value: "download"},
          {label: "Archive", value: "box-archive"},
        ],
      },
    },
  },
  stories: {
    Variants: {render: () => AllButtonIconVariants({})},
    Confirmation: {render: () => ConfirmationIconButton({})},
    Loading: {render: () => LoadingIconButton({})},
  },
};
