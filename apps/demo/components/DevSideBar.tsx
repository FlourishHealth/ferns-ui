import {DemoConfiguration} from "@config";
import {router} from "expo-router";
import React from "react";
import {Pressable, Text} from "react-native";

interface DevHomePageProps {
  demoConfig: DemoConfiguration[];
}

export const DevSideBar = ({demoConfig}: DevHomePageProps): React.ReactElement => {
  return (
    <>
      {demoConfig.map((config) => (
        <React.Fragment key={config.name}>
          <Text style={{fontWeight: "bold", fontSize: 20, marginBottom: 12}}>{config.name}</Text>
          {Object.keys(config.stories).map((title) => (
            <Pressable
              key={title}
              onPress={() => {
                router.push(`dev/${config.name}?story=${title}`);
              }}
            >
              <Text style={{fontSize: 16, marginBottom: 8}}>{title}</Text>
            </Pressable>
          ))}
        </React.Fragment>
      ))}
    </>
  );
};
