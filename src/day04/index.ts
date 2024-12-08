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

const xmas = ["X", "M", "A", "S"];
const directions: Direction[] = [
  { direction: "horizontal", x: -1, y: 0 },
  { direction: "horizontal", x: 1, y: 0 },
  { direction: "vertical", x: 0, y: 1 },
  { direction: "vertical", x: 0, y: -1 },
  { direction: "diagonal1", x: 1, y: 1 },
  { direction: "diagonal1", x: -1, y: -1 },
  { direction: "diagonal2", x: 1, y: -1 },
  { direction: "diagonal2", x: -1, y: 1 },
];

let xmasCount = 0;

for (let j = 0; j < table.length; j++) {
  for (let i = 0; i < table[j].length; i++) {
    if (table[j][i] === "X") {
      for (const direction of directions) {
        let x = direction.x;
        let y = direction.y;
        function checkRest(): boolean {
          return (
            table[j + y][i + x] === "M" &&
            table[j + 2 * y][i + 2 * x] === "A" &&
            table[j + 3 * y][i + 3 * x] === "S"
          );
        }
        if (
          i <= table[j].length - 1 - 3 * x &&
          i >= -3 * x &&
          j <= table.length - 1 - 3 * y &&
          j >= -3 * y
        ) {
          if (checkRest()) {
            xmasCount += 1;
          }
        }
      }
    }
  }
}

console.log(xmasCount);
