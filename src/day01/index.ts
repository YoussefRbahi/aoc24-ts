import fs from "fs";

import path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

const lines = input.split("\n");

let leftColumn: number[] = [];
let rightColumn: number[] = [];

for (const line of lines) {
  const [left, right] = line.split("   ").map(Number);
  leftColumn.push(left);
  rightColumn.push(right);
}

leftColumn.sort((a, b) => a - b);
rightColumn.sort((a, b) => a - b);
let distanceSum: number = 0;

for (let i = 0; i < leftColumn.length; i++) {
  distanceSum += Math.abs(leftColumn[i] - rightColumn[i]);
}

console.log("The total distance is:", distanceSum);

let similaritySum: number = 0;

for (const leftValue of leftColumn) {
  for (const rightValue of rightColumn) {
    if (leftValue === rightValue) {
      similaritySum += leftValue;
    } else if (rightValue > leftValue) {
      break;
    }
  }
}

console.log("The similarity score is:", similaritySum);
