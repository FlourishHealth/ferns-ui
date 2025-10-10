import {DemoConfiguration} from "@config";
import {
  SectionDividerDemo,
  SectionDividerInCard,
  SectionDividerInList,
  SectionDividerSpacing,
} from "@stories";
import {SectionDivider} from "ferns-ui";

export const SectionDividerConfiguration: DemoConfiguration = {
  name: "SectionDivider",
  component: SectionDivider,
  related: ["Card", "Box", "List components"],
  description:
    "A horizontal divider used to separate content sections. Provides visual separation between different groups of content within a container.",
  a11yNotes: [
    "Section dividers are decorative elements and should not be announced by screen readers.",
    "Use dividers sparingly to avoid visual clutter and maintain clear content hierarchy.",
    "Ensure sufficient contrast between the divider and background colors for users with visual impairments.",
  ],
  category: "Component",
  status: {
    documentation: "ready",
    figma: "inProgress",
    figmaLink: "",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [
    {
      name: "Material Design Dividers",
      link: "https://material.io/design/components/dividers.html",
    },
    {
      name: "Apple Human Interface Guidelines - Dividers",
      link: "https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/layout/",
    },
  ],
  interfaceName: "SectionDividerProps",
  usage: {
    do: [
      "Use to separate distinct sections of content within a single container.",
      "Place dividers between related but distinct groups of information.",
      "Use in lists to separate different categories of items.",
      "Apply consistent spacing around dividers for visual balance.",
      "Use in cards to separate different types of content or actions.",
    ],
    doNot: [
      "Don't use dividers between every single item in a list - this creates visual noise.",
      "Avoid using dividers when content naturally flows together.",
      "Don't use dividers as the primary method of organizing content - use proper headings and spacing first.",
      "Avoid using dividers in very small containers where they may feel cramped.",
      "Don't use dividers to separate content that should be grouped together.",
    ],
  },
  props: {},
  demo: SectionDividerDemo,
  demoOptions: {},
  stories: {
    Basic: {render: () => SectionDividerDemo()},
    InCard: {render: () => SectionDividerInCard()},
    InList: {render: () => SectionDividerInList()},
    Spacing: {render: () => SectionDividerSpacing()},
  },
};
