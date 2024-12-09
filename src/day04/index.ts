import fs from "fs";

import path from "path";
interface Direction {
  direction: string;
  x: number;
  y: number;
}

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

const lines = input.split(/\r?\n/);

const table: string[][] = [];

for (const line of lines) {
  table.push(line.split(""));
}

// Part 1

const directions: Direction[] = [
  { direction: "horizontal", x: 1, y: 0 },
  { direction: "vertical", x: 0, y: 1 },
  { direction: "diagonal1", x: 1, y: 1 },
  { direction: "diagonal2", x: 1, y: -1 },
];

let xmasCount = 0;

for (let j = 0; j < table.length; j++) {
  for (let i = 0; i < table[j].length; i++) {
    if (table[j][i] === "X") {
      for (const direction of directions) {
        for (const sign of [-1, 1]) {
          let x = direction.x * sign;
          let y = direction.y * sign;
          if (
            table[j + y]?.[i + x] === "M" &&
            table[j + 2 * y]?.[i + 2 * x] === "A" &&
            table[j + 3 * y]?.[i + 3 * x] === "S"
          ) {
            xmasCount += 1;
          }
        }
      }
    }
  }
}

console.log("Part 1 answer: ", xmasCount);

// Part 2

let realXmasCount = 0;

function checkMAS(j: number, i: number, x: number, y: number): boolean {
  return table[j + x]?.[i + y] === "M" && table[j - x]?.[i - y] === "S";
}

for (let j = 0; j < table.length; j++) {
  for (let i = 0; i < table[j].length; i++) {
    if (table[j][i] === "A") {
      if (
        (checkMAS(j, i, 1, 1) || checkMAS(j, i, -1, -1)) &&
        (checkMAS(j, i, -1, 1) || checkMAS(j, i, 1, -1))
      ) {
        realXmasCount += 1;
      }
    }
  }
}

console.log("Part 2 answer: ", realXmasCount);

// Old Part 1

// const directions: Direction[] = [
//   { direction: "horizontal", x: -1, y: 0 },
//   { direction: "horizontal", x: 1, y: 0 },
//   { direction: "vertical", x: 0, y: 1 },
//   { direction: "vertical", x: 0, y: -1 },
//   { direction: "diagonal1", x: 1, y: 1 },
//   { direction: "diagonal1", x: -1, y: -1 },
//   { direction: "diagonal2", x: 1, y: -1 },
//   { direction: "diagonal2", x: -1, y: 1 },
// ];

// let xmasCount = 0;

// for (let j = 0; j < table.length; j++) {
//   for (let i = 0; i < table[j].length; i++) {
//     if (table[j][i] === "X") {
//       for (const direction of directions) {
//         let x = direction.x;
//         let y = direction.y;
//         function checkRest(): boolean {
//           return (
//             table[j + y][i + x] === "M" &&
//             table[j + 2 * y][i + 2 * x] === "A" &&
//             table[j + 3 * y][i + 3 * x] === "S"
//           );
//         }
//         if (
//           i <= table[j].length - 1 - 3 * x &&
//           i >= -3 * x &&
//           j <= table.length - 1 - 3 * y &&
//           j >= -3 * y
//         ) {
//           if (checkRest()) {
//             xmasCount += 1;
//           }
//         }
//       }
//     }
//   }
// }

// console.log(xmasCount);
