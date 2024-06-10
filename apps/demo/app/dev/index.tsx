import {DevComponentPage, DevHomePage} from "@components";
import {DemoConfig} from "@config";
import {useStoredState} from "ferns-ui";
import React, {ReactElement} from "react";
import {StyleSheet, View} from "react-native";

export default function Dev(): ReactElement {
  const [componentName, setComponentName] = useStoredState<string | null>("component", null);
  const [currentStory, setCurrentStory] = useStoredState<string | null>("story", null);
  const currentConfig = DemoConfig.find((config) => config.name === componentName);

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: "#fff",
        width: "100%",
      }}
    >
      {Boolean(currentStory) && Boolean(currentStory) ? (
        <DevComponentPage config={currentConfig!} currentStory={currentStory!} />
      ) : (
        <DevHomePage
          demoConfig={DemoConfig}
          onPress={(name: string, story: string) => {
            setComponentName(name);
            setCurrentStory(story);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    maxHeight: "100%",
    position: "absolute",
    overflow: "hidden",
  },
});
