import React from "react";

import {Box} from "./Box";
import {TimezonePickerProps} from "./Common";
import {SelectList} from "./SelectList";
import {WithLabel} from "./WithLabel";

// TODO: Support world wide timezones
const options = [
  {label: "EST", value: "America/New_York"},
  {label: "CST", value: "America/Chicago"},
  {label: "MST", value: "America/Denver"},
  {label: "PST", value: "America/Los_Angeles"},
  {label: "AK", value: "America/Anchorage"},
  {label: "HI", value: "America/Honolulu"},
  {label: "AZ", value: "America/Phoenix"},
];

export const TimezonePicker = ({
  timezone,
  onChange,
  showLabel,
}: TimezonePickerProps): React.ReactElement => {
  if (showLabel) {
    return (
      <Box maxWidth={100}>
        <WithLabel label="Timezone">
          <SelectList
            options={options}
            style={{minHeight: 40}}
            value={timezone}
            onChange={onChange}
          />
        </WithLabel>
      </Box>
    );
  } else {
    return (
      <SelectList options={options} style={{minHeight: 40}} value={timezone} onChange={onChange} />
    );
  }
};
