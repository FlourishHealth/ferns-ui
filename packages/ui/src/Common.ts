import {SyntheticEvent} from "react";

import {SelectListOptions} from "./SelectList";

export interface BaseProfile {
  email: string;
  id: string;
  backOffice: {
    testUser?: boolean;
  };
}

export interface TrackingConfig {
  MIXPANEL_TOKEN: string;
  SENTRY_WEB_DSN: string;
  SENTRY_MOBILE_DSN: string;
  USER_PROPERTY_KEYS: string[];
}

export interface IConfig extends TrackingConfig {
  FEEDBACK_URL: string;
  PRIVACY_POLICY_URL: string;
  // The collection name to store profiles in for Firebase/redux.
  PROFILE_COLLECTION: string;
  TERMS_URL: string;
  BASE_URL: string;
  PRODUCTION: boolean;

  // Useful for generating:
  // http://paletton.com/#uid=72Q0u0kw0u8khBrpJx0z7nUEPiG
  primaryLighterColor: string;
  primaryLightColor: string;
  primaryColor: string;
  primaryDarkColor: string;
  primaryDarkerColor: string;

  secondaryLighterColor: string;
  secondaryLightColor: string;
  secondaryColor: string;
  secondaryDarkColor: string;
  secondaryDarkerColor: string;

  accentLighterColor: string;
  accentLightColor: string;
  accentColor: string;
  accentDarkColor: string;
  accentDarkerColor: string;

  tertiaryLighterColor: string;
  tertiaryLightColor: string;
  tertiaryColor: string;
  tertiaryDarkColor: string;
  tertiaryDarkerColor: string;

  // firebaseConfig: any;

  neutral900: string;
  neutral800: string;
  neutral700: string;
  neutral600: string;
  neutral500: string;
  neutral400: string;
  neutral300: string;
  neutral200: string;
  neutral100: string;
  neutral90: string;
  neutral80: string;
  neutral70: string;
  neutral60: string;
  neutral50: string;
  neutral40: string;
  neutral30: string;
  neutral20: string;
  neutral10: string;
}

// For using a theme.
export interface UnifiedTheme {
  // TODO: make these configurable.
  blue: string;
  darkGray: string;
  eggplant: string;
  gray: string;
  green: string;
  lightGray: string;
  maroon: string;
  midnight: string;
  navy: string;
  olive: string;
  orange: string;
  orchid: string;
  pine: string;
  purple: string;
  red: string;
  watermelon: string;
  white: string;
  black: string;

  primaryLighter: string;
  primaryLight: string;
  primary: string;
  primaryDark: string;
  primaryDarker: string;

  secondaryLighter: string;
  secondaryLight: string;
  secondary: string;
  secondaryDark: string;
  secondaryDarker: string;

  accentLighter: string;
  accentLight: string;
  accent: string;
  accentDark: string;
  accentDarker: string;

  tertiaryLighter: string;
  tertiaryLight: string;
  tertiary: string;
  tertiaryDark: string;
  tertiaryDarker: string;

  neutral900: string;
  neutral800: string;
  neutral700: string;
  neutral600: string;
  neutral500: string;
  neutral400: string;
  neutral300: string;
  neutral200: string;
  neutral100: string;
  neutral90: string;
  neutral80: string;
  neutral70: string;
  neutral60: string;
  neutral50: string;
  neutral40: string;
  neutral30: string;
  neutral20: string;
  neutral10: string;

  primaryFont: string;
  primaryBoldFont: string;
  secondaryFont: string;
  secondaryBoldFont: string;
  buttonFont: string;
  accentFont: string;
  accentBoldFont: string;
  titleFont: string;
}

export type Font =
  | "primary"
  | "primaryBold"
  | "secondary"
  | "secondaryBold"
  | "accent"
  | "accentBold"
  | "title"
  | "button";

// type Sizes = "small" | "xsmall" | "sm" | "small" | "medium" | "lg" | "large";

export type Direction = "up" | "right" | "down" | "left";
export type Color =
  | "blue"
  | "darkGray"
  | "eggplant"
  | "gray"
  | "green"
  | "lightGray"
  | "maroon"
  | "midnight"
  | "navy"
  | "olive"
  | "orange"
  | "orchid"
  | "pine"
  | "purple"
  | "red"
  | "watermelon"
  | "white"
  | "black";
export type ThemeColor =
  | "primaryLighter"
  | "primaryLight"
  | "primary"
  | "primaryDark"
  | "primaryDarker"
  | "secondaryLighter"
  | "secondaryLight"
  | "secondary"
  | "secondaryDark"
  | "secondaryDarker"
  | "tertiaryLighter"
  | "tertiaryLight"
  | "tertiary"
  | "tertiaryDark"
  | "tertiaryDarker"
  | "accentLighter"
  | "accentLight"
  | "accent"
  | "accentDark"
  | "accentDarker";
