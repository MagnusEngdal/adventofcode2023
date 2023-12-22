import { Grid } from "./toGrid";

export const displayGrid = (grid: Grid) => {
  const [minX, maxX, minY, maxY] = gridSize(grid);

  let rows: string = "";
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      rows += grid[x][y];
    }
    rows += "\n";
  }
  return rows;
};

const gridSize = (grid: Grid): [number, number, number, number] =>
  Object.keys(grid).reduce<[number, number, number, number]>(
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
