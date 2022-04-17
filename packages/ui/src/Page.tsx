import React from "react";
import {Box} from "./Box";
import {Button} from "./Button";
import {Color, UnsignedUpTo12} from "./Common";
import {ErrorBoundary} from "./ErrorBoundary";
import {Heading} from "./Heading";
import {IconButton} from "./IconButton";
// import {KeyboardAccessoryNavigation} from "react-native-keyboard-accessory";
import {Spinner} from "./Spinner";
import {Unifier} from "./Unifier";

interface PageProps {
  // TODO: figure out navigation
  navigation: any;
  scroll?: boolean;
  loading?: boolean;
  display?: "flex" | "none" | "block" | "inlineBlock";
  title?: string;
  backButton?: boolean;
  closeButton?: boolean;
  direction?: "row" | "column";
  padding?: UnsignedUpTo12;
  color?: Color;
  maxWidth?: number | string;
  keyboardOffset?: number;
  footer?: any;
  rightButton?: string;
  rightButtonOnClick?: () => void;
}

export class Page extends React.Component<PageProps, {}> {
  actionSheetRef: React.RefObject<any> = React.createRef();

  renderHeader() {
    if (!this.props.title && !this.props.backButton) {
      return null;
    }
    return (
      <Box width="100%" display="flex" direction="row">
        {this.props.backButton && (
          <Box paddingY={3} justifyContent="center" alignItems="center" display="block">
            <IconButton
              prefix="fas"
              icon="chevron-left"
              size="md"
              onClick={() => this.props.navigation.goBack()}
              accessibilityLabel=""
              iconColor="darkGray"
            />
          </Box>
        )}
        {this.props.closeButton && (
          <Box paddingY={3} justifyContent="center" alignItems="center" display="block">
            <IconButton
              prefix="fas"
              icon="times"
              size="md"
              onClick={() => this.props.navigation.goBack()}
              accessibilityLabel=""
              iconColor="darkGray"
            />
          </Box>
        )}
        {Boolean(this.props.title) && (
          <Box display="flex" flex="grow" justifyContent="center" direction="column">
            <Heading align="center">{this.props.title}</Heading>
          </Box>
        )}
        {this.props.rightButton && (
          <Box paddingY={3} justifyContent="center" alignItems="center" display="block">
            <Button
              type="ghost"
              text={this.props.rightButton}
              color="gray"
              onClick={() => this.props.rightButtonOnClick && this.props.rightButtonOnClick()}
            />
          </Box>
        )}
      </Box>
    );
  }

  render() {
    return (
      <ErrorBoundary>
        <Box
          scroll={this.props.scroll === undefined ? true : this.props.scroll}
          padding={this.props.padding !== undefined ? this.props.padding : 2}
          avoidKeyboard={true}
          keyboardOffset={this.props.keyboardOffset}
          display={this.props.display || "flex"}
          width="100%"
          flex="grow"
          maxWidth={this.props.maxWidth || 800}
          alignSelf="center"
          direction={this.props.direction || "column"}
          color={this.props.color || "lightGray"}
          // color="ligh"
        >
          {this.renderHeader()}
          {this.props.loading === true && (
            <Spinner size="md" color={Unifier.theme.darkGray as any} />
          )}
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
            width="100%"
            maxWidth={this.props.maxWidth || 800}
            marginBottom={8}
            paddingY={this.props.padding !== undefined ? this.props.padding : 2}
            paddingX={this.props.padding !== undefined ? this.props.padding : 6}
            display={this.props.display || "flex"}
            flex="shrink"
            alignSelf="center"
            direction={this.props.direction || "column"}
            color={this.props.color || "lightGray"}
          >
            {this.props.footer}
          </Box>
        )}
      </ErrorBoundary>
    );
  }
}
