import {DateTime} from "luxon";

function getDate(date: string, {timezone}: {timezone?: string} = {}): DateTime {
  if (!date) {
    throw new Error("Passed undefined");
  }
  if (typeof (date as any) !== "string") {
    throw new Error(`Invalid date type: ${typeof date}`);
  }
  const clonedDate = timezone ? DateTime.fromISO(date).setZone(timezone) : DateTime.fromISO(date);
  if (!clonedDate.isValid) {
    throw new Error(`Invalid date: ${date}`);
  }
  return clonedDate;
}

export function isTomorrow(date: string, {timezone}: {timezone?: string} = {}): boolean {
  const clonedDate = getDate(date, {timezone});
  const now = timezone ? DateTime.now().setZone(timezone) : DateTime.now();
  const diff = now.startOf("day").diff(clonedDate.startOf("day"), "days");
  return diff.days <= -1 && diff.days > -2;
}

export function isYesterday(date: string, {timezone}: {timezone?: string} = {}): boolean {
  const clonedDate = getDate(date, {timezone});
  const now = timezone ? DateTime.now().setZone(timezone) : DateTime.now();
  const diff = now.startOf("day").diff(clonedDate.startOf("day"), "days");
  return diff.days <= 1 && diff.days > -1;
}

export function isToday(date: string, {timezone}: {timezone?: string} = {}): boolean {
  const clonedDate = getDate(date, {timezone});
  const now = timezone ? DateTime.now().setZone(timezone) : DateTime.now();
  const diff = now.startOf("day").diff(clonedDate.startOf("day"), "days");
  return diff.days === 0;
}

export function isThisYear(date: string, {timezone}: {timezone?: string} = {}): boolean {
  const clonedDate = getDate(date, {timezone});
  const now = timezone ? DateTime.now().setZone(timezone) : DateTime.now();
  return clonedDate.year === now.year;
}

export function isWithinWeek(date: string, {timezone}: {timezone?: string} = {}): boolean {
  const clonedDate = getDate(date, {timezone});
  const now = timezone ? DateTime.now().setZone(timezone) : DateTime.now();
  const diff = now.startOf("day").diff(clonedDate.startOf("day"), "days");
  return diff.days > -7 && diff.days < 7;
}

export function humanDate(date: string, {timezone}: {timezone?: string} = {}): string {
  let clonedDate;
  try {
    clonedDate = getDate(date, {timezone});
  } catch (error: any) {
    throw new Error(`humanDate: ${error.message}`);
  }
  if (isTomorrow(date, {timezone})) {
    return "Tomorrow";
  } else if (isToday(date, {timezone})) {
    return clonedDate.toFormat("h:mm a");
  } else if (isYesterday(date, {timezone})) {
    return "Yesterday";
  } else if (isWithinWeek(date, {timezone})) {
    // E.g. Monday
    return clonedDate.toFormat("EEEE");
  } else if (isThisYear(date, {timezone})) {
    // E.g. June 19
    return clonedDate.toFormat("MMM d");
  } else {
    // December 25, 2022
    return clonedDate.toFormat("MMM d, iiii");
  }
}

export function humanDateAndTime(
  date: string,
  {timezone, showTimezone}: {timezone?: string; showTimezone?: boolean} = {}
): string {
  let clonedDate;
  try {
    clonedDate = getDate(date, {timezone});
  } catch (error: any) {
    throw new Error(`humanDateAndTime: ${error.message}`);
  }
  // This should maybe use printTime()
  let time = clonedDate.toFormat("h:mm a");
  if (showTimezone) {
    time += ` ${clonedDate.offsetNameShort}`;
  }
  if (isTomorrow(date, {timezone})) {
    return `Tomorrow ${time}`;
  } else if (isToday(date, {timezone})) {
    return time;
  } else if (isYesterday(date, {timezone})) {
    return `Yesterday ${time}`;
  } else if (isWithinWeek(date, {timezone})) {
    // E.g. Monday 9:00 AM
    return `${clonedDate.toFormat("EEEE")} ${time}`;
  } else if (isThisYear(date, {timezone})) {
    // E.g. June 19
    return `${clonedDate.toFormat("MMM d")} ${time}`;
  } else {
    // December 25, 2022
    return `${clonedDate.toFormat("MMM d, iiii")} ${time}`;
  }
}

// Print date in the format of M/D/YY, taking timezones into account.
export const printDate = (
  date: string,
  {
    timezone,
    showTimezone,
    ignoreTime,
  }: {
    timezone?: string;
    showTimezone?: boolean;
    // Ignore the time in the date, treat as a date in timezone.
    // Will log a warning if the time is not set to midnight UTC.
    ignoreTime?: boolean;
  } = {}
): string => {
  if (showTimezone) {
    console.warn("showTimezone is not supported for printDate");
  }

  let clonedDate;
  try {
    clonedDate = getDate(date!, {timezone});
  } catch (error: any) {
    throw new Error(`printDate: ${error.message}`);
  }

  if (ignoreTime) {
    if (date?.endsWith("T00:00:00.000Z")) {
      console.warn(
        "printDate: ignoreTime is set to true, but the time is set to midnight UTC. " +
          "This may cause unexpected behavior."
      );
    }
    if (!date) {
      throw new Error("printDate: Passed undefined");
    }
    // Use only the date component, ignore the time.
    const justDate = DateTime.fromISO(date);
    // We force it into UTC so we can get the correct date.
    return justDate.setZone("UTC").toFormat("M/d/yyyy");
  }

  return clonedDate.toLocaleString(DateTime.DATE_SHORT);
};

export function printTime(
  date: string,
  {
    timezone,
    showTimezone,
  }: {
    timezone: string;
    showTimezone?: boolean;
  }
): string {
  let clonedDate;
  if (!timezone) {
    throw new Error("printTime: timezone is required");
  }
  try {
    clonedDate = getDate(date, {timezone});
  } catch (error: any) {
    throw new Error(`printTime: ${error.message}`);
  }
  if (showTimezone) {
    return clonedDate.toLocaleString(DateTime.TIME_WITH_SHORT_OFFSET);
  } else {
    return clonedDate.toLocaleString(DateTime.TIME_SIMPLE);
  }
}

// Print date in the format of M/D/YY HH:mm A, taking timezones into account.
export function printDateAndTime(
  date: string,
  {
    timezone,
    showTimezone,
  }: {
    timezone?: string;
    showTimezone?: boolean;
  } = {}
): string {
  console.log("printDateAndTime", date, timezone, showTimezone);
  let clonedDate;
  try {
    clonedDate = getDate(date, {timezone});
  } catch (error: any) {
    throw new Error(`printDateAndTime: ${error.message}`);
  }
  let dateString = clonedDate.toLocaleString(DateTime.DATETIME_SHORT);
  if (showTimezone) {
    dateString += ` ${clonedDate.offsetNameShort}`;
  }
  return dateString;
}
