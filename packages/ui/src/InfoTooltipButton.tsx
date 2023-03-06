import React from "react";

import {IconSize} from "./Common";
import {IconButton} from "./IconButton";

interface InfoTooltipButtonProps {
  text: string;
  size?: IconSize;
}

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
