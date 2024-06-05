import React from "react";

import {Box} from "./Box";
import {
  SegmentedControlProps,
  SegmentedControlPropsMultiSelect,
  SegmentedControlPropsSingleSelect,
  SurfaceColor,
} from "./Common";
import {Text} from "./Text";

export const SegmentedControl = ({
  items,
  onChange = () => {},
  multiselect = false,
  selectLimit = 1,
  ...props
}: SegmentedControlProps) => {
  const selectedItemIndex = (props as SegmentedControlPropsSingleSelect).selectedItemIndex;
  const selectedItemIndexes = (props as SegmentedControlPropsMultiSelect).selectedItemIndexes;

  const renderItem = (item: string | React.ReactNode) => {
    return (
      <Text align="center" weight="bold">
        {item}
      </Text>
    );
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

  const isTabActive = (index: any): SurfaceColor => {
    return selectedItemIndex === index || selectedItemIndexes?.includes(index)
      ? "base"
      : "neutralLight";
  };

  return (
    <Box
      color="neutralLight"
      direction="row"
      display="flex"
      height={40}
      justifyContent="between"
      // padding={1}
      rounding="minimal"
      width="100%"
    >
      {items.map((item, index) => (
        <Box
          key={index}
          color={isTabActive(index)}
          height="100%"
          // paddingX={2}
          rounding="sm"
          width={`${100 / items.length}%`}
        >
          <Box
            alignItems="center"
            display="flex"
            height="100%"
            justifyContent="center"
            paddingX={1}
            width="100%"
            onClick={() => {
              if (
                selectedItemIndexes?.length === selectLimit &&
                !selectedItemIndexes?.includes(index)
              ) {
                return;
              }
              if (multiselect) {
                const typedOnChange =
                  onChange as unknown as SegmentedControlPropsMultiSelect["onChange"];
                if (selectedItemIndexes?.includes(index)) {
                  typedOnChange({activeIndex: selectedItemIndexes.filter((i) => i !== index)});
                } else {
                  const currentIndexes = [...(selectedItemIndexes as number[])];
                  currentIndexes?.push(index);
                  typedOnChange({activeIndex: currentIndexes?.sort() as number[]});
                }
              } else {
                const typedOnChange =
                  onChange as unknown as SegmentedControlPropsSingleSelect["onChange"];
                typedOnChange({activeIndex: index});
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
