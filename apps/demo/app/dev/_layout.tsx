import {router, Stack} from "expo-router";
import {StatusBar} from "expo-status-bar";
import React from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        title: "Ferns UI Dev",
        headerRight: () => (
          <>
            <StatusBar style="auto" />
            <View style={styles.header}>
              <Pressable
                onPress={async () => {
                  router.navigate("demo");
                }}
              >
                <Text style={{fontWeight: "bold"}}>Demo Mode</Text>
              </Pressable>
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
