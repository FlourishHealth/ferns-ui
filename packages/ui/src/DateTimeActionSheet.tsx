import {Picker} from "@react-native-picker/picker";
import range from "lodash/range";
import moment from "moment";
import React, {useEffect, useState} from "react";
import {Platform, StyleProp, TextInput, TextStyle, View} from "react-native";
import {Calendar} from "react-native-calendars";

import {Box} from "./Box";
import {OnChangeCallback} from "./Common";
import {Heading} from "./Heading";
import {IconButton} from "./IconButton";
import {isMobileDevice} from "./MediaQuery";
import {Modal} from "./Modal";
import {SelectList} from "./SelectList";
import {Unifier} from "./Unifier";

const TIME_PICKER_HEIGHT = 104;
const INPUT_HEIGHT = 40;

const hours = range(1, 13).map((n) => String(n));
// TODO: support limited picker minutes, e.g. 5 or 15 minute increments.
const minutes = range(0, 60).map((n) => String(n).padStart(2, "0"));
const minutesOptions = [...minutes, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

function TimeInput({
  type,
  value,
  onChange,
}: {
  type: "hour" | "minute";
  value: number;
  onChange: (value: number) => void;
}): React.ReactElement {
  const defaultText = type === "minute" ? String(value).padStart(2, "0") : String(value);
  const [text, setText] = useState(defaultText);
  const [focused, setFocused] = useState(false);
  let error = false;
  if (type === "hour") {
    error = !hours.includes(String(Number(text)));
  } else if (type === "minute") {
    error = !minutesOptions.includes(String(Number(text)));
  }

  // Broken out because types don't think "outline" is a valid style.
  const textInputStyle: StyleProp<TextStyle> = {
    flex: 1,
    paddingTop: 4,
    paddingRight: 4,
    paddingBottom: 4,
    paddingLeft: 0,
    height: INPUT_HEIGHT,
    width: "100%",
    color: Unifier.theme.darkGray,
    fontFamily: Unifier.theme.primaryFont,
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: INPUT_HEIGHT,
        width: "100%",
        // Add padding so the border doesn't mess up layouts
        paddingHorizontal: focused ? 10 : 14,
        paddingVertical: focused ? 0 : 4,
        borderColor: error ? Unifier.theme.red : Unifier.theme.blue,
        borderWidth: focused ? 5 : 1,
        borderRadius: 5,
        backgroundColor: Unifier.theme.white,
      }}
    >
      <TextInput
        keyboardType="number-pad"
        returnKeyType="done"
        style={
          {
            ...textInputStyle,
            outline: Platform.select({web: "none"}),
          } as any
        }
        textContentType="none"
        underlineColorAndroid="transparent"
        value={text}
        onBlur={() => {
          setFocused(false);
        }}
        onChangeText={(t) => {
          setText(t);
          onChange(Number(t));
        }}
        onFocus={() => {
          setFocused(true);
        }}
      />
    </View>
  );
}

function CalendarHeader({
  addMonth,
  month,
}: {
  addMonth: (num: number) => void;
  month: Date[];
}): React.ReactElement {
  const displayDate = moment(month[0]).format("MMM YYYY");
  return (
    <Box alignItems="center" direction="row" height={40} justifyContent="between" width="100%">
      <IconButton
        accessibilityLabel="arrow"
        bgColor="white"
        icon="angle-double-left"
        iconColor="primary"
        size="md"
        onClick={() => {
          addMonth(-12);
        }}
      />
      <IconButton
        accessibilityLabel="arrow"
        bgColor="white"
        icon="angle-left"
        iconColor="primary"
        size="md"
        onClick={() => {
          addMonth(-1);
        }}
      />
      <Heading size="sm">{displayDate}</Heading>
      <IconButton
        accessibilityLabel="arrow"
        bgColor="white"
        icon="angle-right"
        iconColor="primary"
        size="md"
        onClick={() => {
          addMonth(1);
        }}
      />
      <IconButton
        accessibilityLabel="arrow"
        bgColor="white"
        icon="angle-double-right"
        iconColor="primary"
        size="md"
        onClick={() => {
          addMonth(12);
        }}
      />
    </Box>
  );
}

interface DateTimeActionSheetProps {
  value?: string;
  mode?: "date" | "time" | "datetime";
  // Returns an ISO 8601 string. If mode is "time", the date portion is today.
  onChange: OnChangeCallback;
  actionSheetRef: React.RefObject<any>;
  visible: boolean;
  onDismiss: () => void;
}

