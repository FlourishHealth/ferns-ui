import {Link} from "ferns-ui";
import React from "react";

import {StorybookContainer} from "@components";

export const LinkStories = {
  title: "Link",
  component: Link,
  stories: {
    Links() {
      return (
        <StorybookContainer>
          <Link href="http://google.com">Google!</Link>
          <br />
          <Link color="red" href="http://apple.com">
            Red apple link!
          </Link>
          <br />
          <Link href="http://google.com" size="lg">
            Big link!
          </Link>
        </StorybookContainer>
      );
    },
  },
};
