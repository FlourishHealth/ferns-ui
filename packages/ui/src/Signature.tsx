import React, {ReactElement, useRef} from "react";
import SignatureCanvas from "react-signature-canvas";

import {Box} from "./Box";
import {Button} from "./Button";

export interface SignatureProps {
  onChange: (signature: string) => void;
  onStart?: () => void;
  onEnd?: () => void;
}

export const Signature = ({onChange}: SignatureProps): ReactElement | null => {
  const ref = useRef<SignatureCanvas>(null);

  const onClear = () => {
    ref.current?.clear();
  };

  const onUpdatedSignature = () => {
    if (ref.current?.toDataURL()) {
      onChange(ref.current.toDataURL());
    }
  };

  return (
    <Box width={300}>
      <Box border="dark">
        <SignatureCanvas ref={ref} backgroundColor="white" onEnd={onUpdatedSignature} />
      </Box>
      <Box direction="row">
        <Button text="Clear" variant="muted" onClick={onClear} />
      </Box>
    </Box>
  );
};
