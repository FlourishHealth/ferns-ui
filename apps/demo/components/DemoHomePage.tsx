import {DemoConfig} from "@config";
import {useNavigation} from "expo-router";
import {Box, Heading} from "ferns-ui";
import React, {FC, useEffect} from "react";
import {Pressable, ScrollView, Text, View} from "react-native";

export const DemoHomePage: FC<{
  onPress: (componentName: string) => void;
}> = ({onPress}) => {
  const navigation = useNavigation();
  // Set the title
  useEffect(() => {
    navigation.setOptions({title: "Ferns UI Demo"});
  }, [navigation]);

  return (
    <ScrollView
      contentContainerStyle={{
        flexDirection: "row",
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
      }}
      style={{padding: 20, width: "100%"}}
    >
      {DemoConfig.map((c) => {
        if (!c.name || !c.demo) {
          return null;
        }
        return (
          <Pressable key={c.name} onPress={() => onPress(c.name)}>
            <View
              style={{
                flex: 1,
                maxWidth: 300,
                width: 300,
                padding: 16,
                borderRadius: 4,
                borderColor: "#ccc",
                borderWidth: 1,
                margin: 8,
                height: 280,
                maxHeight: 280,
                minHeight: 280,
                overflow: "hidden",
              }}
            >
              <Box flex="grow" width="100%">
                {c.demo({})}
              </Box>
              <Box height={100} marginTop={4}>
                <Box marginBottom={1}>
                  <Heading size="sm">{c.name}</Heading>
                </Box>
                <Box>
                  <Text>{c.shortDescription ?? c.description}</Text>
                </Box>
              </Box>
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};
