import * as React from "react";
import {
  Dimensions,
  LayoutChangeEvent,
  LayoutRectangle,
  Platform,
  Pressable,
  View,
} from "react-native";
import {Portal} from "react-native-portalize";

import {TooltipDirection} from "./Common";
import {Text} from "./Text";
import {Unifier} from "./Unifier";

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
  idealDirection?: TooltipDirection;
};

const overflowLeft = (x: number): boolean => {
  return x < TOOLTIP_OVERFLOW_PADDING;
};

const overflowRight = (x: number): boolean => {
  const {width: layoutWidth} = Dimensions.get("window");
  return x + TOOLTIP_OVERFLOW_PADDING > layoutWidth;
};

const getTooltipPosition = ({
  children,
  tooltip,
  measured,
  idealDirection,
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
  if (idealDirection === "left" && !overflowLeft(left)) {
    return {left, top: verticalCenter};
  } else if (idealDirection === "right" && !overflowRight(right + tooltipWidth)) {
    return {left: right, top: verticalCenter};
  } else if (
    idealDirection === "bottom" &&
    !overflowBottom &&
    !overflowLeft(horizontalCenter - tooltipWidth) &&
    !overflowRight(horizontalCenter + tooltipWidth)
  ) {
    return {left: horizontalCenter - tooltipWidth / 2, top: bottom};
  } else {
    // At this point, we're either trying to place it above or below, and force it into the viewport.

    let y = top;
    if ((idealDirection === "bottom" && !overflowBottom) || overflowTop) {
      y = bottom;
    }

    // If it fits in the viewport, center it above the child.
    if (
      !overflowLeft(horizontalCenter - tooltipWidth) &&
      !overflowRight(horizontalCenter + tooltipWidth)
    ) {
      return {left: horizontalCenter - tooltipWidth / 2, top: y};
    }
    // Failing that, if it fits on the left, put it there, otherwise to the right. We know it's smaller than the
    // viewport.
    else if (overflowLeft(horizontalCenter - tooltipWidth)) {
      return {left: TOOLTIP_OVERFLOW_PADDING, top: y};
    } else {
      return {
        left: Dimensions.get("window").width - TOOLTIP_OVERFLOW_PADDING - tooltipWidth,
        top: y,
      };
    }
  }
};

interface TooltipProps {
  children: React.ReactElement;
  // If text is undefined, the children will be rendered without a tooltip.
  text?: string;
  idealDirection?: "top" | "bottom" | "left" | "right";
  bgColor?: "white" | "lightGray" | "gray" | "darkGray";
}

export const Tooltip = (props: TooltipProps) => {
  const {text, children, bgColor, idealDirection} = props;
  const hoverDelay = 500;
  const hoverEndDelay = 1500;
  const [visible, setVisible] = React.useState(false);

  const [measurement, setMeasurement] = React.useState({
    children: {},
    tooltip: {},
    measured: false,
  });
  const showTooltipTimer = React.useRef<NodeJS.Timeout>();
  const hideTooltipTimer = React.useRef<NodeJS.Timeout>();
  const childrenWrapperRef = React.useRef() as React.MutableRefObject<View>;

  const touched = React.useRef(false);

  const isWeb = Platform.OS === "web";

  React.useEffect(() => {
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
      setMeasurement({children: {}, tooltip: {}, measured: false});
    }, hoverEndDelay);
  };

  const mobilePressProps = {
    onPress: React.useCallback(() => {
      if (touched.current) {
        return null;
      } else {
        return children.props.onClick?.();
      }
    }, [children.props]),
  };

  // Allow disabling tooltips when there is no string, otherwise you need to wrap the children in a function to
  // determine if there should be a tooltip or not, which gets messy.
  if (!text) {
    return children;
  }

  return (
    <>
      {visible && (
        <Portal>
          <Pressable
            style={{
              alignSelf: "flex-start",
              justifyContent: "center",
              paddingHorizontal: 16,
              backgroundColor: Unifier.theme[bgColor ?? "darkGray"],
              borderRadius: 16,
              paddingVertical: 8,
              display: "flex",
              flexShrink: 1,
              maxWidth: Math.max(Dimensions.get("window").width - 32, 300),
              ...getTooltipPosition({...(measurement as Measurement), idealDirection}),
              ...(measurement.measured ? {opacity: 1} : {opacity: 0}),
            }}
            testID="tooltip-container"
            onLayout={handleOnLayout}
            onPress={() => {
              setVisible(false);
            }}
          >
            <Text color="white">{text}</Text>
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
