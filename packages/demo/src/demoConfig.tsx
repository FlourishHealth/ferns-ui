import {Avatar, FieldProps} from "ferns-ui";
import React from "react";

import {AvatarDemo, AvatarInitials, AvatarOutlines, AvatarSizes} from "./Avatar.stories";

type DemoConfigStatus = "planned" | "inProgress" | "ready" | "notSupported";

const PropsJSON = require("./common.json");

interface DemoConfigurationBase {
  name: string;
  component: any; // TODO: make this typing better
  related: string[];
  description: string;
  category: string[];
  status: {
    documentation: DemoConfigStatus;
    figma: DemoConfigStatus;
    ios: DemoConfigStatus;
    android: DemoConfigStatus;
    web: DemoConfigStatus;
  };
  // Should match one of the interface names in common.json (children.[0].name)
  interfaceName: string;
  usage: {
    do: string[];
    doNot: string[];
  };
  // Demo is the top component that will show up in the index page and at the top of the page.
  demo: (props: any) => React.ReactElement;
  demoOptions: {
    // On large screens, "md" will either generate a smaller box with controls to the right
    // or just a small box. On small screens, it will be full width with controls below.
    // On small and large screens, "lg" will generate a full width box with controls below (if any).
    // "md" is the default.
    size?: "md" | "lg";
    controls?: {
      [prop: string]: FieldProps & {defaultValue?: any};
    };
  };
  // Stories represent different states of the component and different examples of using it.
  stories: {
    [name: string]: {
      description?: string;
      render: () => React.ReactElement | null;
    };
  };
  // List all the props and values you want matrixed together. One component will be rendered per
  // combination.
  testMatrix?: {[prop: string]: any[]};
  // Default props applied to every test matrix component. Useful for required props.
  testMatrixDefaultProps?: {[prop: string]: any};
}

export interface DemoConfigurationProp {
  comment: {
    summary: {
      kind: string;
      text: string;
    }[];
  };
  flags: {
    isOptional: boolean;
  };
  name: string;
  type: {
    name: string;
    type: string;
  };
}

export interface DemoConfiguration extends DemoConfigurationBase {
  props: {children: DemoConfigurationProp[]};
}

const Config: DemoConfigurationBase[] = [
  {
    name: "Avatar",
    related: ["Profile Picture"],
    description: "Avatars are used to represent a user visually.",
    category: ["Some Category"],
    component: Avatar,
    status: {
      documentation: "planned",
      figma: "planned",
      ios: "ready",
      android: "ready",
      web: "ready",
    },
    usage: {
      do: ["Use it"],
      doNot: ["Not use it"],
    },
    interfaceName: "AvatarProps",
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
    testMatrix: {
      name: ["Tony Stark"],
      outline: [true, false],
      size: ["xs", "sm", "md", "lg", "xl"],
      src: [undefined, "https://i.ibb.co/ZfCZrY8/keerthi.jpg"],
    },
  },
];

export const DemoConfig = Config.map((c) => ({
  ...c,
  props: PropsJSON.children.find((json: any) => json.name === c.interfaceName),
}));
