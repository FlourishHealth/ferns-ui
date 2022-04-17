import React from "react";
import {Box} from "@ferns/ui"
import {Icon, IconExpo} from "@ferns/ui"
import {storiesOf} from "@storybook/react-native";
import {StorybookContainer} from "./StorybookContainer"

storiesOf("Icon", module)
  .add("Solid Icons", () => (
    <StorybookContainer>
      <Box width="100%" height="100%" display="flex" direction="row" justifyContent="between">
        <IconExpo prefix="fas" name="heart" />
        <Icon prefix="fas" name="plus" />
        <Icon prefix="fas" name="edit" />
      </Box>
    </StorybookContainer>
  ))
  .add("Regular Icons", () => (
    <StorybookContainer>
      <Box width="100%" height="100%" display="flex" direction="row" justifyContent="between">
        <Icon prefix="far" name="heart" />
        <Icon prefix="far" name="plus" />
        <Icon prefix="far" name="edit" />
        <Icon prefix="far" name="heart" />
      </Box>
    </StorybookContainer>
  ))
  .add("Icon Sizes", () => (
    <StorybookContainer>
      <Box width="100%" height="100%" display="flex" direction="row" justifyContent="between">
        <Icon prefix="fas" name="heart" size={8} />
        <Icon prefix="far" name="heart" size={8} />

        <Icon prefix="fas" name="heart" size={12} />
        <Icon prefix="far" name="heart" size={12} />

        <Icon prefix="fas" name="heart" size={15} />
        <Icon prefix="far" name="heart" size={15} />

        <Icon prefix="fas" name="heart" size={22} />
        <Icon prefix="far" name="heart" size={22} />

        <Icon prefix="fas" name="heart" size={28} />
        <Icon prefix="far" name="heart" size={28} />
      </Box>
    </StorybookContainer>
  ));
