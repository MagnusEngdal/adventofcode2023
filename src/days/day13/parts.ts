import { ParseResult } from "./parse";
import { flipColsRows } from "../helpers/flipColsRows";

interface Pattern {
  rows: string[]
}

export const part1 = (rows: ParseResult) => {
  return testMirrors(parse(rows));
};

export const part2 = (rows: ParseResult) => {
  const patterns = parse(rows);
  const [_, f] = testMirrors(patterns);

  let total = 0;
  for (const p of patterns) {
    let found = false;
    for (let y = 0; y < p.rows.length; y++) {
      for (let x = 0; x < p.rows[0].length; x++) {
        const sRows = p.rows.map(r => r);
        const row = sRows[y].split('');
        if (row[x] === '.') {
          row[x] = '#';
        } else {
          row[x] = '.';
        }
        sRows[y] = row.join('');

        const h = findSplit(sRows, y);
        if (h && f !== `h-${h}`) {
          total += h * 100;
          found = true;
          console.log('Found h', h, sRows);
        } else {
          const rows = flipColsRows(sRows);
          const v = findSplit(rows, y);
          if (v && f !== `v-${v}`) {
            total += v;
            found = true;
            console.log('Found v', v, sRows);
          }
        }
        if (found) break;
      }
      if (found) break;
    }
  }

  return total;
};

const parse = (rows: string[]): Pattern[] => {
  const patterns: Pattern[] = [];
  let last: Pattern = {
    rows: []
  };
  patterns.push(last);

  for (const row of rows) {
    if (patterns.length === 0 || row.length === 1) {
      last = {
        rows: []
      };
      patterns.push(last);
    }
    if (row.length > 1) {
      last.rows.push(row.replace('\r', ''));
    }
  }

  return patterns;
}

const testMirrors = (patterns: Pattern[]): [number, string] => {
  let f = '';
  let total = 0;
  for (const p of patterns) {
    const h = findSplit(p.rows);
    if (h) {
      f = `h-${h}`;
      total += h * 100;
    } else {
      const rows = flipColsRows(p.rows);
      const v = findSplit(rows);
      if (v) {
        f = `v-${v}`;
        total += v;
      }
    }
  }
  return [total, f];
}

const findSplit = (rows: string[], smudgeOnRow?: number) => {
  let sp: number | undefined;
  let touched = false;
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const next = rows[i + 1];
    if (next && row === next) {
      let mirror = true;
      for (let r = 1; r < i + 1; r++) {
        const c1 = rows[i - r];
        const c2 = rows[i + r + 1];

        if (!c1 || !c2) {
          break;
        };
        if (c1 !== c2) {
          mirror = false;
        }
        if (i - r === smudgeOnRow || i + r + 1 === smudgeOnRow) {
          touched = true;
        }
      }
      if (mirror === true) {
        sp = i + 1;
        break;
      }
    }
  }

  console.log(smudgeOnRow, rows);
  if (typeof smudgeOnRow !== 'undefined' && touched === false) return undefined;

  return sp;
}