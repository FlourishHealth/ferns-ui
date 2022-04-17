import React from "react";
import {Box} from "./Box";
import {Text} from "./Text";
import {Switch} from "./Switch";
import {TextField} from "./TextField";
import {TextArea} from "./TextArea";
import {Button} from "./Button";
import {SelectList} from "./SelectList";
import {IconButton} from "./IconButton";

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
  options?: (string | undefined)[];
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
        <Box display="flex" direction="column">
          {Object.keys(this.props.value).map((k) => (
            <>
              <Text weight="bold">{k}</Text>
              <Switch
                switched={this.state.value[k]}
                onChange={() =>
                  this.setState({value: {...this.state.value, [k]: !this.state.value[k]}})
                }
                id={k}
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
          switched={this.state.value}
          onChange={() => this.setState({value: !this.state.value})}
          id={this.props.name}
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
          value={this.state.value}
          onChange={(result) => this.setState({value: result.value})}
          id={this.props.name}
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
          value={this.state.value}
          onChange={(result) => this.setState({value: result.value})}
          id={this.props.name}
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
        <Box display="flex" direction="row">
          <IconButton
            iconColor="darkGray"
            prefix="far"
            size="xs"
            accessibilityLabel="edit"
            icon="edit"
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
      <Box display="flex" direction="row">
        <IconButton
          iconColor="darkGray"
          prefix="far"
          size="xs"
          accessibilityLabel="edit"
          icon="cancel"
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