export type NeutralColor =
  | "neutral900"
  | "neutral800"
  | "neutral700"
  | "neutral600"
  | "neutral500"
  | "neutral400"
  | "neutral300"
  | "neutral200"
  | "neutral100"
  | "neutral90"
  | "neutral80"
  | "neutral70"
  | "neutral60"
  | "neutral50"
  | "neutral40"
  | "neutral30"
  | "neutral20"
  | "neutral10";
export type AllColors = Color | ThemeColor | NeutralColor;

export interface OnChangeResult {
  event?: SyntheticEvent<any>;
  value: string;
}
export type OnChangeCallback = (result: OnChangeResult) => void;
export type IconName =
  | "heart"
  | "chevron-left"
  | "hat-chef"
  | "book"
  | "list-alt"
  | "carrot"
  | "comment"
  | "user-circle"
  | "fire"
  | "chart-pie"
  | "knife-kitchen"
  | "oven"
  | "clock"
  | "utensils-alt"
  | "search"
  | "chevron-right"
  | "plus"
  | "ellipsis-v"
  | "paper-plane"
  | "exclamation-circle"
  | "edit";

export type GestaltIconName =
  | "add"
  | "add-circle"
  | "add-pin"
  | "arrow-back"
  | "arrow-circle-forward"
  | "arrow-down"
  | "arrow-forward"
  | "arrow-up"
  | "bell"
  | "camera"
  | "cancel"
  | "check"
  | "check-circle"
  | "circle-outline"
  | "clear"
  | "clock"
  | "cog"
  | "compass"
  | "dash"
  | "edit"
  | "ellipsis"
  | "ellipsis-circle-outline"
  | "facebook"
  | "face-happy"
  | "face-sad"
  | "face-smiley"
  | "filter"
  | "flag"
  | "flashlight"
  | "globe"
  | "graph-bar"
  | "handle"
  | "heart"
  | "heart-broken"
  | "knoop"
  | "lightbulb"
  | "link"
  | "location"
  | "lock"
  | "menu"
  | "move"
  | "pause"
  | "people"
  | "person"
  | "person-add"
  | "pin"
  | "pin-hide"
  | "pinterest"
  | "play"
  | "question-mark"
  | "remove"
  | "report"
  | "search"
  | "shopping-bag"
  | "smiley"
  | "smiley-outline"
  | "send"
  | "share"
  | "sound"
  | "speech"
  | "speech-ellipsis"
  | "tag";

export type AlignContent = "start" | "end" | "center" | "between" | "around" | "stretch";
export type AlignSelf = "auto" | "start" | "end" | "center" | "baseline" | "stretch";
export type AlignItems = "start" | "end" | "center" | "baseline" | "stretch";
export type JustifyContent = "start" | "end" | "center" | "between" | "around";

export type UnsignedUpTo12 = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type SignedUpTo12 =
  | -12
  | -11
  | -10
  | -9
  | -8
  | -7
  | -6
  | -5
  | -4
  | -3
  | -2
  | -1
  | UnsignedUpTo12;
export type Margin = SignedUpTo12 | "auto";
export const SPACING = 4;

export type TextFieldType =
  | "date"
  | "email"
  | "number"
  | "numberRange"
  | "decimalRange"
  | "decimal"
  | "username"
  | "password"
  | "search"
  | "text"
  | "url"
  | "height";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

export const iconSizeToNumber = (size?: IconSize) => {
  return {
    xs: 8,
    sm: 12,
    md: 14,
    lg: 20,
    xl: 26,
  }[size || "md"];
};

export const iconNumberToSize = (size = 16): IconSize => {
  let iconSize: IconSize;
  if (size < 8) {
    iconSize = "xs";
  } else if (size < 12) {
    iconSize = "sm";
  } else if (size < 14) {
    iconSize = "md";
  } else if (size < 20) {
    iconSize = "lg";
  } else {
    iconSize = "xl";
  }
  return iconSize;
};

export function getSectionColor(section: "Breakfast" | "Lunch" | "Dinner" | "Snack" | "workouts") {
  return ({
    Breakfast: "orchid",
    Lunch: "blue",
    Dinner: "orange",
    Snack: "red",
    "Second Snack": "red",
    Workout: "pine",
    workouts: "pine",
  }[section] || "blue") as Color;
}

export type TextSize = "sm" | "md" | "lg";
export type TextColor =
  | "blue"
  | "darkGray"
  | "eggplant"
  | "gray"
  | "green"
  | "lightGray"
  | "maroon"
  | "midnight"
  | "navy"
  | "olive"
  | "orange"
  | "orchid"
  | "pine"
  | "purple"
  | "red"
  | "watermelon"
  | "white"; // default "darkGray"

