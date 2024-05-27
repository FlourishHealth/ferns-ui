import {DemoConfiguration} from "@config";
import React from "react";
import {View} from "react-native";

import {ErrorBoundary} from "./ErrorBoundary";

interface DevHomePageProps {
  config: DemoConfiguration;
  currentStory: string;
}

export const DevComponentPage = ({
  config,
  currentStory,
}: DevHomePageProps): React.ReactElement | null => {
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
        {config.stories[currentStory]?.render()}
      </View>
    </ErrorBoundary>
  );
};
