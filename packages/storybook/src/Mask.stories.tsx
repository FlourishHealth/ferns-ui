import React from "react";
import {Box} from "@ferns/ui"
import {Mask} from "@ferns/ui"
import {Text} from "@ferns/ui"
import {storiesOf} from "@storybook/react-native";
import {StorybookContainer} from "./StorybookContainer"

storiesOf("Mask", module)
  .add("Rounded", () => (
    <StorybookContainer>
      <Box width="100%" padding={6} color="primary">
        <Mask rounding={3}>
          <Box
            width={50}
            height={50}
            color="white"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Text color="darkGray">MA</Text>
          </Box>
        </Mask>
      </Box>
    </StorybookContainer>
  ))
  .add("Circle", () => (
    <StorybookContainer>
      <Box width="100%" padding={6} color="primary">
        <Mask shape="circle">
          <Box
            width={50}
            height={50}
            color="white"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Text color="darkGray">MA</Text>
          </Box>
        </Mask>
      </Box>
    </StorybookContainer>
  ))
  .add("Rounding", () => (
    <StorybookContainer>
      <Box width="100%" padding={6} color="primary">
        <Mask rounding={1}>
          <Box
            width={50}
            height={50}
            color="white"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Text color="darkGray">MA</Text>
          </Box>
        </Mask>
      </Box>
    </StorybookContainer>
  ))
  .add("Washed", () => (
    <StorybookContainer>
      <Box width="100%" padding={6} color="primary">
        <Mask rounding={1} wash={true}>
          <Box
            width={50}
            height={50}
            color="white"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Text color="darkGray">MA</Text>
          </Box>
        </Mask>
      </Box>
    </StorybookContainer>
  ));
