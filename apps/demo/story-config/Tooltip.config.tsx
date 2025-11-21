import {DemoConfiguration} from "@config";
import {IncludesArrow, ToolTipPositions, TooltipDemo, TooltipOverText} from "@stories";
import {Tooltip} from "ferns-ui";

export const TooltipConfiguration: DemoConfiguration = {
  name: "Tooltip",
  component: Tooltip, // Replace with actual component reference
  related: [],
  description:
    "Tooltip is a floating text label that succinctly describes the function of an interactive element, typically Icon Button. It’s displayed continuously as long as the user hovers over or focuses on the element. Also known as 'Info tip'.",
  shortDescription:
    "Tooltip is a floating text label that succinctly describes the function of an interactive element, typically Icon Button. ",
  a11yNotes: [
    "The tooltip should not be repetitive with the label of the element it relates to.",
    "When using Tooltip with IconButton, avoid repetitive labeling. The accessibilityLabel provided to IconButton should describe the intent of the button, not the icon itself. For instance, use “Settings” instead of “Cog icon”. Tooltip text should expand upon that intention.",
    'If Tooltip text is the same as IconButton accessibilityLabel, then add accessibilityLabel="" to the Tooltip.',
  ],
  category: "Component",
  status: {
    documentation: "ready",
    figma: "ready",
    figmaLink:
      "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A23442&mode=design&t=IZ8oGBzUmBzUtZMr-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [{name: "NN/g article", link: "https://www.nngroup.com/articles/"}],
  interfaceName: "TooltipProps",
  usage: {
    do: [
      "Use a tooltip to provide helpful but non-essential context.",
      "Enhance baseline understanding of an element or feature.",
    ],
    doNot: ["Do not use a tooltip to display critical information."],
  },
  props: {},
  demo: TooltipDemo,
  demoOptions: {
    controls: {
      idealPosition: {
        type: "select",
        defaultValue: "top",
        options: [
          {label: "Bottom", value: "bottom"},
          {label: "Top", value: "top"},
          {label: "Right", value: "right"},
          {label: "Left", value: "left"},
        ],
      },
      includeArrow: {
        type: "boolean",
        defaultValue: false,
      },
    },
  },
  stories: {
    Positions: {
      render: () => ToolTipPositions(),
    },
    IncludeArrows: {render: () => IncludesArrow()},
    AroundText: {render: () => TooltipOverText()},
  },
};
