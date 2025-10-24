import React from "react";
import {DemoConfiguration} from "@config";
import {
  MarkdownOverview,
  MarkdownHeadings,
  MarkdownEmphasis,
  MarkdownLists,
  MarkdownBlockquote,
  MarkdownCode,
  MarkdownLinksAndRules,
} from "@stories";
import {MarkdownView} from "ferns-ui";

export const MarkdownViewConfiguration: DemoConfiguration = {
  name: "MarkdownView",
  component: MarkdownView,
  related: ["Text", "Heading", "Link"],
  description:
    "Render markdown using the design system fonts and colors. Headings map to theme sizes (h1→xl, h2→lg, h3→md, h4→sm).",
  a11yNotes: ["Links are auto-detected via Markdown; ensure color contrast meets accessibility."],
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
  interfaceName: "TextProps", // use TextProps for docs table; MarkdownView has no public props
  usage: {
    do: [
      "Use for rendering rich text content like descriptions or docs.",
      "Prefer headings in markdown to drive hierarchy (h1–h4).",
    ],
    doNot: ["Do not use for long, untrusted markdown without sanitization upstream."],
  },
  props: {},
  demo: () => <MarkdownOverview />,
  demoOptions: {},
  stories: {
    "MarkdownView": {description: "All elements in one sample.", render: MarkdownOverview},
  },
};
