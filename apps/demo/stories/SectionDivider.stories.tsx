import {Box, Heading, SectionDivider, Text} from "ferns-ui";
import React from "react";

import {StorybookContainer} from "./StorybookContainer";

export const SectionDividerDemo = () => {
  return (
    <StorybookContainer>
      <Box direction="column" padding={3} width="100%">
        <Box paddingY={2}>
          <Heading>Section 1</Heading>
        </Box>
        <SectionDivider />
        <Box paddingY={2}>
          <Heading>Section 2</Heading>
        </Box>
      </Box>
    </StorybookContainer>
  );
};

export const SectionDividerInCard = () => {
  return (
    <StorybookContainer>
      <Box direction="column" padding={3} width="100%">
        <Box color="base" rounding="md" padding={3} shadow>
          <Heading>Card Title</Heading>
          <Text>This is some content in a card.</Text>
          <SectionDivider />
          <Text>This content is separated by a section divider.</Text>
          <SectionDivider />
          <Text>More content after another divider.</Text>
        </Box>
      </Box>
    </StorybookContainer>
  );
};

export const SectionDividerInList = () => {
  return (
    <StorybookContainer>
      <Box direction="column" padding={3} width="100%">
        <Box color="base" rounding="md" padding={0} shadow>
          <Box padding={3}>
            <Heading>Settings</Heading>
          </Box>
          <SectionDivider />
          <Box padding={3}>
            <Text>Account Settings</Text>
          </Box>
          <SectionDivider />
          <Box padding={3}>
            <Text>Privacy Settings</Text>
          </Box>
          <SectionDivider />
          <Box padding={3}>
            <Text>Notification Settings</Text>
          </Box>
          <SectionDivider />
          <Box padding={3}>
            <Text>About</Text>
          </Box>
        </Box>
      </Box>
    </StorybookContainer>
  );
};

export const SectionDividerSpacing = () => {
  return (
    <StorybookContainer>
      <Box direction="column" padding={3} width="100%">
        <Box paddingY={1}>
          <Text>Content with minimal spacing</Text>
        </Box>
        <SectionDivider />
        <Box paddingY={1}>
          <Text>Next section</Text>
        </Box>
        <SectionDivider />
        <Box paddingY={4}>
          <Text>Content with more spacing</Text>
        </Box>
        <SectionDivider />
        <Box paddingY={4}>
          <Text>Final section</Text>
        </Box>
      </Box>
    </StorybookContainer>
  );
};