export type ButtonColor =
  | "blue"
  | "gray"
  | "red"
  // | "transparent"
  | "white"
  | "primary"
  | "secondary"
  | "accent"
  | "tertiary";
// | "twitter"
// | "facebook"
// | "google";

export type IconPrefix = "far" | "fal" | "fas" | "fab";
// | "ant"
// | "entypo"
// | "evil"
// | "material"
// | "material-community";
// | "ionicon"
// | "octicon"
// | "zocial"
// | "simple-line"
// | "feather";

export interface TextProps {
  align?: "left" | "right" | "center" | "justify"; // default "left"
  children?: React.ReactNode;
  color?: AllColors;

  inline?: boolean; // default false
  italic?: boolean; // default false
  overflow?: "normal" | "breakWord"; // default "breakWord"
  size?: TextSize; // default "md"
  truncate?: boolean; // default false
  font?: Font;
  underline?: boolean;

  numberOfLines?: number;
  skipLinking?: boolean;
  weight?: "bold" | "normal";
}

export interface ActionBannerProps {
  /** The text to show in the banner. */
  text: string;
  color?: AllColors;
  textColor?: TextColor;
  negativeXMargin?: number;
  onClick: () => void;
  shape?: Rounding;
}

export interface BlurBoxProps extends BoxProps {
  blurType?: "regular" | "dark" | "prominent";
}

export interface LayerProps {
  children: React.ReactNode;
}

export interface ModalProps {
  header?: React.ReactNode;
  accessibilityModalLabel: string;
  children?: React.ReactNode;
  closeOnOutsideClick?: boolean;
  footer?: React.ReactNode;
  heading?: string | React.ReactNode;
  onDismiss: () => void;
  role?: "alertdialog" | "dialog";
  size?: "sm" | "md" | "lg" | number;
}

export interface BoxProps {
  alignContent?: AlignContent;
  alignItems?: AlignItems;
  alignSelf?: AlignSelf;
  bottom?: boolean;
  children?: React.ReactNode;
  color?: BoxColor;
  column?: UnsignedUpTo12;
  smColumn?: UnsignedUpTo12;
  mdColumn?: UnsignedUpTo12;
  lgColumn?: UnsignedUpTo12;
  dangerouslySetInlineStyle?: {
    __style: {
      [key: string]: any;
    };
  };
  direction?: "row" | "column";
  smDirection?: "row" | "column";
  mdDirection?: "row" | "column";
  lgDirection?: "row" | "column";
  display?: "none" | "flex" | "block" | "inlineBlock" | "visuallyHidden";
  smDisplay?: "none" | "flex" | "block" | "inlineBlock" | "visuallyHidden";
  mdDisplay?: "none" | "flex" | "block" | "inlineBlock" | "visuallyHidden";
  lgDisplay?: "none" | "flex" | "block" | "inlineBlock" | "visuallyHidden";
  fit?: boolean;
  flex?: "grow" | "shrink" | "none";
  height?: number | string;
  justifyContent?: "start" | "end" | "center" | "between" | "around";
  left?: boolean;
  margin?: SignedUpTo12;
  smMargin?: SignedUpTo12;
  mdMargin?: SignedUpTo12;
  lgMargin?: SignedUpTo12;
  marginBottom?: SignedUpTo12;
  smMarginBottom?: SignedUpTo12;
  mdMarginBottom?: SignedUpTo12;
  lgMarginBottom?: SignedUpTo12;
  marginEnd?: SignedUpTo12;
  smMarginEnd?: SignedUpTo12;
  mdMarginEnd?: SignedUpTo12;
  lgMarginEnd?: SignedUpTo12;
  marginLeft?: SignedUpTo12;
  smMarginLeft?: SignedUpTo12;
  mdMarginLeft?: SignedUpTo12;
  lgMarginLeft?: SignedUpTo12;
  marginRight?: SignedUpTo12;
  smMarginRight?: SignedUpTo12;
  mdMarginRight?: SignedUpTo12;
  lgMarginRight?: SignedUpTo12;
  marginStart?: SignedUpTo12;
  smMarginStart?: SignedUpTo12;
  mdMarginStart?: SignedUpTo12;
  lgMarginStart?: SignedUpTo12;
  marginTop?: SignedUpTo12;
  smMarginTop?: SignedUpTo12;
  mdMarginTop?: SignedUpTo12;
  lgMarginTop?: SignedUpTo12;
  maxHeight?: number | string;
  maxWidth?: number | string;
  minHeight?: number | string;
  minWidth?: number | string;
  overflow?: "visible" | "hidden" | "scroll" | "scrollX" | "scrollY" | "auto";
  padding?: UnsignedUpTo12;
  smPadding?: UnsignedUpTo12;
  mdPadding?: UnsignedUpTo12;
  lgPadding?: UnsignedUpTo12;
  paddingX?: UnsignedUpTo12;
  smPaddingX?: UnsignedUpTo12;
  mdPaddingX?: UnsignedUpTo12;
  lgPaddingX?: UnsignedUpTo12;
  paddingY?: UnsignedUpTo12;
  smPaddingY?: UnsignedUpTo12;
  mdPaddingY?: UnsignedUpTo12;
  lgPaddingY?: UnsignedUpTo12;
  position?: "static" | "absolute" | "relative" | "fixed";
  right?: boolean;
  rounding?: "pill" | "circle" | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  top?: boolean;
  width?: number | string;
  wrap?: boolean;

