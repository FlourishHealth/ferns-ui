import {Stack} from "expo-router";
import React from "react";

const RootLayout = () => {
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
