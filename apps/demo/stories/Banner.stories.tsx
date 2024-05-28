import {DemoConfiguration} from "@config";
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
  demo: (props) => <BannerDemo {...props} />, // Replace with actual demo component
  demoOptions: {},
  stories: {
    Dismiss: {
      description: "",
      render: () => {
        return (
          <Box direction="column" display="flex" height="100%" width="100%">
            <Box paddingY={2} width="100%">
              <Banner
                color="primary"
                id="banner1"
                subtext="And in a real app, it would stay dismissed"
                text="When you click this banner, it dismisses"
                textColor="white"
                type="dismiss"
              />
            </Box>
            <Box paddingY={2} width="100%">
              <Banner
                color="secondary"
                iconName="check"
                id="banner2"
                subtext="And in a real app, it would stay dismissed"
                text="When you click this banner, it dismisses (with Icon)"
                textColor="white"
                type="dismiss"
              />
            </Box>
          </Box>
        );
      },
    },
    PermanentBanner: {
      description: "",
      render: () => {
        return (
          <Box direction="column" display="flex" height="100%" width="100%">
            <Box paddingY={2} width="100%">
              <Banner
                color="primary"
                id="banner3"
                text="This banner is not clickable or dismissable"
                textColor="white"
                type="permanent"
              />
            </Box>
            <Box paddingY={2} width="100%">
              <Banner
                color="primary"
                iconName="exclamation-triangle"
                id="banner2"
                text="This banner is not clickable or dismissable with Icon"
                textColor="white"
                type="permanent"
              />
            </Box>
          </Box>
        );
      },
    },
    ShapeBanner: {
      description: "",
      render: () => {
        return (
          <Box direction="column" display="flex" height="100%" width="100%">
            <Box paddingY={2} width="100%">
              <Banner
                color="primary"
                id="banner1"
                shape="pill"
                subtext="Here's a pill."
                text="Banners can have multiple shapes like Boxes"
                textColor="white"
              />
            </Box>
            <Box paddingY={2} width="100%">
              <Banner
                color="secondary"
                id="banner2"
                shape={3}
                text="And a rounded banner"
                textColor="white"
              />
            </Box>
          </Box>
        );
      },
    },
    ActionButtonBanner: {
      description: "",
      render: () => {
        const clickFunction = () => {
          console.debug("Clicked");
        };
        return (
          <Box direction="column" display="flex" height="100%" width="100%">
            <Box paddingY={2} width="100%">
              <Banner
                color="warning"
                id="banner11"
                text="Action Banner"
                textColor="white"
                type="action"
                onClick={clickFunction}
              />
            </Box>
            <Box paddingY={2} width="100%">
              <Banner
                color="secondary"
                iconName="artstation"
                id="banner2"
                text="Action with Icon"
                textColor="white"
                type="action"
                onClick={clickFunction}
              />
            </Box>
          </Box>
        );
      },
    },
    CustomButtonBanner: {
      description: "",
      render: (): React.ReactElement => {
        const clickFunction = () => {
          console.debug("Clicked");
        };
        return (
          <Box direction="column" display="flex" height="100%" width="100%">
            <Box paddingY={2} width="100%">
              <Banner
                color="warning"
                customButtonProps={
                  {
                    text: "Click me",
                    color: "primary",
                  } as any
                }
                id="banner11"
                text="Custom Button Banner"
                textColor="white"
                type="customButton"
                onClick={clickFunction}
              />
            </Box>
            <Box paddingY={2} width="100%">
              <Banner
                color="secondary"
                customButtonProps={
                  {
                    text: "Click me",
                    color: "primary",
                  } as any
                }
                iconName="artstation"
                id="banner2"
                text="Custom Button with Icon"
                textColor="white"
                type="customButton"
                onClick={clickFunction}
              />
            </Box>
          </Box>
        );
      },
    },
  },
};

const BannerDemo = (): React.ReactElement => {
  return (
    <Banner
      color="primary"
      id="banner1"
      subtext="And in a real app, it would stay dismissed"
      text="When you click this banner, it dismisses"
      textColor="white"
      type="dismiss"
    />
  );
};
