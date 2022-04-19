import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment-timezone";
import React from "react";

import {ActionSheet} from "./ActionSheet";
import {Box} from "./Box";
import {Button} from "./Button";
import {OnChangeCallback} from "./Common";

interface DateTimeActionSheetProps {
  value?: string;
  mode?: "date" | "time";
  onChange: OnChangeCallback;
  actionSheetRef: React.RefObject<any>;
}

interface DateTimeActionSheetState {}

export class DateTimeActionSheet extends React.Component<
  DateTimeActionSheetProps,
  DateTimeActionSheetState
> {
  constructor(props: DateTimeActionSheetProps) {
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
            value={moment(this.props.value).toDate()}
            onChange={(event: any, date: any) => {
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
