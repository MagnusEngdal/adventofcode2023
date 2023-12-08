import { splitNumbers } from "../helpers/splitNumbers";
import { ParseResult } from "./parse";

export const part1 = (rows: ParseResult) => {
  const inst = rows[0];
  const map = createMap(rows);
  let curr = "AAA";
  let steps = 0;
  let dirIndex = 0;

  while (curr !== "ZZZ") {
    steps++;
    if (dirIndex >= inst.length) {
      dirIndex = 0;
    }
    const dir = inst[dirIndex];
    switch (dir) {
      case "R":
        curr = map[curr][1];
        break;
      case "L":
        curr = map[curr][0];
        break;
    }
    dirIndex++;
  }

  return steps;
};

const endsWith = (letter: string, str: string) =>
  str[str.length - 1] === letter;

export const part2 = (rows: ParseResult) => {
  let result = 0;

  const inst = rows[0];
  const map = createMap(rows);
  const startNodes = Object.keys(map).filter((n) => endsWith("A", n));
  const stepMap: Record<string, number> = {};

  for (let node of startNodes) {
    let curr = node;
    let dirIndex = 0;
    let steps = 0;
    while (!endsWith("Z", curr)) {
      if (dirIndex >= inst.length) {
        dirIndex = 0;
      }

      const dir = inst[dirIndex];
      if (dir === "R") {
        curr = map[curr][1];
      } else {
        curr = map[curr][0];
      }

      steps++;
      dirIndex++;
    }
    stepMap[node] = steps;
  }

  const gcd = (a: number, b: number): number => (a ? gcd(b % a, a) : b);
  const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);
  result = Object.values(stepMap).reduce(lcm);

  return result;
};

const createMap = (rows: string[]) => {
  const mapRows = rows.slice(2, rows.length);
  const map: Record<string, string[]> = {};
  for (const r of mapRows) {
    const coord = r
      .split("(")[1]
      .replace(")", "")
      .split(",")
      .map((c) => c.trim());
    map[r.slice(0, 3)] = coord;
  }

  return map;
};
