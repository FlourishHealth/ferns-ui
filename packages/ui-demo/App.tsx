import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFonts} from "expo-font";
import {StatusBar} from "expo-status-bar";
import React, {useEffect, useState} from "react";
import {Pressable, ScrollView, StyleSheet, Text, View} from "react-native";

import * as Stories from "./src/stories";

type StoryFunc = () => JSX.Element;

export interface Story {
  title: string;
  component: any;
  stories: {[name: string]: StoryFunc};
}

const stories: Story[] = Object.values(Stories);
const allStories: {[name: string]: StoryFunc} = {};
for (const story of stories) {
  for (const storyName of Object.keys(story.stories)) {
    console.log(storyName);
    allStories[storyName] = story.stories[storyName];
  }
}
console.log({allStories});

const App = () => {
  const [currentStory, setStory] = useState<string | null>(null);
  useEffect(() => {
    AsyncStorage.getItem("story").then((story) => {
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
  });

  if (!loaded) {
    return null;
  }
  console.log({allStories, currentStory});

  return (
    <View style={styles.container}>
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
        {currentStory && allStories[currentStory]()}
        {!currentStory && (
          <ScrollView style={styles.storyList}>
            {stories.map((s) => (
              <React.Fragment key={s.title}>
                <Text style={{fontWeight: "bold", fontSize: 20, marginBottom: 12}}>{s.title}</Text>
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
          </ScrollView>
        )}
      </View>
    </View>
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
    height: "100%",
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

export default App;
