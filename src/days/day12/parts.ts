import { ParseResult } from "./parse";
import { splitNumbers } from "../helpers/splitNumbers";

export const part1 = (rows: ParseResult) => {
  const springs = parse(rows);

  let total = 0;
  for (const s of springs) {
    total += testSize(s.sizes, 0, s.row);
  }

  return total;
};

const testSize = (sizes: number[], i: number, row: string): number => {
  if (!sizes[i]) return 1;

  const size = sizes[i];
  const options = findOptions(size, row);

  if (options.length > 0) {
    if (options.length === 1 && i === sizes.length - 1) {
      if (invalidPlacement(row)) return 0;
      return 1;
    } else {
      let total = 0;
      for (const o of options) {
        const newRow = place(o, size, row);
        if (invalidPlacement(row)) return 0;
        total += testSize(sizes, i + 1, newRow);
      }
      return total;
    }
  } else if (options.length === 1) {
    return 1;
  } else {
    return 0;
  }
};

export const part2 = (rows: ParseResult) => {
  return 0;
};

const invalidPlacement = (row: string): boolean => {
  let brackets = 0;
  for (let i = 0; i < row.length; i++) {
    if (row[i] === "#") brackets++;
    if (row[i] === "o" && brackets > 0) {
      return true;
    }
  }
  return false;
};

const place = (i: number, size: number, row: string) => {
  const rowArr = row.split("");
  for (let i2 = 0; i2 < i; i2++) {
    if (rowArr[i2] === "?") {
      rowArr[i2] = ".";
    }
  }
  for (let i3 = i; i3 < i + size; i3++) {
    rowArr[i3] = "o";
  }
  if (rowArr[i + size]) {
    rowArr[i + size] = ".";
  }

  return rowArr.join("");
};

const findOptions = (size: number, row: string): number[] => {
  const rowArr = row.split("");
  const options: number[] = [];

  for (let x = 0; x < rowArr.length; x++) {
    const curr = rowArr[x];
    const prev = rowArr[x - 1];
    const after = rowArr[x + size];

    if (
      (curr === "?" || curr === "#") &&
      (!prev || prev === "." || prev === "?") &&
      (!after || after === "." || after === "?")
    ) {
      let valid = true;
      for (let s = 1; s < size; s++) {
        const c = rowArr[x + s];
        if (c !== "?" && c !== "#") {
          valid = false;
          break;
        }
      }
      if (valid) options.push(x);
    }
  }
  return options;
};

interface Spring {
  row: string;
  sizes: number[];
}

const parse = (rows: string[]) => {
  const springs: Spring[] = [];

  for (const r of rows) {
    const s = r.split(" ");
    const sizes = splitNumbers(s[1], ",");
    springs.push({
      row: s[0],
      sizes,
    });
  }

  return springs;
};
