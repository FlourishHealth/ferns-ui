import {ErrorBoundary} from "@components";
import {DemoConfig} from "@config";
import {router, useLocalSearchParams} from "expo-router";
import React from "react";
import {View} from "react-native";

export default function DevComponentPage(): React.ReactElement {
  const {component, story} = useLocalSearchParams<{component: string; story?: string}>();

  const config = DemoConfig.find((c) => c.name === component);

  console.log({config});

  if (!story || !config) {
    router.replace("/dev");
  }

  return (
    <ErrorBoundary>
      <View
        style={{
          width: "100%",
          display: "flex",
          flex: 1,
          flexDirection: "column",
          overflow: "scroll",
          backgroundColor: "#eee",
          maxHeight: "100%",
          padding: 20,
        }}
      >
        {config!.stories[story!]?.render()}
      </View>
    </ErrorBoundary>
  );
}
