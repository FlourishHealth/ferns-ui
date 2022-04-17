import React from "react";
import {Box} from "@ferns/ui"
import {TextArea} from "@ferns/ui"
import {StorybookContainer} from "./StorybookContainer"

export default {
  title: "TextArea",
  component: TextArea,
};

export const TextAreas = () => {
  return (
    <StorybookContainer>
      <TextArea id="none" onChange={() => {}} placeholder="Here's some placeholder text." />
    </StorybookContainer>
  );
};

export const WithLabelTextArea = () => {
  return (
    <StorybookContainer>
      <TextArea
        label="Enter a bunch of text"
        helperText="And some subtext"
        id="none"
        onChange={() => {}}
      />
    </StorybookContainer>
  );
};

export const TextAreaDisabled = () => {
  return (
    <StorybookContainer>
      <TextArea id="none" onChange={() => {}} disabled={true} placeholder="This is disabled" />
    </StorybookContainer>
  );
};

export const TextAreaErrored = () => {
  return (
    <StorybookContainer>
      <TextArea
        label="Enter a bunch of text"
        helperText="And some subtext"
        errorMessage="There's been an error"
        id="none"
        onChange={() => {}}
      />
    </StorybookContainer>
  );
};
