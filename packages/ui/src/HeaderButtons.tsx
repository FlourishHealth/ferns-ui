import React from "react";

import {Box} from "./Box";
import {Button} from "./Button";
import {BackButtonInterface, SearchButtonProps} from "./Common";
import {IconButton} from "./IconButton";
import {Text} from "./Text";
import {Unifier} from "./Unifier";

interface HeaderButtonProps {
  onClick: () => void;
  text: string;
}

interface HeaderButtonState {}

export class HeaderButton extends React.Component<HeaderButtonProps, HeaderButtonState> {
  constructor(props: HeaderButtonProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Box marginRight={2}>
        <Button color="primary" text={this.props.text} type="ghost" onClick={this.props.onClick} />
      </Box>
    );
  }
}

export class SearchButton extends React.Component<SearchButtonProps, {}> {
  render() {
    return (
      <Box>
        <IconButton
          accessibilityLabel="search"
          icon="search"
          iconColor={this.props.color || "white"}
          prefix="fas"
          onClick={this.props.onClick}
        />
      </Box>
    );
  }
}

export class BackButton extends React.Component<BackButtonInterface, {}> {
  render() {
    return (
      <Box alignItems="center" justifyContent="center" paddingX={3} width={50}>
        <IconButton
          accessibilityLabel=""
          icon="chevron-left"
          iconColor="white"
          prefix="fas"
          size="md"
          onClick={() => this.props.onBack && this.props.onBack()}
        />
      </Box>
    );
  }
}

export class FilterButton extends React.Component<SearchButtonProps, {}> {
  render() {
    return <Button color="white" text="Filter" type="ghost" onClick={this.props.onClick} />;
  }
}

export class EditButton extends React.Component<SearchButtonProps, {}> {
  render() {
    return (
      <IconButton
        accessibilityLabel="edit"
        icon="pen"
        iconColor={this.props.color}
        prefix="fas"
        onClick={this.props.onClick}
      />
    );
  }
}

export class UseButton extends React.Component<SearchButtonProps, {}> {
  render() {
    return (
      <Button
        text="Use"
        onClick={async () => {
          await Unifier.utils.haptic();
          this.props.onClick();
        }}
      />
    );
  }
}

export class AddTabButton extends React.Component<SearchButtonProps, {}> {
  render() {
    return (
      <Box color="blue" height={62} width={62} onClick={this.props.onClick}>
        <Text color="darkGray">Add</Text>
      </Box>
    );
  }
}
