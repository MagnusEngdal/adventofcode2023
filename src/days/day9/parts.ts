import { splitNumbers } from "../helpers/splitNumbers";
import { ParseResult } from "./parse";

export const part1 = (rows: ParseResult) => {
  const toSum: number[] = [];

  for (const row of rows) {
    let nums = splitNumbers(row);

    const lastNum = nums.at(-1)!;
    let d = 0;

    while (!nums.every((num) => num === 0)) {
      const arrayOfDiff: number[] = [];
      for (let i = 1; i < nums.length; i++) {
        arrayOfDiff.push(nums[i] - nums[i - 1]);
      }
      d += arrayOfDiff.at(-1)!;
      nums = arrayOfDiff;
    }
    toSum.push(lastNum + d);
  }

  return toSum.reduce((acc, cur) => acc + cur, 0);
};

export const part2 = (rows: ParseResult) => {
  const toSum: number[] = [];

  for (const row of rows) {
    let nums = splitNumbers(row);
    const firstNum = nums.at(0)!;
    const ds: number[] = [];

    while (!nums.every((num) => num === 0)) {
      const arrayOfDiff: number[] = [];
      for (let i = 1; i < nums.length; i++) {
        arrayOfDiff.push(nums[i] - nums[i - 1]);
      }
      ds.unshift(arrayOfDiff.at(0)!);
      nums = arrayOfDiff;
    }

    let finalDiff = ds[0];
    for (let i = 0; i < ds.length - 1; i++) {
      finalDiff = ds[i + 1] - finalDiff;
    }
    toSum.push(firstNum - finalDiff);
  }
  return toSum.reduce((acc, cur) => acc + cur, 0);
};
