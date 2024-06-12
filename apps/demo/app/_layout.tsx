import {Slot} from "expo-router";
import {FernsProvider} from "ferns-ui";
import React from "react";

const RootLayout = () => {
  return (
    <FernsProvider>
      <Slot initialRouteName="demo" />
    </FernsProvider>
  );
};

// eslint-disable-next-line import/no-default-export
export default RootLayout;
