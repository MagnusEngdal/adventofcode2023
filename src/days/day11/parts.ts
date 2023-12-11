import { ParseResult } from "./parse";

export const part1 = (rows: ParseResult) => {
  const galaxy = flipColsRows(expand(flipColsRows(expand(rows))));

  const stars: [number, number][] = [];

  for (let x = 0; x < galaxy[0].length; x++) {
    for (let y = 0; y < galaxy.length; y++) {
      if (galaxy[y][x] === "#") {
        stars.push([x, y]);
      }
    }
  }

  console.log(stars.length);

  const distance: Record<string, number> = {};
  for (const a of stars) {
    for (const b of stars) {
      const aL = [`${a[0]}-${a[1]}`, `${b[0]}-${b[1]}`];
      const l = aL.sort().join();

      if (aL[0] !== aL[1] && typeof distance[l] === "undefined") {
        distance[l] = calculateSteps(a, b);
      }
    }
  }

  const sum = Object.values(distance).reduce<number>(
    (acc, curr) => acc + curr,
    0
  );

  console.log(`
    Stars: ${stars.length}
    Pairs: ${Object.values(distance).length} (Should be ${
    (stars.length * (stars.length - 1)) / 2
  })
    Result: ${sum}
  `);

  return Object.values(distance).reduce<number>((acc, curr) => acc + curr, 0);
};

const expand = (rows: string[]): string[] => {
  const expanded: string[] = [];
  for (const row of rows) {
    expanded.push(row);
    if (!row.includes("#")) {
      expanded.push(row);
    }
  }
  return expanded;
};

const flipColsRows = (rows: string[]): string[] => {
  const newRows: string[] = [];
  for (const row of rows) {
    for (let i = 0; i < row.length; i++) {
      if (!newRows[i]) newRows[i] = "";
      newRows[i] += row[i];
    }
  }
  return newRows;
};

const calculateSteps = (
  point1: [number, number],
  point2: [number, number]
): number => {
  const verticalSteps = Math.abs(point2[1] - point1[1]);
  const horizontalSteps = Math.abs(point2[0] - point1[0]);

  const totalSteps = verticalSteps + horizontalSteps;

  return totalSteps;
};

export const part2 = (rows: ParseResult) => {
  const expandCol: boolean[] = [];
  const expandRow: boolean[] = [];
  const exp = 1000000;

  for (let y = 0; y < rows.length; y++) {
    if (!rows[y].includes("#")) expandRow[y] = true;
  }
  const cols = flipColsRows(rows);
  for (let y = 0; y < cols.length; y++) {
    if (!cols[y].includes("#")) expandCol[y] = true;
  }

  let rowInc = 0;
  const stars: [number, number][] = [];

  for (let y = 0; y < rows.length; y++) {
    if (expandRow[y]) rowInc++;
    let colInc = 0;
    for (let x = 0; x < rows[0].length; x++) {
      if (expandCol[x]) colInc++;
      if (rows[y][x] === "#") {
        console.log(`
          Row: ${y}, Inc: ${rowInc}, ${y + rowInc * exp}
          Col: ${x}, Inc: ${colInc}, ${x + colInc * exp}
        `);
        stars.push([x + colInc * exp, y + rowInc * exp]);
      }
    }
  }

  console.log(stars);

  const distance: Record<string, number> = {};
  for (const a of stars) {
    for (const b of stars) {
      const aL = [`${a[0]}-${a[1]}`, `${b[0]}-${b[1]}`];
      const l = aL.sort().join();

      if (aL[0] !== aL[1] && typeof distance[l] === "undefined") {
        distance[l] = calculateSteps(a, b);
      }
    }
  }

  const sum = Object.values(distance).reduce<number>(
    (acc, curr) => acc + curr,
    0
  );

  console.log(`
    Stars: ${stars.length}
    Pairs: ${Object.values(distance).length} (Should be ${
    (stars.length * (stars.length - 1)) / 2
  })
    Result: ${sum}
  `);

  return Object.values(distance).reduce<number>((acc, curr) => acc + curr, 0);
};
