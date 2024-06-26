import * as React from "react";
import {FC, useCallback, useContext, useEffect, useRef, useState} from "react";
import {
  Dimensions,
  LayoutChangeEvent,
  LayoutRectangle,
  Platform,
  Pressable,
  View,
} from "react-native";
import {Portal} from "react-native-portalize";

import {TooltipPosition, TooltipProps} from "./Common";
import {Text} from "./Text";
import {ThemeContext} from "./Theme";

const TOOLTIP_OFFSET = 8;
// How many pixels to leave between the tooltip and the edge of the screen
const TOOLTIP_OVERFLOW_PADDING = 20;

type ChildrenMeasurement = {
  width: number;
  height: number;
  pageX: number;
  pageY: number;
};

type Measurement = {
  children: ChildrenMeasurement;
  tooltip: LayoutRectangle;
  measured: boolean;
  idealPosition?: TooltipPosition;
};

const overflowLeft = (x: number): boolean => x < TOOLTIP_OVERFLOW_PADDING;

const overflowRight = (x: number): boolean => {
  const {width: layoutWidth} = Dimensions.get("window");
  return x + TOOLTIP_OVERFLOW_PADDING > layoutWidth;
};

const getTooltipPosition = ({
  children,
  tooltip,
  measured,
  idealPosition,
}: Measurement): {} | {left: number; top: number} => {
  if (!measured) {
    console.debug("No measurements for child yet, cannot show tooltip yet.");
    return {};
  }

  const {
    pageY: childrenY,
    height: childrenHeight,
    pageX: childrenX,
    width: childrenWidth,
  }: ChildrenMeasurement = children;
  const {width: tooltipWidth, height: tooltipHeight} = tooltip;
  const horizontalCenter = childrenX + childrenWidth / 2;
  const right = childrenX + childrenWidth + TOOLTIP_OFFSET;
  const left = childrenX - tooltipWidth - TOOLTIP_OFFSET;

  const top = childrenY - tooltipHeight - TOOLTIP_OFFSET;
  const bottom = childrenY + childrenHeight + TOOLTIP_OFFSET;
  const verticalCenter = top + childrenHeight + TOOLTIP_OFFSET;

  // Top is overflowed if it would go off either side or the top of the screen.
  const overflowTop = top < TOOLTIP_OVERFLOW_PADDING;

  // Bottom is overflowed if it would go off either side or the bottom of the screen.
  const overflowBottom =
    bottom + tooltipHeight + TOOLTIP_OVERFLOW_PADDING > Dimensions.get("window").height;

  // If it would overflow to the right, try to put it above, if not, put it on the left.
  // If it would overflow to the left, try to put it above, if not, put it to the right.

  // Happy path:
  if (idealPosition === "left" && !overflowLeft(left)) {
    return {left, top: verticalCenter};
  } else if (idealPosition === "right" && !overflowRight(right + tooltipWidth)) {
    return {left: right, top: verticalCenter};
  } else if (
    idealPosition === "bottom" &&
    !overflowBottom &&
    !overflowLeft(horizontalCenter - tooltipWidth) &&
    !overflowRight(horizontalCenter + tooltipWidth)
  ) {
    return {left: horizontalCenter - tooltipWidth / 2, top: bottom};
  } else {
    let y = top;
    if ((idealPosition === "bottom" && !overflowBottom) || overflowTop) {
      y = bottom;
    }

    if (
      !overflowLeft(horizontalCenter - tooltipWidth) &&
      !overflowRight(horizontalCenter + tooltipWidth)
    ) {
      return {left: horizontalCenter - tooltipWidth / 2, top: y};
    } else if (overflowLeft(horizontalCenter - tooltipWidth)) {
      return {left: TOOLTIP_OVERFLOW_PADDING, top: y};
    } else {
      return {
        left: Dimensions.get("window").width - TOOLTIP_OVERFLOW_PADDING - tooltipWidth,
        top: y,
      };
    }
  }
};

