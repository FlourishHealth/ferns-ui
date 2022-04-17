export function getDeviceHeight(statusBarTranslucent: any): any;
export const styles: any;
export function getElevation(elevation: any): {
    elevation?: undefined;
    shadowColor?: undefined;
    shadowOffset?: undefined;
    shadowOpacity?: undefined;
    shadowRadius?: undefined;
} | {
    elevation: any;
    shadowColor: string;
    shadowOffset: {
        width: number;
        height: number;
    };
    shadowOpacity: number;
    shadowRadius: number;
};
export const SUPPORTED_ORIENTATIONS: string[];
export function waitAsync(ms: any): Promise<any>;
export class ActionSheet extends React.Component<any, any, any> {
    constructor(props: any);
    actionSheetHeight: number;
    prevScroll: number;
    timeout: NodeJS.Timeout | null;
    offsetY: number;
    currentOffsetFromBottom: any;
    scrollAnimationEndValue: number;
    hasBounced: boolean;
    layoutHasCalled: boolean;
    isClosing: boolean;
    isRecoiling: boolean;
    isReachedTop: boolean;
    deviceLayoutCalled: boolean;
    /**
     * Snap ActionSheet to Offset
     */
    snapToOffset: (offset: any) => void;
    show: () => void;
    hide: () => void;
    /**
     * Open/Close the ActionSheet
     */
    setModalVisible: (visible: any) => void;
    _hideModal: () => void;
    measure: () => Promise<any>;
    _showModal: (event: any) => Promise<void>;
    _openAnimation: (scrollOffset: any) => void;
    _onScrollBegin: () => Promise<void>;
    _onScrollBeginDrag: (event: any) => Promise<void>;
    _onScrollEnd: (event: any) => Promise<void>;
    _scrollTo: (y: any, animated?: boolean) => void;
    _onTouchMove: () => void;
    _onTouchStart: () => void;
    _onTouchEnd: () => void;
    _onScroll: (event: any) => void;
    _onRequestClose: () => void;
    _onTouchBackdrop: () => void;
    _onKeyboardShow: (event: any) => void;
    /**
     * Attach this to any child ScrollView Component's onScrollEndDrag,
     * onMomentumScrollEnd,onScrollAnimationEnd callbacks to handle the ActionSheet
     * closing and bouncing back properly.
     */
    handleChildScrollEnd: () => Promise<void>;
    _onKeyboardHide: () => void;
    _onDeviceLayout: (_event: any) => Promise<void>;
    _keyExtractor: (item: any) => any;
    state: {
        modalVisible: boolean;
        scrollable: boolean;
        layoutHasCalled: boolean;
        keyboard: boolean;
        deviceHeight: any;
        deviceWidth: any;
        portrait: boolean;
        safeAreaInnerHeight: number;
        paddingTop: any;
    };
    scrollViewRef: React.RefObject<any>;
    safeAreaViewRef: React.RefObject<any>;
    transformValue: any;
    opacityValue: any;
    borderRadius: any;
    underlayTranslateY: any;
    underlayScale: any;
    indicatorTranslateY: any;
    _hideAnimation(): void;
    _applyHeightLimiter(): void;
    updateActionSheetPosition(scrollPosition: any): void;
    _returnToPrevScrollPosition(height: any): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    getInitialScrollPosition(): any;
    render(): React.CElement<{
        visible: boolean;
        animationType: string;
        supportedOrientations: string[];
        onShow: any;
        onRequestClose: () => void;
        transparent: boolean;
        statusBarTranslucent: any;
    }, React.Component<{
        visible: boolean;
        animationType: string;
        supportedOrientations: string[];
        onShow: any;
        onRequestClose: () => void;
        transparent: boolean;
        statusBarTranslucent: any;
    }, any, any>>;
}
export namespace ActionSheet {
    export { defaultProps };
}
import React from "react";
declare namespace defaultProps {
    const animated: boolean;
    const closeOnPressBack: boolean;
    const bounciness: number;
    const extraScroll: number;
    const closeAnimationDuration: number;
    const delayActionSheetDrawTime: number;
    const openAnimationSpeed: number;
    const springOffset: number;
    const elevation: number;
    const initialOffsetFromBottom: number;
    const indicatorColor: string;
    const defaultOverlayOpacity: number;
    const overlayColor: string;
    const closable: boolean;
    const bottomOffset: number;
    const closeOnTouchBackdrop: boolean;
    const drawUnderStatusBar: boolean;
    const statusBarTranslucent: boolean;
    const keyboardMode: string;
    const gestureEnabled: boolean;
}
export {};
