import React from "react";
import {Box} from "@ferns/ui"
import {Link} from "@ferns/ui"
import {Text} from "@ferns/ui"
import {storiesOf} from "@storybook/react-native";
import {StorybookContainer} from "./StorybookContainer"

storiesOf("Links", module).add("Links", () => (
  <StorybookContainer>
    <Link href="http://google.com">
      <Text>http://google.com</Text>
    </Link>
    <Link href="http://google.com" target="blank">
      <Text>Open new tab</Text>
    </Link>
    <Link href="http://google.com" target="blank">
      <Text color="blue">Colored links</Text>
    </Link>

    <Text>
      Here is an inline link:
      <Link href="http://google.com" inline={true}>
        <Text>Some Link</Text>
      </Link>
      And a bit more text.
    </Text>
  </StorybookContainer>
));
