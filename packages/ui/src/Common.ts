import {CountryCode} from "libphonenumber-js";
import React, {ReactElement, ReactNode} from "react";
import {ListRenderItemInfo, StyleProp, TextStyle, ViewStyle} from "react-native";
import {DimensionValue} from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import {Styles} from "react-native-google-places-autocomplete";
import {SvgProps} from "react-native-svg";

import {
  FontAwesome6BrandNames,
  FontAwesome6RegularNames,
  FontAwesome6SolidNames,
} from "./CommonIconTypes";

export interface AccordionProps {
  /**
   * The content to be displayed inside the accordion.
   */
  children: React.ReactNode;

  /**
   * If true, an information modal will be included.
   * @default false
   */
  includeInfoModal?: boolean;

  /**
   * The content of the information modal.
   */
  infoModalChildren?: ModalProps["children"];

  /**
   * The subtitle of the information modal.
   */
  infoModalSubTitle?: ModalProps["subTitle"];

  /**
   * The text content of the information modal.
   */
  infoModalText?: ModalProps["text"];

  /**
   * The title of the information modal.
   */
  infoModalTitle?: ModalProps["title"];

  /**
   * If true, the accordion will be collapsed.
   * @default true
   */
  isCollapsed?: boolean;

  /**
   * The title of the accordion.
   */
  title: string;
}

export interface BaseProfile {
  email: string;
  id: string;
  backOffice: {
    testUser?: boolean;
  };
}

export interface ThemePrimitiveColors {
  neutral000: string;
  neutral050: string;
  neutral100: string;
  neutral200: string;
  neutral300: string;
  neutral400: string;
  neutral500: string;
  neutral600: string;
  neutral700: string;
  neutral800: string;
  neutral900: string;

  primary000: string;
  primary050: string;
  primary100: string;
  primary200: string;
  primary300: string;
  primary400: string;
  primary500: string;
  primary600: string;
  primary700: string;
  primary800: string;
  primary900: string;

  secondary000: string;
  secondary050: string;
  secondary100: string;
  secondary200: string;
  secondary300: string;
  secondary400: string;
  secondary500: string;
  secondary600: string;
  secondary700: string;
  secondary800: string;
  secondary900: string;

  accent000: string;
  accent050: string;
  accent100: string;
  accent200: string;
  accent300: string;
  accent400: string;
  accent500: string;
  accent600: string;
  accent700: string;
  accent800: string;
  accent900: string;

  error000: string;
  error100: string;
  error200: string;

  warning000: string;
  warning100: string;
  warning200: string;

  success000: string;
  success100: string;
  success200: string;
}

export interface ThemePrimitiveRadius {
  radiusSm: number;
  radiusMd: number;
  radiusLg: number;
  radiusXl: number;
  radius2xl: number;
  radius3xl: number;
}

export interface ThemePrimitiveSpacing {
  spacing0: number;
  spacing1: number;
  spacing2: number;
  spacing3: number;
  spacing4: number;
  spacing5: number;
  spacing6: number;
  spacing7: number;
  spacing8: number;
  spacing9: number;
  spacing10: number;
  spacing11: number;
  spacing12: number;
}

export type ThemePrimitives = ThemePrimitiveColors & ThemePrimitiveRadius & ThemePrimitiveSpacing;

export interface TextThemeConfig {
  primary: keyof ThemePrimitiveColors;
  inverted: keyof ThemePrimitiveColors;
  secondaryLight: keyof ThemePrimitiveColors;
  extraLight: keyof ThemePrimitiveColors;
  secondaryDark: keyof ThemePrimitiveColors;
  link: keyof ThemePrimitiveColors;
  linkLight: keyof ThemePrimitiveColors;
  accent: keyof ThemePrimitiveColors;
  error: keyof ThemePrimitiveColors;
  warning: keyof ThemePrimitiveColors;
  success: keyof ThemePrimitiveColors;
}

export interface SurfaceThemeConfig {
  base: keyof ThemePrimitiveColors;
  primary: keyof ThemePrimitiveColors;
  secondaryLight: keyof ThemePrimitiveColors;
  secondaryDark: keyof ThemePrimitiveColors;
  secondaryExtraDark: keyof ThemePrimitiveColors;
  neutral: keyof ThemePrimitiveColors;
  neutralLight: keyof ThemePrimitiveColors;
  neutralDark: keyof ThemePrimitiveColors;
  disabled: keyof ThemePrimitiveColors;
  error: keyof ThemePrimitiveColors;
  errorLight: keyof ThemePrimitiveColors;
  success: keyof ThemePrimitiveColors;
  successLight: keyof ThemePrimitiveColors;
  warning: keyof ThemePrimitiveColors;
  warningLight: keyof ThemePrimitiveColors;
}

export interface BorderThemeConfig {
  default: keyof ThemePrimitiveColors;
  dark: keyof ThemePrimitiveColors;
  activeNeutral: keyof ThemePrimitiveColors;
  activeAccent: keyof ThemePrimitiveColors;
  hover: keyof ThemePrimitiveColors;
  focus: keyof ThemePrimitiveColors;
  error: keyof ThemePrimitiveColors;
  success: keyof ThemePrimitiveColors;
  warning: keyof ThemePrimitiveColors;
}

export interface StatusThemeConfig {
  active: keyof ThemePrimitiveColors;
  doNotDisturb: keyof ThemePrimitiveColors;
  away: keyof ThemePrimitiveColors;
}

export interface RadiusThemeConfig {
  minimal: keyof ThemePrimitiveRadius;
  default: keyof ThemePrimitiveRadius;
  full: keyof ThemePrimitiveRadius;
  rounded: keyof ThemePrimitiveRadius;
}

export interface SpacingThemeConfig {
  none: keyof ThemePrimitiveSpacing;
  xs: keyof ThemePrimitiveSpacing;
  sm: keyof ThemePrimitiveSpacing;
  md: keyof ThemePrimitiveSpacing;
  lg: keyof ThemePrimitiveSpacing;
  xl: keyof ThemePrimitiveSpacing;
  "2xl": keyof ThemePrimitiveSpacing;
  "3xl": keyof ThemePrimitiveSpacing;
}

