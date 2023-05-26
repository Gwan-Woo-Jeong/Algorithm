const fs = require("fs");
const path = require("path");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs
  .readFileSync(path.resolve(__dirname, filepath))
  .toString()
  .trim()
  .split("\n");
const [N, M] = input[0].split(" ").map(Number);
const numbers = input[1].split(" ").map(Number);

function solution(N, M, numbers) {
  numbers = numbers.sort((a, b) => a - b);

  let res = "";
  let visited = Array(N).fill(0);

  rec([], 0);

  function rec(arr) {
    if (arr.length === M) {
      res += arr.join(" ") + "\n";
      return;
    }

    let prev = 0;

    for (let i = 0; i < N; i++) {
      if (visited[i] || prev === numbers[i]) continue;
      visited[i] = 1;
      arr.push(numbers[i]);
      prev = numbers[i];
      rec(arr);
      arr.pop();
      visited[i] = 0;
    }
  }

  return res;
}

console.log(solution(N, M, numbers));
