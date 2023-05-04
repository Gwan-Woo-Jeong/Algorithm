const fs = require("fs");
const path = require("path");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = "\r\n";
const input = fs
  .readFileSync(path.resolve(__dirname, filepath))
  .toString()
  .trim()
  .split(splitStr);

const [R, C] = input[0].split(" ").map(Number);
const matrix = input.slice(1, R + 1).map((el) => el.split(""));

function solution(R, C, matrix) {
  // 미로에서 초기 위치(J)와 불이 난 공간 (F)를 찾아 BFS 실행
  // BFS 함수 2가지
  // fbfs 함수 : F 위치를 중심으로 거리 표시 (-1)
  // jbfs 함수 : fbfs 리턴한 matrix에 J 위치를 중심으로 거리 표시. 음수 + 양수의 결과가 양수면 갈 수 있는 길, 음수면 못가는 길
  // 좌표 탐색 시 ny, nx 위치가 미로의 끝자리 인덱스라면 최단거리 + 2 리턴
  // F는 좌표에 F를 표시하며 미로를 탐색
  // 만나지 못하면 IMPOSSIBLE 리턴

  const fMatrix = matrix.slice();

  const fQueue = [];
  const jQueue = [];

  for (let y = 0; y < R; y++) {
    for (let x = 0; x < C; x++) {
      if (matrix[y][x] === "J") jQueue.push([y, x, 0]);
      if (matrix[y][x] === "F") {
        matrix[y][x] = 0;
        fQueue.push([y, x, 0]);
      }
    }
  }

  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  while (fQueue.length) {
    const [y, x, cnt] = fQueue.shift();

    for (let i = 0; i < dx.length; i++) {
      const [ny, nx] = [y + dy[i], x + dx[i]];

      if (ny >= 0 && nx >= 0 && ny < R && nx < C) {
        if (fMatrix[ny][nx] === "." || fMatrix[ny][nx] === "J") {
          fMatrix[ny][nx] = cnt - 1;
          fQueue.push([ny, nx, cnt - 1]);
        }
      }
    }
  }

  while (jQueue.length) {
    const [y, x, cnt] = jQueue.shift();

    for (let i = 0; i < dx.length; i++) {
      const [ny, nx] = [y + dy[i], x + dx[i]];

      if (ny >= 0 && nx >= 0 && ny < R && nx < C) {
        if (fMatrix[ny][nx] === ".") {
          if (ny === 0 || nx === 0 || ny === R - 1 || nx === C - 1)
            return cnt + 2;
          matrix[ny][nx] = cnt + 1;
          jQueue.push([ny, nx, cnt + 1]);
        } else if (fMatrix[ny][nx] < 0 && fMatrix[ny][nx] + cnt + 1 < 0) {
          if (ny === 0 || nx === 0 || ny === R - 1 || nx === C - 1)
            return cnt + 2;
          matrix[ny][nx] = cnt + 1;
          jQueue.push([ny, nx, cnt + 1]);
        }
      }
    }
  }
  console.log(matrix);

  return "IMPOSSIBLE";
}

console.log(solution(R, C, matrix));
