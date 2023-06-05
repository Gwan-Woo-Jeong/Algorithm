const fs = require("fs");
const path = require("path");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input7.txt";
const splitStr = process.platform !== "win32" ? "\n" : "\r\n";
const input = fs
  .readFileSync(path.resolve(__dirname, filepath))
  .toString()
  .split(splitStr);

const N = +input[0];
const eggs = input.slice(1, N + 1).map((r) => r.split(" ").map(Number));

function solution(N, eggs) {
  let answer = -1;
  // 마지막 계란이면 재귀 종료
  // 계란 하나를 든다
  // 든 계란이 깨져있으면 다음 계란 재귀
  // 칠 수 있는 계란을 순회
  // 든 계란 내구도 빼기
  // 친 계란 내구도 빼기
  // 다음 계란 재귀
  // 계란 내구도 초기화
  // 계란을 치지 않았으면 마지막 재귀

  rec(0, 0);

  return answer;

  function rec(idx, count) {
    if (idx === N) {
      return (answer = Math.max(count, answer));
    }

    if (eggs[idx][0] <= 0) {
      rec(idx + 1, count);
    } else {
      let flag = 0;
      for (let i = 0; i < N; i++) {
        if (idx === i || eggs[i][0] <= 0) continue;
        flag = 1;
        eggs[idx][0] -= eggs[i][1];
        eggs[i][0] -= eggs[idx][1];

        rec(idx + 1, count + (eggs[idx][0] <= 0) + (eggs[i][0] <= 0));

        eggs[idx][0] += eggs[i][1];
        eggs[i][0] += eggs[idx][1];
      }

      if (!flag) rec(N, count);
    }
  }
}

console.log(solution(N, eggs));
