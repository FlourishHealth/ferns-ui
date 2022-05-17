import { Link, Text } from "ferns-ui";
import React from "react";

import { StorybookContainer } from "./StorybookContainer";

export const LinkStories = {
  title: "Link",
  component: Link,
  stories: {
    Links() {
      return (
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

          <Text>Here is an inline link:</Text>
          <Link href="http://google.com" inline>
            <Text>Some Link</Text>
          </Link>
          <Text> And a bit more text.</Text>
        </StorybookContainer>
      );
    },
  },
};
