import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment-timezone";
import React, {ReactElement} from "react";
import {View} from "react-native";

import {DateTimeFieldProps} from "./Common";
import {Unifier} from "./Unifier";
import {WithLabel} from "./WithLabel";

export const DateTimeField = ({
  mode,
  value,
  onChange,
  errorMessage,
  errorMessageColor,
  pickerType = "compact",
  label,
}: DateTimeFieldProps): ReactElement => {
  return (
    <WithLabel label={label} labelSize="lg">
      <WithLabel
        label={errorMessage}
        labelColor={errorMessageColor || "red"}
        labelPlacement="after"
        labelSize="sm"
      >
        {/* <Box justifyContent="center"> */}
        <View>
          <DateTimePicker
            accentColor={Unifier.theme.primary}
            display={pickerType}
            mode={mode}
            style={{alignSelf: "flex-start"}}
            testID="dateTimePicker"
            value={moment(value).toDate()}
            onChange={(event: any, date: any) => {
              if (!date) {
                return;
              }
              onChange(value);
            }}
          />
        </View>
        {/* </Box> */}
      </WithLabel>
    </WithLabel>
  );
};
