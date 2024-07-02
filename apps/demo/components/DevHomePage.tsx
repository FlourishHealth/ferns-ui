import {DemoConfiguration} from "@config";
import {useNavigation} from "expo-router";
import React, {useEffect} from "react";
import {Pressable, ScrollView, Text, View} from "react-native";

interface DevHomePageProps {
  demoConfig: DemoConfiguration[];
  onPress: (componentName: string, story: string) => void;
}

export const DevHomePage = ({demoConfig, onPress}: DevHomePageProps): React.ReactElement => {
  const navigation = useNavigation();
  // Set the title
  useEffect(() => {
    navigation.setOptions({title: "Ferns UI Dev"});
  }, [navigation]);

  return (
    <ScrollView>
      <View
        style={{
          display: "flex",
          flex: 1,
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 16,
          overflow: "scroll",
          paddingBottom: 120, // ScrollView isn't the proper height so you can't get to the bottom.
        }}
      >
        {demoConfig.map((config) => (
          <React.Fragment key={config.name}>
            <Text style={{fontWeight: "bold", fontSize: 20, marginBottom: 12}}>{config.name}</Text>
            {Object.keys(config.stories).map((title) => (
              <Pressable
                key={title}
                onPress={() => {
                  void onPress(config.name, title);
                }}
              >
                <Text style={{fontSize: 16, marginBottom: 8}}>{title}</Text>
              </Pressable>
            ))}
          </React.Fragment>
        ))}
      </View>
    </ScrollView>
  );
};
