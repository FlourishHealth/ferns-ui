import React from "react";
import { Link } from "./Link";
import { Text } from "./Text";
import { storiesOf } from "@storybook/react-native";
import { StorybookContainer } from "./StorybookContainer";
storiesOf("Links", module).add("Links", () => (React.createElement(StorybookContainer, null, React.createElement(Link, { href: "http://google.com" }, React.createElement(Text, null, "http://google.com")), React.createElement(Link, { href: "http://google.com", target: "blank" }, React.createElement(Text, null, "Open new tab")), React.createElement(Link, { href: "http://google.com", target: "blank" }, React.createElement(Text, { color: "blue" }, "Colored links")), React.createElement(Text, null, "Here is an inline link:", React.createElement(Link, { href: "http://google.com", inline: true }, React.createElement(Text, null, "Some Link")), "And a bit more text."))));
//# sourceMappingURL=Link.stories.js.map
//# sourceMappingURL=Link.stories.js.map