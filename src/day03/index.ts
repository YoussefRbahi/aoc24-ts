import fs from "fs";

import path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

function isNumber(string: string) {
  return string === String(Number(string));
}

function evalMuls(corruptedText: string): number {
  let total = 0;
  const noMulArray = corruptedText.split("mul(");
  for (const potentialMul of noMulArray) {
    let mulArgs: string[] = [];
    if (potentialMul.includes(")")) {
      mulArgs = potentialMul.slice(0, potentialMul.indexOf(")")).split(",");
    }
    if (
      mulArgs.length === 2 &&
      isNumber(mulArgs[0]) &&
      isNumber(mulArgs[1]) &&
      Number(mulArgs[0]) < 1000 &&
      Number(mulArgs[1]) < 1000 &&
      Number(mulArgs[0]) > 0 &&
      Number(mulArgs[1]) > 0
    ) {
      total += Number(mulArgs[0]) * Number(mulArgs[1]);
    }
  }
  return total;
}

const doArrays = input.split("do()");

let realTotal = 0;
for (const doArray of doArrays) {
  if (doArray.includes("don't()")) {
    const doDont = doArray.split("don't()");
    realTotal += evalMuls(doDont[0]);
  } else realTotal += evalMuls(doArray);
}

console.log(realTotal);
