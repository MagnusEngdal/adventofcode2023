import { splitNumbers } from "../helpers/splitNumbers";
import { ParseResult } from "./parse";

// Correct: 625968
export const part1 = (rows: ParseResult) => {
  let result = 1;

  const races = rowsToRaces(rows);

  for (const race of races) {
    let waysToWin = 0;

    for (let holdMs = 1; holdMs < race.time; holdMs++) {
      let remainingMs = race.time - holdMs;
      let speed = holdMs;
      let distance = speed * remainingMs;
      if (distance > race.distance) {
        waysToWin++;
      }
    }

    result = result * waysToWin;
  }

  return result;
};

// Correct: 43663323
export const part2 = (rows: ParseResult) => {
  const races = rowsToRaces(rows);

  let race: Race = {
    time: parseInt(races.reduce<string>((acc, curr) => acc + curr.time, "")),
    distance: parseInt(
      races.reduce<string>((acc, curr) => acc + curr.distance, "")
    ),
  };

  let waysToWin = 0;

  for (let holdMs = 1; holdMs < race.time; holdMs++) {
    let remainingMs = race.time - holdMs;
    let speed = holdMs;
    let distance = speed * remainingMs;
    if (distance > race.distance) {
      waysToWin++;
    }
  }

  return waysToWin;
};

interface Race {
  time: number;
  distance: number;
}

const rowsToRaces = (rows: string[]) => {
  const races: Race[] = [];

  const times = splitNumbers(rows[0].split(":")[1]);
  const distances = splitNumbers(rows[1].split(":")[1]);

  for (let i = 0; i < times.length; i++) {
    races.push({
      time: times[i],
      distance: distances[i],
    });
  }

  return races;
};
