import {Box, Slider} from "ferns-ui";
import React, {ReactElement, useState} from "react";

export const SliderDemo = (): ReactElement => {
  const [value, setValue] = useState<number>(0.5);
  return (
    <Box width="100%">
      <Slider maximumValue={1} minimumValue={0} step={0.1} value={value} onChange={setValue} />
    </Box>
  );
};

export const SliderWithValueDemo = (): ReactElement => {
  const [value, setValue] = useState<number>(50);
  return (
    <Slider
      maximumValue={100}
      minimumValue={0}
      showSelection
      step={1}
      title="Volume"
      value={value}
      onChange={setValue}
    />
  );
};

export const SliderWithSmileysDemo = (): ReactElement => {
  const [value, setValue] = useState<number>(50);
  return (
    <Slider
      inlineLabels
      labels={{
        min: "\u{1F61E}",
        max: "\u{1F604}",
      }}
      maximumValue={100}
      minimumValue={0}
      showSelection
      step={25}
      title="Smileys"
      value={value}
      valueMapping={[
        {value: 0, label: "\u{1F61E}"},
        {value: 25, label: "\u{1F641}"},
        {value: 50, label: "\u{1F610}"},
        {value: 75, label: "\u{1F642}"},
        {value: 100, label: "\u{1F604}"},
      ]}
      onChange={setValue}
    />
  );
};

export const SliderWithIconsDemo = (): ReactElement => {
  const [value, setValue] = useState<number>(50);
  return (
    <Slider
      maximumValue={100}
      minimumValue={0}
      showSelection
      step={25}
      title="Volume"
      useIcons
      value={value}
      valueMapping={[
        {value: 0, label: "volume-xmark", size: "md"},
        {value: 25, label: "volume-off", size: "md"},
        {value: 50, label: "volume-low", size: "md"},
        {value: 75, label: "volume-high", size: "md"},
        {value: 100, label: "volume-high", size: "lg"},
      ]}
      onChange={setValue}
    />
  );
};

export const SliderWithLabelsDemo = (): ReactElement => {
  const [value, setValue] = useState<number>(50);
  return (
    <Slider
      labels={{
        min: "Low",
        custom: [
          {index: 25, label: "|"},
          {index: 50, label: "|"},
          {index: 75, label: "|"},
        ],
        max: "High",
      }}
      maximumValue={100}
      minimumValue={0}
      step={1}
      title="Temperature"
      value={value}
      onChange={setValue}
    />
  );
};

export const SliderWithInlineLabelsDemo = (): ReactElement => {
  const [value, setValue] = useState<number>(50);
  return (
    <Slider
      inlineLabels
      labels={{
        min: "Low",
        max: "High",
      }}
      maximumValue={100}
      minimumValue={0}
      step={1}
      title="Temperature"
      value={value}
      onChange={setValue}
    />
  );
};
