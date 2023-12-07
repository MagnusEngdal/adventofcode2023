import { ParseResult } from "./parse";

interface Hand {
  cards: string;
  bid: number;
  value: number;
  win: number;
  name?: string;
  rank: number;
}

export const part1 = (rows: ParseResult) => {
  let result = 0;
  let hands: Hand[] = [];

  for (const row of rows) {
    const hand: Hand = {
      cards: row.split(" ")[0],
      bid: parseInt(row.split(" ")[1]),
      value: 0,
      win: 0,
      rank: 0,
    };
    hands.push(hand);

    const cardCount: Record<string, number> = {};

    for (const ct of Object.keys(cardMap)) {
      cardCount[ct] = hand.cards.match(new RegExp(ct, "g"))?.length ?? 0;
    }

    const counts = Object.values(cardCount);

    if (counts.includes(5)) {
      hand.value = 7000;
    } else if (counts.includes(4)) {
      hand.value = 6000;
    } else if (counts.includes(3)) {
      if (counts.includes(2)) {
        hand.value = 5000;
      } else {
        hand.value = 4000;
      }
    } else if (counts.includes(2)) {
      const twoCount = counts.filter((c) => c === 2).length;
      if (twoCount === 2) {
        hand.value = 3000;
      } else {
        hand.value = 2000;
      }
    } else {
      hand.value = 1000;
    }
  }

  hands
    .sort((a, b) => {
      if (a.value > b.value) {
        return -1;
      } else if (a.value < b.value) {
        return 1;
      }

      for (let i = 0; i < 5; i++) {
        if (cardMap[a.cards[i]] > cardMap[b.cards[i]]) {
          return -1;
        } else if (cardMap[a.cards[i]] < cardMap[b.cards[i]]) {
          return 1;
        }
      }

      throw Error("Something went wrong");
    })
    .reverse();

  for (let i = 0; i < hands.length; i++) {
    hands[i].win = (i + 1) * hands[i].bid;
  }

  result = hands.reduce<number>((acc, curr) => acc + curr.win, 0);

  return result;
};

export const part2 = (rows: ParseResult) => {
  const newCardMap = { ...cardMap };
  newCardMap.J = 0;

  let result = 0;
  let hands: Hand[] = [];

  for (const row of rows) {
    const hand: Hand = {
      cards: row.split(" ")[0],
      bid: parseInt(row.split(" ")[1]),
      value: 0,
      win: 0,
      rank: 0,
    };
    hands.push(hand);

    const cardCount: Record<string, number> = {};
    let jokerCount = hand.cards.match(new RegExp("J", "g"))?.length ?? 0;

    for (const ct of Object.keys(cardMap)) {
      if (ct === "J") continue;

      cardCount[ct] = hand.cards.match(new RegExp(ct, "g"))?.length ?? 0;
    }

    const counts = Object.values(cardCount);

    if (counts.includes(5) || jokerCount === 5) {
      hand.value = values.FIVE;
    } else if (counts.includes(4)) {
      if (jokerCount === 1) {
        hand.value = values.FIVE;
      } else {
        hand.value = values.FOUR;
      }
    } else if (counts.includes(3)) {
      if (jokerCount === 2) {
        hand.value = values.FIVE;
      } else if (jokerCount === 1) {
        hand.value = values.FOUR;
      } else if (counts.includes(2)) {
        hand.value = values.FULL;
      } else {
        hand.value = values.THREE;
      }
    } else if (counts.includes(2)) {
      const twoCount = counts.filter((c) => c === 2).length;
      if (jokerCount === 3) {
        hand.value = values.FIVE;
      } else if (jokerCount === 2) {
        hand.value = values.FOUR;
      } else if (jokerCount === 1) {
        if (twoCount === 2) {
          hand.value = values.FULL;
        } else {
          hand.value = values.THREE;
        }
      } else if (twoCount === 2) {
        hand.value = values.TWOPAIR;
      } else {
        hand.value = values.PAIR;
      }
    } else {
      if (jokerCount === 4) {
        hand.value = values.FIVE;
      } else if (jokerCount === 3) {
        hand.value = values.FOUR;
      } else if (jokerCount === 2) {
        hand.value = values.THREE;
      } else if (jokerCount === 1) {
        hand.value = values.PAIR;
      } else {
        hand.value = values.HIGH;
      }
    }
  }

  hands
    .sort((a, b) => {
      if (a.value > b.value) {
        return -1;
      } else if (a.value < b.value) {
        return 1;
      }

      for (let i = 0; i < 5; i++) {
        if (newCardMap[a.cards[i]] > newCardMap[b.cards[i]]) {
          return -1;
        } else if (newCardMap[a.cards[i]] < newCardMap[b.cards[i]]) {
          return 1;
        }
      }

      throw Error("Something went wrong");
    })
    .reverse();

  for (let i = 0; i < hands.length; i++) {
    hands[i].rank = i + 1;
    hands[i].win = hands[i].rank! * hands[i].bid;
  }

  hands.sort((a, b) => a.rank - b.rank);

  result = hands.reduce<number>((acc, curr) => acc + curr.win, 0);

  return result;
};

const values = {
  FIVE: 7000,
  FOUR: 6000,
  FULL: 5000,
  THREE: 4000,
  TWOPAIR: 3000,
  PAIR: 2000,
  HIGH: 1000,
};

const cardMap: Record<string, number> = {
  A: 13,
  K: 12,
  Q: 11,
  J: 10,
  T: 9,
  "9": 8,
  "8": 7,
  "7": 6,
  "6": 5,
  "5": 4,
  "4": 3,
  "3": 2,
  "2": 1,
};
