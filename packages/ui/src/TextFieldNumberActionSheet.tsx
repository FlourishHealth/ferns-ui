import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";

import {ActionSheet} from "./ActionSheet";
import {Box} from "./Box";
import {Button} from "./Button";
import {NumberPickerActionSheetProps, TextFieldPickerActionSheetProps} from "./Common";
import dayjs from "./dayjsExtended";

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
                color="blue"
                size="lg"
                text="Save"
                type="ghost"
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
            value={dayjs(this.props.value).toDate()}
            onChange={(event: any, date?: Date) => {
              if (!date) {
                return;
              }
              this.props.onChange({event, value: date.toString()});
            }}
          />
        </Box>
      </ActionSheet>
    );
  }
}
