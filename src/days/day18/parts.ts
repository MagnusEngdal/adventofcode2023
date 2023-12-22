import { displayGrid } from "../helpers/displayGrid";
import { Grid } from "../helpers/toGrid";
import { ParseResult } from "./parse";

type Directions = "U" | "D" | "L" | "R";
type Dig = [direction: Directions, count: number, color: string];

export const part1 = (rows: ParseResult) => {
  const path = parse(rows);

  const grid: string[][] = [];

  const pos = [0, 0];
  for (const dig of path) {
    switch (dig[0]) {
      case "R":
        for (let x = 0; x < dig[1]; x++) {
          pos[0]++;
          if (!grid[pos[0]]) grid[pos[0]] = [];
          if (!grid[pos[0] + 1]) grid[pos[0] + 1] = [];
          grid[pos[0]][pos[1]] = "#";

          if (!grid[pos[0]][pos[1] + 1] || grid[pos[0]][pos[1] + 1] === ".") {
            grid[pos[0]][pos[1] + 1] = "I";
          }
        }
        break;
      case "L":
        for (let x = 0; x < dig[1]; x++) {
          pos[0]--;
          if (!grid[pos[0]]) grid[pos[0]] = [];
          grid[pos[0]][pos[1]] = "#";

          if (!grid[pos[0]][pos[1] - 1] || grid[pos[0]][pos[1] - 1] === ".") {
            grid[pos[0]][pos[1] - 1] = "I";
          }
        }
        break;
      case "U":
        for (let x = 0; x < dig[1]; x++) {
          pos[1]--;
          grid[pos[0]][pos[1]] = "#";

          if (!grid[pos[0] + 1]) grid[pos[0] + 1] = [];
          if (!grid[pos[0] + 1][pos[1]] || grid[pos[0] + 1][pos[1]] === ".") {
            grid[pos[0] + 1][pos[1]] = "I";
          }
        }
        break;
      case "D":
        for (let x = 0; x < dig[1]; x++) {
          pos[1]++;
          grid[pos[0]][pos[1]] = "#";

          if (!grid[pos[0] - 1]) grid[pos[0] - 1] = [];
          if (!grid[pos[0] - 1][pos[1]] || grid[pos[0] - 1][pos[1]] === ".") {
            grid[pos[0] - 1][pos[1]] = "I";
          }
        }
        break;
    }
  }

  const [minX, maxX, minY, maxY] = Object.keys(grid).reduce<
    [number, number, number, number]
  >(
    (acc, curr) => {
      const n = parseInt(curr);
      if (n > acc[1]) acc[1] = n;
      if (n < acc[0]) acc[0] = n;

      const [minY, maxY] = Object.keys(grid[n]).reduce<[number, number]>(
        (acc, curr) => {
          const n = parseInt(curr);
          if (n < acc[0]) acc[0] = n;
          if (n > acc[1]) acc[1] = n;

          return acc;
        },
        [Number.MAX_VALUE, 0]
      );

      if (minY < acc[2]) acc[2] = minY;
      if (maxY > acc[3]) acc[3] = maxY;

      return acc;
    },
    [Number.MAX_VALUE, 0, Number.MAX_VALUE, 0]
  );

  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      if (!grid[x][y] || (grid[x][y] !== "#" && grid[x][y] !== "I")) {
        grid[x][y] = ".";
      }
    }
  }

  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      if (grid[x][y] === "I") {
        forAllNeighbors(x, y, grid, (t) => {
          if (t === ".") {
            return "I";
          }
        });
      }
    }
  }

  let total = 0;
  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      if (grid[x][y] === "I" || grid[x][y] === "#") {
        total++;
      }
    }
  }

  return total;
};