  // Pattern additions
  onClick?: any;
  className?: any;
  style?: any;

  // Pattern Addition. Adds keyboard aware scrollview
  scroll?: boolean;
  // Pattern Addition. Shadows!
  shadow?: boolean;
  border?: AllColors;
  avoidKeyboard?: boolean;
  keyboardOffset?: number;
  scrollRef?: any;
  onScroll?: (offsetY: number) => void;
  onLayout?: (event: any) => void;
}

export type BoxColor = AllColors | "transparent";

export interface ButtonProps {
  text: string;
  // TODO make this work for all colors
  color?: ButtonColor | Color;
  // default gray
  disabled?: boolean; // default false
  inline?: boolean; // default false
  size?: "sm" | "md" | "lg"; // default md

  // Pattern Addition
  type?: "solid" | "ghost" | "outline";
  loading?: boolean;
  onClick: any;
  icon?: GestaltIconName | string;
  iconPrefix?: IconPrefix;
  iconColor?: ButtonColor | Color;
}

export interface DrawerProps {
  animationOpenTime: number;
  animationCloseTime: number;
  direction: Direction;
  dismissWhenTouchOutside?: boolean;
  fadeOpacity?: number;
  drawerScreenWidth: number;
  drawerScreenHeight: number;
  style?: any;
  parent: any;
  dismiss?: any;
}

export type DrawerDirection = "left" | "right" | "bottom" | "top";

export interface ErrorBoundaryProps {
  onError?: (error: Error, stack: any) => void;
}

export interface FaceBookButtonProps {
  errorMessageColor?: "red" | "white";
  signUp: boolean;
}

export interface IconProps {
  prefix?: IconPrefix; // For support FA solid/regular/light/duotone, as well as other icon packs in the future.
  name: string;
  color?: AllColors;
  size?: IconSize;
  iconStyle?: any;
  containerStyle?: any;
}

export interface IconButtonProps {
  prefix?: IconPrefix;
  icon: GestaltIconName | string;
  accessibilityLabel: string;
  iconColor: "darkGray" | ButtonColor | ThemeColor | Color;
  onClick: () => void;
  size?: IconSize;
  bgColor?: "transparent" | "transparentDarkGray" | "gray" | "lightGray" | "white"; // default transparent
  disabled?: boolean;
  selected?: boolean;
}

export interface NavigatorProps {
  config?: any;
}

export interface PillProps {
  text: string;
  color: AllColors;
  enabled?: boolean;
  onClick: (enabled: boolean) => void;
}

export interface SegmentedControlProps {
  items: (string | React.ReactNode)[];
  onChange: ({activeIndex}: {activeIndex: number}) => void;
  selectedItemIndex: number;
  responsive?: boolean;
  size?: "md" | "lg"; // defaults to md
}

// Shared props for fields with labels, subtext, and error messages.
export interface FieldWithLabelsProps {
  errorMessage?: string;
  errorMessageColor?: AllColors; // Default: red.
  label?: string;
  labelColor?: AllColors;
  helperText?: string;
  helperTextColor?: AllColors;
  children?: React.ReactNode;
}

export interface FieldProps extends FieldWithLabelsProps {
  name: string;
  label?: string;
  subLabel?: string;
  initialValue?: any;
  handleChange: any;
  // Additional validation
  validate?: (value: any) => boolean;
  validateErrorMessage?: string;
  type?:
    | "boolean"
    | "email"
    | "text"
    | "textarea"
    | "number"
    | "currency"
    | "percent"
    | "select"
    | "password"
    | "url"
    | "date";
  rows?: number;
  options?: SelectListOptions;
  placeholder?: string;
  disabled?: boolean;
}

export interface TextFieldProps extends FieldWithLabelsProps {
  id?: string;
  onChange: OnChangeCallback;
  autoComplete?: "current-password" | "on" | "off" | "username";
  disabled?: boolean;

  idealErrorDirection?: Direction;
  name?: string;
  onBlur?: OnChangeCallback;
  onFocus?: OnChangeCallback;
  placeholder?: string;
  type?: TextFieldType;
  value?: string;
  style?: any;
  // If type === search, indicates whether to show the search icon or spinner
  searching?: boolean;

