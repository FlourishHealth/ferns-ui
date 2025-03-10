export * from "./Accordion";
export * from "./ActionSheet";
export * from "./AddressField";
export * from "./Avatar";
export * from "./Badge";
export * from "./Banner";
export * from "./Body";
export * from "./BooleanField";
export * from "./Box";
export * from "./Button";
export * from "./Card";
export * from "./CheckBox";
export * from "./Common";
export * from "./Constants";
export * from "./CustomSelectField";
export * from "./DataTable";
export * from "./DateTimeActionSheet";
export * from "./DateTimeField";
export * from "./DateUtilities";
export * from "./DecimalRangeActionSheet";
export * from "./DismissButton";
export * from "./EmailField";
export * from "./ErrorBoundary";
export * from "./ErrorPage";
export * from "./FernsProvider";
export * from "./Field";
export * from "./FlatList";
export * from "./Heading";
export * from "./HeightActionSheet";
export * from "./Icon";
export * from "./IconButton";
export * from "./Image";
export * from "./ImageBackground";
export * from "./InfoModalIcon";
export * from "./InfoTooltipButton";
export * from "./Link";
export * from "./MediaQuery";
export * from "./MobileAddressAutoComplete";
export * from "./Modal";
export * from "./ModalSheet";
export * from "./MultiselectField";
export * from "./NumberField";
export * from "./NumberPickerActionSheet";
export * from "./OpenAPIContext";
export * from "./Page";
export * from "./Pagination";
export * from "./PasswordField";
export * from "./PhoneNumberField";
export * from "./Radio";
export * from "./RadioField";
export * from "./ScrollView";
export * from "./SegmentedControl";
export * from "./SelectField";
export * from "./SideDrawer";
export * from "./Signature";
export * from "./SignatureField";
export * from "./Spinner";
export * from "./SplitPage";
export * from "./table/Table";
export * from "./table/Table";
export * from "./table/TableBadge";
export * from "./table/TableBoolean";
export * from "./table/tableContext";
export * from "./table/TableDate";
export * from "./table/TableHeader";
export * from "./table/TableHeaderCell";
export * from "./table/TableIconButton";
export * from "./table/TableNumber";
export * from "./table/TableRow";
export * from "./table/TableText";
export * from "./table/TableTitle";
export * from "./TapToEdit";
export * from "./Text";
export * from "./TextArea";
export * from "./TextField";
export * from "./Theme";
export * from "./Toast";
export * from "./Tooltip";
export * from "./UnifiedAddressAutoComplete";
export * from "./Unifier";
export * from "./useStoredState";
export * from "./Utilities";
export * from "./WebAddressAutocomplete";
// export * from "./Layout";
// export * from "./Drawer";
// export * from "./Chart";

// Lifted from react-native
type ImageRequireSource = number;
interface Insets {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
}

