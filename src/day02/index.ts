import fs from "fs";

import path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

const arrays: number[][] = input
  .split("\n")
  .map((line) => line.split(" ").map(Number));

let safeSum: number = 0;

for (const array of arrays) {
  let isSafe = true;
  if (array[array.length - 1] > array[0]) {
    for (let i = 1; i < array.length; i++) {
      if (
        array[i] - array[i - 1] === 1 ||
        array[i] - array[i - 1] === 2 ||
        array[i] - array[i - 1] === 3
      ) {
        continue;
      } else {
        isSafe = false;
        break;
      }
    }
  } else if (array[array.length - 1] < array[0]) {
    for (let i = 1; i < array.length; i++) {
      if (
        array[i - 1] - array[i] === 1 ||
        array[i - 1] - array[i] === 2 ||
        array[i - 1] - array[i] === 3
      ) {
        continue;
      } else {
        isSafe = false;
        break;
      }
    }
  } else isSafe = false;

  if (isSafe) {
    safeSum += 1;
    console.log(array);
  }
}

console.log(safeSum);
