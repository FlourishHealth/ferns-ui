import {DemoConfiguration} from "@config";
import {
  ButtonDemo,
  ButtonIconPosition,
  ButtonLoading,
  ButtonVariants,
  ConfirmationButton,
  FullWidthButtons,
  MultilineButtons,
} from "@stories";
import {Button} from "ferns-ui";

export const ButtonConfiguration: DemoConfiguration = {
  name: "Button",
  component: Button,
  related: ["Cards", "Modals", "Table icon buttons"],
  description:
    "Buttons allow users to perform actions within a surface. They can be used alone for immediate action. Also known as CTA (call to action).",
  a11yNotes: [
    "Use disabled buttons very rarely. Here’s an article with more details.",
    "If the button text doesn’t provide sufficient context about a button’s behavior to a screen reader, provide a short descriptive label.",
    "When Button text does not provide sufficient context about the Button’s behavior, supply a short, descriptive label for screen-readers using accessibilityLabel. Texts like 'Click here', 'Follow', or 'Shop' can be confusing when a screen reader reads them out of context. In those cases, we must pass an alternative text with deeper context to replace the Button text, like 'Follow Ryan' or 'Shop Wedding Invitations'.",
    "If Button is used as a control Button to show/hide a Popover-based , we recommend passing the following ARIA attributes to assist screen readers: accessibilityLabel, accessibilityControls, accessibilityHaspopup.",
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
  additionalDocumentation: [{name: "NN/g article", link: "https://www.nngroup.com/articles/"}],
  interfaceName: "ButtonProps",
  usage: {
    do: [
      "Use to trigger an action or progression within a task or flow.",
      "Use concise, descriptive language.",
      "Use the primary style for the most important action on a page or section.",
      "Use disabled buttons very sparingly.",
    ],
    doNot: [
      "Do not use a button to direct users to an anchor link. Instead, use a simple link.",
      "Add multiple lines of text.",
      "Use two icons in one button.",
    ],
  },
  props: {},
  demo: ButtonDemo,
  demoOptions: {
    controls: {
      variant: {
        type: "select",
        defaultValue: "primary",
        options: [
          {label: "Primary", value: "primary"},
          {label: "Secondary", value: "secondary"},
          {label: "Outline", value: "outline"},
          {label: "Muted", value: "muted"},
        ],
      },
      iconName: {
        type: "select",
        defaultValue: undefined,
        options: [
          {label: "None", value: ""},
          {label: "Check", value: "check"},
          {label: "Arrow", value: "arrow-down-short-wide"},
          {label: "Plus", value: "plus"},
          {label: "Minus", value: "minus"},
        ],
      },
      iconPosition: {
        type: "select",
        defaultValue: "left",
        options: [
          {label: "Left", value: "left"},
          {label: "Right", value: "right"},
        ],
      },
      fullWidth: {
        type: "boolean",
        defaultValue: false,
      },
      withConfirmationModal: {
        type: "boolean",
        defaultValue: false,
      },
    },
  },
  stories: {
    Variants: {render: () => ButtonVariants({})},
    IconPosition: {render: () => ButtonIconPosition()},
    Loading: {render: () => ButtonLoading()},
    Confirmation: {render: () => ConfirmationButton()},
    FullWidth: {render: () => FullWidthButtons({})},
    Multiline: {render: () => MultilineButtons()},
  },
};
