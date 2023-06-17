const fs = require("fs");
const path = require("path");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input2.txt";
const splitStr = process.platform !== "win32" ? "\n" : "\r\n";
const input = fs
  .readFileSync(path.resolve(__dirname, filepath))
  .toString()
  .split(splitStr);

const [N, M] = input[0].split(" ").map(Number);
const [sy, sx, sdir] = input[1].split(" ").map(Number);

const map = input.slice(2, N + 2).map((r) => r.split(" ").map(Number));

function solution(N, M, sy, sx, sdir, map) {
  /*
    BFS 영역 탐색
    1. 현재 위치 방문 처리
    2. 4 방향 탐색

    청소 안한 칸이 있으면 회전
    4. 바라보는 칸이 청소 안한 칸이면 전진
    5. 1번부터 다시 시작

    청소 안한 칸이 없으면
    6. 뒤에 칸이 있으면 후진 없으면 중단
   */

  let cnt = 0;

  const dy = [-1, 0, 1, 0];
  const dx = [0, 1, 0, -1];

  const queue = [[sy, sx, sdir]];

  while (queue.length) {
    let [y, x, dir] = queue.shift();

    if (map[y][x] === 0) {
      map[y][x] = 2;
      cnt++;
    }

    // 주변 탐색
    for (let i = 0; i < 4; i++) {
      const [ny, nx] = [y + dy[i], x + dx[i]];

      // 청소할 칸이 있는 경우 반시계 방향 회전
      if (map[ny][nx] === 0) {
        const ndir = dir - 1 < 0 ? 4 + (dir - 1) : dir - 1;
        const [ny, nx] = [y + dy[ndir], x + dx[ndir]];

        // 청소할 칸을 보고 있으면 전진 아니면 위 과정 다시 반복
        if (map[ny][nx] === 0) {
          queue.push([ny, nx, ndir]);
        } else {
          queue.push([y, x, ndir]);
        }
        break;
      }

      // 청소할 칸이 없는 경우
      if (i === 3) {
        const back = (dir + 2) % 4;
        const [by, bx] = [y + dy[back], x + dx[back]];

        // 뒤로 갈 수 있으면 후진
        if (map[by][bx] !== 1) queue.push([by, bx, dir]);
      }
    }
  }

  return cnt;
}

console.log(solution(N, M, sy, sx, sdir, map));
