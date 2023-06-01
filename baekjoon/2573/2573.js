const fs = require("fs");
const path = require("path");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs
  .readFileSync(path.resolve(__dirname, filepath))
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const maps = input.slice(1).map((r) => r.split(" ").map(Number));

function solution(N, M, maps) {
  let years = 0;
  let lands = 0;

  const dy = [1, -1, 0, 0];
  const dx = [0, 0, 1, -1];

  while (lands < 2) {
    lands = 0;

    const visit = Array(N)
      .fill()
      .map((_) => Array(M).fill(0));

    for (let y = 0; y < N; y++) {
      for (let x = 0; x < M; x++) {
        if (maps[y][x] !== 0 && visit[y][x] === 0) {
          bfs(y, x, visit);
          // bfs가 실행된 횟수 = 빙산의 개수
          lands++;
        }
      }
    }

    if (lands === 0) return 0;
    // 빙산이 하나면
    if (lands === 1) {
      // 맵을 갱신
      maps = getNextMap(maps);
      // 연수 누적
      years++;
    }
  }

  return years;

  function bfs(sy, sx, visit) {
    const queue = [[sy, sx]];
    visit[sy][sx] = 1;

    while (queue.length) {
      const [y, x] = queue.shift();

      for (let i = 0; i < 4; i++) {
        const [ny, nx] = [y + dy[i], x + dx[i]];

        if (ny < 0 || nx < 0 || ny >= N || nx >= M) continue;
        if (visit[ny][nx]) continue;
        if (maps[ny][nx] === 0) continue;

        visit[ny][nx] = 1;
        queue.push([ny, nx]);
      }
    }
  }

  // 빙산 녹이기
  function getNextMap(maps) {
    // 새로운 맵 생성
    const newMap = Array(N)
      .fill()
      .map((_) => Array(M).fill(0));

    for (let y = 0; y < N; y++) {
      for (let x = 0; x < M; x++) {
        // 빙산가 있는 곳에서
        if (maps[y][x] === 0) continue;
        // 높이 세기
        let count = 0;
        // 유효 범위 내에서
        for (let i = 0; i < 4; i++) {
          const [ny, nx] = [y + dy[i], x + dx[i]];
          if (ny < 0 || nx < 0 || ny >= N || nx >= M) continue;
          // 빙산 주변의 바다 면의 개수를 셈
          if (maps[ny][nx] === 0) count++;
        }

        // 개수를 빼서 새로운 맵에 기록
        newMap[y][x] = maps[y][x] - count;
        // 음수가 되면 0으로 기록
        if (newMap[y][x] < 0) newMap[y][x] = 0;
      }
    }
    return newMap;
  }
}

console.log(solution(N, M, maps));
