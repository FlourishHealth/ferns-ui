/* eslint-disable react/display-name */
import React, { forwardRef, useEffect, useRef } from "react";
import { Animated } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
export const useCombinedRefs = (...refs) => {
    const targetRef = useRef();
    useEffect(() => {
        refs.forEach((ref) => {
            if (!ref) {
                return;
            }
            if (typeof ref === "function") {
                ref(targetRef.current);
            }
            else {
                ref.current = targetRef.current;
            }
        });
    }, [refs]);
    return targetRef;
};
export const SimpleContent = forwardRef((props, ref) => {
    const modalizeRef = useRef(null);
    const combinedRef = useCombinedRefs(ref, modalizeRef);
    const animated = useRef(new Animated.Value(0)).current;
    // const renderHeader = () => (
    //   <Box paddingY={4} marginTop={4} marginBottom={4}>
    //     <Text>50 users online</Text>
    //   </Box>
    // );
    return (React.createElement(Portal, null, React.createElement(Modalize
    // HeaderComponent={renderHeader}
    , {
        // HeaderComponent={renderHeader}
        ref: combinedRef, scrollViewProps: {
            showsVerticalScrollIndicator: false,
            stickyHeaderIndices: [0],
        }, panGestureAnimatedValue: animated, adjustToContentHeight: true
    }, props.children)));
});
//# sourceMappingURL=ModalSheet.js.map
//# sourceMappingURL=ModalSheet.js.map