import {Box, Button, ButtonProps} from "ferns-ui";
import React from "react";

import {StorybookContainer} from "./StorybookContainer";
import {action} from "./tools";

const allColorButtons = (props: Partial<ButtonProps>) => {
  return (
    <StorybookContainer>
      <Box paddingY={1}>
        <Button text="Default" onClick={action("clicked")} {...props} />
      </Box>
      <Box paddingY={1}>
        <Button color="primary" text="Primary" onClick={action("clicked")} {...props} />
      </Box>
      <Box paddingY={1}>
        <Button color="secondary" text="Secondary" onClick={action("clicked")} {...props} />
      </Box>
      <Box paddingY={1}>
        <Button color="tertiary" text="Tertiary" onClick={action("clicked")} {...props} />
      </Box>
      <Box paddingY={1}>
        <Button color="accent" text="Accent" onClick={action("clicked")} {...props} />
      </Box>
      <Box paddingY={1}>
        <Button color="red" text="Red" onClick={action("clicked")} {...props} />
      </Box>
      <Box paddingY={1}>
        <Button color="darkGray" text="Dark Gray" onClick={action("clicked")} {...props} />
      </Box>
      <Box paddingY={1}>
        <Button color="gray" text="Gray" onClick={action("clicked")} {...props} />
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

export const ButtonStories = {
  title: "Button",
  component: Button,
  stories: {
    Colors: () => allColorButtons({}),
    Loading: () => allColorButtons({loading: true}),
    Ghost: () => allColorButtons({type: "ghost"}),
    Outline: () => allColorButtons({type: "outline"}),
  },
};
