/* eslint-disable react/display-name */
import React, {forwardRef, useEffect, useRef} from "react";
import {Animated} from "react-native";
import {Modalize} from "react-native-modalize";
import {Portal} from "react-native-portalize";

export const useCombinedRefs = (...refs: any) => {
  const targetRef = useRef();

  useEffect(() => {
    refs.forEach((ref: any) => {
      if (!ref) {
        return;
      }

      if (typeof ref === "function") {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
};

interface Props {
  children: any;
}

export const SimpleContent = forwardRef((props: Props, ref) => {
  const modalizeRef = useRef(null);
  const combinedRef = useCombinedRefs(ref, modalizeRef);
  const animated = useRef(new Animated.Value(0)).current;

  // const renderHeader = () => (
  //   <Box paddingY={4} marginTop={4} marginBottom={4}>
  //     <Text>50 users online</Text>
  //   </Box>
  // );

  return (
    <Portal>
      <Modalize
        // HeaderComponent={renderHeader}
        ref={combinedRef}
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          stickyHeaderIndices: [0],
        }}
        panGestureAnimatedValue={animated}
        adjustToContentHeight={true}
      >
        {props.children}
      </Modalize>
    </Portal>
  );
});
