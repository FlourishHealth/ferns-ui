import {Radio} from "ferns-ui";
import React from "react";
import {View} from "react-native";

import {StorybookContainer} from "./StorybookContainer";

export const RadioDemo = (): React.ReactElement => {
  return (
    <StorybookContainer>
      <Radio />
    </StorybookContainer>
  );
};

export const Radios = (): React.ReactElement => {
  return (
    <StorybookContainer>
      {[false, true].map((isSelected, i) => (
        <View key={i} style={{paddingTop: 8, paddingBottom: 8}}>
          <Radio selected={isSelected} />
        </View>
      ))}
    </StorybookContainer>
  );
};