// Lifted from react-native-navigation
// import {Options} from "./Options";
export interface LayoutComponent<P = {}> {
  /**
   * Component reference id, Auto generated if empty
   */
  id?: string;
  /**
   * Name of your component
   */
  name: string | number;
  /**
   * Styling options
   */
  options?: Options;
  /**
   * Properties to pass down to the component
   */
  passProps?: P;
}
export interface LayoutStackChildren {
  /**
   * Set component
   */
  component?: LayoutComponent;
  /**
   * Set the external component
   */
  externalComponent?: ExternalComponent;
}
export interface LayoutStack {
  /**
   * Set ID of the stack so you can use Navigation.mergeOptions to
   * update options
   */
  id?: string;
  /**
   * Set children screens
   */
  children?: LayoutStackChildren[];
  /**
   * Set options
   */
  options?: Options;
}
export interface LayoutTabsChildren {
  /**
   * Set stack
   */
  stack?: LayoutStack;
  /**
   * Set component
   */
  component?: LayoutComponent;
  /**
   * Set the external component
   */
  externalComponent?: ExternalComponent;
}
export interface LayoutBottomTabs {
  /**
   * Set ID of the stack so you can use Navigation.mergeOptions to
   * update options
   */
  id?: string;
  /**
   * Set the children screens
   */
  children?: LayoutTabsChildren[];
  /**
   * Set the bottom tabs options
   */
  options?: Options;
}
export interface LayoutSideMenu {
  /**
   * Set ID of the stack so you can use Navigation.mergeOptions to
   * update options
   */
  id?: string;
  /**
   * Set the left side bar
   */
  left?: LayoutStackChildren;
  /**
   * Set the center view
   */
  center: Layout;
  /**
   * Set the right side bar
   */
  right?: LayoutStackChildren;
  /**
   * Set the bottom tabs options
   */
  options?: Options;
}
export interface LayoutSplitView {
  /**
   * Set ID of the stack so you can use Navigation.mergeOptions to
   * update options
   */
  id?: string;
  /**
   * Set master layout (the smaller screen, sidebar)
   */
  master?: Layout;
  /**
   * Set detail layout (the larger screen, flexes)
   */
  detail?: Layout;
  /**
   * Configure split view
   */
  options?: Options;
}
export interface LayoutTopTabs {
  /**
   * Set the layout's id so Navigation.mergeOptions can be used to update options
   */
  id?: string;
  /**
   * Set the children screens
   */
  children?: LayoutTabsChildren[];
  /**
   * Configure top tabs
   */
  options?: Options;
}
export interface LayoutRoot {
  /**
   * Set the root
   */
  root: Layout;
  modals?: any;
  overlays?: any;
}
export interface ExternalComponent {
  /**
   * Set the screen's id so Navigation.mergeOptions can be used to update options
   */
  id?: string;
  /**
   * Name of your component
   */
  name: string | number;
  /**
   * Configure component options
   */
  options?: Options;
  /**
   * Properties to pass down to the component
   */
  passProps?: object;
}
export interface Layout<P = {}> {
  /**
   * Set the component
   */
  component?: LayoutComponent<P>;
  /**
   * Set the stack
   */
  stack?: LayoutStack;
  /**
   * Set the bottom tabs
   */
  bottomTabs?: LayoutBottomTabs;
  /**
   * Set the side menu
   */
  sideMenu?: LayoutSideMenu;
  /**
   * Set the split view
   */
  splitView?: LayoutSplitView;
  /**
   * Set the top tabs
   */
  topTabs?: LayoutTopTabs;
  /**
   * Set the external component
   */
  externalComponent?: ExternalComponent;
}

declare type Color = string;
declare type FontFamily = string;
declare type FontWeight =
  | "regular"
  | "bold"
  | "thin"
  | "ultraLight"
  | "light"
  | "medium"
  | "semibold"
  | "heavy"
  | "black";
declare type LayoutOrientation = "portrait" | "landscape";
declare type AndroidDensityNumber = number;
declare type SystemItemIcon =
  | "done"
  | "cancel"
  | "edit"
  | "save"
  | "add"
  | "flexibleSpace"
  | "fixedSpace"
  | "compose"
  | "reply"
  | "action"
  | "organize"
  | "bookmarks"
  | "search"
  | "refresh"
  | "stop"
  | "camera"
  | "trash"
  | "play"
  | "pause"
  | "rewind"
  | "fastForward"
  | "undo"
  | "redo";
declare type Interpolation =
  | "linear"
  | "accelerateDecelerate"
  | "decelerate"
  | "accelerate"
  | "decelerateAccelerate";
