import * as React from "react";
import {FC, useCallback, useEffect, useRef, useState} from "react";
import {
  Dimensions,
  LayoutChangeEvent,
  LayoutRectangle,
  Platform,
  Pressable,
  View,
  ViewStyle,
} from "react-native";
import {Portal} from "react-native-portalize";

import {TooltipPosition, TooltipProps} from "./Common";
import {Text} from "./Text";
import {useTheme} from "./Theme";

const TOOLTIP_OFFSET = 6;
// How many pixels to leave between the tooltip and the edge of the screen
const TOOLTIP_OVERFLOW_PADDING = 20;

type ChildrenMeasurement = {
  width: number;
  height: number;
  pageX: number;
  pageY: number;
};

// empty object is a fallback for when the tooltip is not measured yet
type Measurement = {
  children: ChildrenMeasurement | {};
  tooltip: LayoutRectangle | {};
  measured: boolean;
  idealPosition?: TooltipPosition;
};

const getTooltipPosition = ({
  children,
  tooltip,
  measured,
  idealPosition,
}: Measurement): {} | {left: number; top: number; finalPosition: TooltipPosition} => {
  if (!measured) {
    console.debug("No measurements for child yet, cannot show tooltip yet.");
    return {};
  }

  const {
    pageY: childrenY,
    height: childrenHeight,
    pageX: childrenX,
    width: childrenWidth,
  }: ChildrenMeasurement = children as ChildrenMeasurement;
  const {width: tooltipWidth, height: tooltipHeight} = tooltip as LayoutRectangle;

  const horizontalCenter = childrenX + childrenWidth / 2;
  const right = childrenX + childrenWidth + TOOLTIP_OFFSET;
  const left = childrenX - tooltipWidth - TOOLTIP_OFFSET;
  const top = childrenY - tooltipHeight - TOOLTIP_OFFSET;
  const bottom = childrenY + childrenHeight + TOOLTIP_OFFSET;
  const verticalCenter = childrenY + childrenHeight / 2 - tooltipHeight / 2;

  const overflowTop = top < TOOLTIP_OVERFLOW_PADDING;
  const overflowBottom =
    bottom + tooltipHeight + TOOLTIP_OVERFLOW_PADDING > Dimensions.get("window").height;
  const overflowLeft = left < TOOLTIP_OVERFLOW_PADDING;
  const overflowRight =
    right + tooltipWidth > Dimensions.get("window").width - TOOLTIP_OVERFLOW_PADDING;
  let finalPosition: TooltipPosition = idealPosition || "top";
  // Try to place the tooltip in the ideal position if possible
  switch (idealPosition) {
    case "left":
      if (!overflowLeft) {
        return {left, top: verticalCenter, finalPosition};
      }
      break;
    case "right":
      if (!overflowRight) {
        return {left: right, top: verticalCenter, finalPosition};
      }
      break;
    case "top":
      if (!overflowTop) {
        return {left: horizontalCenter - tooltipWidth / 2, top, finalPosition};
      }
      break;
    case "bottom":
      if (!overflowBottom) {
        return {left: horizontalCenter - tooltipWidth / 2, top: bottom, finalPosition};
      }
      break;
  }

  // Fallback to an alternate position if the ideal position overflows
  if (!overflowBottom) {
    finalPosition = "bottom";
    return {left: horizontalCenter - tooltipWidth / 2, top: bottom, finalPosition};
  } else if (!overflowTop) {
    finalPosition = "top";
    return {left: horizontalCenter - tooltipWidth / 2, top, finalPosition};
  } else if (!overflowLeft) {
    finalPosition = "left";
    return {left, top: verticalCenter, finalPosition};
  } else {
    finalPosition = "right";
    return {
      left: Dimensions.get("window").width - TOOLTIP_OVERFLOW_PADDING - tooltipWidth,
      top: verticalCenter,
      finalPosition,
    };
  }
};

const Arrow: FC<{position: TooltipPosition; color: string}> = ({position, color}) => {
  const getArrowStyle = (): ViewStyle => {
    const arrowStyles = {
      top: {
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderTopWidth: 6,
        marginBottom: 8,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: color,
      },
      bottom: {
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderBottomWidth: 6,
        marginTop: 8,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderTopColor: color,
      },
      left: {
        borderTopWidth: 6,
        borderBottomWidth: 6,
        borderLeftWidth: 6,
        marginRight: 8,
        borderTopColor: "transparent",
        borderBottomColor: "transparent",
        borderLeftColor: color,
      },
      right: {
        borderTopWidth: 6,
        borderBottomWidth: 6,
        borderRightWidth: 6,
        marginLeft: 8,
        borderTopColor: "transparent",
        borderBottomColor: "transparent",
        borderRightColor: color,
      },
    };
    return {
      width: 0,
      height: 0,
      alignSelf: "center",
      borderStyle: "solid",
      ...arrowStyles[position],
    } as ViewStyle;
  };

  const arrowStyle = getArrowStyle();
  return <View style={arrowStyle} />;
};