// For mobile, renders all components in an action sheet.
// For web, renders all components in a modal.
// For mobile:
//   If mode is "time", renders a spinner picker for time picker on both platforms.
//   If mode is "date", renders our custom calendar on both platforms.
//   If mode is "datetime", renders a spinner picker for time picker and our custom calendar on both platforms.
// For web, renders a simplistic text box for time picker and a calendar for date picker in a modal
//   In the future, web time picker should be a typeahead dropdown like Google calendar.
export function DateTimeActionSheet({
  // actionSheetRef,
  mode,
  value,
  onChange,
  visible,
  onDismiss,
}: DateTimeActionSheetProps) {
  // Accept ISO 8601, HH:mm, or hh:mm A formats. We may want only HH:mm or hh:mm A for mode=time
  let m;
  if (value) {
    m = moment(value, [moment.ISO_8601, "HH:mm", "hh:mm A"]);
  } else {
    m = moment();
  }

  if (!m.isValid()) {
    throw new Error(`Invalid date/time value ${value}`);
  }

  let hr = moment(m).hour() % 12;
  if (hr === 0) {
    hr = 12;
  }

  const [hour, setHour] = useState<number>(hr);
  const [minute, setMinute] = useState<number>(moment(m).minute());
  const [amPm, setAmPm] = useState<"am" | "pm">(moment(m).format("a") === "am" ? "am" : "pm");
  const [date, setDate] = useState<string>(moment(m).toISOString());

  useEffect(() => {
    if (value) {
      m = moment(value, [moment.ISO_8601, "HH:mm", "hh:mm A"]);
    } else {
      m = moment();
    }
    let h = moment(m).hour() % 12;
    if (h === 0) {
      h = 12;
    }
    setHour(h);
    setMinute(moment(m).minute());
    setAmPm(moment(m).format("a") === "am" ? "am" : "pm");
    setDate(moment(m).toISOString());
  }, [value]);

  // TODO Support 24 hour time for time picker.
  const renderMobileTime = () => {
    return (
      <Box direction="row" width="100%">
        <Box paddingY={2} width="35%">
          <Picker
            itemStyle={{
              height: TIME_PICKER_HEIGHT,
            }}
            selectedValue={hour}
            style={{
              height: TIME_PICKER_HEIGHT,
              backgroundColor: "#FFFFFF",
            }}
            onValueChange={(itemValue) => setHour(itemValue)}
          >
            {hours.map((n) => (
              <Picker.Item key={String(n)} label={String(n)} value={String(n)} />
            ))}
          </Picker>
        </Box>
        <Box paddingY={2} width="35%">
          <Picker
            itemStyle={{
              height: TIME_PICKER_HEIGHT,
            }}
            selectedValue={minute}
            style={{
              height: TIME_PICKER_HEIGHT,
              backgroundColor: "#FFFFFF",
            }}
            onValueChange={(itemValue) => setMinute(itemValue)}
          >
            {minutes.map((n) => (
              <Picker.Item key={String(n)} label={String(n)} value={String(n)} />
            ))}
          </Picker>
        </Box>
        <Box paddingY={2} width="30%">
          <Picker
            itemStyle={{
              height: TIME_PICKER_HEIGHT,
            }}
            selectedValue={amPm}
            style={{
              height: TIME_PICKER_HEIGHT,
              backgroundColor: "#FFFFFF",
            }}
            onValueChange={(itemValue) => setAmPm(itemValue)}
          >
            <Picker.Item key="am" label="am" value="am" />
            <Picker.Item key="pm" label="pm" value="pm" />
          </Picker>
        </Box>
      </Box>
    );
  };

  // TODO: Support a typeahead dropdown for time picker, similar to Google Calendar on the web.
  const renderWebTime = () => {
    return (
      <Box direction="row" justifyContent="center" width="100%">
        <Box width={60}>
          <TimeInput type="hour" value={hour} onChange={(v) => setHour(v)} />
        </Box>
        <Box
          alignItems="center"
          height={INPUT_HEIGHT}
          justifyContent="center"
          marginLeft={2}
          marginRight={2}
        >
          <Heading size="md">:</Heading>
        </Box>
        <Box marginRight={2} width={60}>
          <TimeInput type="minute" value={minute} onChange={(v) => setMinute(v)} />
        </Box>

        <Box width={60}>
          <SelectList
            options={[
              {label: "am", value: "am"},
              {label: "pm", value: "pm"},
            ]}
            style={{minHeight: INPUT_HEIGHT}}
            value={amPm}
            onChange={(result) => {
              setAmPm(result as "am" | "pm");
            }}
          />
        </Box>
      </Box>
    );
  };

  const renderDateTime = (): React.ReactElement => {
    return (
      <Box>
        <Box marginBottom={2}>{renderDateCalendar()}</Box>
        {isMobileDevice() ? renderMobileTime() : renderWebTime()}
      </Box>
    );
  };

  // Note: do not call this if waiting on a state change.
  const sendOnChange = () => {
    const hourChange = amPm === "pm" && hour !== 12 ? Number(hour) + 12 : Number(hour);
    if (mode === "date") {
      onChange({value: date});
    } else if (mode === "time") {
      onChange({
        value: moment().hour(hourChange).minute(Number(minute)).toISOString(),
      });
    } else if (mode === "datetime") {
      onChange({
        value: moment(date).hour(hourChange).minute(Number(minute)).toISOString(),
      });
    }
    onDismiss();
  };

  const sendClear = () => {
    onChange({
      value: "",
    });
    onDismiss();
  };

  // Renders our custom calendar component on mobile or web.
  const renderDateCalendar = () => {
    const markedDates: {[id: string]: {selected: boolean; selectedColor: string}} = {};
    if (date) {
      markedDates[moment(date).format("YYYY-MM-DD")] = {
        selected: true,
        selectedColor: Unifier.theme.primary,
      };
    }
    return (
      <Calendar
        customHeader={CalendarHeader}
        initialDate={moment(date).format("YYYY-MM-DD")}
        markedDates={markedDates}
        onDayPress={(day) => {
          setDate(day.dateString);
          // If mode is just date, we can shortcut and close right away. time and datetime need to wait for the
          // primary button.
          if (mode === "date") {
            onChange({value: day.dateString});
            onDismiss();
          }
        }}
      />
    );
  };

  const renderContent = (): React.ReactElement => {
    if (isMobileDevice()) {
      if (mode === "date") {
        return renderDateCalendar();
      } else if (mode === "time") {
        return renderMobileTime();
      } else {
        return renderDateTime();
      }
    } else {
      if (mode === "date") {
        return renderDateCalendar();
      } else if (mode === "time") {
        return renderWebTime();
      } else {
        return renderDateTime();
      }
    }
  };

  return (
    <Modal
      primaryButtonOnClick={sendOnChange}
      primaryButtonText="Save"
      secondaryButtonOnClick={sendClear}
      secondaryButtonText="Clear"
      showClose
      visible={visible}
      onDismiss={onDismiss}
    >
      {renderContent()}
    </Modal>
  );
}
