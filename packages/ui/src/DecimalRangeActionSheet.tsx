import {Picker} from "@react-native-picker/picker";
import range from "lodash/range";
import React from "react";

import {ActionSheet} from "./ActionSheet";
import {Box} from "./Box";
import {Button} from "./Button";
import {DecimalRangeActionSheetProps, DecimalRangeActionSheetState} from "./Common";

const PICKER_HEIGHT = 104;

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
      <ActionSheet ref={this.props.actionSheetRef} bounceOnOpen gestureEnabled>
        <Box marginBottom={8} paddingX={4} width="100%">
          <Box alignItems="end" display="flex" width="100%">
            <Box width="33%">
              <Button
                color="blue"
                size="lg"
                text="Close"
                type="ghost"
                onClick={() => {
                  this.props.actionSheetRef?.current?.setModalVisible(false);
                }}
              />
            </Box>
          </Box>
          <Box direction="row" width="100%">
            <Box width="50%">
              <Picker
                itemStyle={{
                  height: PICKER_HEIGHT,
                }}
                selectedValue={this.state.whole}
                style={{
                  height: PICKER_HEIGHT,
                  backgroundColor: "#FFFFFF",
                }}
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
                itemStyle={{
                  height: PICKER_HEIGHT,
                }}
                selectedValue={this.state.decimal}
                style={{
                  height: PICKER_HEIGHT,
                  backgroundColor: "#FFFFFF",
                }}
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
                  return <Picker.Item key={String(n)} label={`.${String(n)}`} value={String(n)} />;
                })}
              </Picker>
            </Box>
          </Box>
        </Box>
      </ActionSheet>
    );
  }
}
