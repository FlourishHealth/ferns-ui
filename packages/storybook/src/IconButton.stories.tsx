import React from "react";
import {Box} from "../../ui/src/Box";
import {IconButton} from "../../ui/src/IconButton";
import {storiesOf} from "@storybook/react-native";
import {StorybookContainer} from "../../ui/src/StorybookContainer";

storiesOf("IconButton", module).add("Icon Buttons", () => (
  <StorybookContainer>
    <IconButton
      icon="plus"
      prefix="fas"
      accessibilityLabel="label"
      iconColor="primary"
      onClick={() => {}}
    />
    <IconButton
      icon="plus"
      prefix="fas"
      accessibilityLabel="label"
      iconColor="secondary"
      onClick={() => {}}
    />
    <IconButton
      icon="plus"
      prefix="fas"
      accessibilityLabel="label"
      iconColor="primary"
      onClick={() => {}}
    />
    <IconButton
      icon="plus"
      prefix="fas"
      accessibilityLabel="label"
      iconColor="primary"
      onClick={() => {}}
      size="xl"
    />

    <IconButton
      icon="plus"
      prefix="fas"
      accessibilityLabel="label"
      iconColor="primary"
      onClick={() => {}}
      bgColor="lightGray"
    />
    <IconButton
      icon="plus"
      prefix="fas"
      accessibilityLabel="label"
      iconColor="primary"
      onClick={() => {}}
      bgColor="gray"
    />
    <IconButton
      icon="plus"
      prefix="fas"
      accessibilityLabel="label"
      iconColor="primary"
      onClick={() => {}}
      bgColor="transparentDarkGray"
    />
    <Box padding={4} color="darkGray">
      <IconButton
        icon="plus"
        prefix="fas"
        accessibilityLabel="label"
        iconColor="primary"
        onClick={() => {}}
        bgColor="white"
      />
    </Box>
  </StorybookContainer>
));
