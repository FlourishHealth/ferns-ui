import {DateTime} from "luxon";
import React, {FC, useCallback, useEffect, useRef, useState} from "react";
import {TextInput, View} from "react-native";

import {Box} from "./Box";
import {DateTimeFieldProps, IconName} from "./Common";
import {DateTimeActionSheet} from "./DateTimeActionSheet";
import {FieldError, FieldTitle} from "./fieldElements";
import {IconButton} from "./IconButton";
import {isMobileDevice} from "./MediaQuery";
import {SelectField} from "./SelectField";
import {Text} from "./Text";
import {useTheme} from "./Theme";
import {TimezonePicker} from "./TimezonePicker";

interface SeparatorProps {
  type: "date" | "time";
}

const Separator: FC<SeparatorProps> = ({type}) => {
  return (
    <View>
      <Text>{type === "time" ? ":" : "/"}</Text>
    </View>
  );
};

interface DateTimeSegmentProps {
  config: FieldConfig;
  disabled?: boolean;
  getFieldValue: (index: number) => string;
  handleFieldChange: (index: number, text: string, config: FieldConfig) => void;
  onBlur: (override?: {amPm?: "am" | "pm"; timezone?: string}) => void;
  onRef: (ref: TextInput | null, index: number) => void;
  index: number;
  error?: string;
}

const DateTimeSegment: FC<DateTimeSegmentProps> = ({
  disabled,
  getFieldValue,
  handleFieldChange,
  onBlur,
  onRef,
  index,
  config,
  error,
}): React.ReactElement => {
  const {theme} = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: config.width,
        borderColor: error ? theme.border.error : "transparent",
        backgroundColor: "transparent",
        overflow: "hidden",
        padding: 0,
        flexShrink: 1,
        height: 50,
      }}
    >
      <TextInput
        ref={(el) => onRef(el, index)}
        accessibilityHint={`Enter the ${config.placeholder}`}
        aria-label="Text input field"
        inputMode="numeric"
        placeholder={config.placeholder}
        readOnly={disabled}
        selectTextOnFocus
        style={{
          width: config.width - 2,
          textAlign: "center",
          color: error ? theme.text.error : theme.text.primary,
        }}
        value={getFieldValue(index)}
        onBlur={() => onBlur()}
        onChangeText={(text) => {
          handleFieldChange(index, text, config);
        }}
      />
    </View>
  );
};

interface DateTimeProps extends Omit<DateTimeSegmentProps, "index" | "config"> {
  fieldConfigs: FieldConfig[];
  type: "date" | "datetime" | "time";
  fieldErrors?: Record<number, string | undefined>;
}

const DateField: FC<DateTimeProps> = ({fieldErrors, ...segmentProps}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: 130,
      }}
    >
      <DateTimeSegment
        {...segmentProps}
        config={segmentProps.fieldConfigs[0]}
        error={fieldErrors?.[0]}
        index={0}
      />
      <Separator type="date" />
      <DateTimeSegment
        {...segmentProps}
        config={segmentProps.fieldConfigs[1]}
        error={fieldErrors?.[1]}
        index={1}
      />
      <Separator type="date" />
      <DateTimeSegment
        {...segmentProps}
        config={segmentProps.fieldConfigs[2]}
        error={fieldErrors?.[2]}
        index={2}
      />
    </View>
  );
};

const TimeField: FC<DateTimeProps> = ({type, onBlur, fieldErrors, ...segmentProps}) => {
  const hourIndex = type === "time" ? 0 : 3;
  const minuteIndex = type === "time" ? 1 : 4;
  return (
    <View style={{flexDirection: "row", alignItems: "center", width: 65}}>
      <DateTimeSegment
        {...segmentProps}
        config={segmentProps.fieldConfigs[hourIndex]}
        error={fieldErrors?.[hourIndex]}
        index={hourIndex}
        onBlur={onBlur}
      />
      <Separator type="time" />
      <DateTimeSegment
        {...segmentProps}
        config={segmentProps.fieldConfigs[minuteIndex]}
        error={fieldErrors?.[minuteIndex]}
        index={minuteIndex}
        onBlur={onBlur}
      />
    </View>
  );
};

type FieldConfig = {
  maxLength: number;
  placeholder: string;
  width: number;
};

