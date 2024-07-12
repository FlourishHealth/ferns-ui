import {DemoConfiguration} from "@config";
import {BannerDemo} from "@stories";
import {Banner, Box} from "ferns-ui";
import React from "react";

export const BannerConfiguration: DemoConfiguration = {
  name: "Banner",
  component: Banner,
  related: ["Toast", "Modal"],
  description:
    "Banners convey brief information related to a specific section of a page. The message can relay success, warning, error, or general information. The color and placement of the banner indicate the urgency of the message.",
  shortDescription: "Banners convey brief information related to a specific section of a page.",
  a11yNotes: [
    "The banner code should indicate the intent of the banner in a way that screen readers can parse. For example, Gestalt uses the iconAccessibilityLabel to communicate “success,” “error,” or “warning”.",
  ],
  category: "Component",
  status: {
    documentation: "ready",
    figma: "inProgress",
    figmaLink:
      "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A23346&mode=design&t=AKQ8wyFQBA4qC5eF-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [
    {name: "Medium article: 'Do’s and Don’ts, A11y'", link: "https://medium.com/"},
  ],
  interfaceName: "BannerProps",
  usage: {
    do: [
      "Indicate urgency with color and placement. For example, a red “error” banner that shows up on the top center of the screen.",
      "Display on related sections of the page to share messaging/guidance",
      "Be concise. Keep the text to one or two sentences.",
      "Use the arrow icon on the button to indicate progression through a task",
    ],
    doNot: [
      "If the user must interact with the banner to proceed with a task or flow, consider using a Modal instead.",
      "Do not use an overly complex icon on the button.",
      "Don’t use a banner for messages generated as an immediate response to user interaction. Instead, use a Toast.",
    ],
  },
  props: {},
  demo: BannerDemo,
  demoOptions: {
    controls: {
      text: {
        type: "text",
        defaultValue: "Banner text content",
      },
      status: {
        type: "select",
        options: [
          {label: "Info", value: "info"},
          {label: "Alert", value: "alert"},
          {label: "Warning", value: "warning"},
        ],
        defaultValue: "info",
      },
      hasIcon: {
        type: "boolean",
        defaultValue: true,
      },
      dismissible: {
        type: "boolean",
        defaultValue: false,
      },
      buttonIconName: {
        type: "select",
        options: [
          {label: "none", value: ""},
          {label: "check", value: "check"},
          {label: "arrow-right", value: "arrow-right"},
        ],
        defaultValue: "check",
      },
      buttonText: {
        type: "text",
        defaultValue: "Button text",
      },
    },
  },
  stories: {
    Dismissible: {
      description: "",
      render: () => {
        return (
          <Box direction="column" display="flex">
            <Banner
              dismissible
              id="dismissibleBannerDemo"
              text="When you click this banner, it dismisses"
            />
          </Box>
        );
      },
    },
    Permanent: {
      description: "",
      render: () => {
        return (
          <Box direction="column" display="flex" height="100%" width="100%">
            <Box paddingY={2} width="100%">
              <Banner
                id="permanentBanner"
                text="This permanent banner is not clickable or dismissible"
              />
            </Box>
          </Box>
        );
      },
    },
    Alert: {
      render: () => {
        return (
          <Box direction="column" display="flex" height="100%" width="100%">
            <Banner
              id="alertBanner"
              status="alert"
              text="This banner has status alert and is used to convey important or error related information"
            />
          </Box>
        );
      },
    },
    Warning: {
      description: "",
      render: () => {
        return (
          <Box direction="column" display="flex" height="100%" width="100%">
            <Banner
              id="warningBanner"
              status="warning"
              text="This banner has a warning status and is used to convey important information"
            />
          </Box>
        );
      },
    },
    Info: {
      description: "",
      render: (): React.ReactElement => {
        return (
          <Box direction="column" display="flex" height="100%" width="100%">
            <Banner
              id="infoBanner"
              status="info"
              text="This banner has an info status is used to convey information"
            />
          </Box>
        );
      },
    },
    HasIcon: {
      description: "",
      render: (): React.ReactElement => {
        return (
          <Box direction="column" display="flex" height="100%" width="100%">
            <Banner
              dismissible
              hasIcon
              id="hasIconBannerDemo"
              status="info"
              text="This banner has an icon"
            />
          </Box>
        );
      },
    },
    Button: {
      description: "",
      render: (): React.ReactElement => {
        const clickFunction = () => {
          console.debug("Clicked");
        };
        return (
          <Box direction="column" display="flex" height="100%" width="100%">
            <Banner
              buttonIconName="arrow-right"
              buttonOnClick={clickFunction}
              buttonText="Button text"
              dismissible
              id="ButtonBannerDemo"
              status="info"
              text="This banner has a button. Buttons on banners have text and optionally have an icon."
            />
          </Box>
        );
      },
    },
    HasIconAndButton: {
      description: "",
      render: (): React.ReactElement => {
        const clickFunction = () => {
          console.debug("Clicked");
        };
        return (
          <Box direction="column" display="flex" height="100%" width="100%">
            <Banner
              buttonIconName="arrow-right"
              buttonOnClick={clickFunction}
              buttonText="Resolve"
              hasIcon
              id="hasIconAndButton"
              status="info"
              text="This banner has a button and an icon."
            />
          </Box>
        );
      },
    },
  },
};
