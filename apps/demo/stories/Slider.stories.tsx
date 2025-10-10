import {Slider} from "ferns-ui";
import React, {ReactElement, useState} from "react";

export const SliderDemo = (): ReactElement => {
  const [value, setValue] = useState<number>(0.5);
  return <Slider maximumValue={1} minimumValue={0} step={0.1} value={value} onChange={setValue} />;
};

export const SliderWithLabelDemo = (): ReactElement => {
  const [value, setValue] = useState<number>(50);
  return (
    <Slider
      maximumValue={100}
      minimumValue={0}
      step={1}
      title="Volume"
      value={value}
      onChange={setValue}
    />
  );
};

export const SliderWithValueDemo = (): ReactElement => {
  const [value, setValue] = useState<number>(50);
  return (
    <Slider
      maximumValue={100}
      minimumValue={0}
      showValue
      step={1}
      title="Volume"
      value={value}
      onChange={setValue}
    />
  );
};

export const SliderWithHelperTextDemo = (): ReactElement => {
  const [value, setValue] = useState<number>(25);
  return (
    <Slider
      helperText="Adjust the slider to set the volume level."
      maximumValue={100}
      minimumValue={0}
      showValue
      step={1}
      title="Volume"
      value={value}
      onChange={setValue}
    />
  );
};

export const SliderWithErrorDemo = (): ReactElement => {
  const [value, setValue] = useState<number>(90);
  return (
    <Slider
      errorText="Volume is too high!"
      maximumValue={100}
      minimumValue={0}
      showValue
      step={1}
      title="Volume"
      value={value}
      onChange={setValue}
    />
  );
};

export const SliderDisabledDemo = (): ReactElement => {
  const [value, setValue] = useState<number>(50);
  return (
    <Slider
      disabled
      helperText="This slider is disabled."
      maximumValue={100}
      minimumValue={0}
      showValue
      step={1}
      title="Volume"
      value={value}
      onChange={setValue}
    />
  );
};

export const SliderDecimalDemo = (): ReactElement => {
  const [value, setValue] = useState<number>(0.25);
  return (
    <Slider
      maximumValue={1}
      minimumValue={0}
      showValue
      step={0.01}
      title="Opacity"
      value={value}
      onChange={setValue}
    />
  );
};


