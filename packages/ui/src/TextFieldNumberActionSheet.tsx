import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";

import {ActionSheet} from "./ActionSheet";
import {Box} from "./Box";
import {Button} from "./Button";
import {NumberPickerActionSheetProps, TextFieldPickerActionSheetProps} from "./Common";

interface NumberPickerActionSheetState {}

export class NumberPickerActionSheet extends React.Component<
  TextFieldPickerActionSheetProps,
  NumberPickerActionSheetState
> {
  constructor(props: NumberPickerActionSheetProps) {
    super(props);
  }

  render() {
    return (
      <ActionSheet ref={this.props.actionSheetRef} bounceOnOpen gestureEnabled>
        <Box marginBottom={8} paddingX={4} width="100%">
          <Box alignItems="end" display="flex" width="100%">
            <Box width="33%">
              <Button
                text="Save"
                onClick={() => {
                  this.props.actionSheetRef?.current?.setModalVisible(false);
                }}
              />
            </Box>
          </Box>
          <DateTimePicker
            display="spinner"
            is24Hour
            mode={this.props.mode}
            testID="dateTimePicker"
            value={this.props.value ? new Date(this.props.value) : new Date()}
            onChange={(event: any, date?: Date) => {
              if (!date) {
                return;
              }
              this.props.onChange(date.toString());
            }}
          />
        </Box>
      </ActionSheet>
    );
  }
}
