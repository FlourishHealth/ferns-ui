import {Slider} from "ferns-ui";
import React, {ReactElement, useState} from "react";

export const SliderDemo = (): ReactElement => {
  const [value, setValue] = useState<number>(0.5);
  return <Slider maximumValue={1} minimumValue={0} step={0.1} value={value} onChange={setValue} />;
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
        {index: 0, value: "\u{1F61E}"},
        {index: 25, value: "\u{1F641}"},
        {index: 50, value: "\u{1F610}"},
        {index: 75, value: "\u{1F642}"},
        {index: 100, value: "\u{1F604}"},
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
        {index: 0, value: "volume-xmark", size: "md"},
        {index: 25, value: "volume-off", size: "md"},
        {index: 50, value: "volume-low", size: "md"},
        {index: 75, value: "volume-high", size: "md"},
        {index: 100, value: "volume-high", size: "lg"},
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
        custom: [{index: 25, label: "|"}, {index: 50, label: "|"}, {index: 75, label: "|"}],
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


