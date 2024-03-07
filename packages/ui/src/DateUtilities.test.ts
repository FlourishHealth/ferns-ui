// Write a jest test for the DateUtilities functions

import {
  humanDate,
  humanDateAndTime,
  printDate,
  printDateAndTime,
  printDateRange,
  printOnlyDate,
  printSince,
  printTime,
} from "./DateUtilities";

describe("DateUtilities", function () {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2022-12-24T12:00:00.000Z"));
  });

  describe("humanDate", function () {
    it("should return invalid date if date is undefined", function () {
      expect(() => humanDate(undefined as any, {timezone: "America/New_York"})).toThrow(
        "humanDate: Passed undefined"
      );
    });

    it("should throw an error if date is invalid", function () {
      expect(() => humanDate("invalid date")).toThrow("humanDate: Invalid date: invalid date");
    });

    it("should return 'Tomorrow' if the date is tomorrow", function () {
      expect(humanDate("2022-12-25T12:00:00.000Z")).toBe("Tomorrow");
    });

    it("should return the time if the date is today", function () {
      expect(humanDate("2022-12-24T12:00:00.000Z")).toBe("7:00 AM");
    });

    it("should return the date if the date is today and don't show date is true", function () {
      expect(humanDate("2022-12-24T12:00:00.000Z", {dontShowTime: true})).toBe("Today");
    });

    it("should return 'Yesterday' if the date is yesterday", function () {
      expect(humanDate("2022-12-23T12:00:00.000Z")).toBe("Yesterday");
    });

    it("should return the day of the week if the date is within the last week", function () {
      expect(humanDate("2022-12-18T12:00:00.000Z")).toBe("Sunday");
    });

    it("should return the month and day if the date is within the current year", function () {
      expect(humanDate("2022-06-19T12:00:00.000Z")).toBe("Jun 19");
    });

    it("should return the month, day, and year if the date is not within the current year", function () {
      expect(humanDate("2023-12-25T12:00:00.000Z")).toBe("Dec 25, 2023");
    });

    it("should use the timezone properly around the day boundary", function () {
      // Today is 2022-12-24T05:00:00.000 to 2022-12-25T04:59:59.999
      expect(humanDate("2022-12-24T04:00:00.000Z", {timezone: "America/New_York"})).toBe(
        "Yesterday"
      );
      expect(humanDate("2022-12-24T05:00:00.000Z", {timezone: "America/New_York"})).toBe(
        "12:00 AM"
      );
      expect(humanDate("2022-12-25T04:00:00.000Z", {timezone: "America/New_York"})).toBe(
        "11:00 PM"
      );
      expect(humanDate("2022-12-25T05:00:00.000Z", {timezone: "America/New_York"})).toBe(
        "Tomorrow"
      );

      // Switch to Chicago
      expect(humanDate("2022-12-24T04:00:00.000Z", {timezone: "America/Chicago"})).toBe(
        "Yesterday"
      );
      // Still yesterday in Chicago
      expect(humanDate("2022-12-24T05:00:00.000Z", {timezone: "America/Chicago"})).toBe(
        "Yesterday"
      );
      expect(humanDate("2022-12-24T06:00:00.000Z", {timezone: "America/Chicago"})).toBe("12:00 AM");

      // 5/6am UTC is 11/12pm in Chicago
      expect(humanDate("2022-12-25T05:00:00.000Z", {timezone: "America/Chicago"})).toBe("11:00 PM");
      expect(humanDate("2022-12-25T07:00:00.000Z", {timezone: "America/Chicago"})).toBe("Tomorrow");
    });
  });

  describe("humanDateTime", function () {
    it("should return invalid date if date is undefined", function () {
      expect(() => humanDateAndTime(undefined as any, {timezone: "America/New_York"})).toThrow(
        "humanDateAndTime: Passed undefined"
      );
    });

    it("should throw an error if date is invalid", function () {
      expect(() => humanDateAndTime("invalid date")).toThrow(
        "humanDateAndTime: Invalid date: invalid date"
      );
    });

    it("should return 'Tomorrow' if the date is tomorrow", function () {
      expect(humanDateAndTime("2022-12-25T12:00:00.000Z")).toBe("Tomorrow 7:00 AM EST");
    });

    it("should return the time if the date is today", function () {
      expect(humanDateAndTime("2022-12-24T12:00:00.000Z")).toBe("7:00 AM EST");
    });

    it("should return 'Yesterday' if the date is yesterday", function () {
      expect(humanDateAndTime("2022-12-23T12:00:00.000Z")).toBe("Yesterday 7:00 AM EST");
    });

    it("should return the day of the week if the date is within the last week", function () {
      expect(humanDateAndTime("2022-12-18T12:00:00.000Z")).toBe("Sunday 7:00 AM EST");
    });

    it("should return the month and day if the date is within the current year", function () {
      expect(humanDateAndTime("2022-06-19T12:00:00.000Z")).toBe("Jun 19 8:00 AM EDT");
    });

    it("should return the month, day, and year if the date is not within the current year", function () {
      expect(humanDateAndTime("2023-12-25T12:00:00.000Z")).toBe("Dec 25, 2023 7:00 AM EST");
    });

    it("should use the timezone properly around the day boundary", function () {
      // Today is 2022-12-24T05:00:00.000 to 2022-12-25T04:59:59.999
      expect(humanDateAndTime("2022-12-24T04:00:00.000Z", {timezone: "America/New_York"})).toBe(
        "Yesterday 11:00 PM EST"
      );
      expect(humanDateAndTime("2022-12-24T05:00:00.000Z", {timezone: "America/New_York"})).toBe(
        "12:00 AM EST"
      );
      expect(humanDateAndTime("2022-12-25T04:00:00.000Z", {timezone: "America/New_York"})).toBe(
        "11:00 PM EST"
      );
      expect(humanDateAndTime("2022-12-25T05:00:00.000Z", {timezone: "America/New_York"})).toBe(
        "Tomorrow 12:00 AM EST"
      );

      // Switch to Chicago
      expect(humanDateAndTime("2022-12-24T04:00:00.000Z", {timezone: "America/Chicago"})).toBe(
        "Yesterday 10:00 PM CST"
      );
      // Still yesterday in Chicago
      expect(humanDateAndTime("2022-12-24T05:00:00.000Z", {timezone: "America/Chicago"})).toBe(
        "Yesterday 11:00 PM CST"
      );
      expect(humanDateAndTime("2022-12-24T06:00:00.000Z", {timezone: "America/Chicago"})).toBe(
        "12:00 AM CST"
      );

      // 5/6am UTC is 11/12pm in Chicago
      expect(humanDateAndTime("2022-12-25T05:00:00.000Z", {timezone: "America/Chicago"})).toBe(
        "11:00 PM CST"
      );
      expect(humanDateAndTime("2022-12-25T06:00:00.000Z", {timezone: "America/Chicago"})).toBe(
        "Tomorrow 12:00 AM CST"
      );
    });

    it("should show the timezone properly around the day boundary", function () {
      // Today is 2022-12-24T05:00:00.000 to 2022-12-25T04:59:59.999
      expect(
        humanDateAndTime("2022-12-24T04:00:00.000Z", {
          showTimezone: true,
          timezone: "America/New_York",
        })
      ).toBe("Yesterday 11:00 PM EST");
      expect(
        humanDateAndTime("2022-12-24T05:00:00.000Z", {
          showTimezone: true,
          timezone: "America/New_York",
        })
      ).toBe("12:00 AM EST");
      expect(
        humanDateAndTime("2022-12-25T04:00:00.000Z", {
          showTimezone: true,
          timezone: "America/New_York",
        })
      ).toBe("11:00 PM EST");
      expect(
        humanDateAndTime("2022-12-25T05:00:00.000Z", {
          showTimezone: true,
          timezone: "America/New_York",
        })
      ).toBe("Tomorrow 12:00 AM EST");

      // Switch to Chicago
      expect(
        humanDateAndTime("2022-12-24T04:00:00.000Z", {
          showTimezone: true,
          timezone: "America/Chicago",
        })
      ).toBe("Yesterday 10:00 PM CST");
      // Still yesterday in Chicago
      expect(
        humanDateAndTime("2022-12-24T05:00:00.000Z", {
          showTimezone: true,
          timezone: "America/Chicago",
        })
      ).toBe("Yesterday 11:00 PM CST");
      expect(
        humanDateAndTime("2022-12-24T06:00:00.000Z", {
          showTimezone: true,
          timezone: "America/Chicago",
        })
      ).toBe("12:00 AM CST");

      // 5/6am UTC is 11/12pm in Chicago
      expect(
        humanDateAndTime("2022-12-25T05:00:00.000Z", {
          showTimezone: true,
          timezone: "America/Chicago",
        })
      ).toBe("11:00 PM CST");
      expect(
        humanDateAndTime("2022-12-25T06:00:00.000Z", {
          showTimezone: true,
          timezone: "America/Chicago",
        })
      ).toBe("Tomorrow 12:00 AM CST");
    });
  });

  describe("printDate", function () {
    it("should throw an error if date is undefined", function () {
      expect(printDate(undefined as any)).toBe("Invalid Date");
    });

    it("should throw an error if date is invalid", function () {
      expect(() => printDate("invalid date")).toThrow("printDate: Invalid date: invalid date");
    });

    it("should return the date in the default format", function () {
      expect(printDate("2022-12-24T12:00:00.000Z")).toBe("12/24/2022");
    });

    it("handles timezones correctly", function () {
      expect(printDate("2022-12-24T12:00:00.000Z", {})).toBe("12/24/2022");
      expect(printDate("2022-12-24T12:00:00.000Z", {timezone: "America/New_York"})).toBe(
        "12/24/2022"
      );
      expect(printDate("2022-12-24T12:00:00.000Z", {timezone: "America/Chicago"})).toBe(
        "12/24/2022"
      );
      expect(printDate("2022-12-24T12:00:00.000Z", {timezone: "America/Denver"})).toBe(
        "12/24/2022"
      );
      expect(printDate("2022-12-24T12:00:00.000Z", {timezone: "America/Los_Angeles"})).toBe(
        "12/24/2022"
      );
      expect(printDate("2022-12-24T12:00:00.000Z", {timezone: "UTC"})).toBe("12/24/2022");
    });

    it("should ignore time if ignoreTime is true", function () {
      expect(printDate("2022-12-24T12:00:00.000Z", {ignoreTime: true})).toBe("12/24/2022");
      expect(printDate("2022-12-24T00:00:00.000Z", {ignoreTime: true})).toBe("12/24/2022");
      expect(printDate("2022-12-24T23:59:59.999Z", {ignoreTime: true})).toBe("12/24/2022");
      expect(printDate("2022-12-24T23:59:59.999Z", {ignoreTime: true})).toBe("12/24/2022");
    });
  });

  describe("printOnlyDate", function () {
    it("should print invalid if no date and no default", function () {
      expect(printOnlyDate(undefined as any)).toBe("Invalid Date");
    });

    it("should print default if no date and default", function () {
      expect(printOnlyDate(undefined as any, {defaultValue: "default"})).toBe("default");
    });

    it("should print the date in the default format", function () {
      // This should be a warning but still work.
      expect(printOnlyDate("2022-12-24T23:00:00.000Z")).toBe("12/24/2022");
      // This should print 12/24 even though it's 12/23 in EST.
      expect(printOnlyDate("2022-12-24T00:00:00.000Z")).toBe("12/24/2022");
    });
  });

  describe("printDateTime", function () {
    it("should return invalid date if date is undefined", function () {
      expect(printDateAndTime(undefined as any, {timezone: "America/New_York"})).toBe(
        "Invalid Datetime"
      );
    });

    it("should throw an error if date is invalid", function () {
      expect(() => printDateAndTime("invalid date")).toThrow(
        "printDateAndTime: Invalid date: invalid date"
      );
    });

    it("should return the date in the default format", function () {
      expect(printDateAndTime("2022-12-24T12:00:00.000Z")).toBe("12/24/2022, 7:00 AM");
    });

    it("shows timezones correctly", function () {
      expect(printDateAndTime("2022-12-24T12:00:00.000Z", {showTimezone: true})).toBe(
        "12/24/2022, 7:00 AM EST"
      );
      expect(
        printDateAndTime("2022-12-24T12:00:00.000Z", {
          showTimezone: true,
          timezone: "America/New_York",
        })
      ).toBe("12/24/2022, 7:00 AM EST");
      expect(
        printDateAndTime("2022-12-24T12:00:00.000Z", {
          showTimezone: true,
          timezone: "America/Chicago",
        })
      ).toBe("12/24/2022, 6:00 AM CST");
      expect(
        printDateAndTime("2022-12-24T12:00:00.000Z", {
          showTimezone: true,
          timezone: "America/Denver",
        })
      ).toBe("12/24/2022, 5:00 AM MST");
      expect(
        printDateAndTime("2022-12-24T12:00:00.000Z", {
          showTimezone: true,
          timezone: "America/Los_Angeles",
        })
      ).toBe("12/24/2022, 4:00 AM PST");
      // UTC does a weird thing with a non breaking space between the AM/PM
      expect(
        printDateAndTime("2022-12-24T12:00:00.000Z", {showTimezone: true, timezone: "UTC"})
      ).toBe("12/24/2022, 12:00 PM UTC");
    });
  });

  describe("printTime", function () {
    it("should return invalid date if date is undefined", function () {
      expect(printTime(undefined as any, {timezone: "America/New_York"})).toBe("Invalid Date");
    });

    it("should throw an error if date is invalid", function () {
      expect(() => printTime("invalid date", {timezone: "America/New_York"})).toThrow(
        "printTime: Invalid date: invalid date"
      );
    });

    it("should throw an error with no timezone", function () {
      expect(() => printTime("2022-12-24T12:00:00.000Z", {} as any)).toThrow(
        "printTime: timezone is required"
      );
    });

    it("should return the time in the default format", function () {
      expect(printTime("2022-12-24T12:00:00.000Z", {timezone: "America/New_York"})).toBe("7:00 AM");
    });

    it("should return the time in the default format", function () {
      expect(printTime("2022-12-24T12:00:00.000Z", {timezone: "America/Chicago"})).toBe("6:00 AM");
    });
  });

  describe("printDateRange", function () {
    it("should print just dates if day is different", function () {
      // 2022-12-24T12:00:00.000Z to 2022-12-25T12:00:00.000Z
      expect(
        printDateRange("2022-12-24T12:00:00.000Z", "2022-12-25T12:00:00.000Z", {
          timezone: "America/New_York",
        })
      ).toBe("12/24/2022 7:00 AM - 12/25/2022 7:00 AM EST");
    });

    it("should print dates and time if day is same with timezone", function () {
      // 2022-12-24T12:00:00.000Z to 2022-12-24T18:00:00.000Z
      expect(
        printDateRange("2022-12-24T12:00:00.000Z", "2022-12-24T18:00:00.000Z", {
          timezone: "America/New_York",
        })
      ).toBe("12/24/2022 7:00 AM - 1:00 PM EST");
    });

    it("should hide timezone", function () {
      // 2022-12-24T12:00:00.000Z to 2022-12-24T18:00:00.000Z
      expect(
        printDateRange("2022-12-24T12:00:00.000Z", "2022-12-24T18:00:00.000Z", {
          timezone: "America/New_York",
          showTimezone: false,
        })
      ).toBe("12/24/2022 7:00 AM - 1:00 PM");
    });
  });

  describe("printSince", function () {
    it("should print the days", function () {
      // print since in days
      expect(printSince("2022-12-23T11:00:00.000Z")).toBe("1 day ago");
      expect(printSince("2022-12-22T11:10:01.000Z")).toBe("2 days ago");
      // print without ago
      expect(printSince("2022-12-22T11:10:01.000Z", {showAgo: false})).toBe("2 days");
    });

    it("should print the months", function () {
      // print between 1 and 2 months
      expect(printSince("2022-11-21T12:00:01.000Z")).toBe("32 days ago");
      // print months
      expect(printSince("2022-10-23T12:00:01.000Z")).toBe("2 months ago");
      // print without ago
      expect(printSince("2022-10-23T12:00:01.000Z", {showAgo: false})).toBe("2 months");
    });

    it("should print the years", function () {
      // print years
      expect(printSince("2021-12-23T11:00:00.000Z")).toBe("1 year ago");
      // print multiple years
      expect(printSince("2019-12-23T11:00:00.000Z")).toBe("3 years ago");
      // print without ago
      expect(printSince("2019-12-23T11:00:00.000Z", {showAgo: false})).toBe("3 years");
    });
  });
});
