import { splitNumbers } from "../helpers/splitNumbers";
import { ParseResult } from "./parse";

interface Field {
  nr: number[];
  row: string;
}

export const part1 = (rows: ParseResult) => {
  const fields: Field[] = [];
  for (const row of rows) {
    fields.push({
      nr: splitNumbers(row.split(" ")[1], ","),
      row: row.split(" ")[0],
    });
  }

  const f = fields[0];
  console.log(recur(f.nr, f.row));

  return 0;
};

const recur = (sizes: number[], row: string): string[] | undefined => {
  const working: string[] = [];
  console.log("---", sizes, row, sizes);
  for (let i = 0; i < sizes.length; i++) {
    const sz = [...sizes];
    sz.splice(i);

    const size = sizes[i];
    console.log("Testing: ", size, row, sizes, i);
    const options = findOptions(size, row);
    console.log(`Options to place ${size}: `, options);
    if (options.length === 1 && sz.length === 1) {
      console.log(`Ony one option for ${size}, returning "true"`);
      return [replaceAt(row, options[0], size)];
    } else if (options.length < 1 && sz.length > 0) {
      console.log(`No possible plaements for ${size}, returning "false"`);
      return undefined;
    } else {
      console.log(`Multiple options for ${size}. Testing...`);

      for (const o of options) {
        const modRow = replaceAt(row, o, size);
        console.log(`Testing option ${o} for size: ${size} with row ${modRow}`);

        const workingRow = recur(sz, modRow);
        if (workingRow) {
          for (const r of workingRow) {
            if (!working.includes(r)) {
              console.log("Pushing", r);
              working.push(r);
            }
          }
        }
      }
      console.log(`Working options for ${size}:`, working);
    }
  }
  return working;
};

const replaceAt = (row: string, index: number, length: number): string => {
  let newRow = row.split("");
  for (let i = index; i < index + length; i++) {
    newRow[i] = "o";
  }
  if (newRow[index + length] && newRow[index + length] === "?") {
    newRow[index + length] = ".";
  }
  if (newRow[index - 1] && newRow[index - 1] === "?") {
    newRow[index - 1] = ".";
  }
  return newRow.join("");
};

const findOptions = (size: number, row: string): number[] => {
  const options: number[] = [];
  for (let i = 0; i < row.length; i++) {
    const prev = row[i - 1] ?? undefined;
    const curr = row[i];
    const after = row[i + size];
    if (
      (curr === "?" || curr === "#") &&
      (!after || after === "." || after === "?")
    ) {
      if (!prev || prev === "." || prev === "?") {
        let fits = true;
        for (let c = 0; c < size; c++) {
          if (!row[i + c] || row[i + c] === ".") {
            fits = false;
            break;
          }
        }
        if (fits) {
          options.push(i);
        }
      }
    }
  }
  return options;
};

export const part2 = (rows: ParseResult) => {
  return 0;
};
