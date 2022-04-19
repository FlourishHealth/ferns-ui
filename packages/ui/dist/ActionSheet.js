/* eslint-disable react/prop-types */
import React, { Component, createRef } from "react";
import { Animated, Dimensions, findNodeHandle, FlatList, Keyboard, Modal, Platform, SafeAreaView, StatusBar, StyleSheet, TextInput, TouchableOpacity, UIManager, View, } from "react-native";
export const styles = StyleSheet.create({
    scrollView: {
        height: "100%",
        width: "100%",
        backgroundColor: "transparent",
    },
    container: {
        width: "100%",
        backgroundColor: "white",
        alignSelf: "center",
    },
    safearea: {
        position: "absolute",
        top: 999999,
        left: 999999,
    },
    indicator: {
        height: 6,
        width: 45,
        borderRadius: 100,
        backgroundColor: "#f0f0f0",
        marginVertical: 5,
        alignSelf: "center",
    },
    parentContainer: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
});
export function getDeviceHeight(statusBarTranslucent) {
    const height = Dimensions.get("window").height;
    if (Platform.OS === "android" && !statusBarTranslucent) {
        return StatusBar.currentHeight ? height - StatusBar.currentHeight : height;
    }
    return height;
}
export const getElevation = (elevation) => {
    if (!elevation) {
        return {};
    }
    return {
        elevation,
        shadowColor: "black",
        shadowOffset: { width: 0.3 * elevation, height: 0.5 * elevation },
        shadowOpacity: 0.2,
        shadowRadius: 0.7 * elevation,
    };
};
export const SUPPORTED_ORIENTATIONS = ["portrait", "portrait-upside-down", "landscape", "landscape-left", "landscape-right"];
export const waitAsync = (ms) => new Promise((resolve) => {
    setTimeout(() => {
        resolve(null);
    }, ms);
});
const safeAreaInnerHeight = 0;
const dummyData = ["dummy"];
let safeAreaPaddingTop = Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;
let calculatedDeviceHeight = Dimensions.get("window").height;
const defaultProps = {
    animated: true,
    closeOnPressBack: true,
    bounciness: 8,
    extraScroll: 0,
    closeAnimationDuration: 300,
    delayActionSheetDrawTime: 0,
    openAnimationSpeed: 12,
    springOffset: 100,
    elevation: 5,
    initialOffsetFromBottom: 1,
    indicatorColor: "#f0f0f0",
    defaultOverlayOpacity: 0.3,
    overlayColor: "black",
    closable: true,
    bottomOffset: 0,
    closeOnTouchBackdrop: true,
    drawUnderStatusBar: true,
    statusBarTranslucent: true,
    keyboardMode: "padding",
    gestureEnabled: false,
};
export class ActionSheet extends Component {
    constructor(props) {
        super(props);
        this.actionSheetHeight = 0;
        this.prevScroll = 0;
        this.timeout = null;
        this.offsetY = 0;
        this.currentOffsetFromBottom = 0;
        this.scrollAnimationEndValue = 0;
        this.hasBounced = false;
        this.layoutHasCalled = false;
        this.isClosing = false;
        this.isRecoiling = false;
        this.isReachedTop = false;
        this.deviceLayoutCalled = false;
        /**
         * Snap ActionSheet to Offset
         */
        this.snapToOffset = (offset) => {
            const correction = this.state.deviceHeight * 0.15;
            const extraScroll = this.props.extraScroll || 0;
            const scrollOffset = this.props.gestureEnabled
                ? offset + correction + extraScroll
                : offset + correction + extraScroll;
            this.currentOffsetFromBottom = offset / this.actionSheetHeight;
            this._scrollTo(scrollOffset);
            this.updateActionSheetPosition(scrollOffset);
        };
        // Open the ActionSheet
        this.show = () => {
            this.setModalVisible(true);
        };
        // Close the ActionSheet
        this.hide = () => {
            this.setModalVisible(false);
        };
        /**
         * Open/Close the ActionSheet
         */
        this.setModalVisible = (visible) => {
            let modalVisible = this.state.modalVisible;
            if (visible !== undefined) {
                if (modalVisible === visible) {
                    return;
                }
                modalVisible = !visible;
            }
            if (!modalVisible) {
                this.setState({
                    modalVisible: true,
                    scrollable: this.props.gestureEnabled || false,
                });
            }
            else {
                this._hideModal();
            }
        };
        this._hideModal = () => {
            if (this.isClosing)
                return;
            this.isClosing = true;
            this._hideAnimation();
        };
        this.measure = async () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    UIManager.measureInWindow(this.safeAreaViewRef.current._nativeTag, (x, y, width, height) => {
                        safeAreaPaddingTop = height;
                        resolve(height === 0 ? 20 : height);
                    });
                }, 100);
            });
        };
        this._showModal = async (event) => {
            const { gestureEnabled, delayActionSheetDraw, delayActionSheetDrawTime } = this.props;
            if (!(event === null || event === void 0 ? void 0 : event.nativeEvent))
                return;
            const height = event.nativeEvent.layout.height;
            if (this.layoutHasCalled) {
                this.actionSheetHeight = height;
                this._returnToPrevScrollPosition(height);
                return;
            }
            else {
                this.layoutHasCalled = true;
                this.actionSheetHeight = height;
                const scrollOffset = this.getInitialScrollPosition();
                this.isRecoiling = false;
                if (Platform.OS === "ios") {
                    await waitAsync(delayActionSheetDrawTime);
                }
                else {
                    if (delayActionSheetDraw) {
                        await waitAsync(delayActionSheetDrawTime);
                    }
                }
                this._scrollTo(scrollOffset, false);
                this.prevScroll = scrollOffset;
                if (Platform.OS === "ios") {
                    await waitAsync(delayActionSheetDrawTime !== null && delayActionSheetDrawTime !== void 0 ? delayActionSheetDrawTime : 0 / 2);
                }
                else {
                    if (delayActionSheetDraw) {
                        await waitAsync(delayActionSheetDrawTime !== null && delayActionSheetDrawTime !== void 0 ? delayActionSheetDrawTime : 0 / 2);
                    }
                }
                this._openAnimation(scrollOffset);
                this.underlayScale.setValue(1);
                this.underlayTranslateY.setValue(100);
                if (!gestureEnabled) {
                    this.props.onPositionChanged && this.props.onPositionChanged(true);
                }
                this.updateActionSheetPosition(scrollOffset);
            }
        };
        this._openAnimation = (scrollOffset) => {
            const { bounciness, bounceOnOpen, animated, openAnimationSpeed } = this.props;
            if (animated) {
                this.transformValue.setValue(scrollOffset);
                Animated.parallel([
                    Animated.spring(this.transformValue, {
                        toValue: 0,
                        bounciness: bounceOnOpen ? bounciness : 1,
                        speed: openAnimationSpeed,
                        useNativeDriver: true,
                    }),
                    Animated.timing(this.opacityValue, {
                        toValue: 1,
                        duration: 150,
                        useNativeDriver: true,
                    }),
                ]).start();
            }
            else {
                this.opacityValue.setValue(1);
            }
        };
        this._onScrollBegin = async () => { };
        this._onScrollBeginDrag = async (event) => {
            this.prevScroll = event.nativeEvent.contentOffset.y;
        };
        this._onScrollEnd = async (event) => {
            var _a;
            const { springOffset, extraScroll } = this.props;
            const verticalOffset = event.nativeEvent.contentOffset.y;
            const correction = this.state.deviceHeight * 0.15;
            if (this.isRecoiling)
                return;
            if (this.prevScroll < verticalOffset) {
                if (verticalOffset - this.prevScroll > (springOffset !== null && springOffset !== void 0 ? springOffset : 0) * 0.75) {
                    this.isRecoiling = true;
                    this._applyHeightLimiter();
                    this.currentOffsetFromBottom =
                        this.currentOffsetFromBottom < ((_a = this.props.initialOffsetFromBottom) !== null && _a !== void 0 ? _a : 0)
                            ? this.props.initialOffsetFromBottom
                            : 1;
                    const scrollOffset = this.actionSheetHeight * this.currentOffsetFromBottom + correction + (extraScroll !== null && extraScroll !== void 0 ? extraScroll : 0);
                    this._scrollTo(scrollOffset);
                    await waitAsync(300);
                    this.isRecoiling = false;
                    this.props.onPositionChanged && this.props.onPositionChanged(true);
                }
                else {
                    this._returnToPrevScrollPosition(this.actionSheetHeight);
                }
            }
            else {
                if (this.prevScroll - verticalOffset > (springOffset !== null && springOffset !== void 0 ? springOffset : 0)) {
                    this._hideModal();
                }
                else {
                    if (this.isRecoiling) {
                        return;
                    }
                    this.isRecoiling = true;
                    this._returnToPrevScrollPosition(this.actionSheetHeight);
                    await waitAsync(300);
                    this.isRecoiling = false;
                }
            }
        };
        this._scrollTo = (y, animated = true) => {
            var _a;
            this.scrollAnimationEndValue = y;
            this.prevScroll = y;
            (_a = this.scrollViewRef.current) === null || _a === void 0 ? void 0 : _a._listRef._scrollRef.scrollTo({
                x: 0,
                y: this.scrollAnimationEndValue,
                animated,
            });
        };
        this._onTouchMove = () => {
            if (this.props.closeOnTouchBackdrop) {
                this._hideModal();
            }
            this.setState({
                scrollable: false,
            });
        };
        this._onTouchStart = () => {
            if (this.props.closeOnTouchBackdrop) {
                this._hideModal();
            }
            this.setState({
                scrollable: false,
            });
        };
        this._onTouchEnd = () => {
            this._returnToPrevScrollPosition(this.actionSheetHeight);
            if (this.props.gestureEnabled) {
                this.setState({
                    scrollable: true,
                });
            }
        };
        this._onScroll = (event) => {
            this.offsetY = event.nativeEvent.contentOffset.y;
            const correction = this.state.deviceHeight * 0.15;
            const distanceFromTop = this.actionSheetHeight + correction - this.offsetY;
            if (this.actionSheetHeight < this.offsetY) {
                if (!this.isReachedTop) {
                    this.isReachedTop = true;
                    this.props.onPositionChanged && this.props.onPositionChanged(true);
                }
            }
            else {
                if (this.isReachedTop) {
                    this.isReachedTop = false;
                    this.props.onPositionChanged && this.props.onPositionChanged(false);
                }
            }
            if (this.actionSheetHeight >= this.state.deviceHeight - 1) {
                if (distanceFromTop < safeAreaPaddingTop) {
                    if (!this.props.drawUnderStatusBar)
                        return;
                    this.indicatorTranslateY.setValue(-this.state.paddingTop + (safeAreaPaddingTop - distanceFromTop));
                }
                else {
                    this.indicatorTranslateY.setValue(-safeAreaPaddingTop);
                }
            }
        };
        this._onRequestClose = () => {
            if (this.props.closeOnPressBack)
                this._hideModal();
        };
        this._onTouchBackdrop = () => {
            if (this.props.closeOnTouchBackdrop) {
                this._hideModal();
            }
        };
        this._onKeyboardShow = (event) => {
            this.setState({
                keyboard: true,
            });
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const ReactNativeVersion = require("react-native/Libraries/Core/ReactNativeVersion");
            let v = ReactNativeVersion.version.major + ReactNativeVersion.version.minor;
            v = parseInt(v);
            if (v >= 63 || Platform.OS === "ios") {
                const keyboardHeight = event.endCoordinates.height;
                const { height: windowHeight } = Dimensions.get("window");
                const currentlyFocusedField = TextInput.State.currentlyFocusedField
                    ? findNodeHandle(TextInput.State.currentlyFocusedField())
                    : TextInput.State.currentlyFocusedField();
                if (!currentlyFocusedField) {
                    return;
                }
                UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
                    const fieldHeight = height;
                    const fieldTop = pageY;
                    const gap = windowHeight - keyboardHeight - (fieldTop + fieldHeight);
                    if (gap >= 0) {
                        return;
                    }
                    const toValue = this.props.keyboardMode === "position" ? -(keyboardHeight + 15) : gap - 10;
                    Animated.timing(this.transformValue, {
                        toValue,
                        duration: 250,
                        useNativeDriver: true,
                    }).start();
                });
            }
            else {
                Animated.timing(this.transformValue, {
                    toValue: -10,
                    duration: 250,
                    useNativeDriver: true,
                }).start();
            }
        };
        /**
         * Attach this to any child ScrollView Component's onScrollEndDrag,
         * onMomentumScrollEnd,onScrollAnimationEnd callbacks to handle the ActionSheet
         * closing and bouncing back properly.
         */
        this.handleChildScrollEnd = async () => {
            var _a, _b;
            if (this.offsetY > this.prevScroll)
                return;
            if (this.prevScroll - ((_a = this.props.springOffset) !== null && _a !== void 0 ? _a : 0) > this.offsetY) {
                const scrollOffset = this.getInitialScrollPosition();
                if (this.offsetY > scrollOffset - 100) {
                    this.isRecoiling = true;
                    this._scrollTo(scrollOffset);
                    this.currentOffsetFromBottom = (_b = this.props.initialOffsetFromBottom) !== null && _b !== void 0 ? _b : 0;
                    this.prevScroll = scrollOffset;
                    setTimeout(() => {
                        this.isRecoiling = false;
                    }, 500);
                }
                else {
                    this._hideModal();
                }
            }
            else {
                this.isRecoiling = true;
                this._scrollTo(this.prevScroll, true);
                setTimeout(() => {
                    this.isRecoiling = false;
                }, 500);
            }
        };
        this._onKeyboardHide = () => {
            this.setState({
                keyboard: false,
            });
            this.opacityValue.setValue(1);
            Animated.timing(this.transformValue, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true,
            }).start();
        };
        this._onDeviceLayout = async (_event) => {
            const event = Object.assign({}, _event);
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            this.timeout = setTimeout(async () => {
                var _a;
                let safeMarginFromTop = 0;
                const measuredPadding = Platform.OS === "ios" ? await this.measure() : StatusBar.currentHeight;
                if (!this.props.drawUnderStatusBar) {
                    if (Platform.OS === "android" && !this.props.statusBarTranslucent)
                        return;
                    safeMarginFromTop = measuredPadding !== null && measuredPadding !== void 0 ? measuredPadding : 0;
                    this.indicatorTranslateY.setValue(-measuredPadding);
                }
                else {
                    this.updateActionSheetPosition(this.offsetY);
                }
                const height = event.nativeEvent.layout.height - safeMarginFromTop;
                const width = Dimensions.get("window").width;
                if ((height === null || height === void 0 ? void 0 : height.toFixed(0)) === (calculatedDeviceHeight === null || calculatedDeviceHeight === void 0 ? void 0 : calculatedDeviceHeight.toFixed(0)) &&
                    (width === null || width === void 0 ? void 0 : width.toFixed(0)) === ((_a = this.state.deviceWidth) === null || _a === void 0 ? void 0 : _a.toFixed(0)) &&
                    this.deviceLayoutCalled)
                    return;
                this.deviceLayoutCalled = true;
                calculatedDeviceHeight = height;
                this.setState({
                    deviceHeight: height,
                    deviceWidth: width,
                    portrait: height > width,
                    paddingTop: measuredPadding,
                });
            }, 1);
        };
        this._keyExtractor = (item) => item;
        this.state = {
            modalVisible: false,
            scrollable: false,
            layoutHasCalled: false,
            keyboard: false,
            deviceHeight: calculatedDeviceHeight || getDeviceHeight(this.props.statusBarTranslucent),
            deviceWidth: Dimensions.get("window").width,
            portrait: true,
            safeAreaInnerHeight,
            paddingTop: safeAreaPaddingTop,
        };
        this.actionSheetHeight = 0;
        this.prevScroll = 0;
        this.scrollAnimationEndValue = 0;
        this.hasBounced = false;
        this.scrollViewRef = createRef();
        this.layoutHasCalled = false;
        this.isClosing = false;
        this.isRecoiling = false;
        this.offsetY = 0;
        this.safeAreaViewRef = createRef();
        this.transformValue = new Animated.Value(0);
        this.opacityValue = new Animated.Value(0);
        this.borderRadius = new Animated.Value(10);
        this.currentOffsetFromBottom = this.props.initialOffsetFromBottom;
        this.underlayTranslateY = new Animated.Value(100);
        this.underlayScale = new Animated.Value(1);
        this.indicatorTranslateY = new Animated.Value(-this.state.paddingTop | 0);
        this.isReachedTop = false;
        this.deviceLayoutCalled = false;
        this.timeout = null;
    }
    _hideAnimation() {
        const { animated, closeAnimationDuration, bottomOffset, initialOffsetFromBottom, extraScroll, closable, } = this.props;
        Animated.parallel([
            Animated.timing(this.opacityValue, {
                toValue: closable ? 0 : 1,
                duration: animated ? closeAnimationDuration : 1,
                useNativeDriver: true,
            }),
            Animated.timing(this.transformValue, {
                toValue: closable ? this.actionSheetHeight * 2 : 0,
                duration: animated ? closeAnimationDuration : 1,
                useNativeDriver: true,
            }),
        ]).start();
        waitAsync(closeAnimationDuration / 1.5).then(() => {
            if (!closable) {
                if (bottomOffset && bottomOffset > 0) {
                    this.snapToOffset(bottomOffset);
                }
                else {
                    this._scrollTo((this.actionSheetHeight * (initialOffsetFromBottom || 0)) +
                        this.state.deviceHeight * 0.1 +
                        (extraScroll !== null && extraScroll !== void 0 ? extraScroll : 0), true);
                    this.currentOffsetFromBottom = initialOffsetFromBottom;
                }
                this.isClosing = false;
            }
            else {
                this._scrollTo(0, false);
                this.currentOffsetFromBottom = initialOffsetFromBottom;
                this.setState({
                    modalVisible: !closable,
                }, () => {
                    this.isClosing = false;
                    this.isReachedTop = false;
                    this.props.onPositionChanged && this.props.onPositionChanged(false);
                    this.indicatorTranslateY.setValue(-this.state.paddingTop);
                    this.layoutHasCalled = false;
                    this.deviceLayoutCalled = false;
                    this.props.onClose && this.props.onClose();
                });
            }
        });
    }
    _applyHeightLimiter() {
        if (this.actionSheetHeight > this.state.deviceHeight) {
            this.actionSheetHeight =
                this.actionSheetHeight - (this.actionSheetHeight - this.state.deviceHeight);
        }
    }
    updateActionSheetPosition(scrollPosition) {
        if (this.actionSheetHeight >= this.state.deviceHeight - 1) {
            const correction = this.state.deviceHeight * 0.15;
            const distanceFromTop = this.actionSheetHeight + correction - scrollPosition;
            if (distanceFromTop < safeAreaPaddingTop) {
                if (!this.props.drawUnderStatusBar)
                    return;
                this.indicatorTranslateY.setValue(0);
            }
            else {
                this.indicatorTranslateY.setValue(-safeAreaPaddingTop);
            }
        }
    }
    _returnToPrevScrollPosition(height) {
        var _a;
        const correction = this.state.deviceHeight * 0.15;
        const scrollOffset = height * this.currentOffsetFromBottom + correction + ((_a = this.props.extraScroll) !== null && _a !== void 0 ? _a : 0);
        this.updateActionSheetPosition(scrollOffset);
        this._scrollTo(scrollOffset);
    }
    componentDidMount() {
        Keyboard.addListener(Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow", this._onKeyboardShow);
        Keyboard.addListener(Platform.OS === "android" ? "keyboardDidHide" : "keyboardWillHide", this._onKeyboardHide);
    }
    componentWillUnmount() {
        Keyboard.removeListener(Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow", this._onKeyboardShow);
        Keyboard.removeListener(Platform.OS === "android" ? "keyboardDidHide" : "keyboardWillHide", this._onKeyboardHide);
    }
    getInitialScrollPosition() {
        var _a, _b, _c, _d;
        this._applyHeightLimiter();
        const correction = this.state.deviceHeight * 0.15;
        const scrollPosition = this.props.gestureEnabled
            ? this.actionSheetHeight * ((_a = this.props.initialOffsetFromBottom) !== null && _a !== void 0 ? _a : 0) +
                correction +
                ((_b = this.props.extraScroll) !== null && _b !== void 0 ? _b : 0)
            : this.actionSheetHeight + correction + ((_c = this.props.extraScroll) !== null && _c !== void 0 ? _c : 0);
        this.currentOffsetFromBottom = (_d = this.props.initialOffsetFromBottom) !== null && _d !== void 0 ? _d : 0;
        this.updateActionSheetPosition(scrollPosition);
        return scrollPosition;
    }
    render() {
        const { scrollable, modalVisible, keyboard } = this.state;
        const { onOpen, overlayColor, gestureEnabled, elevation, indicatorColor, defaultOverlayOpacity, children, containerStyle, CustomHeaderComponent, headerAlwaysVisible, keyboardShouldPersistTaps, statusBarTranslucent, } = this.props;
        return (React.createElement(Modal, { animationType: "none", statusBarTranslucent: statusBarTranslucent, 
            // testID={testID}
            supportedOrientations: SUPPORTED_ORIENTATIONS, transparent: true, visible: modalVisible, onRequestClose: this._onRequestClose, onShow: onOpen },
            React.createElement(Animated.View, { style: [
                    styles.parentContainer,
                    {
                        opacity: this.opacityValue,
                        width: this.state.deviceWidth,
                    },
                ], onLayout: this._onDeviceLayout },
                React.createElement(SafeAreaView, { ref: this.safeAreaViewRef, style: styles.safearea },
                    React.createElement(View, null)),
                React.createElement(FlatList, { ref: this.scrollViewRef, bounces: false, contentContainerStyle: {
                        width: this.state.deviceWidth,
                    }, data: dummyData, keyExtractor: this._keyExtractor, keyboardShouldPersistTaps: keyboardShouldPersistTaps, renderItem: () => (React.createElement(View, { style: {
                            width: "100%",
                        } },
                        React.createElement(Animated.View, { style: {
                                height: "100%",
                                width: "100%",
                                position: "absolute",
                                zIndex: 1,
                                backgroundColor: overlayColor,
                                opacity: defaultOverlayOpacity,
                            }, onTouchEnd: this._onTouchBackdrop, onTouchMove: this._onTouchBackdrop, onTouchStart: this._onTouchBackdrop }),
                        React.createElement(View, { style: {
                                height: this.state.deviceHeight * 1.15,
                                width: "100%",
                                zIndex: 10,
                            }, onTouchEnd: this._onTouchEnd, onTouchMove: this._onTouchMove, onTouchStart: this._onTouchStart },
                            React.createElement(TouchableOpacity, { style: {
                                    height: this.state.deviceHeight * 1.15,
                                    width: "100%",
                                }, onLongPress: this._onTouchBackdrop, onPress: this._onTouchBackdrop })),
                        React.createElement(Animated.View, { style: [
                                styles.container,
                                {
                                    borderRadius: 10,
                                },
                                containerStyle,
                                Object.assign(Object.assign({}, getElevation(elevation)), { zIndex: 11, opacity: this.opacityValue, transform: [
                                        {
                                            translateY: this.transformValue,
                                        },
                                    ], maxHeight: this.state.deviceHeight }),
                            ], onLayout: this._showModal },
                            React.createElement(Animated.View, { style: {
                                    maxHeight: this.state.deviceHeight,
                                    transform: [
                                        {
                                            translateY: this.indicatorTranslateY,
                                        },
                                    ],
                                    marginTop: this.state.paddingTop,
                                } },
                                gestureEnabled || headerAlwaysVisible ? (CustomHeaderComponent ? (CustomHeaderComponent) : (React.createElement(Animated.View, { style: [styles.indicator, { backgroundColor: indicatorColor }] }))) : null,
                                children)))), scrollEnabled: scrollable && !keyboard, scrollEventThrottle: 5, scrollsToTop: false, showsVerticalScrollIndicator: false, style: [
                        styles.scrollView,
                        {
                            width: this.state.deviceWidth,
                        },
                    ], onMomentumScrollBegin: this._onScrollBegin, onMomentumScrollEnd: this._onScrollEnd, onScroll: this._onScroll, onScrollBeginDrag: this._onScrollBeginDrag, onTouchEnd: this._onTouchEnd }))));
    }
}
ActionSheet.defaultProps = defaultProps;
//# sourceMappingURL=ActionSheet.js.map