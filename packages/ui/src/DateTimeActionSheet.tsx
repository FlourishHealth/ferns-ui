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

export function DateTimeActionSheet({
  actionSheetRef,
  mode,
  value,
  onChange,
}: DateTimeActionSheetProps) {
  return (
    <ActionSheet ref={actionSheetRef} bounceOnOpen gestureEnabled>
      <Box marginBottom={8} paddingX={4} width="100%">
        <Box alignItems="end" display="flex" width="100%">
          <Box width="33%">
            <Button
              color="blue"
              size="lg"
              text="Save"
              type="ghost"
              onClick={() => {
                actionSheetRef?.current?.setModalVisible(false);
              }}
            />
          </Box>
        </Box>
        <DateTimePicker
          display="spinner"
          is24Hour
          mode={mode}
          testID="dateTimePicker"
          value={moment(value).toDate()}
          onChange={(event: any, date: any) => {
            if (!date) {
              return;
            }
            onChange({event, value: date.toString()});
          }}
        />
      </Box>
    </ActionSheet>
  );
}
