import { SyntheticEvent } from "react";
import { SelectListOptions } from "./SelectList";
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
    PROFILE_COLLECTION: string;
    TERMS_URL: string;
    BASE_URL: string;
    PRODUCTION: boolean;
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
export interface UnifiedTheme {
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
export declare type Font = "primary" | "primaryBold" | "secondary" | "secondaryBold" | "accent" | "accentBold" | "title" | "button";
export declare type Direction = "up" | "right" | "down" | "left";
export declare type Color = "blue" | "darkGray" | "eggplant" | "gray" | "green" | "lightGray" | "maroon" | "midnight" | "navy" | "olive" | "orange" | "orchid" | "pine" | "purple" | "red" | "watermelon" | "white" | "black";
export declare type ThemeColor = "primaryLighter" | "primaryLight" | "primary" | "primaryDark" | "primaryDarker" | "secondaryLighter" | "secondaryLight" | "secondary" | "secondaryDark" | "secondaryDarker" | "tertiaryLighter" | "tertiaryLight" | "tertiary" | "tertiaryDark" | "tertiaryDarker" | "accentLighter" | "accentLight" | "accent" | "accentDark" | "accentDarker";
export declare type NeutralColor = "neutral900" | "neutral800" | "neutral700" | "neutral600" | "neutral500" | "neutral400" | "neutral300" | "neutral200" | "neutral100" | "neutral90" | "neutral80" | "neutral70" | "neutral60" | "neutral50" | "neutral40" | "neutral30" | "neutral20" | "neutral10";
export declare type AllColors = Color | ThemeColor | NeutralColor;
export interface OnChangeResult {
    event?: SyntheticEvent<any>;
    value: string;
}
export declare type OnChangeCallback = (result: OnChangeResult) => void;
export declare type IconName = "heart" | "chevron-left" | "hat-chef" | "book" | "list-alt" | "carrot" | "comment" | "user-circle" | "fire" | "chart-pie" | "knife-kitchen" | "oven" | "clock" | "utensils-alt" | "search" | "chevron-right" | "plus" | "ellipsis-v" | "paper-plane" | "exclamation-circle" | "edit";
export declare type GestaltIconName = "add" | "add-circle" | "add-pin" | "arrow-back" | "arrow-circle-forward" | "arrow-down" | "arrow-forward" | "arrow-up" | "bell" | "camera" | "cancel" | "check" | "check-circle" | "circle-outline" | "clear" | "clock" | "cog" | "compass" | "dash" | "edit" | "ellipsis" | "ellipsis-circle-outline" | "facebook" | "face-happy" | "face-sad" | "face-smiley" | "filter" | "flag" | "flashlight" | "globe" | "graph-bar" | "handle" | "heart" | "heart-broken" | "knoop" | "lightbulb" | "link" | "location" | "lock" | "menu" | "move" | "pause" | "people" | "person" | "person-add" | "pin" | "pin-hide" | "pinterest" | "play" | "question-mark" | "remove" | "report" | "search" | "shopping-bag" | "smiley" | "smiley-outline" | "send" | "share" | "sound" | "speech" | "speech-ellipsis" | "tag";
export declare type AlignContent = "start" | "end" | "center" | "between" | "around" | "stretch";
export declare type AlignSelf = "auto" | "start" | "end" | "center" | "baseline" | "stretch";
export declare type AlignItems = "start" | "end" | "center" | "baseline" | "stretch";
export declare type JustifyContent = "start" | "end" | "center" | "between" | "around";
export declare type UnsignedUpTo12 = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export declare type SignedUpTo12 = -12 | -11 | -10 | -9 | -8 | -7 | -6 | -5 | -4 | -3 | -2 | -1 | UnsignedUpTo12;
export declare type Margin = SignedUpTo12 | "auto";
export declare const SPACING = 4;
export declare type TextFieldType = "date" | "email" | "number" | "numberRange" | "decimalRange" | "decimal" | "username" | "password" | "search" | "text" | "url" | "height";
export declare type IconSize = "xs" | "sm" | "md" | "lg" | "xl";
export declare const iconSizeToNumber: (size?: IconSize | undefined) => number;
export declare const iconNumberToSize: (size?: number) => IconSize;
export declare function getSectionColor(section: "Breakfast" | "Lunch" | "Dinner" | "Snack" | "workouts"): Color;
export declare type TextSize = "sm" | "md" | "lg";
export declare type TextColor = "blue" | "darkGray" | "eggplant" | "gray" | "green" | "lightGray" | "maroon" | "midnight" | "navy" | "olive" | "orange" | "orchid" | "pine" | "purple" | "red" | "watermelon" | "white";
export declare type ButtonColor = "blue" | "gray" | "red" | "white" | "primary" | "secondary" | "accent" | "tertiary";
export declare type IconPrefix = "far" | "fal" | "fas" | "fab";
export interface TextProps {
    align?: "left" | "right" | "center" | "justify";
    children?: React.ReactNode;
    color?: AllColors;
    inline?: boolean;
    italic?: boolean;
    overflow?: "normal" | "breakWord";
    size?: TextSize;
    truncate?: boolean;
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
    onClick?: any;
    className?: any;
    style?: any;
    scroll?: boolean;
    shadow?: boolean;
    border?: AllColors;
    avoidKeyboard?: boolean;
    keyboardOffset?: number;
    scrollRef?: any;
    onScroll?: (offsetY: number) => void;
    onLayout?: (event: any) => void;
}
export declare type BoxColor = AllColors | "transparent";
export interface ButtonProps {
    text: string;
    color?: ButtonColor | Color;
    disabled?: boolean;
    inline?: boolean;
    size?: "sm" | "md" | "lg";
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
export declare type DrawerDirection = "left" | "right" | "bottom" | "top";
export interface ErrorBoundaryProps {
    onError?: (error: Error, stack: any) => void;
}
export interface FaceBookButtonProps {
    errorMessageColor?: "red" | "white";
    signUp: boolean;
}
export interface IconProps {
    prefix?: IconPrefix;
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
    bgColor?: "transparent" | "transparentDarkGray" | "gray" | "lightGray" | "white";
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
    onChange: ({ activeIndex }: {
        activeIndex: number;
    }) => void;
    selectedItemIndex: number;
    responsive?: boolean;
    size?: "md" | "lg";
}
export interface FieldWithLabelsProps {
    errorMessage?: string;
    errorMessageColor?: AllColors;
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
    validate?: (value: any) => boolean;
    validateErrorMessage?: string;
    type?: "boolean" | "email" | "text" | "textarea" | "number" | "currency" | "percent" | "select" | "password" | "url" | "date";
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
    searching?: boolean;
    returnKeyType?: "done" | "go" | "next" | "search" | "send";
    autoFocus?: boolean;
    grow?: boolean;
    inputRef?: any;
    onSubmitEditing?: any;
    onEnter?: any;
    multiline?: boolean;
    rows?: number;
    height?: number;
    paddingX?: number;
    paddingY?: number;
    min?: number;
    max?: number;
}
export declare type TextAreaProps = TextFieldProps;
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
export declare type Rounding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | "circle" | "pill";
export interface HeadingProps {
    align?: "left" | "right" | "center" | "justify";
    children?: React.ReactNode;
    color?: AllColors;
    overflow?: "normal" | "breakWord";
    size?: "sm" | "md" | "lg";
    truncate?: boolean;
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
    onChange: ({ value }: {
        value: boolean;
    }) => void;
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
    useBox?: boolean;
    style?: any;
    padding?: UnsignedUpTo12;
    height?: number | string;
    avoidKeyboard?: boolean;
}
export interface ChatPaneProps {
    messagesView: any;
    textFormView: any;
    ref: any;
}
export interface ScrollViewProps {
    scrollTo?: (y?: number | {
        x?: number;
        y?: number;
        animated?: boolean;
    }, x?: number, animated?: boolean) => void;
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
    /**
     * Determines whether the keyboard gets dismissed in response to a drag.
     *   - 'none' (the default) drags do not dismiss the keyboard.
     *   - 'onDrag' the keyboard is dismissed when a drag begins.
     *   - 'interactive' the keyboard is dismissed interactively with the drag
     *     and moves in synchrony with the touch; dragging upwards cancels the
     *     dismissal.
     */
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
    /**
     * Fires at most once per frame during scrolling.
     * The frequency of the events can be contolled using the scrollEventThrottle prop.
     */
    onScroll?: (event: any) => void;
    /**
     * Fires if a user initiates a scroll gesture.
     */
    /**
     * Fires when a user has finished scrolling.
     */
    /**
     * Fires when scroll view has finished moving
     */
    /**
     * Fires when scroll view has begun moving
     */
    /**
     * When true the scroll view stops on multiples of the scroll view's size
     * when scrolling. This can be used for horizontal pagination. The default
     * value is false.
     */
    /**
     * When false, the content does not scroll. The default value is true
     */
    /**
     * Experimental: When true offscreen child views (whose `overflow` value is
     * `hidden`) are removed from their native backing superview when offscreen.
     * This canimprove scrolling performance on long lists. The default value is
     * false.
     */
    /**
     * When true, shows a horizontal scroll indicator.
     */
    /**
     * When true, shows a vertical scroll indicator.
     */
    /**
     * Style
     */
    style?: any;
}
declare type ItemT = any;
declare type ViewStyle = any;
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
    getItemLayout?: (data: any, index: number) => {
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
    onEndReached?: ((info: {
        distanceFromEnd: number;
    }) => void) | null;
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
    onViewableItemsChanged?: ((info: {
        viewableItems: any[];
        changed: any[];
    }) => void) | null;
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
export declare type LogLevel = "fatal" | "error" | "warning" | "info" | "debug" | "critical";
export declare type PermissionKind = "location" | "locationAlways" | "camera" | "microphone" | "photo" | "contacts" | "event" | "reminder" | "bluetooth" | "notification" | "backgroundRefresh" | "speechRecognition" | "mediaLibrary" | "motion";
export declare type PermissionStatus = "authorized" | "denied" | "softDenied" | "restricted" | "undetermined";
export interface TrackingProperties {
    [name: string]: any;
}
export declare function isTestUser(profile?: BaseProfile): boolean | "" | undefined;
export interface TrackerInterface {
    initFinished: boolean;
    init: (config: TrackingConfig) => void;
    trackPages: () => void;
    setUser: (user: BaseProfile) => void;
    setUserProperty: (property: string, value: string | {
        object: {
            [id: string]: any;
        };
    }) => void;
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
export {};