export interface TextTheme {
  primary: string;
  inverted: string;
  secondaryLight: string;
  extraLight: string;
  secondaryDark: string;
  link: string;
  linkLight: string;
  accent: string;
  error: string;
  warning: string;
  success: string;
  gold: string;
}

export interface SurfaceTheme {
  base: string;
  primary: string;
  secondaryLight: string;
  secondaryDark: string;
  secondaryExtraDark: string;
  neutral: string;
  neutralLight: string;
  neutralDark: string;
  disabled: string;
  error: string;
  errorLight: string;
  success: string;
  successLight: string;
  warning: string;
  warningLight: string;
}

export interface BorderTheme {
  default: string;
  dark: string;
  activeNeutral: string;
  activeAccent: string;
  hover: string;
  focus: string;
  error: string;
  success: string;
  warning: string;
}

export interface StatusTheme {
  active: string;
  doNotDisturb: string;
  away: string;
}

export interface RadiusTheme {
  minimal: number;
  default: number;
  full: number;
  rounded: number;
}

export interface SpacingTheme {
  none: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  "2xl": number;
  "3xl": number;
}

export type TextColor = keyof TextTheme;
export type SurfaceColor = keyof SurfaceTheme;
export type BorderColor = keyof BorderTheme;
export type StatusColor = keyof StatusTheme;
// TODO: Remove ButtonColor. Buttons no longer have colors, only types (called style in Figma)
export type ButtonColor =
  | "blue"
  | "gray"
  | "red"
  // | "transparent"
  | "white"
  | "primary"
  | "secondary"
  | "accent"
  | "tertiary"
  | string;

// TODO: we may want/need to expand icon color options from just text colors.
export type IconColor = TextColor;

export interface FontTheme {
  primary: string;
  title: string;
}
export type Font = keyof FontTheme;

// The computed theme object that is passed to the ThemeProvider.
export interface FernsTheme {
  text: TextTheme;
  surface: SurfaceTheme;
  border: BorderTheme;
  status: StatusTheme;
  radius: RadiusTheme;
  spacing: SpacingTheme;
  font: FontTheme;
  primitives: ThemePrimitives;
}

// A config for generating the theme object from primitives.
export interface FernsThemeConfig {
  text: TextThemeConfig;
  surface: SurfaceThemeConfig;
  border: BorderThemeConfig;
  status: StatusThemeConfig;
  radius: RadiusThemeConfig;
  spacing: SpacingThemeConfig;
  font: FontTheme;
  primitives: ThemePrimitives;
}

export type Direction = "up" | "right" | "down" | "left";

export type OnChangeCallback = (result: string) => void;

// Update if we start supporting more icon packs from Expo Icons.
export type IconName = FontAwesome6SolidNames | FontAwesome6BrandNames | FontAwesome6RegularNames;

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
export const SPACING_MAP = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 24,
  6: 32,
  7: 40,
  8: 48,
  9: 56,
  10: 64,
  11: 72,
  12: 80,
};

export function getSpacing(spacing: SignedUpTo12) {
  if (spacing < 0) {
    return SPACING_MAP[Math.abs(spacing) as UnsignedUpTo12] * -1;
  }
  return SPACING_MAP[spacing as UnsignedUpTo12];
}

export type TextFieldType =
  | "date"
  | "datetime"
  | "decimal"
  | "decimalRange"
  | "email"
  // | "height"
  | "password"
  | "phoneNumber"
  | "number"
  | "numberRange"
  | "search"
  | "text"
  | "time"
  | "url"
  | "username";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export const iconSizeToNumber = (size?: IconSize) => {
  return {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
    "2xl": 28,
  }[size || "md"];
};

export type TextSize = "sm" | "md" | "lg" | "xl";

export type IconPrefix = "far" | "fas";

export interface BlurBoxProps extends BoxProps {
  blurType?: "regular" | "dark" | "prominent";
}

export interface LayerProps {
  children: ReactChildren;
}

type AccessibilityProps = {
  accessibilityLabel: string;
  accessibilityHint: string;
};

export interface BoxPropsBase {
  alignContent?: AlignContent;
  alignItems?: AlignItems;
  alignSelf?: AlignSelf;
  bottom?: boolean;
  children?: ReactChildren;
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
  rounding?: Rounding | "circle";
  top?: boolean;
  width?: number | string;
  wrap?: boolean;
  zIndex?: number | "auto";

  onClick?: () => void | Promise<void>;
  className?: string;
  style?: any;
  onHoverStart?: () => void | Promise<void>;
  onHoverEnd?: () => void | Promise<void>;
  scroll?: boolean;
  shadow?: boolean;
  border?: BorderColor;
  borderBottom?: BorderColor;
  borderTop?: BorderColor;
  borderLeft?: BorderColor;
  borderRight?: BorderColor;

  avoidKeyboard?: boolean;
  keyboardOffset?: number;
  scrollRef?: React.RefObject<any>;
  onScroll?: (offsetY: number) => void;
  onLayout?: (event: LayoutChangeEvent) => void;
  testID?: string;
}

// If onClick is provided, add accessibility props.
export type BoxProps = BoxPropsBase &
  (BoxPropsBase extends {onClick: () => void} ? AccessibilityProps : {});

export type BoxColor = SurfaceColor | "transparent";

export interface ErrorBoundaryProps {
  onError?: (error: Error, stack: any) => void;
  children?: ReactNode;
}

export interface IconProps {
  iconName: IconName;
  type?:
    | "regular"
    | "brand"
    | "solid"
    | "light"
    | "thin"
    | "duotone"
    | "sharpSolid"
    | "sharpLight"
    | "sharp";
  color?: IconColor;
  size?: IconSize;
  testID?: string;
}

export type TooltipPosition = "top" | "bottom" | "left" | "right";

export type IndicatorDirection = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

export interface SegmentedControlProps {
  items: string[];
  size?: "md" | "lg"; // default "md"
  onChange: (activeIndex: number) => void;
  selectedIndex?: number;
}

