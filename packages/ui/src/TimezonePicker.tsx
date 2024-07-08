import React from "react";

import {Box} from "./Box";
import {TimezonePickerProps} from "./Common";
import {SelectField} from "./SelectField";

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
        <SelectField options={options} title="Timezone" value={timezone} onChange={onChange} />
      </Box>
    );
  } else {
    return (
      <Box maxWidth={width}>
        <SelectField options={options} value={timezone} onChange={onChange} />
      </Box>
    );
  }
};
