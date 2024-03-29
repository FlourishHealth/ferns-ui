import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFonts} from "expo-font";
import {StatusBar} from "expo-status-bar";
import {FernsProvider} from "ferns-ui";
import React, {ReactElement, useEffect, useState} from "react";
import {Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {Host} from "react-native-portalize";
import {SafeAreaProvider, useSafeAreaInsets} from "react-native-safe-area-context";

import * as Stories from "./src/stories";

type StoryFunc = (setScrollEnabled?: any) => ReactElement;

export interface Story {
  title: string;
  component: any;
  stories: {[name: string]: StoryFunc};
}

const stories: Story[] = Object.values(Stories);
const allStories: {[name: string]: StoryFunc} = {};
for (const story of stories) {
  for (const storyName of Object.keys(story.stories)) {
    allStories[storyName] = story.stories[storyName];
  }
}

const App = () => {
  const insets = useSafeAreaInsets();
  const [currentStory, setStory] = useState<string | null>(null);
  // this is just for the signature field, because we need to disable scroll while signing or else
  // it will scroll the page instead of signing in the box with the signature pad
  const [scrollEnabled, setScrollEnabled] = useState(true);

  // set scroll to enabled if no current story. it should be enabled for all stories except
  // signature
  useEffect(() => {
    if (!currentStory) {
      setScrollEnabled(true);
    }
  }, [currentStory]);

  // get story from storage instead of going back to list view on every reload
  useEffect(() => {
    void AsyncStorage.getItem("story").then((story) => {
      if (story && allStories[story]) {
        setStory(story);
      }
    });
  }, []);

  const [loaded] = useFonts({
    "Comfortaa-Light": require("./assets/Comfortaa-Light.ttf"),
    "Comfortaa-Bold": require("./assets/Comfortaa-Bold.ttf"),
    IMFellEnglishSC: require("./assets/IMFellEnglishSC-Regular.ttf"),
    "DancingScript-Regular": require("./assets/DancingScript-Regular.ttf"),
    Cochin: require("./assets/Cochin.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Host>
      <View
        style={{
          ...styles.container,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          backgroundColor: "#fff",
        }}
      >
        <StatusBar style="auto" />
        <View style={styles.header}>
          {!currentStory && <Text style={{fontWeight: "bold", fontSize: 20}}>Pick A Story:</Text>}
          {currentStory && (
            <Pressable
              onPress={async () => {
                setStory(null);
                await AsyncStorage.setItem("story", "");
              }}
            >
              <Text style={{fontWeight: "bold"}}>&lt; Back</Text>
            </Pressable>
          )}
          <Text style={{marginLeft: 20, fontWeight: "bold"}}>{currentStory}</Text>
        </View>
        <View style={styles.body}>
          {currentStory && allStories[currentStory] && allStories[currentStory](setScrollEnabled)}
          {!currentStory && (
            <ScrollView scrollEnabled={scrollEnabled}>
              <View style={styles.storyList}>
                {stories.map((s) => (
                  <React.Fragment key={s.title}>
                    <Text style={{fontWeight: "bold", fontSize: 20, marginBottom: 12}}>
                      {s.title}
                    </Text>
                    {Object.keys(s.stories).map((title) => (
                      <Pressable
                        key={title}
                        onPress={async () => {
                          setStory(title);
                          await AsyncStorage.setItem("story", title);
                        }}
                      >
                        <Text style={{fontSize: 16, marginBottom: 8}}>{title}</Text>
                      </Pressable>
                    ))}
                  </React.Fragment>
                ))}
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </Host>
  );
};

const AppRoot = (): ReactElement => {
  return (
    <SafeAreaProvider>
      <FernsProvider>
        <App />
      </FernsProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    maxHeight: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#ccc",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 50,
    maxHeight: 50,
    alignItems: "center",
    paddingLeft: 16,
  },
  body: {
    width: "100%",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    overflow: "scroll",
    backgroundColor: "#eee",
    maxHeight: "100%",
  },
  storyList: {
    display: "flex",
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    overflow: "scroll",
    paddingBottom: 120, // ScrollView isn't the proper height so you can't get to the bottom.
  },
});

// eslint-disable-next-line import/no-default-export
export default AppRoot;
