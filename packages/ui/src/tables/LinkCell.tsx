import React from "react";
import {Linking} from "react-native";

import {Box} from "../Box";
import {Text} from "../Text";

export const LinkCell = ({
  text,
  url,
  onClick,
}: {
  text: string;
  url?: string;
  onClick?: () => void;
}): React.ReactElement => {
  if (!url && !onClick) {
    throw new Error("LinkCell requires either a url or onClick");
  }

  return (
    <Box
      flex="grow"
      justifyContent="center"
      onClick={(): void => {
        if (onClick) {
          onClick();
        } else if (url) {
          Linking.openURL(url).catch(console.error);
        }
      }}
    >
      <Text underline>{text}</Text>
    </Box>
  );
};
