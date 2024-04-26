import {Banner, Box} from "ferns-ui";
import React from "react";

export const BannerStories = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Banner",
  component: Banner,
  stories: {
    DismissBanner() {
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
    PermanentBanner() {
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
    ShapeBanner() {
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
    ActionButtonBanner() {
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
    CustomButtonBanner() {
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
};
