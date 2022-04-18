import React, { Component } from "react";
import { Animated, KeyboardEvent, LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent, ViewStyle } from "react-native";
export declare type ActionSheetProps = {
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
        * Use if you want to show the ActionSheet Partially on Opening. **Requires `gestureEnabled=true`**
  
   | Type | Required |
   | ---- | -------- |
   | boolean | no |
  
   Default:`1`
        */
    initialOffsetFromBottom?: number;
    /**
        * When touch ends and user has not moved farther from the set springOffset, the ActionSheet will return to previous position.
  
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
        * Normally when the ActionSheet is fully opened, a small portion from the bottom is hidden by default. Use this prop if you want the ActionSheet to hover over the bottom of screen and not hide a little behind it.
  
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
        * Setting the keyboard persistance of the ScrollView component, should be one of "never", "always", or "handled"
  
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
export declare const styles: {
    scrollView: {
        height: string;
        width: string;
        backgroundColor: string;
    };
    container: {
        width: string;
        backgroundColor: string;
        alignSelf: "center";
    };
    safearea: {
        position: "absolute";
        top: number;
        left: number;
    };
    indicator: {
        height: number;
        width: number;
        borderRadius: number;
        backgroundColor: string;
        marginVertical: number;
        alignSelf: "center";
    };
    parentContainer: {
        width: string;
        height: string;
        justifyContent: "center";
        alignItems: "center";
    };
};
export declare function getDeviceHeight(statusBarTranslucent: boolean | undefined): number;
export declare const getElevation: (elevation?: number | undefined) => {
    elevation?: undefined;
    shadowColor?: undefined;
    shadowOffset?: undefined;
    shadowOpacity?: undefined;
    shadowRadius?: undefined;
} | {
    elevation: number;
    shadowColor: string;
    shadowOffset: {
        width: number;
        height: number;
    };
    shadowOpacity: number;
    shadowRadius: number;
};
export declare const SUPPORTED_ORIENTATIONS: ("portrait" | "portrait-upside-down" | "landscape" | "landscape-left" | "landscape-right")[];
export declare const waitAsync: (ms: number) => Promise<null>;
declare type State = {
    modalVisible: boolean;
    scrollable: boolean;
    layoutHasCalled: boolean;
    keyboard: boolean;
    deviceHeight: number;
    deviceWidth: number;
    portrait: boolean;
    safeAreaInnerHeight: number;
    paddingTop: number;
};
declare const defaultProps: {
    animated: boolean;
    closeOnPressBack: boolean;
    bounciness: number;
    extraScroll: number;
    closeAnimationDuration: number;
    delayActionSheetDrawTime: number;
    openAnimationSpeed: number;
    springOffset: number;
    elevation: number;
    initialOffsetFromBottom: number;
    indicatorColor: string;
    defaultOverlayOpacity: number;
    overlayColor: string;
    closable: boolean;
    bottomOffset: number;
    closeOnTouchBackdrop: boolean;
    drawUnderStatusBar: boolean;
    statusBarTranslucent: boolean;
    keyboardMode: string;
    gestureEnabled: boolean;
};
declare type Props = Partial<typeof defaultProps> & ActionSheetProps;
export declare class ActionSheet extends Component<Props, State, any> {
    static defaultProps: {
        animated: boolean;
        closeOnPressBack: boolean;
        bounciness: number;
        extraScroll: number;
        closeAnimationDuration: number;
        delayActionSheetDrawTime: number;
        openAnimationSpeed: number;
        springOffset: number;
        elevation: number;
        initialOffsetFromBottom: number;
        indicatorColor: string;
        defaultOverlayOpacity: number;
        overlayColor: string;
        closable: boolean;
        bottomOffset: number;
        closeOnTouchBackdrop: boolean;
        drawUnderStatusBar: boolean;
        statusBarTranslucent: boolean;
        keyboardMode: string;
        gestureEnabled: boolean;
    };
    actionSheetHeight: number;
    prevScroll: number;
    timeout: any | null;
    offsetY: number;
    currentOffsetFromBottom: number;
    scrollAnimationEndValue: number;
    hasBounced: boolean;
    layoutHasCalled: boolean;
    isClosing: boolean;
    isRecoiling: boolean;
    isReachedTop: boolean;
    deviceLayoutCalled: boolean;
    scrollViewRef: React.RefObject<any>;
    safeAreaViewRef: React.RefObject<any>;
    transformValue: Animated.Value;
    opacityValue: Animated.Value;
    borderRadius: Animated.Value;
    underlayTranslateY: Animated.Value;
    underlayScale: Animated.Value;
    indicatorTranslateY: Animated.Value;
    constructor(props: ActionSheetProps);
    /**
     * Snap ActionSheet to Offset
     */
    snapToOffset: (offset: number) => void;
    show: () => void;
    hide: () => void;
    /**
     * Open/Close the ActionSheet
     */
    setModalVisible: (visible: boolean) => void;
    _hideAnimation(): void;
    _hideModal: () => void;
    measure: () => Promise<number>;
    _showModal: (event: LayoutChangeEvent) => Promise<void>;
    _openAnimation: (scrollOffset: number) => void;
    _onScrollBegin: () => Promise<void>;
    _onScrollBeginDrag: (event: NativeSyntheticEvent<NativeScrollEvent>) => Promise<void>;
    _applyHeightLimiter(): void;
    _onScrollEnd: (event: NativeSyntheticEvent<NativeScrollEvent>) => Promise<void>;
    updateActionSheetPosition(scrollPosition: number): void;
    _returnToPrevScrollPosition(height: number): void;
    _scrollTo: (y: number, animated?: boolean) => void;
    _onTouchMove: () => void;
    _onTouchStart: () => void;
    _onTouchEnd: () => void;
    _onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    _onRequestClose: () => void;
    _onTouchBackdrop: () => void;
    componentDidMount(): void;
    _onKeyboardShow: (event: KeyboardEvent) => void;
    /**
     * Attach this to any child ScrollView Component's onScrollEndDrag,
     * onMomentumScrollEnd,onScrollAnimationEnd callbacks to handle the ActionSheet
     * closing and bouncing back properly.
     */
    handleChildScrollEnd: () => Promise<void>;
    _onKeyboardHide: () => void;
    componentWillUnmount(): void;
    _onDeviceLayout: (_event: any) => Promise<void>;
    getInitialScrollPosition(): number;
    _keyExtractor: (item: any) => any;
    render(): JSX.Element;
}
export {};
