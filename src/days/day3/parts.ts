import { ParseResult } from "./parse";

export const part1 = (rows: ParseResult) => {
  console.log(rows);
};
export const part2 = (rows: ParseResult) => {
  const width = rows[0].length;
  const height = rows.length;
  let result = 0;
  let record = "";
  let gears: Record<string, number[]> = {};

  const hasSymbol = (
    x: number,
    y: number,
    record: string
  ): { record: string; xy: string | undefined } | undefined => {
    for (let y2 = y - 1; y2 <= y + 1; y2++) {
      for (let x2 = x - (record.length + 1); x2 <= x; x2++) {
        const pos = rows[y2] && rows[y2][x2] ? rows[y2][x2] : undefined;
        if (typeof pos !== "undefined") {
          if (pos.match("[^0-9.]")) {
            if (pos === "*") return { record, xy: `${x2}-${y2}` };
            return { record, xy: undefined };
          }
        }
      }
    }
    return;
  };

  const m = (x: number, y: number, r: string) => {
    const match = hasSymbol(x, y, r);
    if (match) {
      if (match?.xy) {
        if (!gears[match.xy]) gears[match.xy] = [];
        gears[match.xy].push(parseInt(match.record));
      }
    }
    record = "";
  };

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pos = rows[y][x];
      const isNumber = !isNaN(parseFloat(pos));
      if (isNumber) {
        record += pos;
      } else if (!isNumber && record.length > 0) {
        m(x, y, record);
      }
    }
    m(width, y, record);
  }

  for (const [c, values] of Object.entries(gears)) {
    if (values.length === 2) {
      result += values[0] * values[1];
    }
  }

  return result;
};