export interface OptionsSplitView {
  /**
   * Master view display mode
   * @default 'auto'
   */
  displayMode?: "auto" | "visible" | "hidden" | "overlay";
  /**
   * Master view side. Leading is left. Trailing is right.
   * @default 'leading'
   */
  primaryEdge?: "leading" | "trailing";
  /**
   * Set the minimum width of master view
   */
  minWidth?: number;
  /**
   * Set the maximum width of master view
   */
  maxWidth?: number;
}
export interface OptionsStatusBar {
  /**
   * Set the status bar visibility
   * @default true
   */
  visible?: boolean;
  /**
   * Set the text color of the status bar
   * @default 'light'
   */
  style?: "light" | "dark";
  /**
   * Set the background color of the status bar
   * #### (Android specific)
   */
  backgroundColor?: Color;
  /**
   * Draw screen behind the status bar
   * #### (Android specific)
   */
  drawBehind?: boolean;
}
export interface OptionsLayout {
  fitSystemWindows?: boolean;
  /**
   * Set the screen background color
   */
  backgroundColor?: Color;
  /**
   * Set background color only for components, helps reduce overdraw if background color is set in
   * default options. #### (Android specific)
   */
  componentBackgroundColor?: Color;
  /**
   * Set the allowed orientations
   */
  orientation?: LayoutOrientation[];
  /**
   * Layout top margin
   * #### (Android specific)
   */
  topMargin?: number;
  /**
   * Set language direction.
   * only works with DefaultOptions
   */
  direction?: "rtl" | "ltr";
}
export declare enum OptionsModalPresentationStyle {
  formSheet = "formSheet",
  pageSheet = "pageSheet",
  overFullScreen = "overFullScreen",
  overCurrentContext = "overCurrentContext",
  currentContext = "currentContext",
  popover = "popover",
  fullScreen = "fullScreen",
  none = "none",
}
export declare enum OptionsModalTransitionStyle {
  coverVertical = "coverVertical",
  crossDissolve = "crossDissolve",
  flipHorizontal = "flipHorizontal",
  partialCurl = "partialCurl",
}
export interface OptionsTopBarLargeTitle {
  /**
   * Enable large titles
   */
  visible?: boolean;
  /**
   * Set the font size of large title's text
   */
  fontSize?: number;
  /**
   * Set the color of large title's text
   */
  color?: Color;
  /**
   * Set the font family of large title's text
   */
  fontFamily?: FontFamily;
  /**
   * Set the font weight, ignore fontFamily and use the iOS system fonts instead
   * #### (iOS specific)
   */
  fontWeight?: FontWeight;
}
export interface OptionsTopBarTitle {
  /**
   * Text to display in the title area
   */
  text?: string;
  /**
   * Font size
   */
  fontSize?: number;
  /**
   * Text color
   */
  color?: Color;
  /**
   * Title font family
   *
   * Make sure that the font is available
   */
  fontFamily?: FontFamily;
  /**
   * Set the font weight, ignore fontFamily and use the iOS system fonts instead
   * #### (iOS specific)
   */
  fontWeight?: FontWeight;
  /**
   * Custom component as the title view
   */
  component?: {
    /**
     * Component reference id, Auto generated if empty
     */
    id?: string;
    /**
     * Name of your component
     */
    name: string;
    /**
     * Set component alignment
     */
    alignment?: "center" | "fill";
    /**
     * Properties to pass down to the component
     */
    passProps?: object;
  };
  /**
   * Top Bar title height in density pixels
   * #### (Android specific)
   */
  height?: number;
  /**
   * Title alignment
   * #### (Android specific)
   */
  alignment?: "center" | "fill";
}
export interface OptionsTopBarSubtitle {
  /**
   * Set subtitle text
   */
  text?: string;
  /**
   * Set subtitle font size
   */
  fontSize?: number;
  /**
   * Set subtitle color
   */
  color?: Color;
  /**
   * Set subtitle font family
   */
  fontFamily?: FontFamily;
  /**
   * Set the font weight, ignore fontFamily and use the iOS system fonts instead
   * #### (iOS specific)
   */
  fontWeight?: FontWeight;
  /**
   * Set subtitle alignment
   */
  alignment?: "center";
}
export interface OptionsTopBarBackButton {
  /**
   * Image to show as the back button
   */
  icon?: ImageRequireSource;
  /**
   * Whether the back button is visible or not
   * @default true
   */
  visible?: boolean;
  /**
   * Set the back button title
   * #### (iOS specific)
   */
  title?: string;
  /**
   * Show title or just the icon
   * #### (iOS specific)
   */
  showTitle?: boolean;
  /**
   * Back button icon and text color
   */
  color?: Color;
  /**
   * Set subtitle font size
   */
  fontSize?: number;
  /**
   * Set subtitle font family
   */
  fontFamily?: FontFamily;
  /**
   * Set testID for reference in E2E tests
   */
  testID?: string;
}
export interface OptionsTopBarBackground {
  /**
   * Background color of the top bar
   */
  color?: Color;
  /**
   * Clip the top bar background to bounds if set to true.
   * #### (iOS specific)
   */
  clipToBounds?: boolean;
  /**
   * Set a custom component for the Top Bar background
   */
  component?: {
    name?: string;
    /**
     * Properties to pass down to the component
     */
    passProps?: object;
  };
  /**
   * Allows the NavBar to be translucent (blurred)
   * #### (iOS specific)
   */
  translucent?: boolean;
  /**
   * Enable background blur
   * #### (iOS specific)
   */
  blur?: boolean;
}
export interface OptionsTopBarButton {
  /**
   * Button id for reference press event
   */
  id: string;
  /**
   * Set the button icon
   */
  icon?: ImageRequireSource;
  /**
   * Set the button icon insets
   */
  iconInsets?: IconInsets;
  /**
   * Set the button as a custom component
   */
  component?: {
    /**
     * Component reference id, Auto generated if empty
     */
    id?: string;
    /**
     * Name of your component
     */
    name: string;
    /**
     * Properties to pass down to the component
     */
    passProps?: object;
    /**
     * (Android only) component width
     */
    width?: number;
    /**
     * (Android only) component height
     */
    height?: number;
  };
  /**
   * (iOS only) Set the button as an iOS system icon
   */
  systemItem?: SystemItemIcon;
  /**
   * Set the button text
   */
  text?: string;
  /**
   * Overrides the text that's read by the screen reader when the user interacts with the element
   */
  accessibilityLabel?: string;
  /**
   * Set the button font family
   */
  fontFamily?: string;
  /**
   * Set the font weight, ignore fontFamily and use the iOS system fonts instead
   * #### (iOS specific)
   */
  fontWeight?: FontWeight;
  /**
   * Set the button enabled or disabled
   * @default true
   */
  enabled?: boolean;
  /**
   * Disable icon tinting
   */
  disableIconTint?: boolean;
  /**
   * Set text color
   */
  color?: Color;
  /**
   * Set text color in disabled state
   */
  disabledColor?: Color;
  /**
   * Set testID for reference in E2E tests
   */
  testID?: string;
  /**
   * (Android only) Set showAsAction value
   * @see {@link https://developer.android.com/guide/topics/resources/menu-resource|Android developer guide: Menu resource}
   */
  showAsAction?: "ifRoom" | "withText" | "always" | "never";
}
export interface OptionsTopBar {
  /**
   * Show or hide the top bar
   */
  visible?: boolean;
  /**
   * Controls whether TopBar visibility changes should be animated
   */
  animate?: boolean;
  /**
   * Top bar will hide and show based on users scroll direction
   */
  hideOnScroll?: boolean;
  /**
   * Change button colors in the top bar
   */
  leftButtonColor?: Color;
  rightButtonColor?: Color;
  leftButtonDisabledColor?: Color;
  rightButtonDisabledColor?: Color;
  /**
   * Draw behind the navbar
   */
  drawBehind?: boolean;
  /**
   * Can be used to reference the top bar in E2E tests
   */
  testID?: string;
  /**
   * Title configuration
   */
  title?: OptionsTopBarTitle;
  /**
   * Subtitle configuration
   */
  subtitle?: OptionsTopBarSubtitle;
  /**
   * Back button configuration
   */
  backButton?: OptionsTopBarBackButton;
  /**
   * List of buttons to the left
   */
  leftButtons?: OptionsTopBarButton[];
  /**
   * List of buttons to the right
   */
  rightButtons?: OptionsTopBarButton[];
  /**
   * Background configuration
   */
  background?: OptionsTopBarBackground;
  /**
   * Control the NavBar blur style
   * #### (iOS specific)
   * @requires translucent: true
   * @default 'default'
   */
  barStyle?: "default" | "black";
  /**
   * Disable the border on bottom of the navbar
   * #### (iOS specific)
   * @default false
   */
  noBorder?: boolean;
  /**
   * Show a UISearchBar in the Top Bar
   * #### (iOS 11+ specific)
   */
  searchBar?: boolean;
  /**
   * Hides the UISearchBar when scrolling
   * #### (iOS 11+ specific)
   */
  searchBarHiddenWhenScrolling?: boolean;
  /**
   * The placeholder value in the UISearchBar
   * #### (iOS 11+ specific)
   */
  searchBarPlaceholder?: string;
  /**
   * Controls Hiding NavBar on focus UISearchBar
   * #### (iOS 11+ specific)
   */
  hideNavBarOnFocusSearchBar?: boolean;
  /**
   * Control the Large Title configuration
   * #### (iOS 11+ specific)
   */
  largeTitle?: OptionsTopBarLargeTitle;
  /**
   * Set the height of the navbar in dp
   * #### (Android specific)
   */
  height?: AndroidDensityNumber;
  /**
   * Change the navbar border color
   * #### (Android specific)
   */
  borderColor?: Color;
  /**
   * Set the border height of the navbar in dp
   * #### (Android specific)
   */
  borderHeight?: AndroidDensityNumber;
  /**
   * Set the elevation of the navbar in dp
   * #### (Android specific)
   */
  elevation?: AndroidDensityNumber;
  /**
   * Layout top margin
   * #### (Android specific)
   */
  topMargin?: number;
}
export interface SharedElementTransition {
  fromId: string;
  toId: string;
  duration?: number;
  interpolation: Interpolation;
}
export interface ElementTransition {
  id: string;
  alpha?: AppearingElementAnimation | DisappearingElementAnimation;
  translationX?: AppearingElementAnimation | DisappearingElementAnimation;
  translationY?: AppearingElementAnimation | DisappearingElementAnimation;
  scaleX?: AppearingElementAnimation | DisappearingElementAnimation;
  scaleY?: AppearingElementAnimation | DisappearingElementAnimation;
  rotationX?: AppearingElementAnimation | DisappearingElementAnimation;
  rotationY?: AppearingElementAnimation | DisappearingElementAnimation;
  x?: AppearingElementAnimation | DisappearingElementAnimation;
  y?: AppearingElementAnimation | DisappearingElementAnimation;
}
export interface AppearingElementAnimation extends ElementAnimation {
  from: number;
}
export interface DisappearingElementAnimation extends ElementAnimation {
  to: number;
}
export interface ElementAnimation {
  duration: number;
  startDelay?: number;
  interpolation: Interpolation;
}
export interface OptionsFab {
  id: string;
  backgroundColor?: Color;
  clickColor?: Color;
  rippleColor?: Color;
  visible?: boolean;
  icon?: ImageRequireSource;
  iconColor?: Color;
  alignHorizontally?: "left" | "right";
  alignVertically?: "top" | "bottom";
  hideOnScroll?: boolean;
  size?: number;
  actions?: OptionsFab[];
}
export interface OptionsBottomTabs {
  /**
   * Show or hide the bottom tabs
   */
  visible?: boolean;
  /**
   * Enable animations when toggling visibility
   */
  animate?: boolean;
  /**
   * Use large icons when possible, even when three tabs without titles are displayed
   * #### (android specific)
   * @default false
   */
  preferLargeIcons?: boolean;
  /**
   * Switch to another screen within the bottom tabs via index (starting from 0)
   */
  currentTabIndex?: number;
  /**
   * Switch to another screen within the bottom tabs via screen name
   */
  currentTabId?: string;
  /**
   * Set a testID to reference the bottom tabs
   */
  testID?: string;
  /**
   * Draw screen component under the tab bar
   */
  drawBehind?: boolean;
  /**
   * Set a background color for the bottom tabs
   */
  backgroundColor?: Color;
  /**
   * Set when tabs are attached to hierarchy consequently when the
   * RootView's constructor is called.
   */
  tabsAttachMode?: "together" | "afterInitialTab" | "onSwitchToTab";
  /**
   * Control the Bottom Tabs blur style
   * #### (iOS specific)
   * @requires translucent: true
   * @default 'default'
   */
  barStyle?: "default" | "black";
  /**
   * Allows the Bottom Tabs to be translucent (blurred)
   * #### (iOS specific)
   */
  translucent?: boolean;
  /**
   * Hide the top line of the Tab Bar
   * #### (iOS specific)
   */
  hideShadow?: boolean;
  /**
   * Control the text display mode below the tab icon
   * #### (Android specific)
   */
  titleDisplayMode?: "alwaysShow" | "showWhenActive" | "alwaysHide" | "showWhenActiveForce";
  /**
   * Set the elevation of the Bottom Tabs in dp
   * #### (Android specific)
   */
  elevation?: AndroidDensityNumber;
}
export interface DotIndicatorOptions {
  color?: Color;
  size?: number;
  visible?: boolean;
}
export declare type ImageResource = string;
export interface OptionsBottomTab {
  dotIndicator?: DotIndicatorOptions;
  /**
   * Set the text to display below the icon
   */
  text?: string;
  /**
   * Set the text in a badge that is overlayed over the component
   */
  badge?: string;
  /**
   * Set the background color of the badge that is overlayed over the component
   */
  badgeColor?: string;
  /**
   * Set a testID to reference the tab in E2E tests
   */
  testID?: string;
  /**
   * Set the tab icon
   */
  icon?: ImageRequireSource | ImageResource;
  /**
   * Set the icon tint
   */
  iconColor?: Color;
  /**
   * Set the text color
   */
  textColor?: Color;
  /**
   * Set the selected icon tint
   */
  selectedIconColor?: Color;
  /**
   * Set the selected text color
   */
  selectedTextColor?: Color;
  /**
   * Set the text font family
   */
  fontFamily?: FontFamily;
  /**
   * Set the font weight, ignore fontFamily and use the iOS system fonts instead
   * #### (iOS specific)
   */
  fontWeight?: FontWeight;
  /**
   * Set the text font size
   */
  fontSize?: number;
  /**
   * Set the insets of the icon
   * #### (iOS specific)
   */
  iconInsets?: Insets;
  /**
   * Set selected icon image
   * #### (iOS specific)
   */
  selectedIcon?: ImageRequireSource;
  /**
   * Set true if you want to disable the icon tinting
   * #### (iOS specific)
   */
  disableIconTint?: boolean;
  /**
   * Set true if you want to disable the text tinting
   * #### (iOS specific)
   */
  disableSelectedIconTint?: boolean;
  /**
   * Set the font size for selected tabs
   * #### (Android specific)
   */
  selectedFontSize?: number;
  /**
   * If it's set to false, pressing a tab won't select the tab
   * instead it will emit a bottomTabPressedEvent
   */
  selectTabOnPress?: boolean;
}
export interface SideMenuSide {
  /**
   * Show or hide the side menu
   */
  visible?: boolean;
  /**
   * Enable or disable the side menu
   */
  enabled?: boolean;
  /**
   * Set the width of the side menu
   */
  width?: number;
  /**
   * Set the height of the side menu
   */
  height?: number;
  /**
   * Stretch sideMenu contents when opened past the width
   * #### (iOS specific)
   * @default true
   */
  shouldStretchDrawer?: boolean;
}
export interface OptionsSideMenu {
  /**
   * Configure the left side menu
   */
  left?: SideMenuSide;
  /**
   * Configure the right side menu
   */
  right?: SideMenuSide;
  /**
   * Configure how a user is allowed to open a drawer using gestures
   * #### (iOS specific)
   * @default 'entireScreen'
   */
  openGestureMode?: "entireScreen" | "bezel";
}
export interface OverlayOptions {
  /**
   * Capture touches outside of the Component View
   */
  interceptTouchOutside?: boolean;
  /**
   * Control whether this Overlay should handle Keyboard events.
   * Set this to true if your Overlay contains a TextInput.
   */
  handleKeyboardEvents?: boolean;
}
export interface ModalOptions {
  /**
   * Control whether this modal should be dismiss using swipe gesture when the
   * modalPresentationStyle = 'pageSheet' #### (iOS specific)
   */
  swipeToDismiss?: boolean;
}
export interface OptionsPreviewAction {
  /**
   * Reference ID to get callbacks from
   */
  id: string;
  /**
   * Action text
   */
  title: string;
  /**
   * Action style
   */
  style?: "default" | "selected" | "destructive";
  /**
   * Subactions that will be shown when this action is pressed.
   */
  actions?: OptionsPreviewAction[];
}
export interface OptionsPreview {
  /**
   * Pass a react node tag to mark a SourceRect for a specific
   * peek and pop preview element.
   */
  reactTag?: number;
  /**
   * You can set this property specify the width of the preview.
   * If the width is greater than the device width, it will be zoomed in.
   */
  width?: number;
  /**
   * Height of the preview
   */
  height?: 100;
  /**
   * You can control if the users gesture will result in pushing
   * the preview screen into the stack.
   */
  commit?: boolean;
  /**
   * List of actions that will appear underneath the preview window.
   * They can be nested for sub actions.
   */
  actions?: OptionsPreviewAction[];
}
export interface OptionsAnimationPropertyConfig {
  /**
   * Animate from this value, ex. 0
   */
  from?: number;
  /**
   * Animate to this value, ex. 1
   */
  to?: number;
  /**
   * Animation duration
   * @default 300
   */
  duration?: number;
  /**
   * Animation delay
   * @default 0
   */
  startDelay?: number;
  /**
   * Animation interplation
   */
  interpolation?: "accelerate" | "decelerate";
}
/**
 * Used to animate the actual content added to the hierarchy.
 * Content can be a React component (component) or any other layout (Stack, BottomTabs etc)
 */
