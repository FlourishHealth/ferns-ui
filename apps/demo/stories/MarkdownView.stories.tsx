import {Box, MarkdownView} from "ferns-ui";
import React from "react";

import {StorybookContainer} from "./StorybookContainer";

const headings = `# Heading 1\n\n## Heading 2\n\n### Heading 3\n\n#### Heading 4\n\n##### Heading 5\n\n###### Heading 6`;

const emphasis = `This is **bold**, this is *italic*, this is ***bold italic***, and this is \`inline code\`.`;

const lists = `- Unordered item A\n- Unordered item B\n  - Nested item B.1\n  - Nested item B.2\n\n1. Ordered item 1\n2. Ordered item 2\n   1. Nested item 2.1\n   2. Nested item 2.2`;

const blockquote = `> Blockquote level 1\n>> Nested blockquote level 2\n> Back to level 1`;

// Indented code block (works across platforms without needing fenced code)
const code = `Here is a code block:\n\n    const add = (a, b) => a + b;\n    console.log(add(2, 3));`;

const links = `A link to [Flourish Health](https://flourish.health) and a bare URL: https://example.com.`;

const hr = `Above the rule.\n\n---\n\nBelow the rule.`;

const overview = `# Markdown Overview\n\n${headings}\n\n${emphasis}\n\n${lists}\n\n${blockquote}\n\n${code}\n\n${links}\n\n${hr}`;

const _demo = `# Markdown Demo\n**bold** and _italic_ text.`;

export const MarkdownOverview = (): React.ReactElement => (
  <StorybookContainer>
    <Box maxWidth={800} width="100%">
      <MarkdownView>{overview}</MarkdownView>
    </Box>
  </StorybookContainer>
);

export const MarkdownViewDemo = (): React.ReactElement => (
  <StorybookContainer>
    <Box maxWidth={800} width="100%">
      <MarkdownView></MarkdownView>
    </Box>
  </StorybookContainer>
);
