import { Grid } from "./toGrid";

export interface Tile {
  x: number;
  y: number;
  symbol: string;
}

export const eachTile = (grid: Grid, cb: (tile: Tile) => void) => {
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {
      cb({
        x,
        y,
        symbol: grid[x][y],
      });
    }
  }
};

const checkTile = (grid: Grid, x: number, y: number, symbol?: string) => {
  const xWrap =
    x < 0
      ? grid.length - 1 - ((Math.abs(x) - 1) % grid.length)
      : x % grid.length;
  const yWrap =
    y < 0
      ? grid[0].length - 1 - ((Math.abs(y) - 1) % grid[0].length)
      : y % grid[0].length;

  return (
    typeof grid[xWrap] !== "undefined" &&
    typeof grid[xWrap][yWrap] !== "undefined" &&
    (!symbol || grid[xWrap][yWrap] === symbol)
  );
};

export const neighbors = (grid: Grid, tile: Tile, symbol?: string) => {
  let arr: Tile[] = [];

  if (checkTile(grid, tile.x, tile.y - 1, symbol)) {
    arr.push({ x: tile.x, y: tile.y - 1, symbol: "" });
  }
  if (checkTile(grid, tile.x, tile.y + 1, symbol)) {
    arr.push({ x: tile.x, y: tile.y + 1, symbol: "" });
  }
  if (checkTile(grid, tile.x + 1, tile.y, symbol)) {
    arr.push({ x: tile.x + 1, y: tile.y, symbol: "" });
  }
  if (checkTile(grid, tile.x - 1, tile.y, symbol)) {
    arr.push({ x: tile.x - 1, y: tile.y, symbol: "" });
  }

  return arr;
};

export const findSymbolInGrid = (grid: Grid, symbol: string): Tile | void => {
  for (let x = 0; x < grid.length; x++) {
    let y = grid[x].indexOf(symbol);
    if (y > -1) {
      return { x, y, symbol };
    }
  }
  return;
};
