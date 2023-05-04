const fs = require("fs");
const path = require("path");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform !== "win32" ? "\n" : "\r\n";
const input = fs
  .readFileSync(path.resolve(__dirname, filepath))
  .toString()
  .trim()
  .split(splitStr);

const [R, C] = input[0].split(" ").map(Number);
const matrix = input.slice(1, R + 1).map((el) => el.split(""));

function solution(R, C, matrix) {
  // 불(F) 큐와 지훈(J) 큐
  const fQueue = [];
  const jQueue = [];

  for (let y = 0; y < R; y++) {
    for (let x = 0; x < C; x++) {
      // 미로에 위치한 J와 F를 찾음
      if (matrix[y][x] === "J") {
        // J가 미로의 가장 자리에 있을 경우, 즉시 탈출
        if (y === 0 || x === 0 || y === R - 1 || x === C - 1) return 1;
        // J 큐에 좌표 추가
        jQueue.push([y, x, 0]);
      }
      if (matrix[y][x] === "F") {
        // F 좌표 값을 0으로 초기화
        matrix[y][x] = 0;
        // F 큐에 좌표 추가
        fQueue.push([y, x, 0]);
      }
    }
  }

  // 좌표 탐색 방향
  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  // F 큐가 빌 때 까지 (미로를 모두 탐색)
  while (fQueue.length) {
    // F 큐에서 좌표 하나를 꺼냄
    const [y, x, cnt] = fQueue.shift();

    for (let i = 0; i < 4; i++) {
      // 좌표의 상하좌우 4 부분을 모두 탐색
      const [ny, nx] = [y + dy[i], x + dx[i]];
      // 탐색 좌표가 유효 범위 안이고
      if (ny >= 0 && nx >= 0 && ny < R && nx < C) {
        // 탐색 좌표 값이 .이거나 J일 때,
        if (matrix[ny][nx] === "." || matrix[ny][nx] === "J") {
          // 탐색 좌표에 불이 번진 시간 표시
          matrix[ny][nx] = cnt + 1;
          // F 큐에 해당 좌표 추가
          fQueue.push([ny, nx, cnt + 1]);
        }
      }
    }
  }

  // J 큐가 빌 때 까지 (미로를 모두 탐색)
  while (jQueue.length) {
    // J 큐에서 좌표 하나를 꺼냄
    const [y, x, cnt] = jQueue.shift();
    // 맨 처음, 시간이 0일 때 현재 좌표 값 0으로 초기화
    if (cnt === 0) matrix[y][x] = 0;

    for (let i = 0; i < 4; i++) {
      // 좌표의 상하좌우 4 부분을 모두 탐색
      const [ny, nx] = [y + dy[i], x + dx[i]];
      // 탐색 좌표가 유효 범위 안이고
      if (ny >= 0 && nx >= 0 && ny < R && nx < C) {
        // 탐색 좌표 값이 .이거나 불이 번진 시간보다 지훈의 이동 시간이 빠를 때,
        if (matrix[ny][nx] === "." || matrix[ny][nx] > cnt + 1) {
          // 지훈의 이동 시간 표시
          matrix[ny][nx] = cnt + 1;
          // J 큐에 해당 좌표 추가
          jQueue.push([ny, nx, cnt + 1]);
          // 이동할 수 있는 좌표가 미로의 가장 자리일 경우
          if (ny === 0 || nx === 0 || ny === R - 1 || nx === C - 1)
            // 이동 시간 + 2를 리턴 (미로 바깥으로 이동하기 때문)
            return cnt + 2;
        }
      }
    }
  }

  // 마지막까지 미로의 가장 자리에 도달하지 못할 경우 IMPOSSIBLE 리턴
  return "IMPOSSIBLE";
}

console.log(solution(R, C, matrix));
