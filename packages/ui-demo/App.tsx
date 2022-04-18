import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import * as Stories from "./src/stories";

type StoryFunc = () => JSX.Element;

export interface Story {
  title: string;
  component: any;
  stories: { [name: string]: StoryFunc };
}

const stories: Story[] = Object.values(Stories);
const allStories: { [name: string]: StoryFunc } = {};
for (const story of stories) {
  for (const storyName of Object.keys(story.stories)) {
    allStories[storyName] = story.stories[storyName];
  }
}
console.info(
  "ALL",
  Object.keys(allStories),
  stories.map((s) => s.title)
);

const renderStory = (story: Story) => {
  return (
    <View>
      <Text>{story.title}</Text>
      {Object.keys(story.stories).map((key) => {
        const Story = story.stories[key];
        return <Story key={key} />;
      })}
    </View>
  );
};

export default function App() {
  const [currentStory, setStory] = useState<string | null>(null);
  console.info(
    "Current",
    currentStory,
    stories.map((s) => s.title)
  );
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        {!currentStory && (
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            Pick A Story:
          </Text>
        )}
        {currentStory && (
          <TouchableOpacity onPress={() => setStory(null)}>
            <Text style={{ fontWeight: "bold" }}>&lt; Back</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.body}>
        {currentStory && allStories[currentStory]()}
        {!currentStory && (
          <ScrollView style={styles.storyList}>
            {stories.map((s) => (
              <>
                <Text
                  style={{ fontWeight: "bold", fontSize: 20, marginBottom: 12 }}
                >
                  {s.title}
                </Text>
                {Object.keys(s.stories).map((title) => (
                  <TouchableOpacity key={title} onPress={() => setStory(title)}>
                    <Text style={{ fontSize: 16, marginBottom: 8 }}>
                      {title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
  },
  header: {
    backgroundColor: "#ccc",
    marginTop: 30,
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
    marginBottom: 80, // ScrollView isn't the proper height so you can't get to the bottom.
  },
});
