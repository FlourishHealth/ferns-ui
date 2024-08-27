/* eslint-disable react/prop-types */
import React, {useImperativeHandle} from "react";
import {
  AccessibilityProps,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";

import {getRounding, getSpacing, useTheme} from ".";
import {
  AlignContent,
  AlignItems,
  AlignSelf,
  BorderTheme,
  BoxProps,
  JustifyContent,
  SurfaceTheme,
} from "./Common";
import {mediaQueryLargerThan} from "./MediaQuery";
import {Unifier} from "./Unifier";

const ALIGN_CONTENT = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  between: "space-between",
  around: "space-around",
  stretch: "stretch",
};

const ALIGN_ITEMS = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  baseline: "baseline",
  stretch: "stretch",
};

const ALIGN_SELF = {
  auto: "auto",
  baseline: "baseline",
  start: "flex-start",
  end: "flex-end",
  center: "center",
  between: "space-between",
  around: "space-around",
  stretch: "stretch",
};

const BORDER_WIDTH = 1;

// eslint-disable-next-line react/display-name
export const Box = React.forwardRef((props: BoxProps, ref) => {
  const {theme} = useTheme();

  useImperativeHandle(ref, () => ({
    scrollToEnd: () => {
      if (scrollRef?.current) {
        // HACK HACK HACK...but it works. Probably need to do some onContentSizeChange or onLayout
        // to avoid this, but it works well enough.
        setTimeout(() => {
          scrollRef?.current?.scrollToEnd();
        }, 50);
      }
    },

    scrollTo: (y: number) => {
      if (scrollRef?.current) {
        // HACK HACK HACK...but it works. Probably need to do some onContentSizeChange or onLayout
        // to avoid this, but it works well enough.
        setTimeout(() => {
          scrollRef?.current?.scrollTo({y});
        }, 50);
      }
    },
  }));

  const BOX_STYLE_MAP: {
    [prop: string]: (
      value: any,
      all: {[prop: string]: any}
    ) => {[style: string]: string | number} | {};
  } = {
    alignContent: (value: AlignContent) => ({alignContent: ALIGN_CONTENT[value]}),
    alignItems: (value: AlignItems) => ({alignItems: ALIGN_ITEMS[value]}),
    alignSelf: (value: AlignSelf) => ({alignSelf: ALIGN_SELF[value]}),
    border: (value: keyof BorderTheme) => {
      if (!value) {
        return {};
      }
      return {borderColor: theme.border[value], borderWidth: BORDER_WIDTH};
    },
    borderBottom: (value: keyof BorderTheme) => {
      if (!value) {
        return {};
      }
      return {borderBottomColor: theme.border[value], borderBottomWidth: BORDER_WIDTH};
    },
    borderLeft: (value: keyof BorderTheme) => {
      if (!value) {
        return {};
      }
      return {borderLeftColor: theme.border[value], borderLeftWidth: BORDER_WIDTH};
    },
    borderRight: (value: keyof BorderTheme) => {
      if (!value) {
        return {};
      }
      return {borderRightColor: theme.border[value], borderRightWidth: BORDER_WIDTH};
    },
    borderTop: (value: keyof BorderTheme) => {
      if (!value) {
        return {};
      }
      return {borderTopColor: theme.border[value], borderTopWidth: BORDER_WIDTH};
    },
    bottom: (bottom) => ({bottom: bottom ? 0 : undefined}),
    color: (value: keyof SurfaceTheme) => ({backgroundColor: theme.surface[value]}),
    direction: (value: any) => ({flexDirection: value, display: "flex"}),
    smDirection: (value: any) =>
      mediaQueryLargerThan("sm") ? {flexDirection: value, display: "flex"} : {},
    mdDirection: (value: any) =>
      mediaQueryLargerThan("md") ? {flexDirection: value, display: "flex"} : {},
    lgDirection: (value: any) =>
      mediaQueryLargerThan("lg") ? {flexDirection: value, display: "flex"} : {},
    display: (value: any) => {
      if (value === "none") {
        return {display: "none"};
      }
      return value === "flex" ? {flex: undefined} : {flex: 0, flexDirection: "row"};
    },
    flex: (value: string) => {
      if (value === "grow") {
        return {flexGrow: 1, flexShrink: 1, display: "flex"};
      } else if (value === "shrink") {
        return {flexShrink: 1, display: "flex"};
      } else {
        return {flex: 0, display: "flex"};
      }
    },
    gap: (value) => ({gap: getSpacing(value)}),
    height: (value) => {
      if (props.border && !isNaN(Number(value))) {
        return {height: Number(value) + 2 * 2};
      } else {
        return {height: value};
      }
    },
    justifyContent: (value: JustifyContent) => ({justifyContent: ALIGN_CONTENT[value]}),
    left: (left) => ({left: left ? 0 : undefined}),
    margin: (value) => ({margin: getSpacing(value)}),
    marginBottom: (value) => ({marginBottom: getSpacing(value)}),
    marginLeft: (value) => ({marginLeft: getSpacing(value)}),
    marginRight: (value) => ({marginRight: getSpacing(value)}),
    marginTop: (value) => ({marginTop: getSpacing(value)}),
    overflow: (value) => {
      if (value === "scrollY" || value === "scroll") {
        return {overflow: "scroll"};
      }
      return {overflow: value};
    },
    padding: (value) => ({padding: getSpacing(value)}),
    paddingX: (value) => ({paddingLeft: getSpacing(value), paddingRight: getSpacing(value)}),
    paddingY: (value) => ({paddingTop: getSpacing(value), paddingBottom: getSpacing(value)}),
    position: (value) => ({position: value}),
    right: (right) => ({right: right ? 0 : undefined}),
    rounding: (rounding, allProps) => {
      if (rounding === "circle") {
        if (!allProps.height && !allProps.width) {
          console.warn("Cannot use Box rounding='circle' without height or width.");
          return {borderRadius: undefined};
        }
        return {borderRadius: allProps.height || allProps.width};
      }

      if (rounding) {
        return {borderRadius: getRounding(rounding)};
      }

      return {borderRadius: undefined};
    },
    shadow: (value) => {
      if (!value) {
        return {};
      }
      if (Platform.OS === "ios" || Platform.OS === "web") {
        return {
          boxShadow: {
            shadowColor: "#999",
            shadowOffset: {
              width: 2,
              height: 2,
            },
            shadowRadius: 2,
            shadowOpacity: 1.0,
          },
        };
      } else {
        return {elevation: 4};
      }
    },
    top: (top) => ({top: top ? 0 : undefined}),
    width: (value) => {
      if (props.border && !isNaN(Number(value))) {
        return {width: Number(value) + 2 * 2};
      } else {
        return {width: value};
      }
    },
    wrap: (value) => ({flexWrap: value ? "wrap" : "nowrap", alignItems: "flex-start"}),
    zIndex: (value) => ({zIndex: value ? value : undefined}),
  };

  const scrollRef = props.scrollRef ?? React.createRef();

  const propsToStyle = (): any => {
    let style: any = {};
    for (const prop of Object.keys(props) as Array<keyof typeof props>) {
      const value = props[prop];
      if (BOX_STYLE_MAP[prop]) {
        Object.assign(style, BOX_STYLE_MAP[prop](value, props));
      } else if (prop !== "children" && prop !== "onClick") {
        style[prop] = value;
        // console.warn(`Box: unknown property ${prop}`);
      }
    }

    if (props.wrap && props.alignItems) {
      console.warn("React Native doesn't support wrap and alignItems together.");
    }

    // Finally, dangerously set overrides.
    if (props.dangerouslySetInlineStyle) {
      style = {...style, ...props.dangerouslySetInlineStyle.__style};
    }

    return style;
  };

  const onHoverIn = async () => {
    await props.onHoverStart?.();
  };

  const onHoverOut = async () => {
    await props.onHoverEnd?.();
  };

  let box;

  // Adding the accessibilityRole of button throws a warning in React Native since we nest buttons
  // within Box and RN does not support nested buttons
  if (props.onClick) {
    box = (
      <Pressable
        accessibilityHint={(props as AccessibilityProps).accessibilityHint}
        accessibilityLabel={(props as AccessibilityProps).accessibilityLabel}
        accessibilityRole="button"
        style={propsToStyle()}
        testID={props.testID ? `${props.testID}-clickable` : undefined}
        onLayout={props.onLayout}
        onPointerEnter={onHoverIn}
        onPointerLeave={onHoverOut}
        onPress={async () => {
          await Unifier.utils.haptic();
          await props.onClick!();
        }}
      >
        {props.children}
      </Pressable>
    );
  } else {
    box = (
      <View
        style={propsToStyle()}
        testID={props.testID}
        onPointerEnter={onHoverIn}
        onPointerLeave={onHoverOut}
      >
        {props.children}
      </View>
    );
  }

  if (props.scroll) {
    const {justifyContent, alignContent, alignItems, ...scrollStyle} = propsToStyle();

    box = (
      <ScrollView
        ref={props.scrollRef || scrollRef}
        contentContainerStyle={{justifyContent, alignContent, alignItems}}
        horizontal={props.overflow === "scrollX"}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled
        scrollEventThrottle={50}
        style={scrollStyle}
        onScroll={(event) => {
          if (props.onScroll && event) {
            props.onScroll(event.nativeEvent.contentOffset.y);
          }
        }}
      >
        {box}
      </ScrollView>
    );
  }

  if (props.avoidKeyboard) {
    box = (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={props.keyboardOffset}
        style={{flex: 1, display: "flex"}}
      >
        <SafeAreaView style={{flex: 1, display: "flex"}}>{box}</SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
  return box;
});
