import React from "react";

import {Box} from "./Box";
import {TimezonePickerProps} from "./Common";
import {SelectList} from "./SelectList";
import {WithLabel} from "./WithLabel";

// TODO: Support world wide timezones
const options = [
  {label: "Eastern", value: "America/New_York"},
  {label: "Central", value: "America/Chicago"},
  {label: "Mountain", value: "America/Denver"},
  {label: "Pacific", value: "America/Los_Angeles"},
  {label: "Alaska", value: "America/Anchorage"},
  {label: "Hawaii", value: "Pacific/Honolulu"},
  {label: "Arizona", value: "America/Phoenix"},
];

export const TimezonePicker = ({
  timezone,
  onChange,
  showLabel,
  width = 100,
}: TimezonePickerProps): React.ReactElement => {
  if (showLabel) {
    return (
      <Box maxWidth={width}>
        <WithLabel label="Timezone">
          <SelectList
            allowClear
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
      <Box maxWidth={width}>
        <SelectList
          allowClear
          options={options}
          style={{minHeight: 40}}
          value={timezone}
          onChange={onChange}
        />
      </Box>
    );
  }
};
