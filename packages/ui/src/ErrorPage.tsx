import React from "react";
import {Box} from "./Box";
import {Button} from "./Button";
import {Text} from "./Text";
interface ErrorPageProps {
  error: Error;
  resetError: () => void;
}

export class ErrorPage extends React.Component<ErrorPageProps, {}> {
  constructor(props: ErrorPageProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Box
        height="100%"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        direction="column"
        padding={6}
      >
        <Text color="red" size="lg" weight="bold" align="center">
          Oops!
        </Text>
        <Box paddingY={3}>
          <Text align="center">
            There&apos;s an error. Sorry! Josh just got a notification about the error so he can fix
            it as soon as possible!
          </Text>
        </Box>
        <Box paddingY={3}>
          <Text>{this.props.error.toString()}</Text>
        </Box>
        <Button text="Try again" color="blue" onClick={this.props.resetError} />
      </Box>
    );
  }
}
