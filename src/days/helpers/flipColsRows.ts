export const flipColsRows = (rows: string[]): string[] => {
  const newRows: string[] = [];
  for (const row of rows) {
    for (let i = 0; i < row.length; i++) {
      if (!newRows[i]) newRows[i] = "";
      newRows[i] += row[i];
    }
  }
  return newRows;
};