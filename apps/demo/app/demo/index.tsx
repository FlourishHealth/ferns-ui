import {ComponentPage, HomePage} from "@components";
import {DemoConfig} from "@config";
import {useStoredState} from "ferns-ui";
import React from "react";
import {StyleSheet, View} from "react-native";
import {Host} from "react-native-portalize";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default function App() {
  const insets = useSafeAreaInsets();
  const [componentName, setComponentName] = useStoredState<string | null>("component", null);

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
        <View style={styles.body}>
          {Boolean(currentConfig) ? (
            <ComponentPage config={currentConfig!} />
          ) : (
            <HomePage
              onPress={(component: string) => {
                void setComponentName(component);
              }}
            />
          )}
        </View>
      </View>
    </Host>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    maxHeight: "100%",
    position: "absolute",
    overflow: "hidden",
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
