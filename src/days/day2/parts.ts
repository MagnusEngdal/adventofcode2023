import { colParser } from "../helpers/colParser";
import { eachRow } from "../helpers/eachRow";
import { ParseResult } from "./parse";

/*
 * PART 1
 * Sample: 8
 * Answer: 2061
 */

export const part1 = (rows: ParseResult) => {
  let result = 0;

  eachRow(colParser(rows), ({ id, row }) => {
    const sets = row.split(";");

    const max: Record<string, number> = {
      red: 0,
      blue: 0,
      green: 0,
    };

    for (const set of sets) {
      const cubes = set
        .split(",")
        .reduce<Record<string, number>>((acc, color) => {
          const s = color.trim().split(" ");
          if (!acc[s[1]] || acc[s[1]] < Number(s[0])) {
            acc[s[1]] = Number(s[0]);
          }
          return acc;
        }, {});

      if (cubes.red > max.red) {
        max.red = cubes.red;
      }
      if (cubes.green > max.green) {
        max.green = cubes.green;
      }
      if (cubes.blue > max.blue) {
        max.blue = cubes.blue;
      }
    }

    if (max.red <= 12 && max.green <= 13 && max.blue <= 14) {
      result += id;
    }
  });

  return result;
};

/*
 * PART 2
 * Sample: 2286
 * Answer: 72596
 */

export const part2 = (rows: ParseResult) => {
  let result = 0;

  eachRow(colParser(rows), ({ id, row }) => {
    const sets = row.split(";");

    const max: Record<string, number> = {
      red: 0,
      blue: 0,
      green: 0,
    };

    for (const set of sets) {
      const cubes = set
        .split(",")
        .reduce<Record<string, number>>((acc, color) => {
          const s = color.trim().split(" ");
          if (!acc[s[1]] || acc[s[1]] < Number(s[0])) {
            acc[s[1]] = Number(s[0]);
          }
          return acc;
        }, {});

      if (cubes.red > max.red) {
        max.red = cubes.red;
      }
      if (cubes.green > max.green) {
        max.green = cubes.green;
      }
      if (cubes.blue > max.blue) {
        max.blue = cubes.blue;
      }
    }

    result += max.red * max.green * max.blue;
  });

  return result;
};
