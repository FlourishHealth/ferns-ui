import {Box, Heading, IconButton, Tooltip} from "ferns-ui";
import React from "react";

const ChevronTooltip = ({
  direction,
  text = "Short Tooltip Text",
}: {
  direction: "left" | "right" | "top" | "bottom" | "none";
  text?: string;
}): React.ReactElement => (
  <Tooltip direction={direction === "none" ? undefined : direction} title={text}>
    <IconButton
      accessibilityLabel="info"
      bgColor="white"
      icon={
        direction === "none"
          ? "question"
          : direction === "bottom"
          ? "chevron-down"
          : direction === "top"
          ? "chevron-up"
          : `chevron-${direction}`
      }
      iconColor="blue"
      onClick={() => {}}
    />
  </Tooltip>
);

const FiveTooltips = ({text}: {text?: string}): React.ReactElement => (
  <Box direction="row">
    <ChevronTooltip direction="none" text={text} />
    <ChevronTooltip direction="top" text={text} />
    <ChevronTooltip direction="right" text={text} />
    <ChevronTooltip direction="bottom" text={text} />
    <ChevronTooltip direction="left" text={text} />
  </Box>
);

const TooltipIcon = () => {
  return (
    <Box direction="column" display="flex" height="100%" padding={4} width="100%">
      <Box alignItems="center" height="100%" justifyContent="center" width="100%">
        <Heading size="sm">Small Tooltip</Heading>
        <FiveTooltips />
        <Heading size="sm">Large Tooltip</Heading>
        <FiveTooltips
          text={
            "Here's a much longer tooltip, to test overflows, especially on mobile, and multiple lines too!"
          }
        />
      </Box>
    </Box>
  );
};

const TooltipOverflow = () => {
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

export const TooltipStories = {
  title: "Tooltip",
  component: Tooltip,
  stories: {
    TooltipIcon() {
      return <TooltipIcon />;
    },
    TooltipOverflow() {
      return <TooltipOverflow />;
    },
  },
};
