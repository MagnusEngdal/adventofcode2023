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
  const r: string[][] = rows.map((r) => r.split(""));
  return getSum(r, 1_000_000, "#");
};

function getSum(rows: string[][], times: number, symbol: string) {
  const { rowWithoutSymbolIndexs, colWithoutSymbolIndexs } =
    getIndexsRowColWithoutSymbol(rows, symbol);
  const [matrixWithIdInsteadOfSymbol, lastId] = giveSymbolUniqueId(
    rows,
    symbol
  );
  const mapIdPosition = mapId(
    matrixWithIdInsteadOfSymbol,
    rowWithoutSymbolIndexs,
    colWithoutSymbolIndexs,
    times
  );
  let sum = 0;
  const setIdDone = new Set();
  for (let n = 1; n <= lastId; n++) {
    for (let x = 1; x <= lastId; x++) {
      if (
        x !== n &&
        !setIdDone.has(n + " " + x) &&
        !setIdDone.has(x + " " + n)
      ) {
        let nPosition = mapIdPosition.get(n);
        let xPosition = mapIdPosition.get(x);
        let distance =
          Math.abs(nPosition!.i - xPosition!.i) +
          Math.abs(nPosition!.j - xPosition!.j);
        sum = sum + distance;
        setIdDone.add(n + " " + x);
      }
    }
  }
  return sum;
}
function isMatrixSquare(matrix: string[][]): boolean {
  return matrix.length === matrix[0].length;
}
function getIndexsRowColWithoutSymbol(
  matrix: string[][],
  symbol: string
): {
  rowWithoutSymbolIndexs: number[];
  colWithoutSymbolIndexs: number[];
} {
  const rowWithoutSymbolIndexs: number[] = [];
  const colWithoutSymbolIndexs: number[] = [];
  const isSquare = isMatrixSquare(matrix);
  const len = matrix.length;
  if (isSquare) {
    for (let i = 0; i < len; i++) {
      let hasColhash = false;
      let hasRowHash = false;
      for (let j = 0; j < len; j++) {
        const colCell = matrix[j][i];
        const rowCell = matrix[i][j];
        if (rowCell === symbol) {
          hasRowHash = true;
        }
        if (colCell === symbol) {
          hasColhash = true;
        }
      }
      !hasRowHash && rowWithoutSymbolIndexs.push(i);
      !hasColhash && colWithoutSymbolIndexs.push(i);
    }
  } else {
    for (let i = 0; i < matrix[0].length; i++) {
      let hasColhash = false;
      for (let j = 0; j < matrix.length; j++) {
        const colCell = matrix[j][i];
        if (colCell === symbol) {
          hasColhash = true;
        }
      }
      !hasColhash && colWithoutSymbolIndexs.push(i);
    }
    for (let i = 0; i < matrix.length; i++) {
      let hasRowHash = false;
      for (let j = 0; j < matrix[0].length; j++) {
        const rowCell = matrix[i][j];
        if (rowCell === symbol) {
          hasRowHash = true;
        }
      }
      !hasRowHash && rowWithoutSymbolIndexs.push(i);
    }
  }
  return { rowWithoutSymbolIndexs, colWithoutSymbolIndexs };
}
function giveSymbolUniqueId(
  matrix: string[][],
  symbol: string
): [string[][], number] {
  let id = 0;
  const updateMatrix = matrix.map((row) =>
    row.map((cell) => {
      if (cell === symbol) {
        id++;
        return cell.replace(symbol, id.toString());
      }
      return cell;
    })
  );
  return [updateMatrix, id];
}
function getNewIndex(
  currIndex: number,
  arrayIndexWithoutSymbol: number[],
  times: number
): number {
  for (let x = arrayIndexWithoutSymbol.length - 1; x >= 0; x--) {
    let pos = arrayIndexWithoutSymbol[x];
    if (currIndex > pos) {
      return currIndex + (x + 1) * (times - 1);
    }
  }
  return currIndex;
}
function mapId(
  matrix: string[][],
  rowWithoutSymbolIndexs: number[],
  colWithoutSymbolIndexs: number[],
  times: number
): Map<number, { i: number; j: number }> {
  const map = new Map<number, { i: number; j: number }>();
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      const currCell = matrix[i][j];
      if (currCell !== ".") {
        let r = getNewIndex(i, rowWithoutSymbolIndexs, times);
        let c = getNewIndex(j, colWithoutSymbolIndexs, times);
        map.set(parseInt(currCell), { i: r, j: c });
      }
    }
  }
  return map;
}