export interface ScreenAnimationOptions {
  /**
   * Animate the element over x value
   */
  x?: OptionsAnimationPropertyConfig;
  /**
   * Animate the element over y value
   */
  y?: OptionsAnimationPropertyConfig;
  /**
   * Animate the element over translateX
   */
  translationX?: OptionsAnimationPropertyConfig;
  /**
   * Animate the element over translateY
   */
  translationY?: OptionsAnimationPropertyConfig;
  /**
   * Animate the element over opacity
   */
  alpha?: OptionsAnimationPropertyConfig;
  /**
   * Animate the element over scaleX
   */
  scaleX?: OptionsAnimationPropertyConfig;
  /**
   * Animate the element over scaleY
   */
  scaleY?: OptionsAnimationPropertyConfig;
  /**
   * Animate the element over rotationX
   */
  rotationX?: OptionsAnimationPropertyConfig;
  /**
   * Animate the element over rotationY
   */
  rotationY?: OptionsAnimationPropertyConfig;
  /**
   * Animate the element over rotation
   */
  rotation?: OptionsAnimationPropertyConfig;
  /**
   * Wait for the root view to render before start animation
   */
  waitForRender?: boolean;
  /**
   * Enable or disable the animation
   * @default true
   */
  enabled?: boolean;
}
export interface IconInsets {
  /**
   * Configure top inset
   */
  top?: number;
  /**
   * Configure left inset
   */
  left?: number;
  /**
   * Configure bottom inset
   */
  bottom?: number;
  /**
   * Configure right inset
   */
  right?: number;
}
export interface ViewAnimationOptions extends ScreenAnimationOptions {
  /**
   * ID of the Top Bar we want to animate
   */
  id?: string;
}
/**
 * Used for describing stack commands animations.
 */
