import { Grid, toGrid } from "../helpers/toGrid";
import { displayGrid } from "../helpers/displayGrid";
import { ParseResult } from "./parse";

type Dirs = "n" | "s" | "e" | "w";
type Beam = [number, number, Dirs];

export const part1 = (rows: ParseResult) => {
  const grid = toGrid(rows);

  return getTotal(-1, 0, "e", grid);
};

export const part2 = (rows: ParseResult) => {
  const grid = toGrid(rows);
  let max = 0;

  for (let x = 0; x < rows[0].length; x++) {
    let top = getTotal(x, -1, "s", grid);
    let bottom = getTotal(x, rows.length, "n", grid);
    let colMax = Math.max(top, bottom);
    if (colMax > max) max = colMax;
    console.log(`Done with x: ${x} / ${rows[0].length}, max ${max}`);
  }

  for (let y = 0; y < rows[0].length; y++) {
    let left = getTotal(-1, y, "e", grid);
    let right = getTotal(rows[0].length, y, "w", grid);
    let rowMax = Math.max(left, right);
    if (rowMax > max) max = rowMax;
    console.log(`Done with x: ${y} / ${rows.length}, max ${max}`);
  }

  return max;
};

const getTotal = (
  startX: number,
  startY: number,
  startDir: Dirs,
  grid: Grid
): number => {
  let beams: Beam[] = [[startX, startY, startDir]];
  const eGrid: string[][] = [];

  for (let x = 0; x < grid[0].length; x++) {
    eGrid[x] = [];
    for (let y = 0; y < grid.length; y++) {
      eGrid[x][y] = ".";
    }
  }

  for (let i = 0; i < 2000; i++) {
    let newBeams: Beam[] = [];
    for (let bi = 0; bi < beams.length; bi++) {
      let [x, y, dir] = beams[bi];

      switch (dir) {
        case "e":
          if (!grid[x + 1]) continue;
          switch (grid[x + 1][y]) {
            case ".":
            case "-":
              beams[bi] = [x + 1, y, dir];
              break;
            case "|":
              beams[bi] = [x + 1, y, "n"];
              newBeams.push([x + 1, y, "s"]);
              break;
            case "\\":
              beams[bi] = [x + 1, y, "s"];
              break;
            case "/":
              beams[bi] = [x + 1, y, "n"];
              break;
          }
          break;
        case "n":
          switch (grid[x][y - 1]) {
            case ".":
            case "|":
              beams[bi] = [x, y - 1, dir];
              break;
            case "-":
              beams[bi] = [x, y - 1, "e"];
              newBeams.push([x, y - 1, "w"]);
              break;
            case "\\":
              beams[bi] = [x, y - 1, "w"];
              break;
            case "/":
              beams[bi] = [x, y - 1, "e"];
              break;
          }
          break;
        case "w":
          if (!grid[x - 1]) continue;
          switch (grid[x - 1][y]) {
            case ".":
            case "-":
              beams[bi] = [x - 1, y, dir];
              break;
            case "|":
              beams[bi] = [x - 1, y, "n"];
              newBeams.push([x - 1, y, "s"]);
              break;
            case "\\":
              beams[bi] = [x - 1, y, "n"];
              break;
            case "/":
              beams[bi] = [x - 1, y, "s"];
              break;
          }
          break;
        case "s":
          switch (grid[x][y + 1]) {
            case ".":
            case "|":
              beams[bi] = [x, y + 1, dir];
              break;
            case "-":
              beams[bi] = [x, y + 1, "e"];
              newBeams.push([x, y + 1, "w"]);
              break;
            case "\\":
              beams[bi] = [x, y + 1, "e"];
              break;
            case "/":
              beams[bi] = [x, y + 1, "w"];
              break;
          }
          break;
      }
    }
    beams.push(...newBeams);
    const beamMap: Record<string, boolean> = {};
    const reBeams: Beam[] = [];
    for (const beam of beams) {
      const label = `${beam[0]}-${beam[1]}-${beam[2]}`;
      if (!beamMap[label]) {
        beamMap[`${beam[0]}-${beam[1]}-${beam[2]}`] = true;
        reBeams.push(beam);
        eGrid[beam[0]][beam[1]] = "#";
      }
    }
    beams = reBeams;
  }

  let total = 0;
  for (let col of eGrid) {
    for (let tile of col) {
      if (tile === "#") total++;
    }
  }

  return total;
};
