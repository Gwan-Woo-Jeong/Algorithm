const fs = require("fs");
const path = require("path");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform !== "win32" ? "\n" : "\r\n";
const input = fs
  .readFileSync(path.resolve(__dirname, filepath))
  .toString()
  .trim()
  .split(splitStr);

const [N, M] = input[0].split(" ").map(Number);
const map = input.slice(1).map((el) => el.split("").map(Number));

function solution(N, M, map) {
  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  // 벽 부수고 이동한 visited[1]과 벽을 부수지 않은 visited[0] 이차원 배열 2개를 생성
  const visited = Array(2)
    .fill()
    .map((_) =>
      Array(N)
        .fill()
        .map((_) => Array(M).fill(0))
    );

  let queue = [[0, 0, 1, 0]];

  visited[0][0][0] = 1;

  while (queue.length) {
    let nq = [];

    for (let i = 0; i < queue.length; i++) {
      const [y, x, move, breaks] = queue[i];

      for (let j = 0; j < 4; j++) {
        const [ny, nx] = [y + dy[j], x + dx[j]];

        // (N, M)에 도달할 경우, 거리 리턴
        if (y === N - 1 && x === M - 1) return move;

        // 미로의 유효 범위 안에서
        if (ny >= 0 && nx >= 0 && ny < N && nx < M) {
          // 벽을 부수지 않아도 되는 케이스
          if (map[ny][nx] === 0 && visited[breaks][ny][nx] === 0) {
            visited[breaks][ny][nx] = 1;
            nq.push([ny, nx, move + 1, breaks]);
            // 벽을 부숴야하는 케이스 (breaks가 1 이상이면 벽을 부수지 못함)
          } else if (
            map[ny][nx] === 1 &&
            breaks === 0 &&
            visited[breaks + 1][ny][nx] === 0
          ) {
            visited[breaks + 1][ny][nx] = 1;
            nq.push([ny, nx, move + 1, breaks + 1]);
          }
        }
      }
    }
    queue = nq;
  }

  // (N, M)에 도달하지 못하는 경우 -1 리턴
  return -1;
}

console.log(solution(N, M, map));
