import { ParseResult } from "./parse";

export const part1 = (rows: ParseResult) => {
  const steps = rows[0].split(",");
  let res = 0;
  for (const s of steps) {
    res += hashAlgo(s);
  }

  return res;
};

export const hashAlgo = (label: string) => {
  let tot = 0;
  for (const c of label) {
    const h = asciiTable[c];
    tot += h;
    tot *= 17;
    tot %= 256;
  }
  return tot;
};

type Lenses = Record<string, number>;

export const part2 = (rows: ParseResult) => {
  const steps = rows[0].split(",");
  let res = 0;
  const boxes: Record<number, Lenses> = {};

  for (const s of steps) {
    const label = s.split("-")[0].split("=")[0];
    const boxNr = hashAlgo(label);
    const symbol = s.includes("=") ? "=" : "-";

    if (symbol === "-") {
      if (boxes[boxNr] && boxes[boxNr][label]) {
        delete boxes[boxNr][label];
      }
    } else {
      const focal = parseInt(s.split("=")[1]);
      if (isNaN(focal)) throw Error("Incorrect focal length");

      if (!boxes[boxNr]) boxes[boxNr] = {};
      boxes[boxNr][label] = focal;
    }
  }

  let total = 0;
  for (let boxNr = 0; boxNr < 255; boxNr++) {
    const box = boxes[boxNr] ?? {};
    let lensNr = 1;
    for (const focal of Object.values(box)) {
      total += (boxNr + 1) * lensNr * focal;
      lensNr++;
    }
  }

  return total;
};

const asciiTable: Record<string, number> = {
  "\x00": 0,
  "\x01": 1,
  "\x02": 2,
  "\x03": 3,
  "\x04": 4,
  "\x05": 5,
  "\x06": 6,
  "\x07": 7,
  "\x08": 8,
  "\t": 9,
  "\n": 10,
  "\x0B": 11,
  "\x0C": 12,
  "\r": 13,
  "\x0E": 14,
  "\x0F": 15,
  "\x10": 16,
  "\x11": 17,
  "\x12": 18,
  "\x13": 19,
  "\x14": 20,
  "\x15": 21,
  "\x16": 22,
  "\x17": 23,
  "\x18": 24,
  "\x19": 25,
  "\x1A": 26,
  "\x1B": 27,
  "\x1C": 28,
  "\x1D": 29,
  "\x1E": 30,
  "\x1F": 31,
  " ": 32,
  "!": 33,
  '"': 34,
  "#": 35,
  $: 36,
  "%": 37,
  "&": 38,
  "'": 39,
  "(": 40,
  ")": 41,
  "*": 42,
  "+": 43,
  ",": 44,
  "-": 45,
  ".": 46,
  "/": 47,
  "0": 48,
  "1": 49,
  "2": 50,
  "3": 51,
  "4": 52,
  "5": 53,
  "6": 54,
  "7": 55,
  "8": 56,
  "9": 57,
  ":": 58,
  ";": 59,
  "<": 60,
  "=": 61,
  ">": 62,
  "?": 63,
  "@": 64,
  A: 65,
  B: 66,
  C: 67,
  D: 68,
  E: 69,
  F: 70,
  G: 71,
  H: 72,
  I: 73,
  J: 74,
  K: 75,
  L: 76,
  M: 77,
  N: 78,
  O: 79,
  P: 80,
  Q: 81,
  R: 82,
  S: 83,
  T: 84,
  U: 85,
  V: 86,
  W: 87,
  X: 88,
  Y: 89,
  Z: 90,
  "[": 91,
  "\\": 92,
  "]": 93,
  "^": 94,
  _: 95,
  "`": 96,
  a: 97,
  b: 98,
  c: 99,
  d: 100,
  e: 101,
  f: 102,
  g: 103,
  h: 104,
  i: 105,
  j: 106,
  k: 107,
  l: 108,
  m: 109,
  n: 110,
  o: 111,
  p: 112,
  q: 113,
  r: 114,
  s: 115,
  t: 116,
  u: 117,
  v: 118,
  w: 119,
  x: 120,
  y: 121,
  z: 122,
  "{": 123,
  "|": 124,
  "}": 125,
  "~": 126,
  "\x7F": 127,
  "\x80": 128,
  "\x81": 129,
  "\x82": 130,
  "\x83": 131,
  "\x84": 132,
  "\x85": 133,
  "\x86": 134,
  "\x87": 135,
  "\x88": 136,
  "\x89": 137,
  "\x8A": 138,
  "\x8B": 139,
  "\x8C": 140,
  "\x8D": 141,
  "\x8E": 142,
  "\x8F": 143,
  "\x90": 144,
  "\x91": 145,
  "\x92": 146,
  "\x93": 147,
  "\x94": 148,
  "\x95": 149,
  "\x96": 150,
  "\x97": 151,
  "\x98": 152,
  "\x99": 153,
  "\x9A": 154,
  "\x9B": 155,
  "\x9C": 156,
  "\x9D": 157,
  "\x9E": 158,
  "\x9F": 159,
  "\xA0": 160,
  "¡": 161,
  "¢": 162,
  "£": 163,
  "¤": 164,
  "¥": 165,
  "¦": 166,
  "§": 167,
  "¨": 168,
  "©": 169,
  ª: 170,
  "«": 171,
  "¬": 172,
  "\xAD": 173,
  "®": 174,
  "¯": 175,
  "°": 176,
  "±": 177,
  "²": 178,
  "³": 179,
  "´": 180,
  µ: 181,
  "¶": 182,
  "·": 183,
  "¸": 184,
  "¹": 185,
  º: 186,
  "»": 187,
  "¼": 188,
  "½": 189,
  "¾": 190,
  "¿": 191,
  À: 192,
  Á: 193,
  Â: 194,
  Ã: 195,
  Ä: 196,
  Å: 197,
  Æ: 198,
  Ç: 199,
  È: 200,
  É: 201,
  Ê: 202,
  Ë: 203,
  Ì: 204,
  Í: 205,
};