  returnKeyType?: "done" | "go" | "next" | "search" | "send";

  // TODO: still needed?
  autoFocus?: boolean;
  grow?: boolean;
  // react-native-autofocus
  inputRef?: any;
  onSubmitEditing?: any;
  onEnter?: any;
  multiline?: boolean;
  rows?: number;
  height?: number;
  paddingX?: number;
  paddingY?: number;

  // Required for type=numberRange
  min?: number;
  max?: number;
}

export type TextAreaProps = TextFieldProps;

export interface WithLabelProps {
  children: React.ReactNode;
  show?: boolean;
  label?: string;
  labelInline?: boolean;
  labelColor?: AllColors;
  labelJustifyContent?: JustifyContent;
  labelPlacement?: "before" | "after";
  labelSize?: TextSize;
}

export interface SubmittingFormProps {
  onSubmitEditting: () => void;
}

export interface SwitchProps extends FieldWithLabelsProps {
  id?: string;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  name?: string;
  switched: boolean;
  // Pattern Addition
  label?: string;
}

export interface SpinnerProps {
  size?: "sm" | "md";
  color?: Color;
}

export interface MaskProps {
  children?: React.ReactNode;
  shape?: "circle" | "rounded" | "square";
  height?: number | string;
  width?: number | string;
  maxHeight?: number | string;
  maxWidth?: number | string;
  rounding?: "circle" | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  willChangeTransform?: boolean;
  wash?: boolean;
}

export interface IconRowProps {
  icon: string;
  label: string;
  value: string;
}

export interface LinkProps {
  href: string;
  inline?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  target?: null | "blank";
}

export type Rounding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | "circle" | "pill";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HeadingProps {
  align?: "left" | "right" | "center" | "justify"; // default "left"
  children?: React.ReactNode;
  color?: AllColors;
  overflow?: "normal" | "breakWord"; // default "breakWord"
  size?: "sm" | "md" | "lg";
  truncate?: boolean; // default false
}

export interface MetaProps {
  itemProp?: string;
  content?: string;
  itemType?: string;
  key?: string;
  property?: string;
}

export interface ImageProps {
  alt?: string;
  color: BoxColor;
  naturalHeight?: number;
  naturalWidth?: number;
  maxWidth?: number;
  maxHeight?: number;
  src: string;
  children?: React.ReactNode;
  fit?: "cover" | "contain" | "none";
  onError?: () => void;
  onLoad?: () => void;
  size?: string;
  srcSet?: string;
  fullWidth?: boolean;
  style?: any;
}

export interface SearchButtonProps {
  color: ButtonColor;
  onClick: () => void;
}

export interface BackButtonInterface {
  onBack: () => void;
}

export interface CheckBoxProps {
  id: string;
  onChange: ({value}: {value: boolean}) => void;
  checked?: boolean;
  disabled?: boolean;
  hasError?: boolean;
  indeterminate?: boolean;
  name?: string;
  onClick?: any;
  size?: "sm" | "md";
  color?: AllColors;
  radio?: boolean;

  label?: string;
  subLabel?: string;
  labelColor?: AllColors;
}

export interface BodyProps {
  scroll?: boolean;
  loading?: boolean;
  useBox?: boolean; // defaults false
  style?: any;
  padding?: UnsignedUpTo12;
  height?: number | string;
  avoidKeyboard?: boolean; // default true
}

export interface ChatPaneProps {
  messagesView: any;
  textFormView: any;
  ref: any;
}

export interface ScrollViewProps {
  scrollTo?: (
    y?: number | {x?: number; y?: number; animated?: boolean},
    x?: number,
    animated?: boolean
  ) => void;
  /**
   * These styles will be applied to the scroll view content container which
   * wraps all of the child views. Example:
   *
   *   return (
   *     <ScrollView contentContainerStyle={styles.contentContainer}>
   *     </ScrollView>
   *   );
   *   ...
   *   const styles = StyleSheet.create({
   *     contentContainer: {
   *       paddingVertical: 20
   *     }
   *   });
   */
  contentContainerStyle?: any;

  /**
   * When true the scroll view's children are arranged horizontally in a row
   * instead of vertically in a column. The default value is false.
   */
  horizontal?: boolean | null;

  /**
   * If sticky headers should stick at the bottom instead of the top of the
   * ScrollView. This is usually used with inverted ScrollViews.
   */
  // invertStickyHeaders?: boolean;

  /**
   * Determines whether the keyboard gets dismissed in response to a drag.
   *   - 'none' (the default) drags do not dismiss the keyboard.
   *   - 'onDrag' the keyboard is dismissed when a drag begins.
   *   - 'interactive' the keyboard is dismissed interactively with the drag
   *     and moves in synchrony with the touch; dragging upwards cancels the
   *     dismissal.
   */
  // keyboardDismissMode?: "none" | "interactive" | "on-drag";

