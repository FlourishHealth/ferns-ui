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
    PlainBanner() {
      return (
        <Box direction="column" display="flex" height="100%" width="100%">
          <Banner
            color="primary"
            id="banner"
            subtext="And in a real app, it would stay dismissed"
            text="When you click this banner, it dismisses"
            textColor="white"
          />
        </Box>
      );
    },
    ShapeBanner() {
      return (
        <Box direction="column" display="flex" height="100%" width="100%">
          <Box paddingY={2} width="100%">
            <Banner
              color="primary"
              id="banner"
              shape="pill"
              subtext="Here's a pill."
              text="Banners can have multiple shapes like Boxes"
              textColor="white"
            />
          </Box>
          <Box paddingY={2} width="100%">
            <Banner
              color="secondary"
              id="banner"
              shape={3}
              text="And a rounded banner"
              textColor="white"
            />
          </Box>
        </Box>
      );
    },
  },
};
