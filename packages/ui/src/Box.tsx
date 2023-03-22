import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

import {UnifiedTheme} from ".";
import {AlignContent, AlignItems, AlignSelf, BoxProps, JustifyContent, SPACING} from "./Common";
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

export class Box extends React.Component<BoxProps, {}> {
  BOX_STYLE_MAP: {
    [prop: string]: (
      value: any,
      all: {[prop: string]: any}
    ) => {[style: string]: string | number} | {};
  } = {
    alignItems: (value: AlignItems) => ({alignItems: ALIGN_ITEMS[value]}),
    alignContent: (value: AlignContent) => ({alignContent: ALIGN_CONTENT[value]}),
    alignSelf: (value: AlignSelf) => ({alignSelf: ALIGN_SELF[value]}),
    color: (value: keyof UnifiedTheme) => ({backgroundColor: Unifier.theme[value]}),
    direction: (value: any) => ({flexDirection: value, display: "flex"}),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    smDirection: (value: any) =>
      mediaQueryLargerThan("sm") ? {flexDirection: value, display: "flex"} : {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mdDirection: (value: any) =>
      mediaQueryLargerThan("md") ? {flexDirection: value, display: "flex"} : {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    lgDirection: (value: any) =>
      mediaQueryLargerThan("lg") ? {flexDirection: value, display: "flex"} : {},
    display: (value: any) => {
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
    justifyContent: (value: JustifyContent) => ({justifyContent: ALIGN_CONTENT[value]}),
    height: (value) => {
      if (this.props.border && !isNaN(Number(value))) {
        return {height: Number(value) + 2 * 2};
      } else {
        return {height: value};
      }
    },
    margin: (value) => ({margin: value * SPACING}),
    marginRight: (value) => ({marginRight: value * SPACING}),
    marginLeft: (value) => ({marginLeft: value * SPACING}),
    marginTop: (value) => ({marginTop: value * SPACING}),
    marginBottom: (value) => ({marginBottom: value * SPACING}),
    paddingX: (value) => ({paddingLeft: value * SPACING, paddingRight: value * SPACING}),
    paddingY: (value) => ({paddingTop: value * SPACING, paddingBottom: value * SPACING}),
    padding: (value) => ({padding: value * SPACING}),
    zIndex: (value) => ({zIndex: value ? value : undefined}),
    position: (value) => ({position: value}),
    top: (top) => ({top: top ? 0 : undefined}),
    bottom: (bottom) => ({bottom: bottom ? 0 : undefined}),
    right: (right) => ({right: right ? 0 : undefined}),
    left: (left) => ({left: left ? 0 : undefined}),
    rounding: (rounding, allProps) => {
      if (rounding === "circle") {
        if (!allProps.height && !allProps.width) {
          console.warn("Cannot use Box rounding='circle' without height or width.");
          return {borderRadius: undefined};
        }
        return {borderRadius: allProps.height || allProps.width};
      }

      if (rounding === "pill") {
        return {borderRadius: 999};
      }

      if (typeof rounding === "number") {
        return {borderRadius: rounding * 4};
      }

      return {borderRadius: undefined};
    },
    overflow: (value) => {
      if (value === "scrollY" || value === "scroll") {
        return {overflow: "scroll"};
      }
      return {overflow: value};
    },
    width: (value) => {
      if (this.props.border && !isNaN(Number(value))) {
        return {width: Number(value) + 2 * 2};
      } else {
        return {width: value};
      }
    },
    wrap: (value) => ({flexWrap: value ? "wrap" : "nowrap", alignItems: "flex-start"}),
    shadow: (value) => {
      if (!value) {
        return {};
      }
      if (Platform.OS === "ios" || Platform.OS === "web") {
        return {
          shadowColor: "#999",
          shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowRadius: 2,
          shadowOpacity: 1.0,
        };
      } else {
        return {elevation: 4};
      }
    },
    border: (value: keyof UnifiedTheme) => {
      if (!value) {
        return {};
      }
      return {borderColor: Unifier.theme[value], borderWidth: BORDER_WIDTH};
    },
    borderBottom: (value: keyof UnifiedTheme) => {
      if (!value) {
        return {};
      }
      return {borderBottomColor: Unifier.theme[value], borderBottomWidth: BORDER_WIDTH};
    },
    borderTop: (value: keyof UnifiedTheme) => {
      if (!value) {
        return {};
      }
      return {borderTopColor: Unifier.theme[value], borderTopWidth: BORDER_WIDTH};
    },
    borderRight: (value: keyof UnifiedTheme) => {
      if (!value) {
        return {};
      }
      return {borderRightColor: Unifier.theme[value], borderRightWidth: BORDER_WIDTH};
    },
    borderLeft: (value: keyof UnifiedTheme) => {
      if (!value) {
        return {};
      }
      return {borderLeftColor: Unifier.theme[value], borderLeftWidth: BORDER_WIDTH};
    },
  };

  scrollRef = React.createRef();

  constructor(props: BoxProps) {
    super(props);
    if (props.scrollRef) {
      this.scrollRef = props.scrollRef;
    }
  }

  public scrollToEnd = () => {
    if (this.scrollRef && this.scrollRef.current) {
      // HACK HACK HACK...but it works. Probably need to do some onContentSizeChange or onLayout to
      // avoid this, but it works well enough.
      setTimeout(() => {
        this.scrollRef && this.scrollRef.current && (this.scrollRef.current as any).scrollToEnd();
      }, 50);
    }
  };

  public scrollTo = (y: number) => {
    if (this.scrollRef && this.scrollRef.current) {
      // HACK HACK HACK...but it works. Probably need to do some onContentSizeChange or onLayout to
      // avoid this, but it works well enough.
      setTimeout(() => {
        this.scrollRef && this.scrollRef.current && (this.scrollRef.current as any).scrollTo({y});
      }, 50);
    }
  };

  propsToStyle(): any {
    let style: any = {};
    for (const prop of Object.keys(this.props)) {
      const value = (this.props as any)[prop];
      if (this.BOX_STYLE_MAP[prop]) {
        Object.assign(style, this.BOX_STYLE_MAP[prop](value, this.props));
      } else if (prop !== "children" && prop !== "onClick") {
        style[prop] = value;
        // console.warn(`Box: unknown property ${prop}`);
      }
    }

    if (this.props.wrap && this.props.alignItems) {
      console.warn("React Native doesn't support wrap and alignItems together.");
    }

    // Finally, dangerously set overrides.
    if (this.props.dangerouslySetInlineStyle) {
      style = {...style, ...this.props.dangerouslySetInlineStyle.__style};
    }

    return style;
  }

  render() {
    let box;

    if (this.props.onClick) {
      box = (
        <TouchableOpacity
          style={this.propsToStyle()}
          testID={this.props.testID ? `${this.props.testID}-clickable` : undefined}
          // TODO: refactor this better..
          onLayout={this.props.onLayout}
          onPress={() => {
            Unifier.utils.haptic();
            this.props.onClick();
          }}
        >
          {this.props.children}
        </TouchableOpacity>
      );
    } else {
      box = (
        <View style={this.propsToStyle()} testID={this.props.testID}>
          {this.props.children}
        </View>
      );
    }

    if (this.props.scroll) {
      const {justifyContent, alignContent, alignItems, ...scrollStyle} = this.propsToStyle();

      box = (
        <ScrollView
          ref={this.props.scrollRef || this.scrollRef}
          contentContainerStyle={{justifyContent, alignContent, alignItems}}
          horizontal={this.props.overflow === "scrollX"}
          keyboardShouldPersistTaps="handled"
          scrollEventThrottle={50}
          style={scrollStyle}
          onScroll={(event) => {
            if (this.props.onScroll && event) {
              this.props.onScroll(event.nativeEvent.contentOffset.y);
            }
          }}
        >
          {box}
        </ScrollView>
      );
    }

    if (this.props.avoidKeyboard) {
      box = (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={this.props.keyboardOffset}
          style={{flex: 1, display: "flex"}}
        >
          <SafeAreaView style={{flex: 1, display: "flex"}}>{box}</SafeAreaView>
        </KeyboardAvoidingView>
      );
    }
    return box;
  }
}
