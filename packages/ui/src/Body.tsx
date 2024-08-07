import React from "react";
import {ActivityIndicator, KeyboardAvoidingView} from "react-native";

import {Box} from "./Box";
import {BodyProps} from "./Common";
import {useTheme} from "./Theme";

export const Body = ({
  scroll,
  loading,
  padding,
  height,
  avoidKeyboard,
  children,
}: BodyProps): React.ReactElement => {
  const {theme} = useTheme();

  const renderBody = () => {
    return (
      <Box avoidKeyboard height="100%" scroll={scroll}>
        <Box height={height || "100%"} padding={padding !== undefined ? padding : 5}>
          {loading === true && <ActivityIndicator color={theme.text.primary} size="large" />}
          {children}
        </Box>
      </Box>
    );
  };

  if (avoidKeyboard === false) {
    return renderBody();
  } else {
    return <KeyboardAvoidingView behavior="position">{renderBody()}</KeyboardAvoidingView>;
  }
};
