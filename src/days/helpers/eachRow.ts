export interface CallbackResult {
  id: number;
  row: string;
}

export const eachRow = (rows: any, cb: (res: CallbackResult) => void) => {
  if (typeof rows == "object" && !Array.isArray(rows)) {
    for (const [id, row] of Object.entries(rows)) {
      if (typeof row === "string") {
        cb({
          id: parseInt(id),
          row,
        });
      } else {
        throw Error("Row is not a string");
      }
    }
  }
};
