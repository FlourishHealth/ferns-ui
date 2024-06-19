import {Box, Button, ButtonProps, Heading} from "ferns-ui";
import React from "react";

import {StorybookContainer} from "./StorybookContainer";

export const ButtonDemo = (props: Partial<ButtonProps>) => {
  return (
    <Button iconName="plus" text="Button" onClick={() => console.info("clicked")} {...props} />
  );
};

export const AllColorButtons = (props: Partial<ButtonProps>) => {
  return (
    <StorybookContainer>
      <Box paddingY={1}>
        <Button text="Default/Primary" onClick={() => console.info("clicked")} {...props} />
      </Box>
      <Box paddingY={1}>
        <Button
          text="Secondary"
          variant="secondary"
          onClick={() => console.info("clicked")}
          {...props}
        />
      </Box>
      <Box paddingY={1}>
        <Button
          text="Outline"
          variant="outline"
          onClick={() => console.info("clicked")}
          {...props}
        />
      </Box>
      <Box paddingY={1}>
        <Button text="Muted" variant="muted" onClick={() => console.info("clicked")} {...props} />
      </Box>
      <Box paddingY={1}>
        <Button disabled text="Disabled" onClick={() => console.info("clicked")} {...props} />
      </Box>
      <Box paddingY={1}>
        <Button
          iconName="check"
          text="Icon default"
          onClick={() => console.info("clicked")}
          {...props}
        />
      </Box>
      <Box paddingY={1}>
        <Button
          iconName="check"
          iconPosition="right"
          text="Icon Right"
          onClick={() => console.info("clicked")}
          {...props}
        />
      </Box>
      <Box paddingY={1}>
        <Button
          text="With Confirmation Modal"
          onClick={() => console.info("clicked")}
          {...props}
          withConfirmationModal
        />
      </Box>
      <Box paddingY={1}>
        <Button
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
          text="With Confirmation Modal"
          onClick={() => console.info("clicked")}
          {...props}
          withConfirmationModal
        />
      </Box>
      <Box paddingX={3} paddingY={1}>
        <Button
          modalText="And some custom text body!"
          modalTitle="A Custom Title"
          text="With Custom Modal Props"
          onClick={() => console.info("clicked")}
          {...props}
          withConfirmationModal
        />
      </Box>
    </Box>
  );
};

export const FullWidthButtons = (props: Partial<ButtonProps>) => {
  return (
    <>
      <Box paddingX={8} paddingY={2}>
        <Heading>Full Width</Heading>
      </Box>
      <Box paddingY={1}>
        <Button
          text="Default/Primary Full Width"
          onClick={() => console.info("clicked")}
          {...props}
          fullWidth
        />
      </Box>

      <Box paddingX={8} paddingY={2}>
        <Heading>Types</Heading>
      </Box>
      <Box paddingY={1}>
        <Button
          fullWidth
          text="Secondary"
          variant="secondary"
          onClick={() => console.info("clicked")}
          {...props}
        />
      </Box>
      <Box paddingY={1}>
        <Button
          text="Outline"
          variant="outline"
          onClick={() => console.info("clicked")}
          {...props}
          fullWidth
        />
      </Box>
      <Box paddingY={1}>
        <Button
          fullWidth
          text="Muted"
          variant="muted"
          onClick={() => console.info("clicked")}
          {...props}
        />
      </Box>
      <Box paddingY={1}>
        <Button
          disabled
          fullWidth
          text="Disabled"
          onClick={() => console.info("clicked")}
          {...props}
        />
      </Box>
      <Box paddingY={1}>
        <Button
          iconName="check"
          text="With Icon"
          onClick={() => console.info("clicked")}
          {...props}
          fullWidth
        />
      </Box>
      <Box paddingY={1}>
        <Button
          fullWidth
          iconName="check"
          iconPosition="right"
          text="Icon Right"
          onClick={() => console.info("clicked")}
          {...props}
        />
      </Box>
      <Box paddingY={1}>
        <Button
          fullWidth
          text="Async Loading Button"
          onClick={async () => {
            return new Promise((resolve) => {
              setTimeout(resolve, 2 * 1000);
            });
          }}
        />
      </Box>
    </>
  );
};

export const MultilineButtons = () => (
  <Box maxWidth={400} paddingX={8} paddingY={8}>
    <Box paddingY={1}>
      <Button text={"Here is some text\nAnd a second line which"} onClick={() => {}} />
    </Box>
    <Box paddingY={1}>
      <Button
        iconName="plus"
        text={"Here is some text\nAnd a second line which"}
        onClick={() => {}}
      />
    </Box>
  </Box>
);

export const ButtonStories = {
  title: "Button",
  component: Button,
  stories: {},
};
