import {Stack} from "expo-router";
import {useStoredState} from "ferns-ui";
import React from "react";

const RootLayout = () => {
  const [devMode] = useStoredState<boolean>("devMode", false);
  console.log(devMode);
  return (
    <Stack>
      <Stack.Screen
        name="Ferns UI"
        options={{
          title: "Ferns UI Demo",
        }}
      />
    </Stack>
  );
};

// eslint-disable-next-line import/no-default-export
export default RootLayout;
