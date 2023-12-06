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
        resolve(rows);
      }
    );
  });
