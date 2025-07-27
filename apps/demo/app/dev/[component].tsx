import {ErrorBoundary} from "@components";
import {DemoConfig} from "@config";
import {router, useLocalSearchParams, useNavigation} from "expo-router";
import React, {FC, useEffect} from "react";
import {View} from "react-native";

const DevComponentPage: FC = () => {
  const {component, story} = useLocalSearchParams<{component: string; story?: string}>();

  const config = DemoConfig.find((c) => c.name === component);

  const navigation = useNavigation();
  // Set the title
  useEffect(() => {
    navigation.setOptions({title: story});
  }, [navigation, story]);

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
};

export default DevComponentPage;
