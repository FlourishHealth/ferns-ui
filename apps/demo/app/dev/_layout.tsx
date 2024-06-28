import {DevSideBar} from "@components";
import {DemoConfig} from "@config";
import {DevMainContent} from "components/DevMainContent";
import {router, Slot} from "expo-router";
import {StatusBar} from "expo-status-bar";
import React from "react";
import {Pressable, ScrollView, StyleSheet, Text, View} from "react-native";

export default function Layout() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={{
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 16,
          height: "100%",
          overflow: "scroll",
          paddingBottom: 120, // ScrollView isn't the proper height so you can't get to the bottom.
          width: "25%",
        }}
      >
        <DevSideBar demoConfig={DemoConfig} />
      </ScrollView>
      <ScrollView style={{height: "auto", width: "75%"}}>
        <DevMainContent>
          <Slot
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
        </DevMainContent>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    // justifyContent: "flex-end",
    // display: "flex",
    // flexDirection: "row",
    // width: "100%",
    // height: 50,
    // maxHeight: 50,
    // alignItems: "center",
    // paddingRight: 24,
    // overflow: "hidden",
  },
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    flex: 1,
    height: "100%",
  },
});