export const DateTimeField: FC<DateTimeFieldProps> = ({
  type,
  title,
  value,
  onChange,
  timezone: providedTimezone,
  onTimezoneChange,
  errorText,
  disabled,
}): React.ReactElement => {
  const {theme} = useTheme();
  const dateActionSheetRef: React.RefObject<any> = React.createRef();
  const [amPm, setAmPm] = useState<"am" | "pm">("am");
  const [showDate, setShowDate] = useState(false);
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<number, string | undefined>>({});
  const [localTimezone, setLocalTimezone] = useState(
    providedTimezone ?? DateTime.local().zoneName ?? "UTC"
  );

  const breakpoint = 395; // Breakpoint for switching to action sheet
  let minimumWidth = 230; // Minimum width for the field container
  if (type === "date") {
    minimumWidth = 200;
  }

  let maximumWidth = breakpoint; // Maximum width for the field container
  if (["date", "time"].includes(type)) {
    maximumWidth = minimumWidth + 10;
  }

  const [parentWidth, setParentWidth] = useState<number | null>(null);
  const parentIsLessThanBreakpointOrIsMobile =
    (parentWidth !== null && parentWidth < breakpoint) || isMobileDevice();

  // We need to store the pending value in a ref because the state changes don't trigger
  // immediately, so onBlur may use stale values.
  const pendingValueRef = useRef<
    | {
        amPm?: "am" | "pm";
        timezone?: string;
        minute?: string;
        month?: string;
        day?: string;
        year?: string;
        hour?: string;
      }
    | undefined
  >(undefined);

  // Use provided timezone if available, otherwise use local
  const timezone = providedTimezone ?? localTimezone;
  const lastTimezoneRef = useRef(timezone);

  const inputRefs = useRef<(TextInput | null)[]>([]);

  let iconName: IconName | undefined;
  if (disabled) {
    iconName = undefined;
  } else if (type === "time") {
    iconName = "clock";
  } else {
    iconName = "calendar";
  }

  let borderColor = theme.border.dark;
  if (disabled) {
    borderColor = theme.border.activeNeutral;
  } else if (errorText || Object.values(fieldErrors).some((error) => error !== undefined)) {
    borderColor = theme.border.error;
  }

  const getFieldConfigs = useCallback((): FieldConfig[] => {
    const configs: FieldConfig[] = [];
    if (type === "date" || type === "datetime") {
      configs.push(
        {maxLength: 2, placeholder: "MM", width: 40},
        {maxLength: 2, placeholder: "DD", width: 30},
        {maxLength: 4, placeholder: "YYYY", width: 50}
      );
    }
    if (type === "time" || type === "datetime") {
      configs.push(
        {maxLength: 2, placeholder: "hh", width: 30},
        {maxLength: 2, placeholder: "mm", width: 30}
      );
    }
    return configs;
  }, [type]);

  // Set the inputRefs array to the correct length
  useEffect(() => {
    const configs = getFieldConfigs();
    inputRefs.current = configs.map(() => null);
  }, [getFieldConfigs]);

  const validateField = useCallback(
    (fieldIndex: number, fieldValue: string): string | undefined => {
      if (!fieldValue) return undefined;

      if (type === "date" || type === "datetime") {
        if (fieldIndex === 0) {
          // Month
          const monthNum = parseInt(fieldValue);
          if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
            return "Month must be between 1 and 12";
          }
        } else if (fieldIndex === 1) {
          // Day
          const dayNum = parseInt(fieldValue);
          if (isNaN(dayNum) || dayNum < 1 || dayNum > 31) {
            return "Day must be between 1 and 31";
          }
        } else if (fieldIndex === 2) {
          // Year
          const yearNum = parseInt(fieldValue);
          if (isNaN(yearNum) || yearNum < 1900 || yearNum > 2100) {
            return "Year must be between 1900 and 2100";
          }
        }
      }

      if (type === "time" || type === "datetime") {
        if (fieldIndex === (type === "time" ? 0 : 3)) {
          // Hour
          const hourNum = parseInt(fieldValue);
          if (isNaN(hourNum) || hourNum < 1 || hourNum > 12) {
            return "Hour must be between 1 and 12";
          }
        } else if (fieldIndex === (type === "time" ? 1 : 4)) {
          // Minute
          const minuteNum = parseInt(fieldValue);
          if (isNaN(minuteNum) || minuteNum < 0 || minuteNum > 59) {
            return "Minute must be between 0 and 59";
          }
        }
      }

      return undefined;
    },
    [type]
  );

  const getISOFromFields = useCallback(
    (override?: {
      amPm?: "am" | "pm";
      timezone?: string;
      minute?: string;
      month?: string;
      day?: string;
      year?: string;
      hour?: string;
    }): string | undefined => {
      const ampPmVal = override?.amPm ?? amPm;
      const minuteVal = override?.minute ?? minute;
      const monthVal = override?.month ?? month;
      const dayVal = override?.day ?? day;
      const yearVal = override?.year ?? year;
      const hourVal = override?.hour ?? hour;
      let date;
      if (type === "datetime") {
        if (!monthVal || !dayVal || !yearVal || !hour || !minuteVal) {
          return undefined;
        }
        let hourNum = parseInt(hourVal);
        if (ampPmVal === "pm" && hourNum !== 12) {
          hourNum += 12;
        } else if (ampPmVal === "am" && hourNum === 12) {
          hourNum = 0;
        }
        date = DateTime.fromObject(
          {
            year: parseInt(yearVal),
            month: parseInt(monthVal),
            day: parseInt(dayVal),
            hour: hourNum,
            minute: parseInt(minuteVal),
          },
          {
            zone: override?.timezone ?? timezone,
          }
        );
      } else if (type === "date") {
        if (!monthVal || !dayVal || !yearVal) {
          return undefined;
        }
        date = DateTime.fromObject(
          {
            year: parseInt(yearVal),
            month: parseInt(monthVal),
            day: parseInt(dayVal),
          },
          {
            zone: override?.timezone ?? timezone,
          }
        );
      } else {
        if (!hour || !minuteVal) {
          return undefined;
        }
        let hourNum = parseInt(hour);
        if (ampPmVal === "pm" && hourNum !== 12) {
          hourNum += 12;
        } else if (ampPmVal === "am" && hourNum === 12) {
          hourNum = 0;
        }
        date = DateTime.fromObject(
          {
            hour: hourNum,
            minute: parseInt(minuteVal),
          },
          {
            zone: override?.timezone ?? timezone,
          }
        );
      }

      if (date.isValid) {
        // Always return UTC ISO string
        return date.toUTC().toISO();
      }
      return undefined;
    },
    [amPm, month, day, year, hour, minute, timezone, type]
  );

  const handleFieldChange = useCallback(
    (index: number, text: string, config: FieldConfig) => {
      const numericValue = text.replace(/[^0-9]/g, "");

      // For minutes, just ensure it's at most 2 digits and valid (0-59)
      if ((type === "time" && index === 1) || (type === "datetime" && index === 4)) {
        // For minutes, keep only the last two digits entered.
        // If the user deletes everything, set the value to "00"
        // so it's always a valid time and easier to edit.
        // This lets users freely edit or clear the minute field without breaking the time format.
        const finalValue = numericValue === "" ? "00" : numericValue.slice(-2);
        const minuteNum = parseInt(finalValue);

        // Update the minute state so the UI reflects the latest input,
        // even if it's temporarily invalid
        // This allows the user to freely edit or clear the field.
        setMinute(finalValue);

        // Only update ref and result if it's a valid minute value
        if (!isNaN(minuteNum) && minuteNum >= 0 && minuteNum <= 59) {
          pendingValueRef.current = {minute: finalValue};
          setFieldErrors((prev) => ({...prev, [index]: undefined}));

          // Pass the new minute value directly to getISOFromFields
          const result = getISOFromFields({minute: finalValue});
          if (result) {
            const currentValueUTC = value ? DateTime.fromISO(value).toUTC().toISO() : undefined;
            if (result !== currentValueUTC) {
              onChange(result);
            }
          }
        } else {
          setFieldErrors((prev) => ({...prev, [index]: "Minute must be between 0 and 59"}));
        }

        // Auto-advance to next field if current field is full
        const configs = getFieldConfigs();
        if (finalValue.length === config.maxLength && index < configs.length - 1) {
          inputRefs.current[index + 1]?.focus();
        }
        return;
      }

      // For other fields, handle leading zeros
      const finalValue =
        numericValue.length > config.maxLength
          ? numericValue.slice(-config.maxLength)
          : numericValue;

      const error = validateField(index, finalValue);
      setFieldErrors((prev) => ({...prev, [index]: error}));

      if (type === "date" || type === "datetime") {
        if (index === 0) {
          setMonth(finalValue);
          pendingValueRef.current = {month: finalValue};
        }
        if (index === 1) {
          setDay(finalValue);
          pendingValueRef.current = {day: finalValue};
        }
        if (index === 2) {
          setYear(finalValue);
          pendingValueRef.current = {year: finalValue};
        }
      }

      if (type === "time") {
        if (index === 0) {
          setHour(finalValue);
          pendingValueRef.current = {hour: finalValue};
        }
      }

      if (type === "datetime") {
        if (index === 3) {
          setHour(finalValue);
          pendingValueRef.current = {hour: finalValue};
        }
      }

      // Auto-advance to next field if current field is full
      const configs = getFieldConfigs();
      if (finalValue.length === config.maxLength && index < configs.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [type, getFieldConfigs, getISOFromFields, onChange, value, validateField]
  );

  const onActionSheetChange = useCallback(
    (inputDate: string) => {
      const parsedDate = DateTime.fromISO(inputDate);
      if (!parsedDate.isValid) {
        console.warn("Invalid date passed to DateTimeField", inputDate);
        return;
      }
      setAmPm(parsedDate.hour >= 12 ? "pm" : "am");

      if (type === "date" || type === "datetime") {
        setMonth(parsedDate.month.toString().padStart(2, "0"));
        setDay(parsedDate.day.toString().padStart(2, "0"));
        setYear(parsedDate.year.toString());
      }

      if (type === "time" || type === "datetime") {
        let hourNum = parsedDate.hour % 12;
        hourNum = hourNum === 0 ? 12 : hourNum;
        setHour(hourNum.toString().padStart(2, "0"));
        setMinute(parsedDate.minute.toString().padStart(2, "0"));
      }
      onChange(inputDate);
      setShowDate(false);
    },
    [onChange, type]
  );

  // When fields change, send the value to onChange
  const onBlur = useCallback(
    (override?: {amPm?: "am" | "pm"}) => {
      const iso = getISOFromFields({...override, ...pendingValueRef.current});
      // Compare in UTC to avoid timezone issues
      const currentValueUTC = value ? DateTime.fromISO(value).toUTC().toISO() : undefined;
      if (iso && iso !== currentValueUTC) {
        onChange(iso);
      }

      // Clear the pending value after processing
      pendingValueRef.current = undefined;
    },
    [getISOFromFields, onChange, value]
  );

  // Handle external value changes
  useEffect(() => {
    if (!value) {
      return;
    }

    // // If only timezone changed, don't recalculate fields
    const isOnlyTimezoneChange =
      lastTimezoneRef.current !== timezone &&
      DateTime.fromISO(value).toUTC().toISO() ===
        DateTime.fromISO(value).setZone(timezone).toUTC().toISO();

    lastTimezoneRef.current = timezone;

    if (isOnlyTimezoneChange) {
      return;
    }

    // Handle dates which should have 00:00:00.000Z as the time component, ignore timezones.
    let parsedDate = DateTime.fromISO(value);
    if (type === "date") {
      parsedDate = parsedDate.setZone("UTC");
    } else {
      parsedDate = parsedDate.setZone(timezone);
    }
    if (!parsedDate.isValid) {
      console.warn("Invalid date passed to DateTimeField", value);
      return;
    }
    setAmPm(parsedDate.hour >= 12 ? "pm" : "am");

    if (type === "date" || type === "datetime") {
      setMonth(parsedDate.month.toString().padStart(2, "0"));
      setDay(parsedDate.day.toString().padStart(2, "0"));
      setYear(parsedDate.year.toString());
    }

    if (type === "time" || type === "datetime") {
      let hourNum = parsedDate.hour % 12;
      hourNum = hourNum === 0 ? 12 : hourNum;
      setHour(hourNum.toString().padStart(2, "0"));
      setMinute(parsedDate.minute.toString().padStart(2, "0"));
    }
  }, [value, type, timezone]);

  // JOSH: This is where the infinite loop is happening
  // We update the value of the date according to the zone and then this get triggered
  // and we update the value of the date according to the zone again
  const getFieldValue = useCallback(
    (index: number): string => {
      if (type === "date" || type === "datetime") {
        if (index === 0) return month;
        if (index === 1) return day;
        if (index === 2) return year;
      }

      if (type === "time") {
        if (index === 0) return hour;
        if (index === 1) return minute;
      }

      if (type === "datetime") {
        if (index === 3) return hour;
        if (index === 4) return minute;
      }

      return "";
    },
    [type, month, day, year, hour, minute]
  );

  const fieldConfigs = getFieldConfigs();

  const segmentProps = {
    disabled,
    getFieldValue,
    handleFieldChange,
    onBlur,
    fieldConfigs,
    onRef: (el: TextInput | null, i: number) => (inputRefs.current[i] = el),
    fieldErrors,
  };

  return (
    <>
      {Boolean(title) && <FieldTitle text={title!} />}
      {Boolean(errorText) && <FieldError text={errorText!} />}
      <View
        style={{
          flexDirection: parentIsLessThanBreakpointOrIsMobile ? "column" : "row",
          borderColor,
          backgroundColor: theme.surface.base,
          borderWidth: 1,
          paddingHorizontal: 6,
          paddingVertical: 2,
          borderRadius: 4,
          alignItems: "center",
          minWidth: minimumWidth,
          maxWidth: maximumWidth,
        }}
        onLayout={(e) => setParentWidth(e.nativeEvent.layout.width)}
      >
        {(type === "date" || type === "datetime") && (
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <DateField {...segmentProps} type={type} />
            {!disabled &&
              (type === "date" ||
                (type === "datetime" && parentIsLessThanBreakpointOrIsMobile)) && (
                <IconButton
                  accessibilityHint="Opens the calendar to select a date and time"
                  accessibilityLabel="Show calendar"
                  iconName={iconName!}
                  variant="muted"
                  onClick={() => setShowDate(true)}
                />
              )}
          </View>
        )}

        <View style={{flexDirection: "row", alignItems: "center"}}>
          {(type === "time" || type === "datetime") && <TimeField {...segmentProps} type={type} />}
          {Boolean(type === "datetime" || type === "time") && (
            <>
              <Box direction="column" marginLeft={2} marginRight={2} width={60}>
                <SelectField
                  disabled={disabled}
                  options={[
                    {label: "am", value: "am"},
                    {label: "pm", value: "pm"},
                  ]}
                  requireValue
                  value={amPm}
                  onChange={(result) => {
                    setAmPm(result as "am" | "pm");
                    // No onblur, so we need to manually update the value
                    const iso = getISOFromFields({amPm: result as "am" | "pm"});
                    // Compare in UTC to avoid timezone issues
                    const currentValueUTC = value
                      ? DateTime.fromISO(value).toUTC().toISO()
                      : undefined;
                    if (iso && iso !== currentValueUTC) {
                      onChange(iso);
                    }
                  }}
                />
              </Box>
              <Box direction="column" width={70}>
                <TimezonePicker
                  disabled={disabled}
                  hideTitle
                  shortTimezone
                  timezone={timezone}
                  onChange={(t) => {
                    if (onTimezoneChange) {
                      onTimezoneChange(t);
                    } else {
                      setLocalTimezone(t);
                    }
                    const iso = getISOFromFields({timezone: t});
                    // Compare in UTC to avoid timezone issues
                    const currentValueUTC = value
                      ? DateTime.fromISO(value).toUTC().toISO()
                      : undefined;
                    if (iso && iso !== currentValueUTC) {
                      onChange(iso);
                    }
                  }}
                />
              </Box>
            </>
          )}

          {!disabled && type === "datetime" && !parentIsLessThanBreakpointOrIsMobile && (
            <Box marginLeft={2}>
              <IconButton
                accessibilityHint="Opens the calendar to select a date and time"
                accessibilityLabel="Show calendar"
                iconName={iconName!}
                variant="muted"
                onClick={() => setShowDate(true)}
              />
            </Box>
          )}
        </View>
      </View>

      {!disabled && (
        <DateTimeActionSheet
          actionSheetRef={dateActionSheetRef}
          timezone={timezone}
          type={type}
          value={value}
          visible={showDate}
          onChange={onActionSheetChange}
          onDismiss={() => setShowDate(false)}
        />
      )}
    </>
  );
};
