import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment-timezone";
import React, {SyntheticEvent} from "react";
import {ActionSheet} from "./ActionSheet";

import {Box} from "./Box";
import {Button} from "./Button";
import {OnChangeCallback} from "./Common";

interface NumberPickerActionSheetProps {
  value?: string;
  mode?: "date" | "time";
  onChange: OnChangeCallback;
  actionSheetRef: React.RefObject<any>;
}

interface NumberPickerActionSheetState {}

export class NumberPickerActionSheet extends React.Component<
  NumberPickerActionSheetProps,
  NumberPickerActionSheetState
> {
  constructor(props: NumberPickerActionSheetProps) {
    super(props);
  }

  render() {
    return (
      <ActionSheet ref={this.props.actionSheetRef} gestureEnabled={true} bounceOnOpen={true}>
        <Box width="100%" paddingX={4} marginBottom={8}>
          <Box width="100%" display="flex" alignItems="end">
            <Box width="33%">
              <Button
                type="ghost"
                text="Save"
                color="blue"
                size="lg"
                onClick={() => {
                  this.props.actionSheetRef?.current?.setModalVisible(false);
                }}
              />
            </Box>
          </Box>
          <DateTimePicker
            testID="dateTimePicker"
            value={moment(this.props.value).toDate()}
            mode={this.props.mode}
            is24Hour={true}
            display="spinner"
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
