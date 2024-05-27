import {ComponentPage} from "@components";
import {DemoConfig} from "@config";
import {StatusBar} from "expo-status-bar";
import {FernsProvider, useStoredState} from "ferns-ui";
import React, {ReactElement} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {Host} from "react-native-portalize";
import {SafeAreaProvider, useSafeAreaInsets} from "react-native-safe-area-context";

import {DevComponentPage} from "../../components/DevComponentPage";
import {DevHomePage} from "../../components/DevHomePage";
import {HomePage} from "../../components/HomePage";

const App = () => {
  const insets = useSafeAreaInsets();
  const [componentName, setComponentName] = useStoredState<string | null>("component", null);
  const [currentStory, setCurrentStory] = useStoredState<string | null>("story", null);
  const [devMode, setDevMode] = useStoredState<boolean>("devMode", false);

  // Update when we have new fonts picked, these look baaad.
  // const [loaded] = useFonts({
  //   "Comfortaa-Light": require("../../assets/Comfortaa-Light.ttf"),
  //   "Comfortaa-Bold": require("../../assets/Comfortaa-Bold.ttf"),
  //   IMFellEnglishSC: require("../../assets/IMFellEnglishSC-Regular.ttf"),
  //   "DancingScript-Regular": require("../../assets/DancingScript-Regular.ttf"),
  //   Cochin: require("../../assets/Cochin.ttf"),
  // });

  // if (!loaded) {
  //   return null;
  // }

  const currentConfig = DemoConfig.find((config) => config.name === componentName);
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
          width: "100%",
        }}
      >
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
            <Text style={{marginLeft: 20, fontWeight: "bold"}}>{currentConfig?.name}</Text>
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
                <Text style={{fontWeight: "bold"}}>{devMode ? "Demo Mode" : "Dev Mode"}</Text>
              </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.body}>
          {!devMode && !currentConfig && (
            <HomePage
              onPress={(component: string) => {
                void setComponentName(component);
              }}
            />
          )}
          {!devMode && currentConfig && <ComponentPage config={currentConfig} />}
          {devMode && !currentConfig && (
            <DevHomePage
              demoConfig={DemoConfig}
              onPress={(name: string, story: string) => {
                void setComponentName(name);
                void setCurrentStory(story);
              }}
            />
          )}
          {devMode && currentConfig && currentStory && (
            <DevComponentPage config={currentConfig} currentStory={currentStory} />
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
    justifyContent: "space-between",
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
});

// eslint-disable-next-line import/no-default-export
export default AppRoot;
