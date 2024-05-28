import {StorybookContainer} from "@components";
import {DemoConfiguration} from "@config";
import {Box, Button, ButtonProps, Heading} from "ferns-ui";
import React from "react";

const ButtonDemo = () => {
  return (
    <Button color="primary" icon="plus" text="Button" onClick={() => console.info("clicked")} />
  );
};

const allColorButtons = (props: Partial<ButtonProps>) => {
  return (
    <StorybookContainer>
      <Box paddingY={1}>
        <Button text="Default" onClick={() => console.info("clicked")} {...props} />
      </Box>
      <Box paddingY={1}>
        <Button
          color="primary"
          text="Primary"
          tooltip={{text: "Primary Button"}}
          onClick={() => console.info("clicked")}
          {...props}
        />
      </Box>
      <Box paddingY={1}>
        <Button
          color="secondary"
          text="Secondary"
          onClick={() => console.info("clicked")}
          {...props}
        />
      </Box>
      <Box paddingY={1}>
        <Button
          color="tertiary"
          text="Tertiary"
          onClick={() => console.info("clicked")}
          {...props}
        />
      </Box>
      <Box paddingY={1}>
        <Button color="accent" text="Accent" onClick={() => console.info("clicked")} {...props} />
      </Box>
      <Box paddingY={1}>
        <Button color="red" text="Red" onClick={() => console.info("clicked")} {...props} />
      </Box>
      <Box paddingY={1}>
        <Button
          color="darkGray"
          text="Dark Gray"
          onClick={() => console.info("clicked")}
          {...props}
        />
      </Box>
      <Box paddingY={1}>
        <Button color="gray" text="Gray" onClick={() => console.info("clicked")} {...props} />
      </Box>
      <Box paddingY={1}>
        <Button
          color="primary"
          text="Async Loading Button"
          onClick={async () => {
            return new Promise((resolve) => {
              setTimeout(resolve, 2 * 1000);
            });
          }}
        />
      </Box>
    </StorybookContainer>
  );
};

const confirmationButton = (props: Partial<ButtonProps>) => {
  return (
    <Box>
      <Box paddingX={3} paddingY={3}>
        <Button
          color="secondary"
          text="Default"
          withConfirmation
          onClick={() => {
            console.info("Clicked!");
          }}
          {...props}
        />
      </Box>
      <Box paddingX={3} paddingY={1}>
        <Button
          color="darkGray"
          confirmationHeading="A custom heading!"
          confirmationText="A custom text body!"
          text="Custom"
          withConfirmation
          onClick={() => {
            console.info("Clicked!");
          }}
          {...props}
        />
      </Box>
    </Box>
  );
};

const inlineButtons = () => {
  return (
    <>
      <Box paddingX={8} paddingY={2}>
        <Heading>Inline</Heading>
      </Box>
      <Box direction="row" paddingX={8} paddingY={8} width="100%">
        <Button color="primary" inline text="Small" onClick={(): void => {}} />
        <Box marginLeft={2} marginRight={2}>
          <Button color="primary" icon="edit" inline text="Edit" onClick={(): void => {}} />
        </Box>
        <Button
          color="primary"
          inline
          text="Bigger Button With A Bit More Text"
          onClick={(): void => {}}
        />
      </Box>
      <Box paddingX={8} paddingY={2}>
        <Heading>Types</Heading>
      </Box>
      <Box direction="row" paddingX={8} paddingY={8} width="100%">
        <Button color="primary" inline text="Ghost" type="ghost" onClick={(): void => {}} />
        <Button color="primary" inline text="Outline" type="outline" onClick={(): void => {}} />
        <Button color="primary" inline text="Solid" type="solid" onClick={(): void => {}} />

        <Box marginLeft={2}>
          <Button
            color="primary"
            icon="edit"
            inline
            text="Outline"
            type="outline"
            onClick={(): void => {}}
          />
        </Box>
        <Box marginLeft={2}>
          <Button
            color="primary"
            icon="edit"
            inline
            text="Ghost"
            type="ghost"
            onClick={(): void => {}}
          />
        </Box>
        <Box marginLeft={2} marginRight={2}>
          <Button
            color="primary"
            icon="edit"
            inline
            text="Solid"
            type="solid"
            onClick={(): void => {}}
          />
        </Box>
        <Button
          color="primary"
          inline
          text="Bigger Outline With A Bit More Text"
          type="outline"
          onClick={(): void => {}}
        />
        <Button
          color="primary"
          inline
          text="Bigger Ghost With A Bit More Text"
          type="ghost"
          onClick={(): void => {}}
        />
      </Box>
      <Box paddingX={8} paddingY={2}>
        <Heading>Not inline</Heading>
      </Box>

      <Box paddingX={8} paddingY={8} width="100%">
        <Button color="primary" text="Not inline" onClick={() => {}} />
      </Box>
    </>
  );
};

const multilineButtons = () => (
  <Box maxWidth={400} paddingX={8} paddingY={8}>
    <Button
      color="primary"
      text={"Here is some text\nAnd a second line which is much longer"}
      onClick={() => {}}
    />
  </Box>
);

const sizesButtons = () => {
  return (
    <Box>
      <Box paddingX={8} paddingY={2}>
        <Heading>Sizes</Heading>
      </Box>
      <Box direction="row" paddingX={8} paddingY={8} width="100%">
        <Button color="primary" size="xs" text="Extra Small" onClick={() => {}} />
        <Box marginLeft={2} marginRight={2}>
          <Button color="primary" size="sm" text="Small" onClick={() => {}} />
        </Box>
        <Button color="primary" size="md" text="Medium" onClick={() => {}} />
        <Box marginLeft={2} marginRight={2}>
          <Button color="primary" size="lg" text="Large" onClick={() => {}} />
        </Box>
      </Box>
    </Box>
  );
};

export const ButtonStories = {
  title: "Button",
  component: Button,
  stories: {},
};

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
  demoOptions: {},
  stories: {
    Colors: {render: () => allColorButtons({})},
    Loading: {render: () => allColorButtons({loading: true})},
    Ghost: {render: () => allColorButtons({type: "ghost"})},
    Outline: {render: () => allColorButtons({type: "outline"})},
    Confirmation: {render: () => confirmationButton({})},
    Inline: {render: () => inlineButtons()},
    Multiline: {render: () => multilineButtons()},
    Sizes: {render: () => sizesButtons()},
  },
};
