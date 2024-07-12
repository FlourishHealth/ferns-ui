import {Slot} from "expo-router";
import {FernsProvider} from "ferns-ui";
import React from "react";

const RootLayout = () => {
  // TODO: Store dev/demo in AsyncStorage to persist.
  return (
    <FernsProvider>
      <Slot initialRouteName={process.env.NODE_ENV === "development" ? "dev" : "demo"} />
    </FernsProvider>
  );
};

// eslint-disable-next-line import/no-default-export
export default RootLayout;
