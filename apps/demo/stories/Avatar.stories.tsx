import {DemoConfiguration} from "@config";
import {Avatar, AvatarProps, AvatarStatus, Box, Heading, Text} from "ferns-ui";
import React, {ReactElement, useState} from "react";

const AvatarDemo = (props: Partial<AvatarProps>) => {
  return (
    <Box>
      <Avatar backgroundColor="primary" name="Tony Stark" textColor="white" {...props} />
    </Box>
  );
};

export const AvatarConfiguration: DemoConfiguration = {
  name: "Avatar",
  related: ["Profile Picture", "Userpic"],
  description: "Used to represent a single user.",
  category: "Component",
  component: Avatar,
  status: {
    documentation: "planned",
    figma: "ready",
    figmaLink:
      "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A23287&mode=design&t=AKQ8wyFQBA4qC5eF-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  usage: {
    do: [
      "Allow Staff members to upload photos",
      "Use the same component set for both desktop and mobile",
      "Use the colored border to indicate that a message is unread",
    ],
    doNot: [
      "Allow patients to upload photos; show the initials version instead",
      "If possible, avoid pairing the status bubbles with the smaller versions: “s” and “xs”",
    ],
  },
  a11yNotes: [
    "The avatar should have a text equivalent so that screen readers can understand what it is.",
    "Gestalt uses the accessibilityLabel prop for the text description of the image. Without this prop, screen readers will default to the name prop. ",
  ],
  interfaceName: "AvatarProps",
  props: {},
  demo: AvatarDemo,
  demoOptions: {
    size: "md",
    controls: {
      backgroundColor: {
        type: "select",
        defaultValue: "primary",
        options: [
          {label: "Primary", value: "primary"},
          {label: "Secondary", value: "secondary"},
        ],
      },
      name: {
        type: "text",
        defaultValue: "Tony Stark",
      },
    },
  },
  stories: {
    Initials: {
      description:
        "If there isn't a url provided or it doesn't load, Avatar defaults to the user's initials",
      render: () => <AvatarInitials />,
    },
    Sizes: {render: () => <AvatarSizes />},
    Outlines: {render: () => <AvatarOutlines />},
  },
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
