import {TextField} from "ferns-ui";
import React from "react";

import {StorybookContainer} from "./StorybookContainer";

export const TextFieldStories = {
  title: "TextField",
  component: TextField,
  stories: {
    "Text Fields": function () {
      return (
        <StorybookContainer>
          <TextField id="none" placeholder="Here's some placeholder text." onChange={() => {}} />
        </StorybookContainer>
      );
    },
    "With Label": function () {
      return (
        <StorybookContainer>
          <TextField
            helperText="And some subtext"
            id="none"
            label="Enter some text"
            onChange={() => {}}
          />
        </StorybookContainer>
      );
    },
    Disabled() {
      return (
        <StorybookContainer>
          <TextField disabled id="none" placeholder="This is disabled" onChange={() => {}} />
        </StorybookContainer>
      );
    },
    Errored() {
      return (
        <StorybookContainer>
          <TextField
            errorMessage="There's been an error"
            helperText="And some subtext"
            id="none"
            label="Enter some text"
            onChange={() => {}}
          />
        </StorybookContainer>
      );
    },
  },
};
