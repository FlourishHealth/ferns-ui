import {Box, Heading, IconButton, InfoTooltipButton, Text, Tooltip} from "ferns-ui";
import React from "react";

const ChevronTooltip = ({
  idealDirection,
  text = "Short Tooltip Text",
}: {
  idealDirection: "left" | "right" | "top" | "bottom" | "none";
  text?: string;
}): React.ReactElement => (
  <IconButton
    accessibilityLabel="info"
    bgColor="white"
    icon={
      idealDirection === "none"
        ? "question"
        : idealDirection === "bottom"
          ? "chevron-down"
          : idealDirection === "top"
            ? "chevron-up"
            : `chevron-${idealDirection}`
    }
    iconColor="blue"
    tooltip={{text, idealDirection: idealDirection === "none" ? undefined : idealDirection}}
    onClick={() => {}}
  />
);

const FiveTooltips = ({text}: {text?: string}): React.ReactElement => (
  <Box direction="row">
    <ChevronTooltip idealDirection="none" text={text} />
    <ChevronTooltip idealDirection="top" text={text} />
    <ChevronTooltip idealDirection="right" text={text} />
    <ChevronTooltip idealDirection="bottom" text={text} />
    <ChevronTooltip idealDirection="left" text={text} />
    <IconButton
      accessibilityLabel="delete"
      bgColor="gray"
      icon="trash"
      iconColor="red"
      tooltip={{text: "Deletes some stuff", idealDirection: "bottom"}}
      onClick={() => {
        console.info("Click delete");
      }}
    />
    <InfoTooltipButton text="This is info in a tooltip" />
  </Box>
);

const TooltipIcon = () => {
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
