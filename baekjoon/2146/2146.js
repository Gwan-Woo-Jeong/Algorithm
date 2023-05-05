const fs = require("fs");
const path = require("path");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = "\r\n";
const input = fs
  .readFileSync(path.resolve(__dirname, filepath))
  .toString()
  .split(splitStr);

const N = +input[0];
const map = input.slice(1, 1 + N);

function solution(N, map) {
  map = map.map((row) => row.split(" ").map(Number));
  let answer = Infinity;
  let id = 2;

  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  // 탐색 좌표가 유효 범위인지 확인
  function inrange(ny, nx) {
    return ny >= 0 && nx >= 0 && ny < N && nx < N;
  }

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (map[y][x] === 1) {
        idBfs(y, x, id);
        id++;
      }
    }
  }

  getDis();
  return answer;

  // 각 섬을 고유한 id로 변환 (2 ~)
  function idBfs(y, x, id) {
    const queue = [[y, x]];
    map[y][x] = id;

    while (queue.length) {
      const [y, x] = queue.shift();

      for (let i = 0; i < 4; i++) {
        const [ny, nx] = [y + dy[i], x + dx[i]];

        if (inrange(ny, nx)) {
          if (map[ny][nx] === 1) {
            map[ny][nx] = id;
            queue.push([ny, nx]);
          }
        }
      }
    }
  }
  function getDis() {
    const queue = [];

    // 거리 표시 맵
    const visit = Array(N)
      .fill()
      .map((_) => Array(N).fill(-1));

    // 섬의 모든 좌표를 큐에 넣고 최단 거리 구함.
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        if (map[y][x] !== 0) {
          queue.push([y, x, map[y][x]]);
          visit[y][x] = 0;
        }
      }
    }

    while (queue.length) {
      const [y, x, id] = queue.shift();

      for (let i = 0; i < 4; i++) {
        const [ny, nx] = [y + dy[i], x + dx[i]];

        if (inrange(ny, nx)) {
          // 좌표가 0이면
          if (map[ny][nx] === 0) {
            // map에는 id를
            map[ny][nx] = id;
            // visit은 증가한 거리를 기록
            visit[ny][nx] = visit[y][x] + 1;
            queue.push([ny, nx, id]);
            // 만약 최단 거리가 겹치고 섬의 id가 다르다면
          } else if (map[ny][nx] !== id) {
            // 각 최단 거리의 합이 두 섬 간의 최단 거리
            // 탐색 방향에 따라, 최단 거리가 다를 수 있으므로 모든 방향의 최단 거리 중 최소값을 구함
            answer = Math.min(answer, visit[ny][nx] + visit[y][x]);
          }
        }
      }
    }
  }
}

console.log(solution(N, map));