  /**
   * Determines when the keyboard should stay visible after a tap.
   * - 'never' (the default), tapping outside of the focused text input when the keyboard is up dismisses the keyboard. When this happens, children won't receive the tap.
   * - 'always', the keyboard will not dismiss automatically, and the scroll view will not catch taps, but children of the scroll view can catch taps.
   * - 'handled', the keyboard will not dismiss automatically when the tap was handled by a children, (or captured by an ancestor).
   * - false, deprecated, use 'never' instead
   * - true, deprecated, use 'always' instead
   */
  keyboardShouldPersistTaps?: boolean | "always" | "never" | "handled";

  /**
   * Called when scrollable content view of the ScrollView changes.
   * Handler function is passed the content width and content height as parameters: (contentWidth, contentHeight)
   * It's implemented using onLayout handler attached to the content container which this ScrollView renders.
   *
   */
  // onContentSizeChange?: (w: number, h: number) => void;

  /**
   * Fires at most once per frame during scrolling.
   * The frequency of the events can be contolled using the scrollEventThrottle prop.
   */
  onScroll?: (event: any) => void;

  /**
   * Fires if a user initiates a scroll gesture.
   */
  // onScrollBeginDrag?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;

  /**
   * Fires when a user has finished scrolling.
   */
  // onScrollEndDrag?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;

  /**
   * Fires when scroll view has finished moving
   */
  // onMomentumScrollEnd?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;

  /**
   * Fires when scroll view has begun moving
   */
  // onMomentumScrollBegin?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;

  /**
   * When true the scroll view stops on multiples of the scroll view's size
   * when scrolling. This can be used for horizontal pagination. The default
   * value is false.
   */
  // pagingEnabled?: boolean;

  /**
   * When false, the content does not scroll. The default value is true
   */
  // scrollEnabled?: boolean; // true

  /**
   * Experimental: When true offscreen child views (whose `overflow` value is
   * `hidden`) are removed from their native backing superview when offscreen.
   * This canimprove scrolling performance on long lists. The default value is
   * false.
   */
  // removeClippedSubviews?: boolean;

  /**
   * When true, shows a horizontal scroll indicator.
   */
  // showsHorizontalScrollIndicator?: boolean;

  /**
   * When true, shows a vertical scroll indicator.
   */
  // showsVerticalScrollIndicator?: boolean;

  /**
   * Style
   */
  style?: any;

  /**
   * A RefreshControl component, used to provide pull-to-refresh
   * functionality for the ScrollView.
   */
  // refreshControl?: React.ReactElement<RefreshControlProps>;

  /**
   * When `snapToInterval` is set, `snapToAlignment` will define the relationship of the the snapping to the scroll view.
   *      - `start` (the default) will align the snap at the left (horizontal) or top (vertical)
   *      - `center` will align the snap in the center
   *      - `end` will align the snap at the right (horizontal) or bottom (vertical)
   */
  // snapToAlignment?: "start" | "center" | "end";

  /**
   * When set, causes the scroll view to stop at multiples of the value of `snapToInterval`.
   * This can be used for paginating through children that have lengths smaller than the scroll view.
   * Used in combination with `snapToAlignment` and `decelerationRate="fast"`. Overrides less
   * configurable `pagingEnabled` prop.
   */
  // snapToInterval?: number;

  /**
   * When set, causes the scroll view to stop at the defined offsets. This can be used for
   * paginating through variously sized children that have lengths smaller than the scroll view.
   * Typically used in combination with `decelerationRate="fast"`. Overrides less configurable
   * `pagingEnabled` and `snapToInterval` props.
   */
  // snapToOffsets?: number[];

  /**
   * Use in conjuction with `snapToOffsets`. By default, the beginning of the list counts as a
   * snap offset. Set `snapToStart` to false to disable this behavior and allow the list to scroll
   * freely between its start and the first `snapToOffsets` offset. The default value is true.
   */
  // snapToStart?: boolean;

  /**
   * Use in conjuction with `snapToOffsets`. By default, the end of the list counts as a snap
   * offset. Set `snapToEnd` to false to disable this behavior and allow the list to scroll freely
   * between its end and the last `snapToOffsets` offset. The default value is true.
   */
  // snapToEnd?: boolean;

  /**
   * When true, the scroll view stops on the next index (in relation to scroll position at release)
   * regardless of how fast the gesture is. This can be used for horizontal pagination when the page
   * is less than the width of the ScrollView. The default value is false.
   */
  // disableIntervalMomentum?: boolean;

