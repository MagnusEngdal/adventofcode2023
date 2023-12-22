import { ParseResult } from "./parse";

export const part1 = (rows: ParseResult) => {
  const modules = createModules(rows);

  const list: signal[] = [];

  let lowCount = 0;
  let highCount = 0;

  for (let i = 0; i < 10000000; i++) {
    list.push(...modules["broadcaster"](["button", "broadcaster", false]));
    lowCount++;

    while (list.length > 0) {
      const s = list.shift();

      if (s && s[2]) highCount++;
      if (s && !s[2]) lowCount++;

      if (s && s[1] === "rx" && !s[2]) {
        console.log(i);
        break;
      }

      if (s && s[1] !== "output" && modules[s[1]]) {
        const res = modules[s[1]](s);
        list.push(...res);
      }
    }
  }

  return lowCount * highCount;
};

export const part2 = (rows: ParseResult) => {
  return 0;
};

type signal = [source: string, destination: string, signal: boolean];
type module = ([name, s]: signal) => signal[];
type modules = Record<string, module>;
type schemaModule = [
  name: string,
  type: "b" | "%" | "&",
  input: undefined | string[],
  output: string[]
];

const createModules = (rows: string[]) => {
  const modules: modules = {};

  const schema: Record<string, schemaModule> = {};
  for (const row of rows) {
    const p = parseRow(row);
    schema[p[0]] = p;
  }
  for (const sm of Object.values(schema)) {
    for (let out of sm[3]) {
      if (schema[out]) {
        schema[out][2]?.push(sm[0]);
      }
    }
  }
  for (const [name, type, input, output] of Object.values(schema)) {
    if (type === "&" && input) {
      modules[name] = createConjunction(input, output);
    } else if (type === "%") {
      modules[name] = createFlipFlop(output);
    } else {
      modules[name] = createBroadcast(output);
    }
  }

  return modules;
};

const createConjunction = (input: string[], output: string[]) => {
  const i = input.reduce<Record<string, boolean>>((acc, name) => {
    acc[name] = false;
    return acc;
  }, {});

  return ([source, destination, s]: signal): signal[] => {
    i[source] = s;

    let lowCount = Object.values(i).filter((s) => s === false).length;
    if (lowCount === 0) return output.map((d) => [destination, d, false]);
    return output.map((d) => [destination, d, true]);
  };
};

const createFlipFlop = (output: string[]) => {
  let state = false;

  return ([source, destination, s]: signal): signal[] => {
    if (s) return [];
    state = !state;
    return output.map((d) => [destination, d, state]);
  };
};

const createBroadcast = (output: string[]) => {
  return ([source, destination, s]: signal): signal[] => {
    return output.map((d) => [destination, d, s]);
  };
};

const parseRow = (row: string): schemaModule => {
  const s = row.split("->").map((t) => t.trim());
  const res: schemaModule = ["", "b", [], []];

  if (s[0] === "broadcaster") {
    res[0] = s[0];
  } else {
    const firstLetter = s[0][0];
    if (firstLetter === "%" || firstLetter === "&") {
      res[1] = firstLetter;
      res[0] = s[0].substring(1, s[0].length);
    }
  }

  res[3] = s[1].split(",").map((t) => t.trim());

  return res;
};
