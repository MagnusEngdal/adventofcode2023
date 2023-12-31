import { day as day1 } from "./day1";
import { day as day2 } from "./day2";
import { day as day3 } from "./day3";
import { day as day4 } from "./day4";
import { day as day5 } from "./day5";
import { day as day6 } from "./day6";
import { day as day7 } from "./day7";
import { day as day8 } from "./day8";
import { day as day9 } from "./day9";
import { day as day10 } from "./day10";
import { day as day11 } from "./day11";
import { day as day12 } from "./day12";
import { day as day13 } from "./day13";
import { day as day14 } from "./day14";
import { day as day15 } from "./day15";
import { day as day16 } from "./day16";
import { day as day17 } from "./day17";
import { day as day18 } from "./day18";
import { day as day19 } from "./day19";
import { day as day20 } from "./day20";
import { day as day21 } from "./day21";
import { read } from "./readfile";

export interface day {
  [key: string]: (rows: string[]) => any;
}

const dayList: Record<string, day> = {
  day1,
  day2,
  day3,
  day4,
  day5,
  day6,
  day7,
  day8,
  day9,
  day10,
  day11,
  day12,
  day13,
  day14,
  day15,
  day16,
  day17,
  day18,
  day19,
  day20,
  day21,
};

export const days = async (
  dayNumber: number,
  part: number,
  isSample: boolean
): Promise<number | undefined> => {
  if (dayList[`day${dayNumber}`]) {
    let rows: string[] | undefined;

    if (isSample) {
      if (part === 1) {
        rows = await read(dayNumber, "p1sample");
      } else if (part === 2) {
        rows = await read(dayNumber, "p2sample");
        if (rows.length === 0 || (rows.length === 1 && rows[0] === "")) {
          rows = await read(dayNumber, "p1sample");
        }
      }
    } else {
      rows = await read(dayNumber, "input");
    }

    if (rows) {
      if (rows.length === 0 || (rows.length > 0 && rows[0].length === 0)) {
        console.log("WARNING: Missing input data");
      }

      const day = dayList[`day${dayNumber}`];
      return day[`part${part}`]((day.parse as (rows: string[]) => any)(rows));
    }

    return;
  }
};
