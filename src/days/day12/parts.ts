import { ParseResult } from "./parse";
import { splitNumbers } from "../helpers/splitNumbers";

export const part1 = (rows: ParseResult) => {
  const springs = parse(rows);

  let total = 0;
  for (const s of springs) {
    let test = testSize(s.sizes, 0, s.row);
    total += test;
  }

  return total;
};

export const part2 = (rows: ParseResult) => {
  const springs = parse(rows);

  let total = 0;
  let count = 0;
  for (const s of springs) {
    count++;
    console.log(`${count} / ${springs.length}`);
    let row: string[] = [];
    let sizes: number[] = [];
    for (let i = 0; i < 5; i++) {
      row.push(s.row);
      sizes = [...sizes, ...s.sizes];
    }
    s.row = row.join("?");
    s.sizes = sizes;

    let test = testSize(s.sizes, 0, s.row);
    total += test;
  }

  return total;
};

const testSize = (sizes: number[], i: number, row: string): number => {
  const size = sizes[i];
  if (!size) {
    if (row.includes("#")) return 0;
    return 1;
  }
  const options = findOptions(size, row);

  if (options.length > 0) {
    let total = 0;
    for (const o of options) {
      const newRow = place(o, size, row);
      if (invalidPlacement(newRow)) break;
      total += testSize(sizes, i + 1, newRow);
    }
    return total;
  } else {
    return 0;
  }
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
  if (typeof size === "undefined") throw Error();

  let hashes = 0;

  for (let x = 0; x < rowArr.length; x++) {
    const curr = rowArr[x];
    const prev = rowArr[x - 1];
    const after = rowArr[x + size];

    if (hashes > 1) break;

    if (curr === "#") hashes++;

    if (
      (curr === "?" || curr === "#") &&
      (!prev || prev === "." || prev === "?" || prev === "o") &&
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
