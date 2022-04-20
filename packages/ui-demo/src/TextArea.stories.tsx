import { Box, TextArea } from "ferns-ui";
import React from "react";

import { StorybookContainer } from "./StorybookContainer";

export const TextAreaStories = {
  title: "TextArea",
  component: TextArea,
  stories: {
    TextAreas() {
      return (
        <StorybookContainer>
          <TextArea
            id="none"
            placeholder="Here's some placeholder text."
            onChange={() => {}}
          />
        </StorybookContainer>
      );
    },
  },
  WithLabelTextArea() {
    return (
      <StorybookContainer>
        <TextArea
          helperText="And some subtext"
          id="none"
          label="Enter a bunch of text"
          onChange={() => {}}
        />
      </StorybookContainer>
    );
  },
  TextAreaDisabled() {
    return (
      <StorybookContainer>
        <TextArea
          disabled
          id="none"
          placeholder="This is disabled"
          onChange={() => {}}
        />
      </StorybookContainer>
    );
  },
  TextAreaErrored() {
    return (
      <StorybookContainer>
        <TextArea
          errorMessage="There's been an error"
          helperText="And some subtext"
          id="none"
          label="Enter a bunch of text"
          onChange={() => {}}
        />
      </StorybookContainer>
    );
  },
};
