import {Box, IconButton, IconButtonProps, Text} from "ferns-ui";
import React from "react";

export const IconButtonDemo = (props: Partial<IconButtonProps>) => {
  return (
    <Box alignItems="center" justifyContent="center">
      <IconButton
        accessibilityLabel="Demo IconButton"
        iconName="lightbulb"
        onClick={() => console.info("clicked")}
        {...props}
      />
    </Box>
  );
};

export const ConfirmationIconButton = (props: Partial<IconButtonProps>) => {
  return (
    <Box padding={4}>
      <IconButton
        accessibilityLabel="add item"
        iconName="plus"
        withConfirmation
        onClick={() => {
          console.info("Clicked!");
        }}
        {...props}
      />
    </Box>
  );
};

export const ToolTipIconButton = (props: Partial<IconButtonProps>) => {
  return (
    <Box direction="row" padding={4} wrap>
      <Box marginRight={1}>
        <IconButton
          accessibilityLabel=""
          iconName="trash"
          tooltipIdealPosition="bottom"
          tooltipText="Delete Demo"
          onClick={() => {
            console.info("Click delete");
          }}
          {...props}
        />
      </Box>
      <IconButton
        accessibilityLabel=""
        iconName="floppy-disk"
        tooltipIdealPosition="top"
        tooltipIncludeArrow
        tooltipText="Save With Arrow Demo"
        onClick={() => {
          console.info("Click delete");
        }}
        {...props}
      />
    </Box>
  );
};

export const LoadingIconButton = (props: Partial<IconButtonProps>) => {
  return (
    <Box direction="row" wrap>
      <Box padding={4}>
        <IconButton
          accessibilityLabel="add item"
          iconName="plus"
          onClick={async () => {
            return new Promise((resolve) => {
              setTimeout(resolve, 2 * 1000);
            });
          }}
          {...props}
        />
      </Box>
      <Box padding={4}>
        <IconButton
          accessibilityLabel="add item"
          iconName="plus"
          loading
          onClick={async () => {
            return new Promise((resolve) => {
              setTimeout(resolve, 2 * 1000);
            });
          }}
          {...props}
        />
      </Box>
    </Box>
  );
};

export const IndicatorIconButton = (props: Partial<IconButtonProps>) => {
  return (
    <Box direction="row" wrap>
      <Box padding={4}>
        <IconButton
          accessibilityLabel="add item"
          iconName="plus"
          indicator="primary"
          indicatorText="2"
          onClick={() => {}}
          {...props}
        />
      </Box>
      <Box padding={4}>
        <IconButton
          accessibilityLabel="add item"
          iconName="plus"
          indicator="error"
          onClick={() => {}}
          {...props}
        />
      </Box>
    </Box>
  );
};

export const NavigationIconButton = (props: Partial<IconButtonProps>) => {
  return (
    <Box direction="row" wrap>
      <Box padding={4}>
        <IconButton
          accessibilityLabel="add item"
          iconName="house"
          indicator="primary"
          indicatorText="2"
          variant="navigation"
          onClick={() => {}}
          {...props}
        />
      </Box>
      <Box padding={4}>
        <IconButton
          accessibilityLabel="add item"
          iconName="triangle-exclamation"
          indicator="error"
          indicatorText="8"
          variant="navigation"
          onClick={() => {}}
          {...props}
        />
      </Box>
    </Box>
  );
};

export const DisabledIconButton = (props: Partial<IconButtonProps>) => {
  return (
    <Box padding={4}>
      <IconButton
        accessibilityLabel="add item"
        disabled
        iconName="plus"
        onClick={() => {}}
        {...props}
      />
    </Box>
  );
};

export const AllButtonIconVariants = (props: Partial<IconButtonProps>) => {
  return (
    <Box direction="row" wrap>
      <Box alignItems="center" paddingX={2}>
        <Text>Primary</Text>
        <Box padding={1}>
          <IconButton
            accessibilityLabel="add item"
            iconName="plus"
            onClick={() => console.info("clicked")}
            {...props}
          />
        </Box>
      </Box>
      <Box alignItems="center" paddingX={2}>
        <Text>Secondary</Text>
        <Box padding={1}>
          <IconButton
            accessibilityLabel="add item"
            iconName="plus"
            variant="secondary"
            onClick={() => console.info("clicked")}
            {...props}
          />
        </Box>
      </Box>
      <Box alignItems="center" paddingX={2}>
        <Text>Muted</Text>
        <Box padding={1}>
          <IconButton
            accessibilityLabel="add item"
            iconName="plus"
            variant="muted"
            onClick={() => console.info("clicked")}
            {...props}
          />
        </Box>
      </Box>
      <Box alignItems="center" paddingX={2}>
        <Text>Destructive</Text>
        <Box padding={1}>
          <IconButton
            accessibilityLabel="remove item"
            iconName="trash"
            variant="destructive"
            onClick={() => console.info("clicked")}
            {...props}
          />
        </Box>
      </Box>
      <Box alignItems="center" paddingX={2}>
        <Text>Disabled</Text>
        <IconButton
          accessibilityLabel="add item"
          disabled
          iconName="plus"
          onClick={() => {}}
          {...props}
        />
      </Box>
    </Box>
  );
};
