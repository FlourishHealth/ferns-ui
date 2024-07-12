import {Box, Card, Text} from "ferns-ui";
import React from "react";

export const CardDemo = () => {
  return (
    <Box color="neutralLight" direction="column" display="flex" height="100%" width="100%">
      <Card>
        <Box alignItems="center" direction="row" display="flex">
          <Box
            alignItems="center"
            color="primary"
            display="flex"
            height={50}
            justifyContent="center"
            marginRight={2}
            rounding="circle"
            width={50}
          >
            <Text>JG</Text>
          </Box>
          <Box direction="column" paddingX={2}>
            <Text>Josh Gachnang</Text>
            <Text>joined 2 years ago</Text>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export const Plain = () => {
  return (
    <Box
      color="neutralLight"
      direction="column"
      display="flex"
      height="100%"
      padding={12}
      width="100%"
    >
      <Card>
        <Box alignItems="center" direction="row" display="flex">
          <Box
            alignItems="center"
            color="primary"
            display="flex"
            height={50}
            justifyContent="center"
            marginRight={2}
            rounding="circle"
            width={50}
          >
            <Text>JG</Text>
          </Box>
          <Box direction="column" paddingX={2}>
            <Text>Josh Gachnang</Text>

            <Text>joined 2 years ago</Text>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};
