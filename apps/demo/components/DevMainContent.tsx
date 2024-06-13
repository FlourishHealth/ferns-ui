import React, {ReactNode} from "react";
import {ScrollView} from "react-native";

interface DevMainContentProps {
  children: ReactNode;
}

export const DevMainContent = ({children}: DevMainContentProps): React.ReactElement => {
  return <ScrollView style={{flex: 1, height: "auto"}}>{children}</ScrollView>;
};
