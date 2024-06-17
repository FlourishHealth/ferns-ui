import React from "react";

import {InfoTooltipButtonProps} from "./Common";
import {IconButton} from "./IconButton";

export const InfoTooltipButton = ({text, size}: InfoTooltipButtonProps): React.ReactElement => {
  return (
    <IconButton
      accessibilityLabel="info"
      icon="exclamation"
      size={size}
      tooltip={{text}}
      onClick={() => {}}
    />
  );
};
