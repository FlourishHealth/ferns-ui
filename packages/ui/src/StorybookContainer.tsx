import {Box} from "./Box";
import React from "react";

export class StorybookContainer extends React.Component<any, any> {
  render() {
    return (
      <Box width="100%" height="100%" display="flex" direction="column" padding={8} scroll={true}>
        {this.props.children}
      </Box>
    );
  }
}
