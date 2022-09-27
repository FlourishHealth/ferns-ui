import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment-timezone";
import React, {ReactElement} from "react";

import {Box} from "./Box";
import {DateTimeFieldProps} from "./Common";
import {WithLabel} from "./WithLabel";

export const DateTimeField = ({
  mode,
  value,
  onChange,
  errorMessage,
  errorMessageColor,
}: DateTimeFieldProps): ReactElement => {
  return (
    <WithLabel
      label={errorMessage}
      labelColor={errorMessageColor || "red"}
      labelPlacement="after"
      labelSize="sm"
    >
      <WithLabel>
        <Box maxWidth={300}>
          <DateTimePicker
            display="spinner"
            mode={mode}
            testID="dateTimePicker"
            value={moment(value).toDate()}
            onChange={(event: any, date: any) => {
              if (!date) {
                return;
              }
              onChange(value);
            }}
          />
        </Box>
      </WithLabel>
    </WithLabel>
  );
};
