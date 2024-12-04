import fs from "fs";

import path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

const reports: number[][] = input
  .split("\n")
  .map((line) => line.split(" ").map(Number));

let safeSum: number = 0;

function checkreport(report: number[]): boolean {
  let isSafe = true;
  if (report[report.length - 1] > report[0]) {
    for (let i = 1; i < report.length; i++) {
      if (
        report[i] - report[i - 1] === 1 ||
        report[i] - report[i - 1] === 2 ||
        report[i] - report[i - 1] === 3
      ) {
        continue;
      } else {
        isSafe = false;
        break;
      }
    }
  } else if (report[report.length - 1] < report[0]) {
    for (let i = 1; i < report.length; i++) {
      if (
        report[i - 1] - report[i] === 1 ||
        report[i - 1] - report[i] === 2 ||
        report[i - 1] - report[i] === 3
      ) {
        continue;
      } else {
        isSafe = false;
        break;
      }
    }
  } else isSafe = false;

  return isSafe;
}

for (const report of reports) {
  if (checkreport(report)) {
    safeSum += 1;
  } else {
    for (let i = 0; i < report.length; i++) {
      const shorterReport = [...report];
      shorterReport.splice(i, 1);
      if (checkreport(shorterReport)) {
        safeSum += 1;
        break;
      }
    }
  }
}

console.log(safeSum);
