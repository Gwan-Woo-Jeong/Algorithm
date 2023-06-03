const fs = require("fs");
const path = require("path");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform !== "win32" ? "\n" : "\r\n";
const input = fs
  .readFileSync(path.resolve(__dirname, filepath))
  .toString()
  .split(splitStr);

const N = +input[0];
const eggs = input.slice(1, N + 1).map((r) => r.split(" ").map(Number));

function solution(N, eggs) {
  let answer = 0;

  rec(0, 0);

  return answer;

  function rec(select, cnt) {
    // 선택한 계란이 마지막이면 종료
    if (select === N - 1) {
      return (answer = Math.max(answer, cnt));
    }
    // 계란 들어서
    const [s, w] = eggs[select];
    let flag = 0;

    if (s <= 0) {
      rec(select + 1, cnt);
    } else {
      // 선택한 계란을 제외한 나머지 계란을 침
      for (let i = 0; i < N; i++) {
        if (select === i) continue;
        const [s2, w2] = eggs[i];
        if (s2 <= 0) continue;
        flag = 1;
        // 계란 깨기
        eggs[i][0] -= w;
        eggs[select][0] -= w2;
        // 다음 계란으로 재귀
        rec(select + 1, cnt + (eggs[i][0] <= 0) + (eggs[select][0] <= 0));
        // 깨진 계란 다시 복구
        eggs[i][0] += w;
        eggs[select][0] += w2;
      }

      // 깨진 계란이 없으면 마지막 계란으로 재귀
      if (!flag) {
        rec(N - 1, cnt);
      }
    }
  }
}

console.log(solution(N, eggs));
