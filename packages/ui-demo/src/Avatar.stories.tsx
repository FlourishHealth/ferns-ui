import {Avatar, Box, Text} from "ferns-ui";
import React from "react";

export const AvatarStories = {
  title: "Avatar",
  component: Avatar,
  stories: {
    Initials() {
      return (
        <Box direction="column" display="flex" height="100%" width="100%">
          <Text>Tony Stark</Text>
          <Avatar name="Tony Stark" />
          <Text>Tony Stark Jr</Text>
          <Avatar name="Tony Stark Jr" />
          <Text>Tony Ironman Stark</Text>
          <Avatar name="Tony Ironman Stark" />
          <Text>Tony</Text>
          <Avatar name="Tony" />
          <Text>Colored Tony Start</Text>
          <Avatar backgroundColor="primary" name="Tony Stark" textColor="white" />
        </Box>
      );
    },
    Sizes() {
      return (
        <Box direction="column" display="flex" height="100%" width="100%">
          <Text>XS</Text>
          <Avatar name="Tony Stark" size="xs" />
          <Text>SM</Text>
          <Avatar name="Tony Stark" size="sm" />
          <Text>MD</Text>
          <Avatar name="Tony Stark" size="md" />
          <Text>LG</Text>
          <Avatar name="Tony Stark" size="lg" />
          <Text>XL</Text>
          <Avatar name="Tony Stark" size="xl" />
        </Box>
      );
    },
    Outlines() {
      return (
        <Box color="blue" direction="column" display="flex" height="100%" width="100%">
          <Text>XS</Text>
          <Avatar name="Tony Stark" outline size="xs" />
          <Text>SM</Text>
          <Avatar name="Tony Stark" outline size="sm" />
          <Text>MD</Text>
          <Avatar name="Tony Stark" outline size="md" />
          <Text>LG</Text>
          <Avatar name="Tony Stark" outline size="lg" />
          <Text>XL</Text>
          <Avatar name="Tony Stark" outline size="xl" />
          <Text>XS</Text>
          <Avatar name="Tony Stark" outline size="xs" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" />
          <Text>SM</Text>
          <Avatar name="Tony Stark" outline size="sm" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" />
          <Text>MD</Text>
          <Avatar name="Tony Stark" outline size="md" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" />
          <Text>LG</Text>
          <Avatar name="Tony Stark" outline size="lg" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" />
          <Text>XL</Text>
          <Avatar name="Tony Stark" outline size="xl" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" />
        </Box>
      );
    },
    Images() {
      return (
        <Box color="blue" direction="column" display="flex" height="100%" width="100%">
          <Text>XS</Text>
          <Avatar name="Tony Stark" size="xs" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" />
          <Text>SM</Text>
          <Avatar name="Tony Stark" size="sm" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" />
          <Text>MD</Text>
          <Avatar name="Tony Stark" size="md" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" />
          <Text>LG</Text>
          <Avatar name="Tony Stark" size="lg" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" />
          <Text>XL</Text>
          <Avatar name="Tony Stark" size="xl" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" />
        </Box>
      );
    },
  },
};
