import { Box, Card, Text } from "ferns-ui";
import React from "react";

export const CardStories = {
  title: "Card",
  component: Card,
  stories: {
    Plain() {
      return (
        <Box
          color="lightGray"
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
                color="blue"
                display="flex"
                height={50}
                justifyContent="center"
                marginRight={2}
                rounding="circle"
                width={50}
              >
                <h2>
                  <Text>JG</Text>
                </h2>
              </Box>
              <Box direction="column" paddingX={2}>
                <div>
                  <b>
                    <Text>Josh Gachnang</Text>
                  </b>
                </div>
                <div>
                  <Text>joined 2 years ago</Text>
                </div>
              </Box>
            </Box>
          </Card>
        </Box>
      );
    },
  },
};