export const Tooltip: FC<TooltipProps> = ({text, children, idealPosition}) => {
  const {theme} = useContext(ThemeContext);
  const hoverDelay = 500;
  const hoverEndDelay = 0;
  const [visible, setVisible] = useState(false);

  const [measurement, setMeasurement] = useState<Measurement>({
    children: {width: 0, height: 0, pageX: 0, pageY: 0},
    tooltip: {x: 0, y: 0, width: 0, height: 0},
    measured: false,
  });
  const showTooltipTimer = useRef<NodeJS.Timeout>();
  const hideTooltipTimer = useRef<NodeJS.Timeout>();
  const childrenWrapperRef = useRef<View>(null);
  const touched = useRef(false);
  const isWeb = Platform.OS === "web";

  // If the tooltip is visible, and the user clicks outside of the tooltip, hide it.
  useEffect(() => {
    return () => {
      if (showTooltipTimer.current) {
        clearTimeout(showTooltipTimer.current);
      }

      if (hideTooltipTimer.current) {
        clearTimeout(hideTooltipTimer.current);
      }
    };
  }, []);

  const handleOnLayout = ({nativeEvent: {layout}}: LayoutChangeEvent) => {
    if (childrenWrapperRef?.current && !childrenWrapperRef?.current?.measure) {
      console.error("Tooltip: childrenWrapperRef does not have a measure method.");
      return;
    } else if (!childrenWrapperRef?.current) {
      console.error("Tooltip: childrenWrapperRef is null.");
    }
    childrenWrapperRef?.current?.measure((_x, _y, width, height, pageX, pageY) => {
      setMeasurement({
        children: {pageX, pageY, height, width},
        tooltip: {...layout},
        measured: true,
      });
    });
  };

  const handleTouchStart = () => {
    if (hideTooltipTimer.current) {
      clearTimeout(hideTooltipTimer.current);
    }

    showTooltipTimer.current = setTimeout(() => {
      touched.current = true;
      setVisible(true);
    }, 100);
  };

  const handleHoverIn = () => {
    if (hideTooltipTimer.current) {
      clearTimeout(hideTooltipTimer.current);
    }

    showTooltipTimer.current = setTimeout(() => {
      touched.current = true;
      setVisible(true);
    }, hoverDelay);
  };

  const handleHoverOut = () => {
    touched.current = false;
    if (showTooltipTimer.current) {
      clearTimeout(showTooltipTimer.current);
    }

    hideTooltipTimer.current = setTimeout(() => {
      setVisible(false);
      setMeasurement({
        children: {width: 0, height: 0, pageX: 0, pageY: 0},
        tooltip: {x: 0, y: 0, width: 0, height: 0},
        measured: false,
      });
    }, hoverEndDelay);
  };

  const mobilePressProps = {
    onPress: useCallback(() => {
      if (!touched.current) {
        children.props.onClick?.();
      }
    }, [children.props]),
  };

  // Allow disabling tooltips when there is no string,
  // otherwise you need to wrap the children in a function to determine if there should be a tooltip
  // or not, which gets messy.
  if (!text) {
    return children;
  }

  return (
    <>
      {visible && (
        <Portal>
          <Pressable
            accessibilityHint="Tooltip information"
            accessibilityLabel={text}
            accessibilityRole="button"
            style={{
              alignSelf: "flex-start",
              justifyContent: "center",
              paddingHorizontal: 8,
              backgroundColor: theme.surface.secondaryExtraDark,
              borderRadius: theme.radius.default as any,
              paddingVertical: 2,
              display: "flex",
              flexShrink: 1,
              maxWidth: 320,
              ...getTooltipPosition({...(measurement as Measurement), idealPosition}),
              ...(measurement.measured ? {opacity: 1} : {opacity: 0}),
            }}
            testID="tooltip-container"
            onLayout={handleOnLayout}
            onPress={() => setVisible(false)}
          >
            <Text color="inverted" size="sm">
              {text}
            </Text>
          </Pressable>
        </Portal>
      )}
      <View
        ref={childrenWrapperRef}
        onPointerEnter={() => {
          handleHoverIn();
          children.props.onHoverIn?.();
        }}
        onPointerLeave={() => {
          handleHoverOut();
          children.props.onHoverOut?.();
        }}
        onTouchStart={handleTouchStart}
        {...(!isWeb && mobilePressProps)}
      >
        {children}
      </View>
    </>
  );
};
