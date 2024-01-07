import React from "react";

import {InfoTooltipButtonProps} from "./Common";
import {IconButton} from "./IconButton";

export function InfoTooltipButton({text, size}: InfoTooltipButtonProps): React.ReactElement {
  return (
    <IconButton
      accessibilityLabel="info"
      bgColor="transparent"
      icon="exclamation"
      iconColor="blue"
      size={size}
      tooltip={{text}}
      onClick={() => {}}
    />
  );
}
