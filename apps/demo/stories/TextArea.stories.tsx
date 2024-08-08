import {TextArea} from "ferns-ui";
import React from "react";

import {StorybookContainer} from "./StorybookContainer";

export const TextAreas = (): React.ReactElement => {
  return (
    <StorybookContainer>
      <TextArea id="none" placeholder="Here's some placeholder text." onChange={() => {}} />
    </StorybookContainer>
  );
};
export const WithLabelTextArea = (): React.ReactElement => {
  return (
    <StorybookContainer>
      <TextArea
        helperText="And some subtext"
        id="none"
        title="Enter a bunch of text"
        onChange={() => {}}
      />
    </StorybookContainer>
  );
};
export const TextAreaDisabled = (): React.ReactElement => {
  return (
    <StorybookContainer>
      <TextArea disabled id="none" placeholder="This is disabled" onChange={() => {}} />
    </StorybookContainer>
  );
};
export const TextAreaErrored = (): React.ReactElement => {
  return (
    <StorybookContainer>
      <TextArea
        errorText="There's been an error"
        helperText="And some subtext"
        id="none"
        title="Enter a bunch of text"
        onChange={() => {}}
      />
    </StorybookContainer>
  );
};
