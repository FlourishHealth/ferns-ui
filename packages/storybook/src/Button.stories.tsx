import {action} from "@storybook/addon-actions";
import React from "react";
import {Button} from "../../ui/src/Button";
import {storiesOf} from "@storybook/react-native";
import {Box} from "../../ui/src/Box";
import {ButtonProps} from "../../ui/src/Common";
import {StorybookContainer} from "../../ui/src/StorybookContainer";

function allColorButtons(props: Partial<ButtonProps>) {
  return (
    <StorybookContainer>
      <Box paddingY={1}>
        <Button onClick={action("clicked")} text="Default" {...props} />
      </Box>
      <Box paddingY={1}>
        <Button onClick={action("clicked")} text="Primary" color="primary" {...props} />
      </Box>
      <Box paddingY={1}>
        <Button onClick={action("clicked")} text="Secondary" color="secondary" {...props} />
      </Box>
      <Box paddingY={1}>
        <Button onClick={action("clicked")} text="Tertiary" color="tertiary" {...props} />
      </Box>
      <Box paddingY={1}>
        <Button onClick={action("clicked")} text="Accent" color="accent" {...props} />
      </Box>
      <Box paddingY={1}>
        <Button onClick={action("clicked")} text="Red" color="red" {...props} />
      </Box>
      <Box paddingY={1}>
        <Button onClick={action("clicked")} text="Dark Gray" color="darkGray" {...props} />
      </Box>
      <Box paddingY={1}>
        <Button onClick={action("clicked")} text="Gray" color="gray" {...props} />
      </Box>
    </StorybookContainer>
  );
}

storiesOf("Button", module)
  .add("Colors", () => allColorButtons({}))
  .add("Loading", () => allColorButtons({loading: true}))
  .add("Ghost", () => allColorButtons({type: "ghost"}))
  .add("Outline", () => allColorButtons({type: "outline"}));

const Template = (args: any) => <Button onClick={action("clicked")} text="Button" {...args} />;

export const Primary: any = Template.bind({});

Primary.args = {
  size: "md",
  color: "primary",
  text: "PRIMARY",
  type: "solid",
  inline: false,
  disabled: false,
};