export interface StackAnimationOptions {
  /**
   * Wait for the View to render before start animation
   */
  waitForRender?: boolean;
  /**
   * Enable or disable the animation
   * @default true
   */
  enabled?: boolean;
  /**
   * Configure animations for the top bar
   */
  topBar?: ViewAnimationOptions;
  /**
   * Configure animations for the bottom tabs
   */
  bottomTabs?: ViewAnimationOptions;
  /**
   * Configure animations for the content (Screen)
   */
  content?: ViewAnimationOptions;
  /**
   * Animations to be applied on elements which are shared between the appearing and disappearing
   * screens
   */
  sharedElementTransitions?: SharedElementTransition[];
  /**
   * Animations to be applied on views in the appearing or disappearing screens
   */
  elementTransitions?: ElementTransition[];
}
/**
 * Used for configuring command animations
 */
export interface AnimationOptions {
  /**
   * Configure the setStackRoot animation
   */
  setStackRoot?: ViewAnimationOptions;
  /**
   * Configure the setRoot animation
   */
  setRoot?: ViewAnimationOptions;
  /**
   * Configure what animates when a screen is pushed
   */
  push?: StackAnimationOptions;
  /**
   * Configure what animates when a screen is popped
   */
  pop?: StackAnimationOptions;
  /**
   * Configure what animates when modal is shown
   */
  showModal?: ViewAnimationOptions;
  /**
   * Configure what animates when modal is dismissed
   */
  dismissModal?: ViewAnimationOptions;
}
/**
 * Configure Android's NavigationBar
 */
