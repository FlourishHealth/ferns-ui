import {Box, Heading, IconButton, InfoTooltipButton, Text, Tooltip} from "ferns-ui";
import React from "react";

export const TooltipDemo = () => {
  return (
    <Box paddingY={2}>
      <Heading size="sm">Small Tooltip</Heading>
      <FiveTooltips />
    </Box>
  );
};

export const ChevronTooltip = ({
  idealPosition,
  text = "Short Tooltip Text",
}: {
  idealPosition: "left" | "right" | "top" | "bottom" | "none";
  text?: string;
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
    tooltipIdealPosition="bottom"
    tooltipText={text}
    onClick={() => {}}
  />
);

export const FiveTooltips = ({text}: {text?: string}): React.ReactElement => (
  <Box direction="row">
    <ChevronTooltip idealPosition="none" text={text} />
    <ChevronTooltip idealPosition="top" text={text} />
    <ChevronTooltip idealPosition="right" text={text} />
    <ChevronTooltip idealPosition="bottom" text={text} />
    <ChevronTooltip idealPosition="left" text={text} />
    <IconButton
      accessibilityLabel="delete"
      iconName="trash"
      tooltipIdealPosition="bottom"
      tooltipText="Delete some stuff"
      onClick={() => {
        console.info("Click delete");
      }}
    />
    <InfoTooltipButton text="This is info in a tooltip" />
  </Box>
);

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
            text={
              "Here's a much longer tooltip, to test overflows, especially on mobile, and multiple lines too!"
            }
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
    "Here's a much longer tooltip, to test overflows, especially on mobile, and multiple lines too!";

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
