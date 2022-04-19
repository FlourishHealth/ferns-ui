import React from "react";

import {Box} from "./Box";
import {Button} from "./Button";
import {TextFieldProps} from "./Common";
import {Icon} from "./Icon";
import {Text} from "./Text";
import {TextField} from "./TextField";

interface TapToEditState {
  showEdit: boolean;
}

export class TapToEdit extends React.Component<TextFieldProps, TapToEditState> {
  state = {showEdit: false};

  render() {
    if (!this.state.showEdit) {
      return (
        <Box direction="row" display="flex" onClick={() => this.setState({showEdit: true})}>
          <Box marginRight={2}>
            <Icon color="primaryDark" name="edit" prefix="far" size={20} />
          </Box>
          <Text>{this.props.children}</Text>
        </Box>
      );
    } else {
      return (
        <Box>
          <TextField {...this.props} />
          <Box paddingY={1} width={100}>
            <Button
              color="primary"
              inline
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
