import {router, Stack} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {useStoredState} from "ferns-ui";
import React from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";

export default function Layout() {
  const [_componentName, setComponentName] = useStoredState<string | null>("component", null);
  const [_currentStory, setCurrentStory] = useStoredState<string | null>("story", null);

  return (
    <Stack
      screenOptions={{
        title: "Ferns UI Dev",
        headerRight: () => (
          <>
            <StatusBar style="auto" />
            <View style={styles.header}>
              <View style={{marginRight: 24}}>
                <Pressable
                  onPress={async () => {
                    void setComponentName(null);
                    void setCurrentStory(null);
                  }}
                >
                  <Text style={{fontWeight: "bold"}}>Clear State</Text>
                </Pressable>
              </View>
              <View style={{}}>
                <Pressable
                  onPress={async () => {
                    router.navigate("demo");
                  }}
                >
                  <Text style={{fontWeight: "bold"}}>Demo Mode</Text>
                </Pressable>
              </View>
            </View>
          </>
        ),
      }}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: "flex-end",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 50,
    maxHeight: 50,
    alignItems: "center",
    paddingRight: 24,
  },
});
