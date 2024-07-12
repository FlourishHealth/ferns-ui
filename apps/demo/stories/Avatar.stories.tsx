import {
  Avatar,
  AvatarImagePickerEvent,
  AvatarProps,
  AvatarStatus,
  Box,
  Heading,
  Text,
} from "ferns-ui";
import React, {ReactElement, useState} from "react";

export const AvatarDemo = (props: Partial<AvatarProps>) => {
  const [src, setSrc] = useState<string | undefined>(props.src ?? undefined);

  return (
    <Box>
      <Avatar
        name="Tony Stark"
        src={src}
        status="online"
        {...props}
        onChange={(val: AvatarImagePickerEvent) => {
          setSrc(val.uri);
        }}
      />
    </Box>
  );
};

export const AvatarInitials = () => {
  return (
    <Box direction="column" display="flex">
      <Text>Tony Stark</Text>
      <Avatar name="Tony Stark" status="online" />
      <Text>Tony Stark Jr</Text>
      <Avatar name="Tony Stark Jr" status="online" />
      <Text>Tony Ironman Stark</Text>
      <Avatar name="Tony Ironman Stark" status="online" />
      <Text>Tony</Text>
      <Avatar name="Tony" status="online" />
      <Text> Tony Stark Colored</Text>
      <Avatar name="Tony Stark" status="online" />
    </Box>
  );
};
export const AvatarSizes = () => {
  return (
    <Box direction="column" display="flex">
      <Text>XS</Text>
      <Avatar name="Tony Stark" size="xs" status="online" />
      <Text>SM</Text>
      <Avatar name="Tony Stark" size="sm" status="online" />
      <Text>MD</Text>
      <Avatar name="Tony Stark" size="md" status="online" />
      <Text>LG</Text>
      <Avatar name="Tony Stark" size="lg" status="online" />
      <Text>XL</Text>
      <Avatar name="Tony Stark" size="xl" status="online" />
    </Box>
  );
};
export const AvatarOutlines = () => {
  return (
    <Box color="neutral" direction="column" display="flex">
      <Text>XS</Text>
      <Avatar name="Tony Stark" size="xs" status="online" />
      <Text>SM</Text>
      <Avatar name="Tony Stark" size="sm" status="online" />
      <Text>MD</Text>
      <Avatar name="Tony Stark" size="md" status="online" />
      <Text>LG</Text>
      <Avatar name="Tony Stark" size="lg" status="online" />
      <Text>XL</Text>
      <Avatar name="Tony Stark" size="xl" status="online" />
      <Text>XS</Text>
      <Avatar
        name="Tony Stark"
        size="xs"
        src="https://i.ibb.co/ZfCZrY8/keerthi.jpg"
        status="online"
      />
      <Text>SM</Text>
      <Avatar
        name="Tony Stark"
        size="sm"
        src="https://i.ibb.co/ZfCZrY8/keerthi.jpg"
        status="online"
      />
      <Text>MD</Text>
      <Avatar
        name="Tony Stark"
        size="md"
        src="https://i.ibb.co/ZfCZrY8/keerthi.jpg"
        status="online"
      />
      <Text>LG</Text>
      <Avatar
        name="Tony Stark"
        size="lg"
        src="https://i.ibb.co/ZfCZrY8/keerthi.jpg"
        status="online"
      />
      <Text>XL</Text>
      <Avatar
        name="Tony Stark"
        size="xl"
        src="https://i.ibb.co/ZfCZrY8/keerthi.jpg"
        status="online"
      />
    </Box>
  );
};

export const AvatarStatusDemo = () => {
  const renderIcon = (
    text: string,
    size: "xs" | "sm" | "md" | "lg" | "xl",
    status: AvatarStatus
  ) => {
    return (
      <Box paddingY={1}>
        <Text>{text}</Text>
        <Avatar
          name="Tony Stark"
          size={size}
          src="https://i.ibb.co/ZfCZrY8/keerthi.jpg"
          status={status}
        />
      </Box>
    );
  };
  return (
    <Box color="neutral" direction="column" display="flex" height="100%" width="100%">
      {renderIcon("Online", "xs", "online")}
      {renderIcon("Online Mobile", "xl", "online")}
      {renderIcon("Offline Mobile", "xl", "offline")}
    </Box>
  );
};

export const AvatarImage = (): ReactElement => {
  const [xlImage, setXLImage] = useState<AvatarImagePickerEvent>({
    uri: "https://i.ibb.co/ZfCZrY8/keerthi.jpg",
    height: 0,
    width: 0,
  });

  return (
    <Box scroll>
      <Heading>Image Picker is only available on XL Avatar</Heading>
      <Text>Width: {xlImage.width}</Text>
      <Text>Height: {xlImage.height}</Text>

      <Avatar
        name="Tony Stark"
        size="xl"
        src={xlImage.uri}
        status="imagePicker"
        onChange={(image) => setXLImage(image)}
      />
    </Box>
  );
};
