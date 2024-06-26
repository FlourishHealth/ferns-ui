import {DevHomePage} from "@components";
import {DemoConfig} from "@config";
import {router} from "expo-router";
import React, {ReactElement} from "react";
import {StyleSheet, View} from "react-native";

export default function Dev(): ReactElement {
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: "#fff",
        width: "100%",
      }}
    >
      <DevHomePage
        demoConfig={DemoConfig}
        onPress={(component: string, story: string) => {
          router.navigate(`dev/${component}?story=${story}`);
        }}
      />
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
