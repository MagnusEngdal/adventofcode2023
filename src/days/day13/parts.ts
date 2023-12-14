import { ParseResult } from "./parse";
import { flipColsRows } from "../helpers/flipColsRows";

interface Pattern {
  rows: string[];
}

export const part1 = (rows: ParseResult) => {
  return testMirrors(parse(rows));
};

export const part2 = (rows: ParseResult) => {
  return testMirrors(parse(rows), true);
};

const parse = (rows: string[]): Pattern[] => {
  const patterns: Pattern[] = [];
  let last: Pattern = {
    rows: [],
  };
  patterns.push(last);

  for (const row of rows) {
    if (patterns.length === 0 || row.length < 2) {
      last = {
        rows: [],
      };
      patterns.push(last);
    }
    if (row.length > 1) {
      last.rows.push(row.replace("\r", ""));
    }
  }

  return patterns;
};

const testMirrors = (patterns: Pattern[], smudge: boolean = false): number => {
  let res = 0;
  let smudgeRes = 0;

  for (const p of patterns) {
    let found = false;

    const [total, split] = flipSplit(p.rows);
    res += total;

    if (smudge) {
      for (let y = 0; y < p.rows.length; y++) {
        for (let x = 0; x < p.rows[0].length; x++) {
          const smudged = smdg(x, y, p.rows);
          const [t, s] = flipSplit(smudged, split);
          if (s && s !== split) {
            found = true;
            smudgeRes += t;
            break;
          }
        }
        if (found) break;
      }
      if (!found) {
        console.log("NOT FOUND", p, split);
      }
    }
  }

  return smudge ? smudgeRes : res;
};

const flipSplit = (rows: string[], ignore?: string): [number, string] => {
  let total = 0;
  let split = "";
  const ignoreH =
    ignore && ignore.includes("h-")
      ? parseInt(ignore.split("-")[1])
      : undefined;
  const ignoreV =
    ignore && ignore.includes("v-")
      ? parseInt(ignore.split("-")[1])
      : undefined;

  const h = findSplit(rows, ignoreH);

  if (h) {
    total += h * 100;
    split = `h-${h}`;
  } else {
    const flipped = flipColsRows(rows);
    const v = findSplit(flipped, ignoreV);
    if (v) {
      total += v;
      split = `v-${v}`;
    }
  }
  return [total, split];
};

const smdg = (smudgeX: number, smudgeY: number, rows: string[]) => {
  const newRows: string[] = [];
  for (let y = 0; y < rows.length; y++) {
    let row = "";
    for (let x = 0; x < rows[0].length; x++) {
      if (smudgeX === x && smudgeY === y) {
        switch (rows[y][x]) {
          case ".":
            row += "#";
            break;
          case "#":
            row += ".";
            break;
        }
      } else {
        row += rows[y][x];
      }
    }
    newRows.push(row);
  }
  return newRows;
};

const findSplit = (rows: string[], ignore?: number) => {
  let sp: number | undefined;

  for (let i = 0; i < rows.length; i++) {
    if (i + 1 === ignore) continue;

    const row = rows[i];
    const next = rows[i + 1];
    if (next && row === next) {
      let mirror = true;
      for (let r = 1; r < i + 1; r++) {
        const c1 = rows[i - r];
        const c2 = rows[i + r + 1];

        if (!c1 || !c2) {
          break;
        }
        if (c1 !== c2) {
          mirror = false;
        }
      }
      if (mirror === true) {
        sp = i + 1;
        break;
      }
    }
  }

  return sp;
};
