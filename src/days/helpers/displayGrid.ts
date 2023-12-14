import { Grid } from "./toGrid";

export const displayGrid = (grid: Grid) => {
  let rows: string = "";
  for (let y = 0; y < grid[0].length; y++) {
    for (let x = 0; x < grid.length; x++) {
      rows += grid[x][y];
    }
    rows += "\n";
  }
  return rows;
};
