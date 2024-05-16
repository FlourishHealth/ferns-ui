import {
  Avatar,
  Badge,
  Banner,
  Box,
  Button,
  Card,
  CheckBox,
  Field,
  FieldProps,
  Heading,
  Icon,
  IconButton, Link, Modal, Pill, SegmentedControl, SelectList,
  SideDrawer,
  Spinner,
  SplitPage,
  Switch,
  Table,
  TapToEdit,
  TextArea,
  TextField,
  Toast,
  Tooltip
} from "ferns-ui";
import React from "react";

import {
  AvatarDemo,
  AvatarInitials,
  AvatarOutlines,
  AvatarSizes,
  BadgeDemo,
  BadgeStories
} from "@stories";

export type DemoConfigStatus = "planned" | "inProgress" | "ready" | "notSupported";

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

  {
    name: "Badge",
    related: [],
    description: "",
    category: [""],
    component: Badge,
    status: {
      documentation: "planned",
      figma: "planned",
      ios: "ready",
      android: "ready",
      web: "ready",
    },
    usage: {
      do: [],
      doNot: [],
    },
    interfaceName: "BadgeProps",
    demo: BadgeDemo,
    demoOptions: {
      size: "md",
      controls: {
        title: {
          type: "text",
          defaultValue: "Some Text",
        },
        type: {
          type: "select",
          options: [
            {label: "Info", value: "info"},
            {label: "Error", value: "error"},
            {label: "Warning", value: "warning"},
            {label: "Success", value: "success"},
            {label: "Neutral", value: "neutral"},
            {label: "Custom", value: "custom"},
          ],
          defaultValue: "info",
        },
      },
    },
    stories: {
      Badges: {
        description:
            "",
        render: () => <BadgeStories />,
      },

    },
    testMatrix: {
    },
  },

  {
    name: "Banner",
    related: [],
    description: "",
    category: [""],
    component: Banner,
    status: {
      documentation: "planned",
      figma: "planned",
      ios: "ready",
      android: "ready",
      web: "ready",
    },
    usage: {
      do: [],
      doNot: [],
    },
    interfaceName: "BadgeProps",
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
      Badges: {
        description:
            "",
        render: () => <BadgeStories />,
      },

    },
    testMatrix: {
    },
  },

  {
    name: "Box",
    related: [],
    description: "",
    category: [""],
    component: Box,
    status: {
      documentation: "planned",
      figma: "planned",
      ios: "ready",
      android: "ready",
      web: "ready",
    },
    usage: {
      do: [],
      doNot: [],
    },
    interfaceName: "BadgeProps",
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
      Badges: {
        description:
            "",
        render: () => <BadgeStories />,
      },

    },
    testMatrix: {
    },
  },

  {
    name: "Button",
    related: [],
    description: "",
    category: [""],
    component: Button,
    status: {
      documentation: "planned",
      figma: "planned",
      ios: "ready",
      android: "ready",
      web: "ready",
    },
    usage: {
      do: [],
      doNot: [],
    },
    interfaceName: "BadgeProps",
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
      Badges: {
        description:
            "",
        render: () => <BadgeStories />,
      },

    },
    testMatrix: {
    },
  },

  {
    name: "Card",
    related: [],
    description: "",
    category: [""],
    component: Card,
    status: {
      documentation: "planned",
      figma: "planned",
      ios: "ready",
      android: "ready",
      web: "ready",
    },
    usage: {
      do: [],
      doNot: [],
    },
    interfaceName: "BadgeProps",
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
      Badges: {
        description:
            "",
        render: () => <BadgeStories />,
      },

    },
    testMatrix: {
    },
  },

  {
    name: "CheckBox",
    related: [],
    description: "",
    category: [""],
    component: CheckBox,
    status: {
      documentation: "planned",
      figma: "planned",
      ios: "ready",
      android: "ready",
      web: "ready",
    },
    usage: {
      do: [],
      doNot: [],
    },
    interfaceName: "BadgeProps",
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
      Badges: {
        description:
            "",
        render: () => <BadgeStories />,
      },

    },
    testMatrix: {
    },
  },


  {
    name: "Field",
    related: [],
    description: "",
    category: [""],
    component: Field,
    status: {
      documentation: "planned",
      figma: "planned",
      ios: "ready",
      android: "ready",
      web: "ready",
    },
    usage: {
      do: [],
      doNot: [],
    },
    interfaceName: "BadgeProps",
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
      Badges: {
        description:
            "",
        render: () => <BadgeStories />,
      },

    },
    testMatrix: {
    },
  },


  {
    name: "Heading",
    related: [],
    description: "",
    category: [""],
    component: Heading,
    status: {
      documentation: "planned",
      figma: "planned",
      ios: "ready",
      android: "ready",
      web: "ready",
    },
    usage: {
      do: [],
      doNot: [],
    },
    interfaceName: "BadgeProps",
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
      Badges: {
        description:
            "",
        render: () => <BadgeStories />,
      },

    },
    testMatrix: {
    },
  },

  {
    name: "Icon",
    related: [],
    description: "",
    category: [""],
    component: Icon,
    status: {
      documentation: "planned",
      figma: "planned",
      ios: "ready",
      android: "ready",
      web: "ready",
    },
    usage: {
      do: [],
      doNot: [],
    },
    interfaceName: "BadgeProps",
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
      Badges: {
        description:
            "",
        render: () => <BadgeStories />,
      },

    },
    testMatrix: {
    },
  },

  {
    name: "Icon Button",
    related: [],
    description: "",
    category: [""],
    component: IconButton,
    status: {
      documentation: "planned",
      figma: "planned",
      ios: "ready",
      android: "ready",
      web: "ready",
    },
    usage: {
      do: [],
      doNot: [],
    },
    interfaceName: "BadgeProps",
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
      Badges: {
        description:
            "",
        render: () => <BadgeStories />,
      },

    },
    testMatrix: {
    },
  },

  {
    name: "Icon",
    related: [],
    description: "",
    category: [""],
    component: Icon,
    status: {
      documentation: "planned",
      figma: "planned",
      ios: "ready",
      android: "ready",
      web: "ready",
    },
    usage: {
      do: [],
      doNot: [],
    },
    interfaceName: "BadgeProps",
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
      Badges: {
        description:
            "",
        render: () => <BadgeStories />,
      },

    },
    testMatrix: {
    },
  },

  {
    name: "Link",
    related: [],
    description: "",
    category: [""],
    component: Link,
    status: {
      documentation: "planned",
      figma: "planned",
      ios: "ready",
      android: "ready",
      web: "ready",
    },
    usage: {
      do: [],
      doNot: [],
    },
    interfaceName: "BadgeProps",
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
      Badges: {
        description:
            "",
        render: () => <BadgeStories />,
      },

    },
    testMatrix: {
    },
  },


  {
    name: "Modal",
    related: [],
    description: "",
    category: [""],
    component: Modal,
    status: {
      documentation: "planned",
      figma: "planned",
      ios: "ready",
      android: "ready",
      web: "ready",
    },
    usage: {
      do: [],
      doNot: [],
    },
    interfaceName: "BadgeProps",
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
      Badges: {
        description:
            "",
        render: () => <BadgeStories />,
      },

    },
    testMatrix: {
    },
  },

  {
    name: "Pill",
    related: [],
    description: "",
    category: [""],
    component: Pill,
    status: {
      documentation: "planned",
      figma: "planned",
      ios: "ready",
      android: "ready",
      web: "ready",
    },
    usage: {
      do: [],
      doNot: [],
    },
    interfaceName: "BadgeProps",
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
      Badges: {
        description:
            "",
        render: () => <BadgeStories />,
      },

    },
    testMatrix: {
    },
  },

  {
    name: "SegmentedControl",
    related: [],
    description: "",
    category: [""],
    component: SegmentedControl,
    status: {
      documentation: "planned",
      figma: "planned",
      ios: "ready",
      android: "ready",
      web: "ready",
    },
    usage: {
      do: [],
      doNot: [],
    },
    interfaceName: "BadgeProps",
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
      Badges: {
        description:
            "",
        render: () => <BadgeStories />,
      },

    },
    testMatrix: {
    },
  },

  {
    name: "SelectList",
    related: [],
    description: "",
    category: [""],
    component: SelectList,
    status: {
      documentation: "planned",
      figma: "planned",
      ios: "ready",
      android: "ready",
      web: "ready",
    },
    usage: {
      do: [],
      doNot: [],
    },
    interfaceName: "BadgeProps",
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
      Badges: {
        description:
            "",
        render: () => <BadgeStories />,
      },

    },
    testMatrix: {
    },
  },

  {
    name: "SideDrawer",
    related: [],
    description: "",
    category: [""],
    component: SideDrawer,
    status: {
      documentation: "planned",
      figma: "planned",
      ios: "ready",
      android: "ready",
      web: "ready",
    },
    usage: {
      do: [],
      doNot: [],
    },
    interfaceName: "BadgeProps",
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
      Badges: {
        description:
            "",
        render: () => <BadgeStories />,
      },

    },
    testMatrix: {
    },
  },

  {
    name: "Spinner",
    related: [],
    description: "",
    category: [""],
    component: Spinner,
    status: {
      documentation: "planned",
      figma: "planned",
      ios: "ready",
      android: "ready",
      web: "ready",
    },
    usage: {
      do: [],
      doNot: [],
    },
    interfaceName: "BadgeProps",
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
      Badges: {
        description:
            "",
        render: () => <BadgeStories />,
      },

    },
    testMatrix: {
    },
  },

  {
    name: "SplitPage",
    related: [],
    description: "",
    category: [""],
    component: SplitPage,
    status: {
      documentation: "planned",
      figma: "planned",
      ios: "ready",
      android: "ready",
      web: "ready",
    },
    usage: {
      do: [],
      doNot: [],
    },
    interfaceName: "BadgeProps",
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
      Badges: {
        description:
            "",
        render: () => <BadgeStories />,
      },

    },
    testMatrix: {
    },
  },

  {
    name: "Switch",
    related: [],
    description: "",
    category: [""],
    component: Switch,
    status: {
      documentation: "planned",
      figma: "planned",
      ios: "ready",
      android: "ready",
      web: "ready",
    },
    usage: {
      do: [],
      doNot: [],
    },
    interfaceName: "BadgeProps",
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
      Badges: {
        description:
            "",
        render: () => <BadgeStories />,
      },

    },
    testMatrix: {
    },
  },

  {
    name: "Table",
    related: [],
    description: "",
    category: [""],
    component: Table,
    status: {
      documentation: "planned",
      figma: "planned",
      ios: "ready",
      android: "ready",
      web: "ready",
    },
    usage: {
      do: [],
      doNot: [],
    },
    interfaceName: "BadgeProps",
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
      Badges: {
        description:
            "",
        render: () => <BadgeStories />,
      },

    },
    testMatrix: {
    },
  },

  {
    name: "TapToEdit",
    related: [],
    description: "",
    category: [""],
    component: TapToEdit,
    status: {
      documentation: "planned",
      figma: "planned",
      ios: "ready",
      android: "ready",
      web: "ready",
    },
    usage: {
      do: [],
      doNot: [],
    },
    interfaceName: "BadgeProps",
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
      Badges: {
        description:
            "",
        render: () => <BadgeStories />,
      },

    },
    testMatrix: {
    },
  },

  {
    name: "TextArea",
    related: [],
    description: "",
    category: [""],
    component: TextArea,
    status: {
      documentation: "planned",
      figma: "planned",
      ios: "ready",
      android: "ready",
      web: "ready",
    },
    usage: {
      do: [],
      doNot: [],
    },
    interfaceName: "BadgeProps",
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
      Badges: {
        description:
            "",
        render: () => <BadgeStories />,
      },

    },
    testMatrix: {
    },
  },

  {
    name: "TextField",
    related: [],
    description: "",
    category: [""],
    component: TextField,
    status: {
      documentation: "planned",
      figma: "planned",
      ios: "ready",
      android: "ready",
      web: "ready",
    },
    usage: {
      do: [],
      doNot: [],
    },
    interfaceName: "BadgeProps",
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
      Badges: {
        description:
            "",
        render: () => <BadgeStories />,
      },

    },
    testMatrix: {
    },
  },

  {
    name: "Theme",
    related: [],
    description: "",
    category: [""],
    component: () => {},
    status: {
      documentation: "planned",
      figma: "planned",
      ios: "ready",
      android: "ready",
      web: "ready",
    },
    usage: {
      do: [],
      doNot: [],
    },
    interfaceName: "BadgeProps",
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
      Badges: {
        description:
            "",
        render: () => <BadgeStories />,
      },

    },
    testMatrix: {
    },
  },

  {
    name: "Toast",
    related: [],
    description: "",
    category: [""],
    component: Toast,
    status: {
      documentation: "planned",
      figma: "planned",
      ios: "ready",
      android: "ready",
      web: "ready",
    },
    usage: {
      do: [],
      doNot: [],
    },
    interfaceName: "BadgeProps",
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
      Badges: {
        description:
            "",
        render: () => <BadgeStories />,
      },

    },
    testMatrix: {
    },
  },

  {
    name: "Tooltip",
    related: [],
    description: "",
    category: [""],
    component: Tooltip,
    status: {
      documentation: "planned",
      figma: "planned",
      ios: "ready",
      android: "ready",
      web: "ready",
    },
    usage: {
      do: [],
      doNot: [],
    },
    interfaceName: "BadgeProps",
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
      Badges: {
        description:
            "",
        render: () => <BadgeStories />,
      },

    },
    testMatrix: {
    },
  },


];

export const DemoConfig = Config.map((c) => ({
  ...c,
  props: PropsJSON.children.find((json: any) => json.name === c.interfaceName),
}));
