// Import necessary modules
import { format, startOfWeek, addDays, getWeek, parse } from "date-fns";

export class WeekInfo {
  /**
   * Returns the week number for a given date.
   * @param date - The date to calculate the week number.
   * @returns The ISO week number.
   */
  static getWeekNumber(date: string): number {
    const parsedDate = parse(date, "yyyy-MM-dd", new Date());
    return getWeek(parsedDate, { weekStartsOn: 1 });
  }

  /**
   * Returns the days of a given week in a specified year.
   * @param weekNumber - The week number.
   * @param year - The year.
   * @returns An array of objects representing the days of the week.
   */
  static getWeekDays(
    weekNumber: number,
    year: number,
  ): { name: string; date: string }[] {
    const firstDayOfYear = new Date(year, 0, 1);
    const firstWeekStart = startOfWeek(firstDayOfYear, { weekStartsOn: 1 });
    const targetDate = addDays(firstWeekStart, (weekNumber - 1) * 7);

    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const day = addDays(targetDate, i);
      return {
        name: format(day, "EEEE"),
        date: format(day, "yyyy-MM-dd"),
      };
    });

    return weekDays;
  }

  /**
   * Returns all weeks and their corresponding days for a given year.
   * @param year - The year to calculate weeks and days.
   * @returns An array of objects, each representing a week with its days.
   */
  static getAllWeeks(
    year: number,
  ): { weekNumber: number; days: { name: string; date: string }[] }[] {
    const firstDayOfYear = new Date(year, 0, 1);
    const lastDayOfYear = new Date(year, 11, 31);

    const allWeeks = [];
    let currentWeekStart = startOfWeek(firstDayOfYear, { weekStartsOn: 1 });
    let weekNumber = 1;

    while (currentWeekStart <= lastDayOfYear) {
      const weekDays = Array.from({ length: 7 }, (_, i) => {
        const day = addDays(currentWeekStart, i);
        return {
          name: format(day, "EEEE"),
          date: format(day, "yyyy-MM-dd"),
        };
      });

      allWeeks.push({ weekNumber, days: weekDays });
      currentWeekStart = addDays(currentWeekStart, 7);
      weekNumber++;
    }

    return allWeeks;
  }
}

// Example usage:
// const weekNumber = WeekInfo.getWeekNumber("2024-12-26");
// console.log("Week Number:", weekNumber);
//
// const weekDays = WeekInfo.getWeekDays(weekNumber, 2024);
// console.log("Week Days:", weekDays);

/*
Output Example:
Week Number: 52
Week Days: [
  { name: 'Monday', date: '2024-12-23' },
  { name: 'Tuesday', date: '2024-12-24' },
  { name: 'Wednesday', date: '2024-12-25' },
  { name: 'Thursday', date: '2024-12-26' },
  { name: 'Friday', date: '2024-12-27' },
  { name: 'Saturday', date: '2024-12-28' },
  { name: 'Sunday', date: '2024-12-29' },
]
*/