export interface NavigationBarOptions {
  backgroundColor?: Color;
  visible?: boolean;
}
export interface Options {
  /**
   * Configure the status bar
   */
  statusBar?: OptionsStatusBar;
  /**
   * Configure the layout
   */
  layout?: OptionsLayout;
  /**
   * Configure the presentation style of the modal
   */
  modalPresentationStyle?: OptionsModalPresentationStyle;
  /**
   * Configure the transition style of the modal
   *
   * #### (Android specific)
   */
  modalTransitionStyle?: OptionsModalTransitionStyle;
  /**
   * Configure the top bar
   */
  topBar?: OptionsTopBar;
  fab?: OptionsFab;
  /**
   * Configure the bottom tabs
   */
  bottomTabs?: OptionsBottomTabs;
  /**
   * Configure the bottom tab associated to the screen
   */
  bottomTab?: OptionsBottomTab;
  /**
   * Configure the side menu
   */
  sideMenu?: OptionsSideMenu;
  /**
   * Configure the splitView controller
   */
  splitView?: OptionsSplitView;
  /**
   * Configure the overlay
   */
  overlay?: OverlayOptions;
  /**
   * Configure the modal
   */
  modal?: ModalOptions;
  /**
     * Animation used for navigation commands that modify the layout
     * hierarchy can be controlled in options.
     *
     * Animations can be modified per command and it's also possible
     * to change the default animation for each command.
     *
     * Example:
  ```js
  setRoot: {
    y: {
      from: 1000,
      to: 0,
      duration: 500,
      interpolation: 'accelerate',
    },
    alpha: {
      from: 0,
      to: 1,
      duration: 400,
      startDelay: 100,
      interpolation: 'accelerate'
    }
  }
  ```
     */
  animations?: AnimationOptions;
  /**
   * Configure Android's NavigationBar
   */
  navigationBar?: NavigationBarOptions;
  /**
   * Preview configuration for Peek and Pop
   * #### (iOS specific)
   */
  preview?: OptionsPreview;
  /**
   * Enable or disable swipe back to pop gesture
   * #### (iOS specific)
   * @default true
   */
  popGesture?: boolean;
  /**
   * Background image for the screen
   * #### (iOS specific)
   */
  backgroundImage?: ImageRequireSource;
  /**
   * Background image for the Navigation View
   * #### (iOS specific)
   */
  rootBackgroundImage?: ImageRequireSource;
  /**
   * Enable or disable automatically blurring focused input, dismissing keyboard on unmount
   * #### (Android specific)
   * @default false
   */
  blurOnUnmount?: boolean;
}
export {};
