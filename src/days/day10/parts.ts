import { ParseResult } from "./parse";

export const part1 = (rows: ParseResult) => {
  let start: [number, number] = [0, 0];

  for (let y = 0; y < rows.length; y++) {
    let x = rows[y].indexOf("S");
    if (x > -1) {
      start = [x, y];
    }
  }

  let curr: Sym = { sX: 18, sY: 74, x: 18, y: 73, s: "7" };
  let steps = 0;

  while (curr.s !== "S") {
    steps++;
    const n: Partial<Sym> = { sX: curr.x, sY: curr.y };
    switch (curr.s) {
      case "|":
        if (curr.sY < curr.y) {
          n.x = curr.x;
          n.y = curr.y + 1;
        } else if (curr.sY > curr.y) {
          n.x = curr.x;
          n.y = curr.y - 1;
        }
        break;
      case "L":
        if (curr.sY < curr.y) {
          n.x = curr.x + 1;
          n.y = curr.y;
        } else if (curr.sY === curr.y && curr.sX > curr.x) {
          n.x = curr.x;
          n.y = curr.y - 1;
        }
        break;
      case "J":
        if (curr.sY === curr.y && curr.sX < curr.x) {
          n.x = curr.x;
          n.y = curr.y - 1;
        } else {
          n.x = curr.x - 1;
          n.y = curr.y;
        }
        break;
      case "F":
        if (curr.sY > curr.y && curr.sX === curr.x) {
          n.x = curr.x + 1;
          n.y = curr.y;
        } else {
          n.x = curr.x;
          n.y = curr.y + 1;
        }
        break;
      case "-":
        if (curr.sY === curr.y && curr.sX < curr.x) {
          n.x = curr.x + 1;
          n.y = curr.y;
        } else {
          n.x = curr.x - 1;
          n.y = curr.y;
        }
        break;
      case "7":
        if (curr.sY > curr.y && curr.sX === curr.x) {
          n.x = curr.x - 1;
          n.y = curr.y;
        } else {
          n.x = curr.x;
          n.y = curr.y + 1;
        }
        break;
    }
    curr = n as Sym;
    curr.s = rows[curr.y][curr.x];
    console.log(curr);
  }

  return (steps + 1) / 2;
};

interface Sym {
  sX: number;
  sY: number;
  x: number;
  y: number;
  s: string;
}

