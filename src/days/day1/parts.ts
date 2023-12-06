import { ParseResult } from "./parse";

/*
 * PART 1
 * Sample: 142
 * Answer:  54940
 */

export const part1 = (rows: ParseResult) => {
  let result = 0;

  for (const row of rows) {
    const matches = [...row.matchAll(new RegExp("[0-9]", "g"))];
    const first = matches[0][0];
    const last = matches[matches.length - 1][0];
    result += Number(`${first}${last}`);
  }

  return result;
};

/*
 * PART 2
 * Sample: 281
 * Answer:  54208
 */

export const part2 = (rows: ParseResult) => {
  let result = 0;

  for (const row of rows) {
    const matches = [
      ...row.matchAll(
        new RegExp(`(?=([0-9]|${Object.keys(numberMap).join("|")}))`, "g")
      ),
    ];
    const min = matches.reduce((prev, curr) =>
      (prev.index ?? 0) < (curr.index ?? 0) ? prev : curr
    )[1];
    const max = matches.reduce((prev, curr) =>
      (prev.index ?? 0) > (curr.index ?? 0) ? prev : curr
    )[1];

    const first = isNaN(Number(min)) ? numberMap[min] : Number(min);
    const last = isNaN(Number(max)) ? numberMap[max] : Number(max);

    result += Number(`${first}${last}`);
  }

  return result;
};

const numberMap: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};
