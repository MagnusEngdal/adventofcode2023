export type ColRows = Record<number, string>;

export const colParser = (rows: string[]): ColRows => {
  const res = rows.reduce<ColRows>((acc, row) => {
    const parts = row.split(":")[0].split(" ");
    const id = parseInt(parts[parts.length - 1]);
    acc[id] = row.split(":")[1].trim();

    return acc;
  }, {});

  return res;
};
