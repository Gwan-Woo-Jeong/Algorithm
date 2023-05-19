var fs = require("fs");
var path = require("path");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = "\n";
var input = fs
  .readFileSync(path.resolve(__dirname, filepath))
  .toString()
  .split(splitStr);

const N = +input[0];

function solution(N) {
  let ans = 0;
  // 방문 배열
  // 1 ) 가로
  const visitX = Array(N).fill(0);
  // 2 ) 대각 1
  const visitD1 = Array(N).fill(0);
  // 3 ) 대각 2
  const visitD2 = Array(N).fill(0);

  rec(0);

  return ans;

  function rec(y) {
    // 열의 마지막 줄에 도달하면 재귀 종료
    if (y === N) {
      ans++;
      return;
    }

    // 행을 순회
    for (let x = 0; x < N; x++) {
      // 방문 처리 된 칸은 스킵
      if (visitX[x] || visitD1[x + y + N] || visitD2[x - y + N]) continue;
      // 방문 처리
      visitX[x] = visitD1[x + y + N] = visitD2[x - y + N] = 1;

      // 다음 열로 재귀
      rec(y + 1);

      // 방문 초기화
      visitX[x] = visitD1[x + y + N] = visitD2[x - y + N] = 0;
    }
  }
}

console.log(solution(N));
