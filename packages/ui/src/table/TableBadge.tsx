/* eslint-disable unused-imports/no-unused-imports */

import React, {FC} from "react";
import {Text, View} from "react-native";

import {Box} from "../Box";

export interface TableBadgeProps {
  value: string;
  isEditing?: boolean;
}

export const TableBadge: FC<TableBadgeProps> = ({value, isEditing}) => {
  return (
    <View>
      <Text>TableBadge</Text>
    </View>
  );
};