// Shared props for fields with labels, subtext, and error messages.
// TODO: combine all the field props based on type
export interface FieldProps {
  show?: boolean;
  labelSize?: TextSize;
  testID?: string;
  errorMessage?: string;
  errorMessageColor?: TextColor;
  label?: string;
  labelColor?: TextColor;
  helperText?: string;
  helperTextColor?: TextColor;
  children?: ReactChildren;
}

export interface TimezonePickerProps {
  timezone?: string;
  onChange: (tz: string | undefined) => void | Promise<void>;
  showLabel?: boolean; // defaults to true
  width?: number | string; // defaults to 100
}

// extend TextStyle to include "outline" since it exists for web
export interface TextStyleWithOutline extends TextStyle {
  outline?: string;
}

interface BaseFieldProps {
  id?: string;
  testID?: string;
  title?: string;
  label?: string;
  placeholderText?: string;
  iconName?: IconName;
  onIconClick?: () => void;
  onBlur?: OnChangeCallback;
  onChange: OnChangeCallback;
  onEnter?: () => void;
  onFocus?: () => void;
  onSubmitEditing?: () => void;
  blurOnSubmit?: boolean;
  disabled?: boolean; // default false
  value?: string;
}

export interface HelperTextProps {
  helperText?: string;
}

export interface ErrorTextProps {
  errorText?: string;
}

export interface TextFieldProps extends BaseFieldProps, HelperTextProps, ErrorTextProps {
  type?: "email" | "password" | "phoneNumber" | "search" | "text" | "url";

  autoComplete?: "current-password" | "on" | "off" | "username";
  returnKeyType?: "done" | "go" | "next" | "search" | "send";

  grow?: boolean;
  multiline?: boolean;
  rows?: number;

  inputRef?: any;
}

export interface TextAreaProps extends Exclude<TextFieldProps, "multiline"> {}

export interface NumberFieldProps extends BaseFieldProps, HelperTextProps, ErrorTextProps {
  type: "number" | "decimal";
  min?: number;
  max?: number;
}

export interface NumberRangeFieldProps extends BaseFieldProps, HelperTextProps, ErrorTextProps {
  type: "numberRange" | "decimalRange";
  min: number;
  max: number;
}

export interface DateTimeFieldProps extends BaseFieldProps, HelperTextProps, ErrorTextProps {
  type: "date" | "datetime" | "time";
  value: string; // ISO string always
  onChange: (date: string) => void;
  dateFormat?: string;
  pickerType?: "default" | "compact" | "inline" | "spinner";
  showTimezone?: boolean; // defaults to true
  timezone?: string;
}

export interface EmailFieldProps extends BaseFieldProps, HelperTextProps, ErrorTextProps {}

export interface PhoneNumberFieldProps extends BaseFieldProps, HelperTextProps, ErrorTextProps {
  /**
   * Defaults to "US"
   */
  defaultCountryCode?: CountryCode;
}

export interface URLFieldProps extends BaseFieldProps, HelperTextProps, ErrorTextProps {}

export interface SearchFieldProps extends BaseFieldProps, HelperTextProps, ErrorTextProps {}

export interface LinkProps {
  href: string;
  inline?: boolean;
  text: string;
  onClick?: () => void;
  // TODO: support target on link
  // target?: null | "blank";
}

export type Rounding =
  | "minimal" // alias "sm"
  | "default" // alias "md"
  | "full" // alias "lg"
  | "rounded" // alias "3xl"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl";

const ROUNDING_MAP = {
  minimal: 2,
  default: 3,
  full: 16,
  rounded: 360,
  sm: 2,
  md: 4,
  lg: 16,
  xl: 32,
  "2xl": 128,
  "3xl": 360,
};

