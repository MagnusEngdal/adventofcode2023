export const splitNumbers = (row: string): number[] =>
  row.split(" ").reduce<number[]>((acc, curr) => {
    if (curr.length > 0) {
      const num = parseInt(curr);
      if (!isNaN(num)) {
        acc.push(parseInt(curr));
      }
    }
    return acc;
  }, []);
