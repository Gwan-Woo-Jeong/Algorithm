const fs = require("fs");
const path = require("path");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform !== "win32" ? "\n" : "\r\n";
const input = fs
  .readFileSync(path.resolve(__dirname, filepath))
  .toString()
  .trim()
  .split(splitStr);

const wheels = input.slice(0, 4).map((e) => e.split("").map(Number));
const n = +input[4];
const moves = input.slice(5, 5 + n + 1).map((e) => e.split(" ").map(Number));

function solution(wheels, moves) {
  // 각 move마다 재귀 돌려서 톱니바퀴 업데이트
  moves.forEach(([num, dir]) => {
    const visit = Array(4).fill(0);
    rec(num - 1, dir, visit, true);
  });

  let score = 0;

  // 점수 구하기
  wheels.forEach(([w, ..._], num) => {
    if (w === 1) {
      if (num === 0) score += 1;
      if (num === 1) score += 2;
      if (num === 2) score += 4;
      if (num === 3) score += 8;
    }
  });

  return score;

  // 재귀 함수
  function rec(cur, dir, visit, canRotate) {
    // 현재 톱니바퀴 방문처리
    visit[cur] = 1;

    const prev = cur - 1;
    const next = cur + 1;

    // 이전 톱니바퀴
    if (prev >= 0 && !visit[prev]) {
      // !현재 톱니바퀴가 돌지 않으면 이전 톱니바퀴도 돌지 못함
      rec(prev, -dir, visit, wheels[cur][6] !== wheels[prev][2] && canRotate);
    }

    // 다음 톱니바퀴
    if (next <= 3 && !visit[next]) {
      // !현재 톱니바퀴가 돌지 않으면 다음 톱니바퀴도 돌지 못함
      rec(next, -dir, visit, wheels[cur][2] !== wheels[next][6] && canRotate);
    }

    // 현재 톱니바퀴 돌림
    if (canRotate) {
      if (dir === 1) wheels[cur].unshift(wheels[cur].pop());
      if (dir === -1) wheels[cur].push(wheels[cur].shift());
    }
  }
}

console.log(solution(wheels, moves));
