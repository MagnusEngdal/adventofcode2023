import fs from "node:fs";
import path from "node:path";

export const read = (
  dayNumber: number,
  file: "p1sample" | "p2sample" | "input"
): Promise<string[]> =>
  new Promise((resolve) => {
    fs.readFile(
      path.join(__dirname, `day${dayNumber}/input/${file}.txt`),
      "utf8",
      (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const rows = data.split("\n");

        resolve(trimArray(rows));
      }
    );
  });

const trimArray = (arr: string[]) => {
  let res = trimStart(arr);
  res.reverse();
  res = trimStart(res);
  res.reverse();
  return res;
};

const trimStart = (arr: string[]): string[] => {
  const res: string[] = [];
  let start = false;

  for (let row of arr) {
    if (row.length > 0) {
      start = true;
    }

    if (start) {
      res.push(row);
    }
  }

  return res;
};
