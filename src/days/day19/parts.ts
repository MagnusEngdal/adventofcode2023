import { ParseResult } from "./parse";

export const part1 = (rows: ParseResult) => {
  const workflows: Record<string, Rule[]> = {};
  const parts: Record<categories, number>[] = [];

  let isWorkflow = true;
  for (const row of rows) {
    if (row.length === 0) {
      isWorkflow = false;
      continue;
    }
    if (isWorkflow) {
      const name = row.split("{")[0];
      const rules = row.split("{")[1].replace("}", "").split(",");
      workflows[name] = rules.map((r) => parseRule(r));
    } else {
      const p = row.replace("{", "").replace("}", "").split(",");
      const part = {} as Record<categories, number>;
      parts.push(part);

      for (const s of p) {
        part[s.split("=")[0] as categories] = parseInt(s.split("=")[1]);
      }
    }
  }

  let total = 0;
  for (const p of parts) {
    let out: string | undefined = "in";

    while (out !== "R" && out !== "A") {
      out = runRules(p, workflows[out as string]);
    }

    let partTotal = p.a + p.m + p.s + p.x;
    if (out === "A") {
      total += partTotal;
    }
  }

  return total;
};

const runRules = (part: Record<categories, number>, rules: Rule[]) => {
  for (const rule of rules) {
    let match = false;
    if (rule.cond) {
      if (rule.cond.op === ">") {
        if (part[rule.cond.category] > rule.cond.value) {
          match = true;
        }
      } else if (rule.cond.op === "<") {
        if (part[rule.cond.category] < rule.cond.value) {
          match = true;
        }
      }
    } else {
      match = true;
    }
    if (match) {
      return rule.out;
    }
  }
  return undefined;
};

type categories = "a" | "m" | "x" | "s";
type operators = ">" | "<";

interface Condition {
  category: categories;
  op: operators;
  value: number;
}

interface Rule {
  out: string;
  cond?: Condition;
}

const parseRule = (rule: string): Rule => {
  const r: Partial<Rule> = {};

  if (rule.includes(">") || rule.includes("<")) {
    const parts = rule.split(":");
    r.cond = {
      category: parts[0].substring(0, 1) as categories,
      op: parts[0].substring(1, 2) as operators,
      value: parseInt(parts[0].substring(2)),
    };
    r.out = parts[1];
  } else {
    r.out = rule;
  }

  return r as Rule;
};

export const part2 = (rows: ParseResult) => {
  return 0;
};
