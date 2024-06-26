import {Box, Heading, IconButton, Text, Tooltip, TooltipProps} from "ferns-ui";
import React from "react";

export const TooltipDemo = (props: Partial<TooltipProps>) => {
  return (
    <Box alignItems="center" height="100%" justifyContent="center" width="100%">
      <Tooltip idealPosition="top" text="Demo Tooltip" {...props}>
        <IconButton accessibilityLabel="" iconName="hippo" onClick={() => {}} />
      </Tooltip>
    </Box>
  );
};

export const ChevronTooltip = ({
  idealPosition,
  text = "Short Tooltip Text",
  includeArrow,
}: {
  idealPosition: "left" | "right" | "top" | "bottom" | "none";
  text?: string;
  includeArrow?: boolean;
}): React.ReactElement => (
  <IconButton
    accessibilityLabel="info"
    iconName={
      idealPosition === "none"
        ? "question"
        : idealPosition === "bottom"
          ? "chevron-down"
          : idealPosition === "top"
            ? "chevron-up"
            : `chevron-${idealPosition}`
    }
    tooltipIdealPosition={idealPosition as any}
    tooltipIncludeArrow={includeArrow}
    tooltipText={text}
    onClick={() => {}}
  />
);

export const FiveTooltips = ({
  text,
  includeArrow = false,
}: {
  text?: string;
  includeArrow?: boolean;
}): React.ReactElement => (
  <Box direction="row" marginTop={1}>
    <ChevronTooltip idealPosition="left" includeArrow={includeArrow} text={text} />
    <ChevronTooltip idealPosition="top" includeArrow={includeArrow} text={text} />
    <ChevronTooltip idealPosition="bottom" includeArrow={includeArrow} text={text} />
    <ChevronTooltip idealPosition="right" includeArrow={includeArrow} text={text} />
  </Box>
);

export const ToolTipPositions = () => {
  return (
    <Box direction="column" display="flex" height="100%" padding={4} width="100%">
      <Box alignItems="center" height="100%" justifyContent="center" width="100%">
        <Box>
          <Box paddingY={2}>
            <Heading size="sm">Different Positions</Heading>
            <FiveTooltips />
          </Box>
          <Box paddingY={2}>
            <Heading size="sm">Different Positions With Overflow</Heading>
            <FiveTooltips
              text={
                "Here's a much longer tooltip, to test overflows, works very well with multiple lines too!"
              }
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const IncludesArrow = () => {
  return (
    <Box direction="column" display="flex" height="100%" padding={4} width="100%">
      <Box alignItems="center" height="100%" justifyContent="center" width="100%">
        <Box paddingY={2}>
          <Heading size="sm">
            Includes an Arrow - to be used when tooltip areas are crowded together
          </Heading>
          <FiveTooltips includeArrow />
        </Box>
      </Box>
    </Box>
  );
};

export const TooltipOverText = () => {
  return (
    <Box direction="column" display="flex" height="100%" padding={4} width="100%">
      <Box alignItems="center" height="100%" justifyContent="center" width="100%">
        <Box direction="row" paddingY={2}>
          <Tooltip text="Text Tooltip">
            <Text>This text has a tooltip.</Text>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

export const TooltipIcon = () => {
  return (
    <Box direction="column" display="flex" height="100%" padding={4} width="100%">
      <Box alignItems="center" height="100%" justifyContent="center" width="100%">
        <Box paddingY={2}>
          <Heading size="sm">Small Tooltip</Heading>
          <FiveTooltips />
        </Box>
        <Box paddingY={2}>
          <Heading size="sm">Large Tooltip</Heading>
          <FiveTooltips
            text={"Here's a much longer tooltip, to test overflows, and multiple lines too!"}
          />
        </Box>
        <Box paddingY={2}>
          <Heading size="sm">Tooltip on Text</Heading>
          <Tooltip text="Text Tooltip">
            <Text>This text has a tooltip.</Text>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

export const TooltipOverflow = () => {
  const text =
    "Here's a much longer tooltip, to test overflows, works nicely with multiple lines too!";

  return (
    <Box direction="column" display="flex" flex="grow" padding={4} width="100%">
      <Box direction="row" height={40} justifyContent="between" padding={2} width="100%">
        <FiveTooltips text={text} />
        <FiveTooltips text={text} />
      </Box>
      <Box direction="column" height="85%" justifyContent="center" width="100%">
        <Box direction="row" height={40} justifyContent="between" padding={2} width="100%">
          <FiveTooltips text={text} />
          <FiveTooltips text={text} />
        </Box>
      </Box>
      <Box direction="row" height={40} justifyContent="between" padding={2} width="100%">
        <FiveTooltips text={text} />
        <FiveTooltips text={text} />
      </Box>
    </Box>
  );
};