  /**
   * When true, the default JS pan responder on the ScrollView is disabled, and full control over
   * touches inside the ScrollView is left to its child components. This is particularly useful
   * if `snapToInterval` is enabled, since it does not follow typical touch patterns. Do not use
   * this on regular ScrollView use cases without `snapToInterval` as it may cause unexpected
   * touches to occur while scrolling. The default value is false.
   */
  // disableScrollViewPanResponder?: boolean;
  // scrollToEnd(options?: {animated: boolean}): void;
  // getScrollResponder(): JSX.Element;
  // getScrollableNode(): any;
}

type ItemT = any;
type ViewStyle = any;
interface StyleProp {
  [key: string]: any;
}

interface LayoutRectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface LayoutChangeEvent {
  nativeEvent: {
    layout: LayoutRectangle;
  };
}

interface RenderItemData {
  item: any;
  index: number;
}

export interface FlatListProps extends ScrollViewProps {
  /**
   * Rendered in between each item, but not at the top or bottom
   */
  ItemSeparatorComponent?: React.ComponentType<any> | null;

  /**
   * Rendered when the list is empty.
   */
  ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null;

  /**
   * Rendered at the very end of the list.
   */
  ListFooterComponent?: React.ComponentType<any> | React.ReactElement | null;

  /**
   * Styling for internal View for ListFooterComponent
   */
  ListFooterComponentStyle?: ViewStyle | null;

  /**
   * Rendered at the very beginning of the list.
   */
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;

  /**
   * Styling for internal View for ListHeaderComponent
   */
  ListHeaderComponentStyle?: ViewStyle | null;

  /**
   * Optional custom style for multi-item rows generated when numColumns > 1
   */
  columnWrapperStyle?: StyleProp;

  /**
   * Determines when the keyboard should stay visible after a tap.
   * - 'never' (the default), tapping outside of the focused text input when the keyboard is up dismisses the keyboard. When this happens, children won't receive the tap.
   * - 'always', the keyboard will not dismiss automatically, and the scroll view will not catch taps, but children of the scroll view can catch taps.
   * - 'handled', the keyboard will not dismiss automatically when the tap was handled by a children, (or captured by an ancestor).
   * - false, deprecated, use 'never' instead
   * - true, deprecated, use 'always' instead
   */
  keyboardShouldPersistTaps?: boolean | "always" | "never" | "handled";

  /**
   * Multiple columns can only be rendered with `horizontal={false}` and will zig-zag like a `flexWrap` layout.
   * Items should all be the same height - masonry layouts are not supported.
   */
  numColumns?: number;

  /**
   * The default accessor functions assume this is an Array<{key: string}> but you can override
   * getItem, getItemCount, and keyExtractor to handle any type of index-based data.
   */
  data?: any;

  /**
   * `debug` will turn on extra logging and visual overlays to aid with debugging both usage and
   * implementation, but with a significant perf hit.
   */
  debug?: boolean;

  /**
   * DEPRECATED: Virtualization provides significant performance and memory optimizations, but fully
   * unmounts react instances that are outside of the render window. You should only need to disable
   * this for debugging purposes.
   */
  disableVirtualization?: boolean;

  /**
   * A marker property for telling the list to re-render (since it implements `PureComponent`). If
   * any of your `renderItem`, Header, Footer, etc. functions depend on anything outside of the
   * `data` prop, stick it here and treat it immutably.
   */
  extraData?: any;

  /**
   * A generic accessor for extracting an item from any sort of data blob.
   */
  getItem?: (data: any, index: number) => ItemT;

  /**
   * Determines how many items are in the data blob.
   */
  getItemCount?: (data: any) => number;

  getItemLayout?: (
    data: any,
    index: number
  ) => {
    length: number;
    offset: number;
    index: number;
  };

  horizontal?: boolean | null;

  /**
   * How many items to render in the initial batch. This should be enough to fill the screen but not
   * much more. Note these items will never be unmounted as part of the windowed rendering in order
   * to improve perceived performance of scroll-to-top actions.
   */
  initialNumToRender?: number;

  /**
   * Instead of starting at the top with the first item, start at `initialScrollIndex`. This
   * disables the "scroll to top" optimization that keeps the first `initialNumToRender` items
   * always rendered and immediately renders the items starting at this initial index. Requires
   * `getItemLayout` to be implemented.
   */
  initialScrollIndex?: number | null;

  /**
   * Reverses the direction of scroll. Uses scale transforms of -1.
   */
  inverted?: boolean | null;

  keyExtractor?: (item: ItemT, index: number) => string;

  listKey?: string;

  /**
   * The maximum number of items to render in each incremental render batch. The more rendered at
   * once, the better the fill rate, but responsiveness my suffer because rendering content may
   * interfere with responding to button taps or other interactions.
   */
  maxToRenderPerBatch?: number;

