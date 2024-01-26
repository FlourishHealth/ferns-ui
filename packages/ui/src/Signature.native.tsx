import React, {useRef} from "react";
import SignatureScreen, {SignatureViewRef} from "react-native-signature-canvas";

import {Box} from "./Box";
import {Button} from "./Button";

interface Props {
  onChange: (signature: string) => void;
  onStart?: () => void;
  onEnd?: () => void;
}

const style = `.m-signature-pad--footer {display: none; margin: 0px;}`;

export const Signature: React.FC<Props> = ({onChange, onStart, onEnd}: Props) => {
  const ref = useRef<SignatureViewRef>(null);

  const handleClear = () => {
    ref.current?.clearSignature();
  };

  const onBegin = () => {
    onStart && onStart();
  };

  // Called after end of stroke. Kind of goofy if you ask me,
  // but you need this in order to trigger the 'onOK' callback that gives us the actual image.
  const handleEnd = () => {
    ref.current?.readSignature();
    onEnd && onEnd();
  };

  return (
    <Box>
      <Box border="black" height={100}>
        <SignatureScreen
          ref={ref}
          webStyle={style}
          onBegin={onBegin}
          onEnd={handleEnd}
          onOK={(img) => onChange(img)}
        />
      </Box>
      <Box direction="row">
        <Button text="Clear" onClick={handleClear} />
      </Box>
    </Box>
  );
};
