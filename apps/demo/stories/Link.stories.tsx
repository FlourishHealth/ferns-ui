import {Link} from "ferns-ui";
import React from "react";

import {StorybookContainer} from "./StorybookContainer";

export const LinkDemo = () => (
  <StorybookContainer>
    <Link href="http://google.com" text="Google!" />
  </StorybookContainer>
);
