import {DemoConfiguration} from "@config";
import {AvatarDemo, AvatarInitials, AvatarOutlines, AvatarSizes} from "@stories";
import {Avatar} from "ferns-ui";
import React from "react";

export const AvatarConfiguration: DemoConfiguration = {
  name: "Avatar",
  related: ["Profile Picture", "Userpic"],
  description: "Used to represent a single user.",
  category: "Component",
  component: Avatar,
  status: {
    documentation: "planned",
    figma: "ready",
    figmaLink:
      "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A23287&mode=design&t=AKQ8wyFQBA4qC5eF-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  usage: {
    do: [
      "Allow Staff members to upload photos",
      "Use the same component set for both desktop and mobile",
      "Use the colored border to indicate that a message is unread",
    ],
    doNot: [
      "Allow patients to upload photos; show the initials version instead",
      "If possible, avoid pairing the status bubbles with the smaller versions: “s” and “xs”",
    ],
  },
  a11yNotes: [
    "The avatar should have a text equivalent so that screen readers can understand what it is.",
    "Gestalt uses the accessibilityLabel prop for the text description of the image. Without this prop, screen readers will default to the name prop. ",
  ],
  interfaceName: "AvatarProps",
  props: {},
  demo: AvatarDemo,
  demoOptions: {
    size: "md",
    controls: {
      backgroundColor: {
        type: "select",
        defaultValue: "primary",
        options: [
          {label: "Primary", value: "primary"},
          {label: "Secondary", value: "secondary"},
        ],
      },
      name: {
        type: "text",
        defaultValue: "Tony Stark",
      },
    },
  },
  stories: {
    Initials: {
      description:
        "If there isn't a url provided or it doesn't load, Avatar defaults to the user's initials",
      render: () => <AvatarInitials />,
    },
    Sizes: {render: () => <AvatarSizes />},
    Outlines: {render: () => <AvatarOutlines />},
  },
};
