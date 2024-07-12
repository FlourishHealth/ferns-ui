import React from "react";

import {InfoTooltipButtonProps} from "./Common";
import {IconButton} from "./IconButton";

export const InfoTooltipButton = ({text}: InfoTooltipButtonProps): React.ReactElement => {
  return (
    <IconButton
      accessibilityHint="Show info tooltip"
      accessibilityLabel="info"
      iconName="exclamation"
      tooltipText={text}
      onClick={() => {}}
    />
  );
};
