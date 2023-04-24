import React from "react";

import {Box} from "./Box";
import {SegmentedControlProps} from "./Common";
import {Text} from "./Text";

export const SegmentedControl = ({
  items,
  onChange = () => {},
  selectedItemIndexes = undefined,
  selectedItemIndex = undefined,
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

  if (selectedItemIndex === undefined && selectedItemIndexes === undefined) {
    console.warn("One of the following must be defined: selectedItemIndex, selectedItemIndexes");
    return null;
  }

  if (!multiselect && selectedItemIndexes?.length && selectedItemIndexes?.length > 1) {
    console.warn("Multiple selections not allowed without multiselect flag");
    return null;
  }

  if (selectedItemIndexes?.length && selectedItemIndexes?.length > selectLimit) {
    console.warn("The number of selected items exceeds the limit");
    return null;
  }

  const isTabActive = (index: any) => {
    return selectedItemIndex === index || selectedItemIndexes?.includes(index)
      ? "white"
      : "lightGray";
  };

  return (
    <Box
      color="lightGray"
      direction="row"
      display="flex"
      height={40}
      justifyContent="between"
      // padding={1}
      rounding={3}
      width="100%"
    >
      {items.map((item, index) => (
        <Box
          key={index}
          color={isTabActive(index)}
          height="100%"
          // paddingX={2}
          rounding={3}
          width={`${100 / items.length}%`}
        >
          <Box
            alignItems="center"
            display="flex"
            height="100%"
            justifyContent="center"
            width="100%"
            onClick={() => {
              if (
                selectedItemIndexes?.length === selectLimit &&
                !selectedItemIndexes?.includes(index)
              ) {
                return;
              }
              if (multiselect) {
                if (selectedItemIndexes?.includes(index)) {
                  onChange({activeIndex: selectedItemIndexes.filter((i) => i !== index)});
                } else {
                  const currentIndexes = [...(selectedItemIndexes as number[])];
                  currentIndexes?.push(index);
                  onChange({activeIndex: currentIndexes?.sort() as number[]});
                }
              } else {
                onChange({activeIndex: index});
              }
            }}
          >
            {renderItem(item)}
          </Box>
        </Box>
      ))}
    </Box>
  );
};