export const Tooltip: FC<TooltipProps> = ({text, children, idealPosition, includeArrow}) => {
  const {theme} = useTheme();
  const hoverDelay = 800;
  const hoverEndDelay = 0;
  const [visible, setVisible] = useState(false);
  const [finalPosition, setFinalPosition] = useState<TooltipPosition>("top");

  const [measurement, setMeasurement] = useState<Measurement>({
    children: {},
    tooltip: {},
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

  const getArrowContainerStyle = (): ViewStyle => {
    if (!includeArrow) {
      return {};
    }
    const containerStyles = {
      top: {
        bottom: -12,
        left: "50%",
        transform: [{translateX: -6}],
      },
      bottom: {
        top: -12,
        left: "50%",
        transform: [{translateX: -6}],
      },
      left: {
        right: -12,
        top: "50%",
        transform: [{translateY: -6}],
      },
      right: {
        left: -12,
        top: "50%",
        transform: [{translateY: -6}],
      },
    };
    return {position: "absolute", ...containerStyles[finalPosition]} as ViewStyle;
  };

  const arrowContainerStyles = getArrowContainerStyle();

  const handleOnLayout = useCallback(
    ({nativeEvent: {layout}}: LayoutChangeEvent) => {
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
        const position = getTooltipPosition({
          children: {pageX, pageY, height, width},
          tooltip: {...layout},
          measured: true,
          idealPosition,
        });
        if ("finalPosition" in position) {
          setFinalPosition(position.finalPosition);
        }
      });
    },
    [setMeasurement, idealPosition]
  );

  const handleTouchStart = useCallback(() => {
    if (hideTooltipTimer.current) {
      clearTimeout(hideTooltipTimer.current);
    }

    showTooltipTimer.current = setTimeout(() => {
      touched.current = true;
      setVisible(true);
    }, 100);
  }, []);

  const handleHoverIn = useCallback(() => {
    if (hideTooltipTimer.current) {
      clearTimeout(hideTooltipTimer.current);
    }

    showTooltipTimer.current = setTimeout(() => {
      touched.current = true;
      setVisible(true);
    }, hoverDelay);
  }, [hoverDelay]);

  const handleHoverOut = useCallback(() => {
    touched.current = false;
    if (showTooltipTimer.current) {
      clearTimeout(showTooltipTimer.current);
    }

    hideTooltipTimer.current = setTimeout(() => {
      setVisible(false);
      setMeasurement({
        children: {},
        tooltip: {},
        measured: false,
      });
    }, hoverEndDelay);
  }, [hoverEndDelay]);

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
    <View>
      {visible && (
        <Portal>
          <View
            style={{
              position: "absolute",
              zIndex: 999,
              ...getTooltipPosition({...(measurement as Measurement), idealPosition}),
            }}
            onLayout={handleOnLayout}
          >
            {includeArrow && isWeb && (
              <View style={arrowContainerStyles as ViewStyle}>
                <Arrow color={theme.surface.secondaryExtraDark} position={finalPosition} />
              </View>
            )}
            <View
              style={{
                backgroundColor: theme.surface.secondaryExtraDark,
                borderRadius: theme.radius.default,
                paddingVertical: 2,
                paddingHorizontal: 8,
                maxWidth: 320,
                display: "flex",
                flexShrink: 1,
                opacity: measurement.measured ? 1 : 0,
              }}
            >
              <Pressable
                accessibilityHint="Tooltip information"
                accessibilityLabel={text}
                accessibilityRole="button"
                style={{
                  backgroundColor: theme.surface.secondaryExtraDark,
                  borderRadius: theme.radius.default,
                }}
                testID="tooltip-container"
                onPress={() => setVisible(false)}
              >
                <Text color="inverted" size="sm">
                  {text}
                </Text>
              </Pressable>
            </View>
          </View>
        </Portal>
      )}
      <View
        ref={childrenWrapperRef}
        hitSlop={{top: 10, bottom: 10, left: 15, right: 15}}
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
    </View>
  );
};
