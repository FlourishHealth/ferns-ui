import React from "react";

import {Box} from "./Box";
import {Button} from "./Button";
import {IconButton} from "./IconButton";
import {SelectList} from "./SelectList";
import {Switch} from "./Switch";
import {Text} from "./Text";
import {TextArea} from "./TextArea";
import {TextField} from "./TextField";

function objToJoinedString(obj: any) {
  return Object.keys(obj || {})
    .map((k) => (obj[k] ? k : undefined))
    .filter((v) => v)
    .join(", ");
}

interface FormLineProps {
  name: string;
  value: any;
  onSave: (value: any) => void;
  kind: "boolean" | "string" | "textarea" | "select" | "multiboolean";
  options?: string[];
}

interface FormLineState {
  editing: boolean;
  value: any;
}

export class FormLine extends React.Component<FormLineProps, FormLineState> {
  constructor(props: FormLineProps) {
    super(props);
    this.state = {editing: false, value: ""};
  }

  renderMultiBoolean() {
    return (
      <>
        <Box marginRight={2}>
          <Text weight="bold">{this.props.name}</Text>
        </Box>
        <Box direction="column" display="flex">
          {Object.keys(this.props.value).map((k) => (
            <>
              <Text weight="bold">{k}</Text>
              <Switch
                id={k}
                switched={this.state.value[k]}
                onChange={() => {
                  this.setState({value: {...this.state.value, [k]: !this.state.value[k]}});
                }}
              />
            </>
          ))}
        </Box>
      </>
    );
  }

  renderBooleanField() {
    return (
      <>
        <Box marginRight={2}>
          <Text weight="bold">{this.props.name}</Text>
        </Box>
        <Switch
          id={this.props.name}
          switched={this.state.value}
          onChange={() => this.setState({value: !this.state.value})}
        />
      </>
    );
  }

  renderTextField() {
    return (
      <>
        <Box marginRight={2}>
          <Text weight="bold">{this.props.name}</Text>
        </Box>
        <TextField
          id={this.props.name}
          value={this.state.value}
          onChange={(result) => this.setState({value: result.value})}
        />
      </>
    );
  }

  renderTextArea() {
    return (
      <>
        <Box marginRight={2}>
          <Text weight="bold">{this.props.name}</Text>
        </Box>
        <TextArea
          id={this.props.name}
          value={this.state.value}
          onChange={(result) => this.setState({value: result.value})}
        />
        <Button size="sm" text="Save" onClick={() => this.props.onSave(this.state.value)} />
      </>
    );
  }

  renderSelect() {
    return (
      <>
        <Box marginRight={2}>
          <Text weight="bold">{this.props.name}</Text>
        </Box>
        <SelectList
          id={this.props.name}
          options={(this.props.options || []).map((o) => ({label: o ?? "---", value: o}))}
          value={this.state.value}
          onChange={(result) => {
            this.setState({value: result});
          }}
        />
      </>
    );
  }

  render() {
    if (!this.state.editing) {
      let text = this.props.value;
      if (text === undefined) {
        text = " - ";
      }
      if (typeof text === "object") {
        text = objToJoinedString(text);
      }
      return (
        <Box direction="row" display="flex">
          <IconButton
            accessibilityLabel="edit"
            icon="edit"
            iconColor="darkGray"
            prefix="far"
            size="xs"
            onClick={() => this.setState({editing: true, value: this.props.value})}
          />
          <Box marginRight={2}>
            <Text weight="bold">{this.props.name}: </Text>
          </Box>
          <Text>{text}</Text>
        </Box>
      );
    }
    return (
      <Box direction="row" display="flex">
        <IconButton
          accessibilityLabel="edit"
          icon="times"
          iconColor="darkGray"
          prefix="far"
          size="xs"
          onClick={() => this.setState({editing: false})}
        />
        {this.props.kind === "boolean" && this.renderBooleanField()}
        {this.props.kind === "multiboolean" && this.renderMultiBoolean()}

        {this.props.kind === "string" && this.renderTextField()}
        {this.props.kind === "textarea" && this.renderTextArea()}
        {this.props.kind === "select" && this.renderSelect()}
        <Box width={60}>
          <Button
            color="blue"
            size="sm"
            text="Save"
            onClick={() => {
              this.props.onSave(this.state.value);
              this.setState({editing: false});
            }}
          />
        </Box>
      </Box>
    );
  }
}
