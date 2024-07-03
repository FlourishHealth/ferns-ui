import {DemoConfiguration} from "@config";
import {AvatarDemo, AvatarInitials, AvatarOutlines, AvatarSizes} from "@stories";
import {Avatar} from "ferns-ui";

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
      name: {
        type: "text",
        defaultValue: "Tony Stark",
      },
      hasBorder: {
        type: "boolean",
        defaultValue: true,
      },
      size: {
        type: "select",
        options: [
          {label: "xs", value: "xs"},
          {label: "sm", value: "sm"},
          {label: "md", value: "md"},
          {label: "lg", value: "lg"},
          {label: "xl", value: "xl"},
        ],
        defaultValue: "md",
      },
      status: {
        type: "select",
        options: [
          {label: "online", value: "online"},
          {label: "offline", value: "offline"},
          {label: "outOfOffice", value: "outOfOffice"},
          {label: "activeMobile", value: "activeMobile"},
          {label: "imagePicker", value: "imagePicker"},
        ],
        defaultValue: "online",
      },
      doNotDisturb: {
        type: "boolean",
        defaultValue: false,
      },
    },
  },
  stories: {
    Initials: {
      render: () => AvatarInitials(),
    },
    Sizes: {render: () => AvatarSizes()},
    Outlines: {render: () => AvatarOutlines()},
  },
};
