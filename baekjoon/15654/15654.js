const fs = require("fs");
const path = require("path");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input3.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
const input = fs
  .readFileSync(path.resolve(__dirname, filepath))
  .toString()
  .trim()
  .split(splitStr);
const [N, M] = input[0].split(" ").map(Number);
const numbers = input[1].split(" ").map(Number);

function solution(N, M, numbers) {
  numbers = numbers.sort((a, b) => a - b);

  let res = "";
  let visit = Array(N + 1).fill(0);

  rec([]);

  function rec(arr) {
    if (arr.length === M) {
      res += arr.join(" ") + "\n";
      return;
    }

    for (let i = 0; i < N; i++) {
      if (visit[i]) continue;
      visit[i] = 1;
      arr.push(numbers[i]);
      rec(arr);
      arr.pop();
      visit[i] = 0;
    }
  }

  return res.trim();
}

console.log(solution(N, M, numbers));
