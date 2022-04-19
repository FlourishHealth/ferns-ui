import React from "react";

import {Box} from "./Box";
import {SegmentedControlProps} from "./Common";
import {Text} from "./Text";

export class SegmentedControl extends React.Component<SegmentedControlProps, {}> {
  renderItem(item: string | React.ReactNode) {
    return <Text weight="bold">{item}</Text>;
    // if (typeof item === "string") {
    //   return <Text weight="bold">{item}</Text>;
    // } else {
    //   return item;
    // }
  }

  render() {
    return (
      <Box
        color="lightGray"
        direction="row"
        display="flex"
        height={40}
        padding={1}
        rounding={3}
        width="100%"
      >
        {this.props.items.map((item, index) => (
          <Box
            key={index}
            color={this.props.selectedItemIndex === index ? "white" : "lightGray"}
            height="100%"
            rounding={3}
            width={`${100 / this.props.items.length}%`}
          >
            <Box
              alignItems="center"
              display="flex"
              height="100%"
              justifyContent="center"
              width="100%"
              onClick={() => this.props.onChange({activeIndex: index})}
            >
              {this.renderItem(item)}
            </Box>
          </Box>
        ))}
      </Box>
    );
  }
}
