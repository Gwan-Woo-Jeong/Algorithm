const fs = require("fs");
const path = require("path");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
const input = fs
  .readFileSync(path.resolve(__dirname, filepath))
  .toString()
  .trim()
  .split(splitStr);
const [N, M] = input[0].split(" ").map(Number);

function solution(N, M) {
  let res = "";

  combi([], 1);

  function combi(arr, idx) {
    if (arr.length === M) {
      res += arr.join(" ") + "\n";
      return;
    }

    for (let i = idx; i <= N; i++) {
      arr.push(i);
      combi(arr, i + 1);
      arr.pop();
    }
  }

  return res;
}

console.log(solution(N, M));
