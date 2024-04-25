import {Avatar, AvatarProps, AvatarStatus, Box, Heading, Text} from "ferns-ui";
import React, {ReactElement, useState} from "react";

export const AvatarDemo = (props: Partial<AvatarProps>) => {
  return (
    <Box>
      <Avatar backgroundColor="primary" name="Tony Stark" textColor="white" {...props} />
    </Box>
  );
};

export const AvatarInitials = () => {
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
};
export const AvatarSizes = () => {
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
};
export const AvatarOutlines = () => {
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
};
export const AvatarImages = () => {
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
};
export const AvatarImagePicker = () => {
  return (
    <Box direction="column" display="flex" height="100%" width="100%">
      <AvatarImage />
    </Box>
  );
};

export const AvatarStatusDemo = () => {
  const renderIcon = (
    text: string,
    size: "xs" | "sm" | "md" | "lg" | "xl",
    status: AvatarStatus,
    mobile = false,
    statusText?: string
  ) => {
    return (
      <Box paddingY={1}>
        <Text>{text}</Text>
        <Avatar
          name="Tony Stark"
          size={size}
          src="https://i.ibb.co/ZfCZrY8/keerthi.jpg"
          status={status}
          statusMobile={mobile}
          statusText={statusText}
        />
      </Box>
    );
  };
  return (
    <Box color="blue" direction="column" display="flex" height="100%" width="100%">
      {renderIcon("Online", "xs", "online")}
      {renderIcon("Offline (with tooltip)", "sm", "offline", false, "Offline at 1:30pm")}
      {renderIcon("Do Not Disturb", "md", "doNotDisturb")}
      {renderIcon("Away", "lg", "away")}
      {renderIcon("Meeting", "xl", "meeting")}
      {renderIcon("Vacation", "xl", "vacation")}
      {renderIcon("Sick", "xl", "sick")}
      {renderIcon(
        "Out Of Office (tooltip)",
        "xl",
        "outOfOffice",
        false,
        "Out Of Office Until 1/3/24"
      )}
      {renderIcon("Commuting", "xl", "commuting")}
      {renderIcon("Online Mobile", "xl", "online", true)}
      {renderIcon("Offline Mobile", "xl", "offline", true)}
      {renderIcon("Away Mobile", "xl", "away", true)}
      {renderIcon("DND Mobile (tooltip)", "xl", "doNotDisturb", true, "Deep Work, Do Not Disturb")}
    </Box>
  );
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
    <Box height="100%" scroll>
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
        status="doNotDisturb"
        onChange={(image) => setXLImage(image)}
      />
    </Box>
  );
};