  onEndReached?: ((info: {distanceFromEnd: number}) => void) | null;

  onEndReachedThreshold?: number | null;

  onLayout?: (event: LayoutChangeEvent) => void;

  /**
   * If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make
   * sure to also set the `refreshing` prop correctly.
   */
  onRefresh?: (() => void) | null;

  /**
   * Used to handle failures when scrolling to an index that has not been measured yet.
   * Recommended action is to either compute your own offset and `scrollTo` it, or scroll as far
   * as possible and then try again after more items have been rendered.
   */
  onScrollToIndexFailed?: (info: {
    index: number;
    highestMeasuredFrameIndex: number;
    averageItemLength: number;
  }) => void;

  /**
   * Called when the viewability of rows changes, as defined by the
   * `viewabilityConfig` prop.
   */
  onViewableItemsChanged?: ((info: {viewableItems: any[]; changed: any[]}) => void) | null;

  /**
   * Set this when offset is needed for the loading indicator to show correctly.
   * @platform android
   */
  progressViewOffset?: number;

  /**
   * Set this true while waiting for new data from a refresh.
   */
  refreshing?: boolean | null;

  /**
   * Note: may have bugs (missing content) in some circumstances - use at your own risk.
   *
   * This may improve scroll performance for large lists.
   */
  removeClippedSubviews?: boolean;

  /**
   * Render a custom scroll component, e.g. with a differently styled `RefreshControl`.
   */
  renderScrollComponent?: (props: ScrollViewProps) => React.ReactElement<ScrollViewProps>;

  /**
   * Amount of time between low-pri item render batches, e.g. for rendering items quite a ways off
   * screen. Similar fill rate/responsiveness tradeoff as `maxToRenderPerBatch`.
   */
  updateCellsBatchingPeriod?: number;

  viewabilityConfig?: any;

  viewabilityConfigCallbackPairs?: any;

  /**
   * Determines the maximum number of items rendered outside of the visible area, in units of
   * visible lengths. So if your list fills the screen, then `windowSize={21}` (the default) will
   * render the visible screen area plus up to 10 screens above and 10 below the viewport. Reducing
   * this number will reduce memory consumption and may improve performance, but will increase the
   * chance that fast scrolling may reveal momentary blank areas of unrendered content.
   */
  windowSize?: number;

  renderItem: (info: RenderItemData) => React.ReactElement | null;
}

export interface PickerProps {
  onValueChange?: (itemValue: any, itemPosition: number) => void;
  selectedValue?: any;
  style?: StyleProp;
  testId?: string;
  itemStyle?: StyleProp;
  enabled?: boolean;
  mode?: "dialog" | "dropdown";
  prompt?: string;
}

export type LogLevel = "fatal" | "error" | "warning" | "info" | "debug" | "critical";
export type PermissionKind =
  | "location"
  | "locationAlways"
  | "camera"
  | "microphone"
  | "photo"
  | "contacts"
  | "event"
  | "reminder"
  | "bluetooth"
  | "notification"
  | "backgroundRefresh"
  | "speechRecognition"
  | "mediaLibrary"
  | "motion";
export type PermissionStatus =
  | "authorized"
  | "denied"
  | "softDenied"
  | "restricted"
  | "undetermined";

export interface TrackingProperties {
  [name: string]: any;
}

export function isTestUser(profile?: BaseProfile) {
  return (
    profile &&
    profile.email &&
    (profile.email.indexOf("nang.io") > -1 || profile.email.indexOf("example.com") > -1)
  );
}

export interface TrackerInterface {
  initFinished: boolean;
  init: (config: TrackingConfig) => void;
  trackPages: () => void;
  setUser: (user: BaseProfile) => void;
  setUserProperty: (property: string, value: string | {object: {[id: string]: any}}) => void;
  track: (eventName: string, properties?: TrackingProperties) => void;
  trackNavigation: (screen: string, properties?: TrackingProperties) => void;
  trackLogin: (method: string, success: boolean, properties?: TrackingProperties) => void;
  trackSignup: (method: string, success: boolean, properties?: TrackingProperties) => void;
  trackSignOut: () => void;
  log: (message: string, properties?: TrackingProperties, level?: LogLevel) => void;
  error: (message: string, properties?: TrackingProperties) => void;
  warn: (message: string, properties?: TrackingProperties) => void;
  debug: (message: string, properties?: TrackingProperties) => void;
  handleErrorAlert: (text: string, exception?: Error, showAlert?: boolean) => void;
  trackPermission: (kind: PermissionKind, status: PermissionStatus, requested: boolean) => void;
  updateAppInfo: () => void;
}

export interface NavConfig {
  url?: string;
  wrapper?: (component: any) => any;
  store?: any;
  provider?: any;
}

export interface ProgressBarProps {
  color: Color;
  completed: number;
}
