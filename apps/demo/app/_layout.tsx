import {Stack} from "expo-router";
import React from "react";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="(home)"
        options={{
          title: "Ferns UI Demo",
        }}
      />
    </Stack>
  );
};

export default RootLayout;
