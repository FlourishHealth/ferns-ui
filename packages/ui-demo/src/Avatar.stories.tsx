import {Avatar, Box, Heading, Text} from "ferns-ui";
import React, {ReactElement, useState} from "react";

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
    ImagePicker() {
      return (
        <Box direction="column" display="flex" height="100%" width="100%">
          <AvatarImage />
        </Box>
      );
    },
  },
};

const AvatarImage = (): ReactElement => {
  const [xsImage, setXSImage] = useState({
    uri: "https://i.ibb.co/ZfCZrY8/keerthi.jpg",
    height: 0,
    width: 0,
  });
  const [smImage, setSMImage] = useState({
    uri: "https://i.ibb.co/ZfCZrY8/keerthi.jpg",
    height: 0,
    width: 0,
  });
  const [mdImage, setMDImage] = useState({
    uri: "https://i.ibb.co/ZfCZrY8/keerthi.jpg",
    height: 0,
    width: 0,
  });
  const [lgImage, setLGImage] = useState({
    uri: "https://i.ibb.co/ZfCZrY8/keerthi.jpg",
    height: 0,
    width: 0,
  });
  const [xlImage, setXLImage] = useState({
    uri: "https://i.ibb.co/ZfCZrY8/keerthi.jpg",
    height: 0,
    width: 0,
  });

  return (
    <>
      <Heading>Edit Image</Heading>
      <Text>Width: {xsImage.width}</Text>
      <Text>Height: {xsImage.height}</Text>
      <Avatar
        editAvatarImage
        name="Tony Stark"
        size="xs"
        src={xsImage.uri}
        onChange={(image) => setXSImage(image)}
      />

      <Heading>Edit Image</Heading>
      <Text>Width: {smImage.width}</Text>
      <Text>Height: {smImage.height}</Text>

      <Avatar
        editAvatarImage
        name="Tony Stark"
        size="sm"
        src={smImage.uri}
        onChange={(image) => setSMImage(image)}
      />

      <Heading>Edit Image</Heading>
      <Text>Width: {mdImage.width}</Text>
      <Text>Height: {mdImage.height}</Text>

      <Avatar
        editAvatarImage
        name="Tony Stark"
        size="md"
        src={mdImage.uri}
        onChange={(image) => setMDImage(image)}
      />

      <Heading>Edit Image</Heading>
      <Text>Width: {lgImage.width}</Text>
      <Text>Height: {lgImage.height}</Text>

      <Avatar
        editAvatarImage
        name="Tony Stark"
        size="lg"
        src={lgImage.uri}
        onChange={(image) => setLGImage(image)}
      />

      <Heading>Edit Image</Heading>
      <Text>Width: {xlImage.width}</Text>
      <Text>Height: {xlImage.height}</Text>

      <Avatar
        avatarImageWidth={500}
        editAvatarImage
        imageFit="cover"
        name="Tony Stark"
        size="xl"
        src={xlImage.uri}
        onChange={(image) => setXLImage(image)}
      />
    </>
  );
};
