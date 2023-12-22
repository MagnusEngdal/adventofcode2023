import { Tile, findSymbolInGrid, neighbors } from "../helpers/grid";
import { toGrid } from "../helpers/toGrid";
import { ParseResult } from "./parse";

export const part1 = (rows: ParseResult) => {
  const grid = toGrid(rows);
  const s = findSymbolInGrid(grid, "S")!;

  const frontier: Tile[] = [];
  frontier.push(s);
  const distance: Record<string, number> = {};
  distance[`${s.x}-${s.y}`] = 0;

  let dist = 0;
  while (frontier.length > 0 && dist <= 64) {
    const current = frontier.shift()!;

    for (let n of neighbors(grid, current, ".")) {
      let label = `${n.x}-${n.y}`;
      if (typeof distance[label] === "undefined") {
        frontier.push(n);
        dist = 1 + distance[`${current.x}-${current.y}`];
        distance[label] = dist;
      }
    }
  }

  return Object.values(distance).filter((d) => d % 2 === 0).length;
};

export const part2 = (rows: ParseResult) => {
  const grid = toGrid(rows);
  const s = findSymbolInGrid(grid, "S")!;

  const frontier: Tile[] = [];
  frontier.push(s);
  const distance: Record<string, number> = {};
  distance[`${s.x}-${s.y}`] = 0;

  let dist = 0;
  while (frontier.length > 0 && dist <= 5000) {
    const current = frontier.shift()!;

    for (let n of neighbors(grid, current, ".")) {
      let label = `${n.x}-${n.y}`;
      if (typeof distance[label] === "undefined") {
        frontier.push(n);
        dist = 1 + distance[`${current.x}-${current.y}`];
        distance[label] = dist;
      }
    }
  }

  return Object.values(distance).filter((d) => d % 2 === 0).length;
};
