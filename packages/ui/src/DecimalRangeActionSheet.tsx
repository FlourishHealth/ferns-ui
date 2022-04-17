import React from "react";
import {ActionSheet} from "./ActionSheet";

import {Box} from "./Box";
import {Button} from "./Button";
import {Picker} from "@react-native-picker/picker";
import {OnChangeCallback} from "./Common";
import range from "lodash/range";

const PICKER_HEIGHT = 104;

interface DecimalRangeActionSheetProps {
  value: string;
  min: number;
  max: number;
  onChange: OnChangeCallback;
  actionSheetRef: React.RefObject<any>;
}

interface DecimalRangeActionSheetState {
  whole: string;
  decimal: string;
}

export class DecimalRangeActionSheet extends React.Component<
  DecimalRangeActionSheetProps,
  DecimalRangeActionSheetState
> {
  constructor(props: DecimalRangeActionSheetProps) {
    super(props);
    this.state = {
      whole: String(Math.floor(Number(props.value))),
      decimal: String((Number(props.value) * 10) % 10),
    };
  }

  render() {
    return (
      <ActionSheet ref={this.props.actionSheetRef} gestureEnabled={true} bounceOnOpen={true}>
        <Box width="100%" paddingX={4} marginBottom={8}>
          <Box width="100%" display="flex" alignItems="end">
            <Box width="33%">
              <Button
                type="ghost"
                text="Close"
                color="blue"
                size="lg"
                onClick={() => {
                  this.props.actionSheetRef?.current?.setModalVisible(false);
                }}
              />
            </Box>
          </Box>
          <Box width="100%" direction="row">
            <Box width="50%">
              <Picker
                style={{
                  height: PICKER_HEIGHT,
                  backgroundColor: "#FFFFFF",
                }}
                itemStyle={{
                  height: PICKER_HEIGHT,
                }}
                selectedValue={this.state.whole}
                onValueChange={(whole) => {
                  this.setState({whole: String(whole)});
                  this.props.onChange({
                    value: String(Number(whole) + Number(this.state.decimal) * 0.1),
                  });
                }}
              >
                {range(this.props.min, this.props.max + 1).map((n) => {
                  // console.log("FIRST", String(n));
                  return <Picker.Item key={String(n)} label={String(n)} value={String(n)} />;
                })}
              </Picker>
            </Box>
            <Box width="50%">
              <Picker
                style={{
                  height: PICKER_HEIGHT,
                  backgroundColor: "#FFFFFF",
                }}
                itemStyle={{
                  height: PICKER_HEIGHT,
                }}
                selectedValue={this.state.decimal}
                onValueChange={(decimal) => {
                  // console.log(
                  //   "DECIMAL",
                  //   decimal,
                  //   this.state.whole,
                  //   Number(decimal.toString()) * 0.1,
                  //   String(this.state.whole + Number(decimal) * 0.1)
                  // );
                  this.setState({decimal: String(decimal)});
                  this.props.onChange({
                    value: String(Number(this.state.whole) + Number(decimal) * 0.1),
                  });
                }}
              >
                {range(0, 10).map((n) => {
                  // console.log("N", n);
                  return <Picker.Item key={String(n)} label={"." + String(n)} value={String(n)} />;
                })}
              </Picker>
            </Box>
          </Box>
        </Box>
      </ActionSheet>
    );
  }
}
