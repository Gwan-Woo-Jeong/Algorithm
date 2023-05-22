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

function solution(N, M) {
  let res = "";

  rec([], 1);

  function rec(arr) {
    if (arr.length === M) {
      res += arr.join(" ") + "\n";
      return;
    }

    let start = 1;
    if (arr.length) start = arr[arr.length - 1];

    for (let i = start; i <= N; i++) {
      arr.push(i);
      rec(arr);
      arr.pop();
    }
  }

  return res.trim();
}

console.log(solution(N, M));
