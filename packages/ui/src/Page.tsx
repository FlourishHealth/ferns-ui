import React from "react";

import {Box} from "./Box";
import {Button} from "./Button";
import {PageProps} from "./Common";
import {ErrorBoundary} from "./ErrorBoundary";
import {Heading} from "./Heading";
import {IconButton} from "./IconButton";
import {Spinner} from "./Spinner";

export class Page extends React.Component<PageProps, {}> {
  actionSheetRef: React.RefObject<any> = React.createRef();

  renderHeader() {
    if (!this.props.title && !this.props.backButton) {
      return null;
    }
    return (
      <Box direction="row" display="flex" width="100%">
        {this.props.backButton && (
          <Box alignItems="center" display="block" justifyContent="center" paddingY={3}>
            <IconButton
              accessibilityHint="Navigate back"
              accessibilityLabel=""
              iconName="chevron-left"
              onClick={() => this.props.navigation.goBack()}
            />
          </Box>
        )}
        {this.props.closeButton && (
          <Box alignItems="center" display="block" justifyContent="center" paddingY={3}>
            <IconButton
              accessibilityHint="Close page"
              accessibilityLabel=""
              iconName="xmark"
              onClick={() => this.props.navigation.goBack()}
            />
          </Box>
        )}
        {Boolean(this.props.title) && (
          <Box direction="column" display="flex" flex="grow" justifyContent="center">
            <Heading align="center">{this.props.title}</Heading>
          </Box>
        )}
        {this.props.rightButton && (
          <Box alignItems="center" display="block" justifyContent="center" paddingY={3}>
            <Button
              text={this.props.rightButton}
              variant="muted"
              onClick={() => this.props.rightButtonOnClick && this.props.rightButtonOnClick()}
            />
          </Box>
        )}
      </Box>
    );
  }

  render() {
    return (
      <ErrorBoundary onError={this.props.onError}>
        <Box
          alignSelf="center"
          avoidKeyboard
          color={this.props.color || "base"}
          direction={this.props.direction || "column"}
          display={this.props.display || "flex"}
          flex="grow"
          height="100%"
          keyboardOffset={this.props.keyboardOffset}
          maxWidth={this.props.maxWidth || 800}
          padding={this.props.padding !== undefined ? this.props.padding : 2}
          scroll={this.props.scroll === undefined ? true : this.props.scroll}
          width="100%"
        >
          {this.renderHeader()}
          {this.props.loading === true && <Spinner />}
          {/* <KeyboardAccessoryNavigation
          avoidKeyboard
          doneButton={true}
          nextButton={true}
          previousButton={true}
        /> */}

          {this.props.children}
        </Box>
        {Boolean(this.props.footer) && (
          <Box
            alignSelf="center"
            color={this.props.color || "neutralLight"}
            direction={this.props.direction || "column"}
            display={this.props.display || "flex"}
            flex="shrink"
            marginBottom={8}
            maxWidth={this.props.maxWidth || 800}
            paddingX={this.props.padding !== undefined ? this.props.padding : 6}
            paddingY={this.props.padding !== undefined ? this.props.padding : 2}
            width="100%"
          >
            {this.props.footer}
          </Box>
        )}
      </ErrorBoundary>
    );
  }
}