export const part2 = (rows: ParseResult) => {
  let curr: Sym = findStart(rows);
  let steps = 0;
  const walls: string[][] = [];

  for (let x = 0; x < rows[0].length; x++) {
    walls[x] = [];
    for (let y = 0; y < rows.length; y++) {
      walls[x][y] = ".";
    }
  }

  walls[curr.sX][curr.sY] = "S";

  while (curr.s !== "S") {
    if (!walls[curr.x]) {
      walls[curr.x] = [];
    }
    walls[curr.x][curr.y] = "W";
    steps++;
    const n: Partial<Sym> = { sX: curr.x, sY: curr.y };
    switch (curr.s) {
      case "|":
        if (curr.sY < curr.y) {
          n.x = curr.x;
          n.y = curr.y + 1;
          setCond(curr.x - 1, curr.y, walls);
        } else if (curr.sY > curr.y) {
          n.x = curr.x;
          n.y = curr.y - 1;
          setCond(curr.x + 1, curr.y, walls);
        }
        break;
      case "L":
        if (curr.sY < curr.y) {
          n.x = curr.x + 1;
          n.y = curr.y;
          setCond(curr.x - 1, curr.y, walls);
          setCond(curr.x - 1, curr.y + 1, walls);
          setCond(curr.x, curr.y + 1, walls);
        } else if (curr.sY === curr.y && curr.sX > curr.x) {
          n.x = curr.x;
          n.y = curr.y - 1;
          setCond(curr.x + 1, curr.y - 1, walls);
        }
        break;
      case "J":
        if (curr.sY === curr.y && curr.sX < curr.x) {
          n.x = curr.x;
          n.y = curr.y - 1;
          setCond(curr.x, curr.y + 1, walls);
          setCond(curr.x + 1, curr.y + 1, walls);
          setCond(curr.x + 1, curr.y, walls);
        } else {
          n.x = curr.x - 1;
          n.y = curr.y;
          setCond(curr.x - 1, curr.y - 1, walls);
        }
        break;
      case "F":
        if (curr.sY > curr.y && curr.sX === curr.x) {
          n.x = curr.x + 1;
          n.y = curr.y;
          setCond(curr.x + 1, curr.y + 1, walls);
        } else {
          n.x = curr.x;
          n.y = curr.y + 1;
          setCond(curr.x, curr.y - 1, walls);
          setCond(curr.x - 1, curr.y - 1, walls);
          setCond(curr.x - 1, curr.y, walls);
        }
        break;
      case "-":
        if (curr.sY === curr.y && curr.sX < curr.x) {
          n.x = curr.x + 1;
          n.y = curr.y;
          setCond(curr.x, curr.y + 1, walls);
        } else {
          n.x = curr.x - 1;
          n.y = curr.y;
          setCond(curr.x, curr.y - 1, walls);
        }
        break;
      case "7":
        if (curr.sY > curr.y && curr.sX === curr.x) {
          n.x = curr.x - 1;
          n.y = curr.y;
          setCond(curr.x, curr.y - 1, walls);
          setCond(curr.x + 1, curr.y - 1, walls);
          setCond(curr.x + 1, curr.y, walls);
        } else {
          n.x = curr.x;
          n.y = curr.y + 1;
          setCond(curr.x - 1, curr.y + 1, walls);
        }
        break;
    }
    curr = n as Sym;
    curr.s = rows[curr.y][curr.x];
  }

  let cavern = 0;

  let str: string[][] = [];

  for (let x = 0; x < walls.length; x++) {
    for (let y = 0; y < walls[x].length; y++) {
      const n = walls[x][y];
      if (n === "I") {
        for (let x2 = x - 1; x2 <= x + 1; x2++) {
          for (let y2 = y - 1; y2 <= y + 1; y2++) {
            if (walls[x2][y2] === ".") {
              walls[x2][y2] = "I";
              cavern++;
            }
          }
        }
      }
    }
  }

  for (let x = 0; x < rows[0].length; x++) {
    for (let y = 0; y < rows.length; y++) {
      if (!str[y]) str[y] = [];

      switch (walls[x][y]) {
        case "W":
          str[y][x] = "W";
          break;
        case "I":
          str[y][x] = "I";
          cavern++;
          break;
        case "S":
          str[y][x] = "S";
          break;
        default:
          str[y][x] = " ";
      }
    }
  }

  let map = "";
  for (const s of str) {
    map += s.join("") + "\n";
  }

  console.log(map);

  return cavern;
};

const findStart = (rows: string[]): Sym => {
  const sym: Partial<Sym> = {};
  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[0].length; x++) {
      if (rows[y] && rows[y][x] && rows[y][x] === "S") {
        sym.sX = x;
        sym.sY = y;

        const n = rows[y - 1] && rows[y - 1][x] ? rows[y - 1][x] : undefined;
        const s = rows[y + 1] && rows[y + 1][x] ? rows[y + 1][x] : undefined;
        const w = rows[y][x - 1] ?? undefined;
        const e = rows[y][x + 1] ?? undefined;
        if (n && (n === "|" || n === "F" || n === "7")) {
          sym.s = n;
          sym.x = x;
          sym.y = y - 1;
        } else if (s && (s === "|" || s === "J" || s === "L")) {
          sym.s = s;
          sym.x = x;
          sym.y = y + 1;
        } else if (w && (w === "-" || w === "L" || w === "F")) {
          sym.s = w;
          sym.x = x - 1;
          sym.y = y;
        } else if (e && (e === "-" || e === "7" || e === "J")) {
          sym.s = e;
          sym.x = x + 1;
          sym.y = y;
        }
      }
    }
  }
  return sym as Sym;
};

const setCond = (x: number, y: number, walls: string[][]) => {
  if (walls[x] && walls[x][y] && walls[x][y] !== "W" && walls[x][y] !== "S") {
    walls[x][y] = "I";
  }
};
