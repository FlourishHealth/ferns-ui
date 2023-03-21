import React from "react";

import {Box} from "./Box";
import {SegmentedControlProps} from "./Common";
import {Text} from "./Text";

export const SegmentedControl = ({
  items,
  onChange = () => {},
  selectedItemIndexes,
  multiselect = false,
  selectLimit = 1,
}: SegmentedControlProps) => {
  const renderItem = (item: string | React.ReactNode) => {
    return <Text weight="bold">{item}</Text>;
    // if (typeof item === "string") {
    //   return <Text weight="bold">{item}</Text>;
    // } else {
    //   return item;
    // }
  };

  if (!multiselect && selectedItemIndexes.length > 1) {
    console.warn("Muliple selections not allowed without multiselect flag");
    return null;
  }

  if (selectedItemIndexes.length > selectLimit) {
    console.warn("The number of selected items exceeds the limit");
    return null;
  }

  return (
    <Box
      color="lightGray"
      direction="row"
      display="flex"
      height={40}
      justifyContent="between"
      padding={1}
      rounding={3}
      width="100%"
    >
      {items.map((item, index) => (
        <Box
          key={index}
          color={selectedItemIndexes.includes(index) ? "white" : "lightGray"}
          height="100%"
          paddingX={2}
          rounding={3}
          // The additional 10% missing will act as padding between controls
          width={`${90 / items.length}%`}
        >
          <Box
            alignItems="center"
            display="flex"
            height="100%"
            justifyContent="center"
            width="100%"
            onClick={() => onChange({activeIndex: index})}
          >
            {renderItem(item)}
          </Box>
        </Box>
      ))}
    </Box>
  );
};
