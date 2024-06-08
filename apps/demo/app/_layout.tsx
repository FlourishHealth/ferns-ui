import {DemoConfig} from "@config";
import {Stack} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {FernsProvider, useStoredState} from "ferns-ui";
import React from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {SafeAreaProvider} from "react-native-safe-area-context";

const RootLayout = () => {
  const [componentName, setComponentName] = useStoredState<string | null>("component", null);
  const [currentStory, setCurrentStory] = useStoredState<string | null>("story", null);
  const currentConfig = DemoConfig.find((config) => config.name === componentName);

  const [devMode, setDevMode] = useStoredState<boolean>("devMode", false);
  return (
    <SafeAreaProvider>
      <FernsProvider>
        <Stack>
          <Stack.Screen
            name="(home)/index"
            options={{
              title: "Ferns UI Demo",
              headerRight: () => (
                <>
                  <StatusBar style="auto" />
                  <View style={styles.header}>
                    <View>
                      {(currentStory || currentConfig) && (
                        <Pressable
                          onPress={async () => {
                            void setCurrentStory(null);
                            void setComponentName(null);
                          }}
                        >
                          <Text style={{fontWeight: "bold"}}>&lt; Back</Text>
                        </Pressable>
                      )}
                    </View>
                    <View>
                      <Text style={{marginLeft: 20, fontWeight: "bold"}}>
                        {currentConfig?.name}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        paddingRight: 20,
                        flexDirection: "row",
                      }}
                    >
                      <View style={{marginRight: 24}}>
                        <Pressable
                          onPress={async () => {
                            void setCurrentStory(null);
                            void setComponentName(null);
                          }}
                        >
                          <Text style={{fontWeight: "bold"}}>Clear State</Text>
                        </Pressable>
                      </View>
                      <View style={{}}>
                        <Pressable
                          onPress={async () => {
                            void setDevMode(!devMode);
                          }}
                        >
                          <Text style={{fontWeight: "bold"}}>
                            {devMode ? "Demo Mode" : "Dev Mode"}
                          </Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                </>
              ),
            }}
          />
        </Stack>
      </FernsProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 50,
    maxHeight: 50,
    alignItems: "center",
    paddingLeft: 16,
  },
});

// eslint-disable-next-line import/no-default-export
export default RootLayout;
