import React from "react";
import {Box} from "./Box";
import {Button} from "./Button";
import {Icon} from "./Icon";
import {Text} from "./Text";
import {TextField} from "./TextField";
import {TextFieldProps} from "./Common";

interface TapToEditState {
  showEdit: boolean;
}

export class TapToEdit extends React.Component<TextFieldProps, TapToEditState> {
  state = {showEdit: false};

  render() {
    if (!this.state.showEdit) {
      return (
        <Box display="flex" direction="row" onClick={() => this.setState({showEdit: true})}>
          <Box marginRight={2}>
            <Icon name="edit" size={20} color="primaryDark" prefix="far" />
          </Box>
          <Text>{this.props.children}</Text>
        </Box>
      );
    } else {
      return (
        <Box>
          <TextField {...this.props} />
          <Box width={100} paddingY={1}>
            <Button
              inline={true}
              color="primary"
              text="Save"
              onClick={() => {
                this.setState({showEdit: false});
                if (this.props.onSubmitEditing) {
                  this.props.onSubmitEditing();
                }
              }}
            />
          </Box>
        </Box>
      );
    }
  }
}
