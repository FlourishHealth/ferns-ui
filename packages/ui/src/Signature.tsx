import React, {ReactElement, useRef} from "react";
import {Text, View} from "react-native";
import SignatureCanvas from "react-signature-canvas";

import {useTheme} from "./Theme";

export interface SignatureProps {
  onChange: (signature: string) => void;
  onStart?: () => void;
  onEnd?: () => void;
  value?: string; // note this
}

export const Signature = ({onChange}: SignatureProps): ReactElement | null => {
  const ref = useRef<SignatureCanvas>(null);
  const {theme} = useTheme();

  const onClear = () => {
    ref.current?.clear();
  };

  const onUpdatedSignature = () => {
    if (ref.current?.toDataURL()) {
      onChange(ref.current.toDataURL());
    }
  };
  return (
    <View>
      <View style={{borderColor: theme.border.dark, borderWidth: 1, width: "100%", maxWidth: 300}}>
        <SignatureCanvas
          ref={ref}
          backgroundColor={theme.surface.base}
          penColor={theme.text.secondaryDark}
          onEnd={onUpdatedSignature}
        />
      </View>
      <View>
        <Text style={{color: theme.text.link, textDecorationLine: "underline"}} onPress={onClear}>
          Clear
        </Text>
      </View>
    </View>
  );
};
