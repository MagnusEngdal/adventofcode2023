import { Grid, toGrid } from "../helpers/toGrid";
import { ParseResult } from "./parse";

export const part1 = (rows: ParseResult) => {
  const grid = toGrid(rows);

  let shifts = Number.MAX_VALUE;
  while (shifts > 0) {
    [, shifts] = tilt(grid, "N");
  }

  return load(grid);
};

export const part2 = (rows: ParseResult) => {
  const grid = toGrid(rows);

  const rec: Record<string, number> = {};
  let total = 1000000000;

  for (var c = 1; c < total; c++) {
    const b = cycle(grid);
    if (rec[b]) {
      const len = c - rec[b];
      const rem = (total - rec[b]) % len;
      for (var i = 0; i < rem; i++) {
        cycle(grid);
      }
      break;
    }
    rec[b] = c;
  }

  return load(grid);
};

const cycle = (grid: Grid): string => {
  let str = "";
  for (const dir of ["N", "W", "S", "E"] as const) {
    let shifts = Number.MAX_VALUE;
    while (shifts > 0) {
      [str, shifts] = tilt(grid, dir);
    }
  }
  return str;
};

const load = (grid: Grid) => {
  let total = 0;

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      const loadY = grid[x].length - y;
      if (grid[x][y] === "O") {
        total += loadY;
      }
    }
  }

  return total;
};

const tilt = (grid: Grid, dir: "N" | "S" | "E" | "W"): [string, number] => {
  let str = "";
  const xV = dir === "W" ? -1 : dir === "E" ? 1 : 0;
  const yV = dir === "N" ? -1 : dir === "S" ? 1 : 0;
  let shifts = 0;

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      const tile = grid[x][y];
      str += tile;
      if (tile === "O") {
        const next =
          grid[x + xV] && grid[x + xV][y + yV]
            ? grid[x + xV][y + yV]
            : undefined;
        if (next && next === ".") {
          grid[x][y] = ".";
          grid[x + xV][y + yV] = "O";
          shifts++;
        }
      }
    }
  }

  return [str, shifts];
};