export const part2 = (rows: ParseResult) => {
  const pathO = parse(rows);
  const path: Dig[] = [];
  for (const dig of pathO) {
    path.push(parseHex(dig[2]));
  }

  const grid: string[][] = [];

  const pos = [0, 0];
  for (const dig of path) {
    switch (dig[0]) {
      case "R":
        for (let x = 0; x < dig[1]; x++) {
          pos[0]++;
          if (!grid[pos[0]]) grid[pos[0]] = [];
          if (!grid[pos[0] + 1]) grid[pos[0] + 1] = [];
          grid[pos[0]][pos[1]] = "#";

          if (!grid[pos[0]][pos[1] + 1] || grid[pos[0]][pos[1] + 1] === ".") {
            grid[pos[0]][pos[1] + 1] = "I";
          }
        }
        break;
      case "L":
        for (let x = 0; x < dig[1]; x++) {
          pos[0]--;
          if (!grid[pos[0]]) grid[pos[0]] = [];
          grid[pos[0]][pos[1]] = "#";

          if (!grid[pos[0]][pos[1] - 1] || grid[pos[0]][pos[1] - 1] === ".") {
            grid[pos[0]][pos[1] - 1] = "I";
          }
        }
        break;
      case "U":
        for (let x = 0; x < dig[1]; x++) {
          pos[1]--;
          grid[pos[0]][pos[1]] = "#";

          if (!grid[pos[0] + 1]) grid[pos[0] + 1] = [];
          if (!grid[pos[0] + 1][pos[1]] || grid[pos[0] + 1][pos[1]] === ".") {
            grid[pos[0] + 1][pos[1]] = "I";
          }
        }
        break;
      case "D":
        for (let x = 0; x < dig[1]; x++) {
          pos[1]++;
          grid[pos[0]][pos[1]] = "#";

          if (!grid[pos[0] - 1]) grid[pos[0] - 1] = [];
          if (!grid[pos[0] - 1][pos[1]] || grid[pos[0] - 1][pos[1]] === ".") {
            grid[pos[0] - 1][pos[1]] = "I";
          }
        }
        break;
    }
  }

  const [minX, maxX, minY, maxY] = Object.keys(grid).reduce<
    [number, number, number, number]
  >(
    (acc, curr) => {
      const n = parseInt(curr);
      if (n > acc[1]) acc[1] = n;
      if (n < acc[0]) acc[0] = n;

      const [minY, maxY] = Object.keys(grid[n]).reduce<[number, number]>(
        (acc, curr) => {
          const n = parseInt(curr);
          if (n < acc[0]) acc[0] = n;
          if (n > acc[1]) acc[1] = n;

          return acc;
        },
        [Number.MAX_VALUE, 0]
      );

      if (minY < acc[2]) acc[2] = minY;
      if (maxY > acc[3]) acc[3] = maxY;

      return acc;
    },
    [Number.MAX_VALUE, 0, Number.MAX_VALUE, 0]
  );

  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      if (!grid[x][y] || (grid[x][y] !== "#" && grid[x][y] !== "I")) {
        grid[x][y] = ".";
      }
    }
  }

  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      if (grid[x][y] === "I") {
        forAllNeighbors(x, y, grid, (t) => {
          if (t === ".") {
            return "I";
          }
        });
      }
    }
  }

  let total = 0;
  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      if (grid[x][y] === "I" || grid[x][y] === "#") {
        total++;
      }
    }
  }

  return total;

  return 0;
};

const parseHex = (hex: string): Dig => {
  const nr = parseInt(hex.substring(6, 7), 16);
  const count = parseInt(hex.substring(1, 6), 16);
  let dir: Directions = "U";
  switch (nr) {
    case 0:
      dir = "R";
      break;
    case 1:
      dir = "D";
      break;
    case 2:
      dir = "L";
      break;
    case 3:
      dir = "U";
      break;
  }
  return [dir, count, hex];
};

const forAllNeighbors = (
  x: number,
  y: number,
  grid: Grid,
  cb: (t: string) => string | void
) => {
  for (let yi = y - 1; yi <= y + 1; yi++) {
    for (let xi = x - 1; xi <= x + 1; xi++) {
      if (yi !== y && xi !== x) {
        if (grid[xi] && grid[xi][yi]) {
          const res = cb(grid[xi][yi]);
          grid[xi][yi] = res ?? grid[xi][yi];
        }
      }
    }
  }
};

function parse(rows: string[]) {
  const path: Dig[] = [];

  for (const row of rows) {
    const s = row.split(" ");
    const dig: Dig = [
      s[0] as Directions,
      parseInt(s[1]),
      s[2].replace("(", "").replace(")", ""),
    ];
    path.push(dig);
  }

  return path;
}
