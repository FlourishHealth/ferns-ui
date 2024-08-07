import {router, Stack} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {isMobileDevice} from "ferns-ui";
import React from "react";
import {Pressable, StyleSheet, Text} from "react-native";

export default function Layout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerBackVisible: isMobileDevice(),
          headerBackTitle: "Back",
          headerRight: () => (
            <Pressable
              style={styles.header}
              onPress={async () => {
                router.navigate("demo");
              }}
            >
              <Text style={{fontWeight: "bold"}}>Demo Mode</Text>
            </Pressable>
          ),
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginRight: isMobileDevice() ? 0 : 16,
  },
});
