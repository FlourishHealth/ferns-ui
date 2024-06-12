import {Banner} from "ferns-ui";
import React from "react";

export const BannerDemo = (): React.ReactElement => {
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
