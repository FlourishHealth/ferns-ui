import {StorybookContainer} from "@components";
import {Box, Button, ButtonProps, Heading} from "ferns-ui";
import React from "react";

export const ButtonDemo = () => {
  return (
    <Button color="primary" icon="plus" text="Button" onClick={() => console.info("clicked")} />
  );
};

export const AllColorButtons = (props: Partial<ButtonProps>) => {
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

export const ConfirmationButton = (props: Partial<ButtonProps>) => {
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

export const InlineButtons = () => {
  return (
    <>
      <Box paddingX={8} paddingY={2}>
        <Heading>Inline</Heading>
      </Box>
      <Box direction="row" paddingX={8} paddingY={8} width="100%">
        <Button color="primary" inline text="Small" onClick={(): void => {}} />
        <Box marginLeft={2} marginRight={2}>
          <Button color="primary" icon="pencil" inline text="pencil" onClick={(): void => {}} />
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
            icon="pencil"
            inline
            text="Outline"
            type="outline"
            onClick={(): void => {}}
          />
        </Box>
        <Box marginLeft={2}>
          <Button
            color="primary"
            icon="pencil"
            inline
            text="Ghost"
            type="ghost"
            onClick={(): void => {}}
          />
        </Box>
        <Box marginLeft={2} marginRight={2}>
          <Button
            color="primary"
            icon="pencil"
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

export const MultilineButtons = () => (
  <Box maxWidth={400} paddingX={8} paddingY={8}>
    <Button
      color="primary"
      text={"Here is some text\nAnd a second line which is much longer"}
      onClick={() => {}}
    />
  </Box>
);

export const SizesButtons = () => {
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
