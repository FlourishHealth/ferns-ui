import {DevHomePage} from "@components";
import {DemoConfig} from "@config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigationState} from "@react-navigation/native";
import {router} from "expo-router";
import React, {ReactElement, useEffect} from "react";
import {StyleSheet, View} from "react-native";

const ASYNC_STORAGE_KEY = "CURRENT_ROUTE";

export default function Dev(): ReactElement {
  // TODO create a shared hook for saving navigation state to AsyncStorage
  const navigationState = useNavigationState((state) => state);
  // Save the current navigation state to AsyncStorage
  useEffect(() => {
    const saveCurrentRoute = async () => {
      // Don't save initial state
      if (navigationState.routes?.length <= 1) {
        return;
      }
      const params: any = navigationState.routes[1]?.params ?? {};

      try {
        await AsyncStorage.setItem(
          ASYNC_STORAGE_KEY,
          JSON.stringify({component: params?.component, story: params?.story})
        );
      } catch (error) {
        console.error("Failed to save the current route", error);
      }
    };

    saveCurrentRoute();
  }, [navigationState]);

  // Restore the route from AsyncStorage
  useEffect(() => {
    const restoreRoute = async () => {
      try {
        const savedRoute = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
        if (savedRoute) {
          const {component, story} = JSON.parse(savedRoute);
          if (component && story) {
            router.navigate(`dev/${component}?story=${story}`);
          }
        }
      } catch (error) {
        console.error("Failed to load the current route", error);
      }
    };

    restoreRoute();
  }, []);

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: "#fff",
        width: "100%",
      }}
    >
      <DevHomePage
        demoConfig={DemoConfig}
        onPress={(component: string, story: string) => {
          router.navigate(`dev/${component}?story=${story}`);
        }}
      />
    </View>
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
});
