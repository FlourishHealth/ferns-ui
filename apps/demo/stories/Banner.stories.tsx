import {Banner, BannerProps} from "ferns-ui";
import React from "react";

export const BannerDemo = (props: Partial<BannerProps>): React.ReactElement => {
  return (
    <Banner
      buttonOnClick={() => console.warn("clicked!")}
      dismissible
      id="banner1"
      text="Banner Text"
      {...props}
    />
  );
};
