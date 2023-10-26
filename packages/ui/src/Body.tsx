import React, {ReactNode, useContext} from "react";
import {ActivityIndicator, KeyboardAvoidingView} from "react-native";

import {Box} from "./Box";
import {UnsignedUpTo12} from "./Common";
import {ThemeContext} from "./Theme";

export interface BodyProps {
  scroll?: boolean;
  loading?: boolean;
  padding?: UnsignedUpTo12;
  height?: number | string;
  avoidKeyboard?: boolean; // default true
  children?: ReactNode;
}

export function Body({
  scroll,
  loading,
  padding,
  height,
  avoidKeyboard,
  children,
}: BodyProps): React.ReactElement {
  const {theme} = useContext(ThemeContext);

  const renderBody = () => {
    return (
      <Box avoidKeyboard height="100%" scroll={scroll}>
        <Box height={height || "100%"} padding={padding !== undefined ? padding : 5}>
          {loading === true && <ActivityIndicator color={theme.darkGray} size="large" />}
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
}
