export type Grid = string[][];

export const toGrid = (rows: string[]) => {
  const grid: string[][] = [];
  for (let x = 0; x < rows[0].length; x++) {
    grid[x] = [];
    for (let y = 0; y < rows.length; y++) {
      grid[x][y] = rows[y][x];
    }
  }
  return grid;
};
