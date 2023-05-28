const fs = require("fs");
const path = require("path");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input3.txt";
const input = fs
  .readFileSync(path.resolve(__dirname, filepath))
  .toString()
  .trim()
  .split("\n");
const [N, M] = input[0].split(" ").map(Number);
const numbers = input[1].split(" ").map(Number);

function solution(N, M, numbers) {
  numbers = numbers.sort((a, b) => a - b);
  let res = new Set();

  rec([]);

  function rec(arr) {
    if (arr.length === M) {
      res.add(arr.join(" "));
      return;
    }

    for (let i = 0; i < N; i++) {
      arr.push(numbers[i]);
      rec(arr);
      arr.pop();
    }
  }

  return [...res].join("\n");
}

console.log(solution(N, M, numbers));