export function getRounding(rounding: Rounding) {
  return ROUNDING_MAP[rounding];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HeadingProps {
  align?: "left" | "right" | "center" | "justify"; // default "left"
  children?: React.ReactNode;
  color?: TextColor;
  overflow?: "normal" | "breakWord"; // default "breakWord"
  size?: "sm" | "md" | "lg" | "xl"; // default "sm"
  truncate?: boolean; // default false
  testID?: string;
}

export interface MetaProps {
  itemProp?: string;
  content?: string;
  itemType?: string;
  key?: string;
  property?: string;
  children?: ReactNode;
}

export interface ImageProps {
  alt?: string;
  color: BoxColor;
  naturalHeight?: number;
  naturalWidth?: number;
  maxWidth?: number;
  maxHeight?: number;
  src: string;
  children?: ReactChildren;
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

export interface BooleanFieldProps {
  label?: string;
  variant?: "simple" | "title"; // default "simple"
  interaction?: boolean; // default true
  disabledHelperText?: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export interface CheckBoxProps {
  /**
   * The background color of the checkbox.
   * @default "default"
   */
  bgColor?: "default" | "gold" | "black";

  /**
   * If true, the checkbox is selected.
   */
  selected: boolean;

  /**
   * The size of the checkbox.
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
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

export interface SplitPageProps {
  /**
   * can accept either one React Child or any array of ReactChild. If this is not provided,
   * renderContent must return one or many ReactChild.
   */
  children?: ReactChild | ReactChild[] | null;
  /**
   * The names of the tabs that will be generated per ReactChild provided.
   * Tabs will not be generated if renderContent is provided in place of children
   */
  tabs?: string[];
  // The select limit for the number of tabs that can be selected
  selectLimit?: number;
  // Provide in mobile if you have a bottomTabBar so that split page can adjust accordingly
  bottomNavBarHeight?: number;
  // boolean to initiate and handle state from the app that has imported ferns-ui
  showItemList?: boolean;
  loading?: boolean;
  color?: SurfaceColor;
  keyboardOffset?: number;
  renderListViewItem: (itemInfo: ListRenderItemInfo<any>) => ReactElement | null;
  renderListViewHeader?: () => ReactElement | null;
  renderContent?: (index?: number) => ReactElement | ReactElement[] | null;
  listViewData: any[];
  listViewExtraData?: any;
  listViewWidth?: number;
  renderChild?: () => ReactChild;
  onSelectionChange?: (value?: any) => void | Promise<void>;
}

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

export interface AddressInterface {
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipcode: string;
  countyName?: string;
  countyCode?: string;
}

export interface TransformValueOptions {
  func?: (value: string) => string;
  options?: {
    [key: string]: any;
  };
}

// TODO: Tighten up type to exclude string, which is almost never an acceptable type for React
// Native children (except Heading or Text for example.).
export type ReactChild = ReactNode;
export type ReactChildren = ReactNode;
export type WithChildren<P> = P & {children?: ReactNode};

export interface AddressAutocompleteProps {
  disabled?: boolean;
  googleMapsApiKey?: string;
  includeCounty?: boolean;
  inputValue: string;
  styles?: Styles;
  handleAddressChange: OnChangeCallback;
  handleAutoCompleteChange: (value: AddressInterface) => void;
  googlePlacesMobileStyles?: Styles;
  testID?: string;
}

export type ActionSheetProps = {
  children?: React.ReactNode;
  ref?: React.MutableRefObject<{
    /**
     * Open or close the ActionSheet.
     */
    setModalVisible(visible?: boolean): void;

    /**
     * Open the Action Sheet.
     */
    show(): void;

    /**
     * Close the ActionSheet.
     */
    hide(): void;

    /**
     * Attach this to any child ScrollView Component's onScrollEndDrag,
     * onMomentumScrollEnd,onScrollAnimationEnd callbacks to handle the ActionSheet
     * closing and bouncing back properly.
     */
    handleChildScrollEnd(): void;

    /**
     * Snap ActionSheet to given offset
     */
    snapToOffset(offset: number): void;
  }>;
  /**
   * Animate the opening and closing of ActionSheet.

   | Type | Required |
   | ---- | -------- |
   | boolean | no |

   Default: `true`
   */
  animated?: boolean;

  /**
   * Use if you want to show the ActionSheet Partially on Opening.
   * **Requires `gestureEnabled=true`**

   | Type | Required |
   | ---- | -------- |
   | boolean | no |

   Default:`1`
   */

  initialOffsetFromBottom?: number;

  /**
   * When touch ends and user has not moved farther from the set springOffset,
   * the ActionSheet will return to previous position.

   | Type | Required |
   | ---- | -------- |
   | number | no |

   Default: `50`
   */
  springOffset?: number;
  /**
   * Add elevation to the ActionSheet container.

   | Type | Required |
   | ---- | -------- |
   | number | no |

   Default: `0`

   #
   */
  elevation?: number;

  /**
   * Color of the gestureEnabled Indicator.

   | Type | Required |
   | ---- | -------- |
   | string | no |

   Default: `"#f0f0f0"`
   */
  indicatorColor?: string;

  /**
   * Normally when the ActionSheet is fully opened, a small portion from the bottom is hidden by
   * default. Use this prop if you want the ActionSheet to hover over the bottom of screen and not
   * hide a little behind it.

   | Type | Required |
   | ---- | -------- |
   | number | no |

   Default:`0`
   */
  extraScroll?: number;
  /**
   * Color of the overlay/backdrop.

   | Type | Required |
   | ---- | -------- |
   | string | no |

   Default: `"black"`
   */
  overlayColor?: string;

  /**
   * Keep the header always visible even when gestures are disabled.

   | Type | Required |
   | ---- | -------- |
   | boolean | no |

   Default: `false`
   */
  headerAlwaysVisible?: boolean;

  /**
   * Delay draw of ActionSheet on open for android.

   | Type | Required |
   | ---- | -------- |
   | boolean | no |

   Default: `false`
   */

  delayActionSheetDraw?: boolean;

  /**
   * Delay draw of ActionSheet on open for android time.

   | Type | Required |
   | ---- | -------- |
   | number (ms) | no |

   Default: `50`
   */

  delayActionSheetDrawTime?: number;

  /**
   * Your custom header component. Using this will hide the default indicator.

   | Type | Required |
   | ---- | -------- |
   | React.Component | no |
   */
  CustomHeaderComponent?: React.ReactNode;

  /**
   * Any custom styles for the container.

   | Type | Required |
   | ---- | -------- |
   | Object | no |
   */
  containerStyle?: ViewStyle;

  /**
   * Control closing ActionSheet by touching on backdrop.

   | Type | Required |
   | ---- | -------- |
   | boolean | no |

   Default: `true`
   */
  closeOnTouchBackdrop?: boolean;

  /**
   * Speed of opening animation. Higher means the ActionSheet will open more quickly.

   | Type | Required |
   | ---- | -------- |
   | number | no |

   Default: `12`
   */
  openAnimationSpeed?: number;
  /**
   * Duration of closing animation.

   | Type | Required |
   | ---- | -------- |
   | number | no |

   Default: `300`
   */
  closeAnimationDuration?: number;
  /**
   *
   How much you want the ActionSheet to bounce when it is opened.

   | Type | Required |
   | ---- | -------- |
   | number | no |

   Default: `8`
   */
  bounciness?: number;

  /**
   * Will the ActionSheet close on `hardwareBackPress` event.

   | Type | Required |
   | ---- | -------- |
   | boolean | no |

   Default: `true`
   */
  closeOnPressBack?: boolean;
  /**
   * Default opacity of the overlay/backdrop.

   | Type | Required |
   | ---- | -------- |
   | number 0 - 1 | no |

   Default: `0.3`
   */
  defaultOverlayOpacity?: number;

  /**
   * Enables gesture control of ActionSheet

   | Type | Required |
   | ---- | -------- |
   | boolean | no |

   Default: `false`
   */
  gestureEnabled?: boolean;

  /**
   * Bounces the ActionSheet on open.

   | Type | Required |
   | ---- | -------- |
   | boolean | no |

   Default: `false`
   */
  bounceOnOpen?: boolean;

  /**
   * Setting the keyboard persistence of the ScrollView component, should be one of "never",
   * "always", or "handled"

   | Type | Required |
   | ---- | -------- |
   | string | no |

   Default: `"never"`
   */
  keyboardShouldPersistTaps?: boolean | "always" | "never" | "handled";

  /**
   * Determine whether the modal should go under the system statusbar.

   | Type | Required |
   | ---- | -------- |
   | boolean | no |

   Default: `true`
   */
  statusBarTranslucent?: boolean;

  /**
   * Prevent ActionSheet from closing on
   * gesture or tapping on backdrop.
   * Instead snap it to `bottomOffset` location
   *
   *
   * | Type | Required |
   | ---- | -------- |
   | boolean | no |
   */
  closable?: boolean;

  /**
   * Allow ActionSheet to draw under the StatusBar.
   * This is enabled by default.
   *
   *
   * | Type | Required |
   | ---- | -------- |
   | boolean | no |
   Default: `true`
   */
  drawUnderStatusBar?: boolean;

  /**
   * Snap ActionSheet to this location if `closable` is set to false;
   *
   *
   * | Type | Required |
   | ---- | -------- |
   | number | no |
   */

  bottomOffset?: number;

  /**
   * Change how ActionSheet behaves when keyboard is opened.
   *
   *
   * | Type | Required |
   | ---- | -------- |
   | "padding" | "position" | no |
   Default:`padding`
   */

  keyboardMode?: "padding" | "position";

  /**
   * Test ID for unit testing
   */
  testID?: string;

  /**
   *
   Event called when the ActionSheet closes.


   * | Type | Required |
   | ---- | -------- |
   | function | no |


   #
   */

  onClose?: () => void;

  /**
   * An event called when the ActionSheet Opens.

   | Type | Required |
   | ---- | -------- |
   | function | no |
   */
  onOpen?: () => void;

  /**
   * Event called when position of ActionSheet changes.
   */
  onPositionChanged?: (hasReachedTop: boolean) => void;
};

export type AvatarStatus = "offline" | "online" | "outOfOffice" | "activeMobile" | "imagePicker";

export type AvatarImagePickerEvent = {
  avatarImageFormat?: string;
  base64?: string;
  uri?: string;
  height?: number;
  width?: number;
};

export interface CustomSvgProps extends SvgProps {
  doNotDisturb?: boolean;
}

export interface AvatarProps {
  /**
   * The name of the user. This is used for the placeholder treatment if an image is not available.
   */
  name: string;
  /**
   * Adds a white border around Avatar so it's visible when displayed on other images.
   */
  hasBorder?: boolean;
  /**
   * xs: 24px, sm: 32px, md: 48px, lg: 64px, xl: 120px.
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /**
   * The URL of the user's image.
   */
  src?: string;
  /**
   * Function to handle the avatar image edit
   */
  onChange?: (val: AvatarImagePickerEvent) => void;
  /**
   * The status of the user to display with the avatar.
   */
  status?: AvatarStatus;
  /**
   * If true, the status will have a "Z" to indicate the user has snoozed notifications.
   */
  doNotDisturb?: boolean;
  /**
   * Accessibility label for the avatar image.
   */
  accessibilityLabel?: string;
}

export interface BadgeProps {
  iconName?: IconName;
  // The text to display inside the badge.
  value?: number | string;
  // Position relative to the text. Top should only be used with headings.
  status?: "info" | "error" | "warning" | "success" | "neutral"; // default "info
  secondary?: boolean;
  hasIcon?: boolean;
  variant?: "iconOnly" | "numberOnly" | "text"; // text is default
  // TODO: improve type discrimination
  // used for numberOnly variant to display "${maxValue}+" when value is greater than max
  maxValue?: number;
}

export interface BannerProps {
  id: string;
  customButtonProps?: Partial<ButtonProps>;
  color?: BoxColor;
  dismissible?: boolean;
  iconName?: IconName;
  negativeXMargin?: number;
  onClick?: () => void;
  shape?: Rounding;
  subtext?: string;
  text: string;
  textColor?: TextColor;
  type?: "dismiss" | "action" | "permanent" /* deprecated */ | "customButton";
  width?: number | string;
}

export interface BodyProps {
  scroll?: boolean;
  loading?: boolean;
  padding?: UnsignedUpTo12;
  height?: number | string;
  avoidKeyboard?: boolean; // default true
  children?: ReactNode;
}

export interface ButtonProps {
  /**
   * If true, the button will be disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If true, the button will take the full width of its container.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * The name of the icon to display in the button.
   */
  iconName?: IconName;
  /**
   * The position of the icon within the button.
   * @default "left"
   */
  iconPosition?: "left" | "right";
  /**
   * If true, a loading spinner will be shown in the button.
   */
  loading?: boolean;
  /**
   * The title of the confirmation modal.
   * @default "Confirm"
   */
  modalTitle?: string;
  /**
   * The subtitle of the confirmation modal.
   */
  modalSubTitle?: string;
  /**
   * The text content of the confirmation modal.
   * @default "Are you sure you want to continue?"
   */
  modalText?: string;
  /**
   * The test ID for the button, used for testing purposes.
   */
  testID?: string;
  /**
   * The text content of the button.
   */
  text: string;
  /**
   * The position of the tooltip.
   */
  tooltipIdealPosition?: TooltipPosition;
  /**
   * Include an arrow in the tooltip. Pointing to the button.
   * @default false
   */
  tooltipIncludeArrow?: boolean;
  /**
   * The text content of the tooltip.
   */
  tooltipText?: string;
  /**
   * The type of the button, which determines its style.
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "muted" | "outline" | "destructive";
  /**
   * If true, a confirmation modal will be shown before the onClick action.
   */
  withConfirmationModal?: boolean;
  /**
   * The function to call when the button is clicked.
   */
  onClick: () => void | Promise<void>;
}

export interface CustomSelectFieldProps {
  /**
   * The current value of the select field.
   */
  value: string | undefined;

  /**
   * The function to call when the selected value changes.
   */
  onChange: (value: string | undefined) => void;

  /**
   * The options available for selection in the select field.
   * Each option should have a label and a value.
   */
  options: FieldOptions;

  /**
   * The placeholder text to display when no option is selected.
   */

  placeholder?: string;
  /**
   * If true, the select field will be disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * The error text to display if there is an error.
   */
  errorText?: string;

  /**
   * The helper text to display below the select field.
   */
  helperText?: string;

  /**
   * The title of the select field.
   */
  title?: string;
}

export interface DateTimeActionSheetProps {
  value?: string;
  type?: "date" | "time" | "datetime";
  // Returns an ISO 8601 string. If mode is "time", the date portion is today.
  onChange: OnChangeCallback;
  actionSheetRef: React.RefObject<any>;
  visible: boolean;
  onDismiss: () => void;
  timezone?: string;
}

export interface DecimalRangeActionSheetProps {
  value: string;
  min: number;
  max: number;
  onChange: OnChangeCallback;
  actionSheetRef: React.RefObject<any>;
}

export interface DecimalRangeActionSheetState {
  whole: string;
  decimal: string;
}

export interface ErrorPageProps {
  error: Error;
  resetError: () => void;
}

export interface FieldProps {
  name?: string;
  label?: string;
  height?: number;
  type?:
    | "address"
    | "boolean"
    | "currency"
    | "customSelect"
    | "date"
    | "datetime"
    | "email"
    | "multiselect"
    | "number"
    | "password"
    | "percent"
    | "phoneNumber"
    | "select"
    | "signature"
    | "text"
    | "textarea"
    | "time"
    | "url";
  rows?: number;
  value?: any;
  onChange?: any;
  onBlur?: any;
  onStart?: any;
  onEnd?: any;
  options?: FieldOptions;
  placeholder?: string;
  disabled?: boolean;
  useCheckbox?: boolean;
  includeCounty?: boolean;
  googleMapsApiKey?: string;
  googlePlacesMobileStyles?: Styles;
  transformValue?: TransformValueOptions;
}

export interface FormLineProps {
  name: string;
  value: any;
  onSave: (value: any) => void;
  kind: "boolean" | "string" | "textarea" | "select" | "multiboolean";
  options?: string[];
}

export interface HeightActionSheetProps {
  value?: string;
  onChange: OnChangeCallback;
  actionSheetRef: React.RefObject<any>;
}

export interface HyperlinkProps {
  linkDefault?: boolean;
  linkify?: any;
  linkStyle?: StyleProp<any>;
  linkText?: string | ((url: string) => string);
  onPress?: (url: string) => void;
  onLongPress?: (url: string, text: string) => void;
  injectViewProps?: (url: string) => any;
  children?: React.ReactNode;
  style?: StyleProp<any>;
}

export interface IconButtonProps {
  /**
   * The accessibility hint describes the results of performing an action on a control or view.
   * It should be a very brief description of the result of interacting with the button.
   */
  accessibilityHint?: string;

  /**
   * The accessibility label attribute identifies the user interface element.
   * It should be a very brief description of the element, such as "Add", "Play", "Deleted", etc.
   */
  accessibilityLabel: string;

  /**
   * The heading of the confirmation modal.
   * @default "Confirm"
   */
  confirmationHeading?: string;

  /**
   * The text content of the confirmation modal.
   * @default "Are you sure you want to continue?"
   */
  confirmationText?: string;

  /**
   * The name of the icon to display in the button.
   */
  iconName: IconName;

  /**
   * If true, a loading spinner will be shown in the button.
   */
  loading?: boolean;

  /**
  /**
   * The test ID for the button, used for testing purposes.
   */
  testID?: string;

  /**
   * The ideal position of the tooltip.
   */
  tooltipIdealPosition?: TooltipPosition;
  /**
   * Include an arrow in the tooltip. Pointing to the button.
   * @default false
   */
  tooltipIncludeArrow?: boolean;
  /**
   * The text content of the tooltip.
   */
  tooltipText?: string;

  /**
   * The variant of the button, which determines its style.
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "muted" | "destructive";

  /**
   * If true, a confirmation modal will be shown before the onClick action.
   * @default false
   */
  withConfirmation?: boolean;

  /**
   * The function to call when the button is clicked.
   */
  onClick: () => void | Promise<void>;
}

export interface InfoTooltipButtonProps {
  text: string;
  size?: IconSize;
}

export interface ModalProps {
  /**
   * The content of the modal.
   */
  children?: React.ReactElement;
  /**
   * If true, the primary button will be disabled.
   * @default false
   */
  primaryButtonDisabled?: boolean;
  /**
   * The text content of the primary button.
   */
  primaryButtonText?: string;
  /**
   * The text content of the secondary button.
   */
  secondaryButtonText?: string;
  /**
   * The size of the modal.
   * @default "sm"
   */
  size?: "sm" | "md" | "lg";
  /**
   * The subtitle of the modal.
   */
  subTitle?: string;
  /**
   * The text content of the modal.
   */
  text?: string;
  /**
   * The title of the modal.
   */
  title?: string;
  /**
   * If true, the modal will be visible.
   */
  visible: boolean;
  /**
   * The function to call when the modal is dismissed.
   */
  onDismiss: () => void;
  /**
   * The function to call when the primary button is clicked.
   */
  primaryButtonOnClick?: (value?: any) => void | Promise<void>;
  /**
   * The function to call when the secondary button is clicked.
   */
  secondaryButtonOnClick?: (value?: any) => void | Promise<void>;
}

export interface NumberPickerActionSheetProps {
  value: string;
  min: number;
  max: number;
  onChange: OnChangeCallback;
  actionSheetRef: React.RefObject<any>;
}

export interface PageProps {
  // TODO: figure out navigation
  navigation: any;
  scroll?: boolean;
  loading?: boolean;
  display?: "flex" | "none" | "block" | "inlineBlock";
  title?: string;
  backButton?: boolean;
  closeButton?: boolean;
  direction?: "row" | "column";
  padding?: UnsignedUpTo12;
  color?: SurfaceColor;
  maxWidth?: number | string;
  keyboardOffset?: number;
  footer?: any;
  rightButton?: string;
  rightButtonOnClick?: () => void;
  children?: any;
  onError?: (error: Error, stack: any) => void;
}

export interface ProgressBarProps {
  color: SurfaceColor;
  completed: number;
}

export interface RadioProps {
  selected?: boolean;
}

export interface RadioFieldProps {
  title: string;
  variant?: "leftText" | "rightText"; // default "rightText"
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

export interface SignatureFieldProps {
  state?: "default" | "error" | "disabled"; // default "default"
  value?: string;
  onChange: (value: any) => void;
  title?: string; // default "Signature"
  onStart?: () => void;
  onEnd?: () => void;
  disabledText?: string;
  errorText?: string;
}

export interface SideDrawerProps {
  // Position of the drawer relative to the child
  position?: "right" | "left";
  // Used to open/hide drawer. Use the onClose and onOpen props to control state
  isOpen: boolean;
  // Content within the drawer
  renderContent: () => ReactElement | ReactElement[];
  // TODO: Allow the hardware back button on Android to close the SideDrawer
  onClose?: () => void;
  onOpen?: () => void;
  drawerType?: "front" | "back" | "slide" | "permanent";
  // Content that is wrapped by the drawer. The drawer will use the height of the child it wraps.
  // Can be overwritten via styles prop
  children?: ReactElement;
  drawerStyles?: StyleProp<ViewStyle>;
}

export interface SpinnerProps {
  size?: "sm" | "md";
  color?: "light" | "dark" | "accent" | "secondary";
}

export type ColumnSortInterface = {
  column: number;
  direction: "asc" | "desc";
};

export interface TableProps {
  /**
   * Must be instances of TableHeader, TableRow, and/or TableFooter components.
   */
  children: React.ReactNode | React.ReactNode[];
  /**
   * Width of columns in the table. This is used to calculate the width of each column.
   * Can be numbers for pixels or strings for percentages.
   */
  // in figma/ jos documentation for the component, TableTitle,
  // she included the width as prop size
  /**
   * The size of the table title.
   * Can be one of "sm", "md", "lg", or "xl".
   */
  // size: "sm" | "md" | "lg" | "xl";
  //   const width = {
  //   sm: 82,
  //   md: 161,
  //   lg: 233,
  //   xl: 302,
  // };
  columns: Array<number | string>;
  /**
   * Specify a border width for Table: "sm" is 1px.
   */
  borderStyle?: "sm" | "none";
  /**
   * Use numbers for pixels: `maxHeight={100}` and strings for percentages: `maxHeight="100%"`.
   */
  maxHeight?: DimensionValue;
  /**
   * If true, the header will stick to the top of the table when scrolling. Defaults to true.
   */
  stickyHeader?: boolean;
  /**
   * If true, alternate rows will have a light gray background. Defaults to true.
   */
  alternateRowBackground?: boolean;

  /**
   * Control sort outside of the Table
   */
  sort?: ColumnSortInterface;
  /**
   * Set the page outside of the Table
   */
  page?: number;
  /**
   * Set the page outside of the Table
   */
  setPage?: (page: number) => void;
  /**
   * If true, the table will render a next page button. Defaults to true.
   */
  more?: boolean;
  /**
   * Extra controls to render below the table next to pagination
   */
  extraControls?: React.ReactElement;
}

export interface TableHeaderProps {
  /**
   * Must be an instance of TableRow.
   */
  children: React.ReactNode | React.ReactNode[];
  /**
   * Display `visuallyHidden` ensures the component is visually hidden but still is read by screen
   * readers.
   */
  display?: "tableHeaderGroup" | "visuallyHidden";
  /**
   * If true, the table header will be sticky and the table body will be scrollable. Not yet
   * implemented.
   */
  sticky?: boolean;
  color?: BoxColor;
}

export interface TableHeaderCellProps {
  /**
   * The content of the table header cell.
   */
  children: ReactElement;
  index: number;
  sortable?: boolean;
  onSortChange?: (direction: "asc" | "desc" | undefined) => void;
}

export interface TableRowProps {
  /**
   * Must be instances of TableCell or TableHeaderCell.
   */
  children: React.ReactNode | React.ReactNode[];
  /**
   * Header rows have an extra thick bottom border.
   */
  headerRow?: boolean;
  /**
   * Whether the row should start expanded or not.
   */
  expanded?: boolean;
  /**
   * When the row is expanded, the drawerContents are shown. If not
   */
  drawerContents?: React.ReactNode | React.ReactNode[];
  /**
   * Background color of the row. Defaults to white.
   */
  color?: BoxColor;
}

export type TableFilters = Record<string, string[]>;

export type TableSearch = {search: string; field: string};

export interface TableContextType {
  columns: Array<number | string>;
  hasDrawerContents: boolean;
  sortColumn?: ColumnSortInterface | undefined;
  setSortColumn?: (sort: ColumnSortInterface | undefined) => void;
  stickyHeader?: boolean;
  borderStyle?: "sm" | "none";
  alternateRowBackground?: boolean;
  page?: number;
}

export interface TableContextProviderProps extends TableContextType {
  children: React.ReactElement;
}

export interface TextProps {
  align?: "left" | "right" | "center" | "justify"; // default "left"
  children?: React.ReactNode;
  bold?: boolean; // default false
  color?: TextColor;
  italic?: boolean; // default false
  size?: TextSize; // default "md"
  truncate?: boolean; // default false
  underline?: boolean;
  numberOfLines?: number;
  skipLinking?: boolean;
  testID?: string;
}

export interface TextFieldPickerActionSheetProps {
  value?: string;
  mode?: "date" | "time";
  onChange: OnChangeCallback;
  actionSheetRef: React.RefObject<any>;
}

export interface ToastProps {
  title: string;
  variant?: "error" | "info" | "success" | "warning";
  secondary?: boolean;
  size?: "sm" | "lg";
  onDismiss?: () => void;
  persistent?: boolean;
  // TODO enforce these should only show if size is "lg" with type discrinimation
  subtitle?: string;
  // TODO Add buttons for Toast
  // buttonText?: string;
  // buttonOnClick?: () => void | Promise<void>;
}

export interface TooltipProps {
  /**
   * The content of the tooltip.
   */
  children: React.ReactElement;

  /**
   * If true, an arrow will be included in the tooltip.
   * @default false
   */
  includeArrow?: boolean;

  /**
   * The ideal position of the tooltip.
   * @default "top"
   */
  idealPosition?: "top" | "bottom" | "left" | "right";

  /**
   * The text content of the tooltip. If text is undefined,
   * the children will be rendered without a tooltip.
   */
  text?: string;
}

export interface LinkProps extends TextProps {
  href: string;
}

export interface TapToEditProps extends Omit<FieldProps, "onChange" | "value"> {
  title: string;
  value: any;
  // Not required if not editable.
  setValue?: (value: any) => void;
  // Not required if not editable.
  onSave?: (value: any) => void | Promise<void>;
  // Defaults to true
  editable?: boolean;
  // enable edit mode from outside the component
  isEditing?: boolean;
  // For changing how the non-editing row renders
  rowBoxProps?: Partial<BoxProps>;
  transform?: (value: any) => string;
  fieldComponent?: (setValue: () => void) => ReactElement;
  withConfirmation?: boolean;
  confirmationText?: string;
  confirmationHeading?: string;
  description?: string;
  openApiModel?: string;
  openApiField?: string;
  showDescriptionAsTooltip?: boolean;
  // Default true. If false, description is shown below the value always.
  onlyShowDescriptionWhileEditing?: boolean;
}

export interface APIError {
  status: number;
  data: {
    title: string;
    detail?: string;
    id?: string;
    links?: string;
    about?: string;
    status?: number;
    code?: string;
    source?: string;
    pointer?: string;
    parameter?: string;
    meta?: {[id: string]: any};
  };
}

export type OpenApiPropertyType =
  | "string"
  | "date"
  | "datetime"
  | "boolean"
  | "array"
  | "object"
  | "number"
  | "any";

export type OpenApiProperty = {
  type?: OpenApiPropertyType;
  format?: string;
  properties?: OpenApiProperty;
  items?: OpenApiProperty[];
  description?: string;
  // TODO: is this actually there?
  required?: string[];
  enum?: string[];
};

export type ModelFields = {
  type: "object" | "array";
  required: string[];
  properties: {[name: string]: OpenApiProperty};
};

export interface OpenAPISpec {
  paths: {
    [key: string]: any;
  };
}

export type ModelFieldConfig = any;

export interface OpenAPIProviderProps {
  children: React.ReactElement;
  specUrl?: string;
}

export interface OpenAPIContextType {
  spec: OpenAPISpec | null;
  getModelFields: (modelName: string) => ModelFields | null;
  getModelField: (modelName: string, field: string) => OpenApiProperty | null;
}

// The config for a single column in the table display of a model.
export interface ModelAdminFieldConfig {
  fieldKey: string; // Dot notation representation of the field.
  title: string;
  description?: string;
  type: OpenApiPropertyType;
  width?: number;
  minWidth?: number;
  options?: string[];
  sort?: string;
  CustomComponent?: (props: ModelAdminCustomComponentProps) => React.ReactElement | null;
}

// The props for a custom column component for ModelAdmin.
export interface ModelAdminCustomComponentProps extends Omit<FieldProps, "name"> {
  doc: any; // The rest of the document.
  fieldKey: string; // Dot notation representation of the field.
  // user: User;
  editing: boolean; // Allow for inline editing of the field.
}

export interface MultiselectFieldProps {
  /**
   * The available options for the multiselect field.
   */
  options: string[];

  /**
   * The title of the multiselect field.
   */
  title: string;

  /**
   * The selected values of the multiselect field.
   */
  value: string[];

  /**
   * The variant of the multiselect field, which determines the position of the text.
   * @default "rightText"
   */
  variant?: "rightText" | "leftText";

  /**
   * The function to call when the selected values change.
   */
  onChange: (selected: string[]) => void;
}

export interface TableTitleProps {
  /**
   * The text content of the table title.
   */
  title: string;
}

export interface TableBooleanProps {
  /**
   * If true, the component is in editing mode.
   * @default false
   */
  isEditing?: boolean;

  /**
   * The function to call when the value is saved.
   */
  onSave: () => void | Promise<void>;

  /**
   * The boolean value to be displayed or edited.
   */
  value: boolean;
}

export interface TableDateProps {
  /**
   * If true, the date is annotated.
   * @default false
   */
  annotated?: boolean;

  /**
   * If true, the component is in editing mode.
   * @default false
   */
  isEditing?: boolean;

  /**
   * The function to call when the value is saved.
   */
  onSave?: () => void;

  /**
   * The date value to be displayed or edited. Can be a string or a Date object.
   */
  value: string | Date;
}

export interface TableIconButtonProps {
  /**
   * The name of the icon button to display in the table.
   * Can be one of "edit", "saveAndClose", "insert", "drawerOpen", or "drawerClose".
   */
  tableIconButtonName: "edit" | "saveAndClose" | "insert" | "drawerOpen" | "drawerClose";

  /**
   * The function to call when the icon button is clicked.
   */
  onClick: () => void | Promise<void>;
}

export type FieldOptions = {
  /**
   * The label to display for the option.
   */
  label: string;

  /**
   * The key of the option. Useful for uniquely identifying the option.
   */
  key?: string;

  /**
   * The value of the option.
   */
  value: string;
}[];
export interface SelectFieldProps {
  /**
   * If true, the select field will be disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * The error text to display if there is an error.
   */
  errorText?: string;

  /**
   * The helper text to display below the select field.
   */
  helperText?: string;

  /**
   * The options available for selection in the select field.
   * Each option should have a label and a value.
   */
  options: FieldOptions;

  /**
   * The placeholder text to display when no option is selected.
   */
  placeholder?: string;

  /**
   * The title of the select field.
   */
  title?: string;

  /**
   * The current value of the select field.
   */
  value: string | undefined;

  /**
   * The function to call when the selected value changes.
   */
  onChange: (value: string | undefined) => void;
}
