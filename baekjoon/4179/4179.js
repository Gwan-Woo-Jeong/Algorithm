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
  // BFS 함수
  // F는 좌표에 F를 표시하며 미로를 탐색
  // J는 벽(#)과 불(F)이 표시되지 않은 좌표에 최단거리(시간)을 표시하며 미로를 탐색
  // 탐색 시 ny, nx 위치가 미로의 끝자리 인덱스라면 최단거리 + 2 리턴
  // 만나지 못하면 IMPOSSIBLE 리턴

  let startPoint;
  let firePoints = [];

  for (let y = 0; y < C; y++) {
    for (let x = 0; x < R; x++) {
      if (matrix[y][x] === "J") startPoint = [y, x, 0];
      if (matrix[y][x] === "F") firePoints.push([y, x, "F"]);
    }
  }

  const queue = [startPoint, ...firePoints];

  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  while (queue.length) {
    const [y, x, mark] = queue.shift();

    for (let i = 0; i < dx.length; i++) {
      const [ny, nx] = [y + dy[i], x + dx[i]];

      if (ny >= 0 && nx >= 0 && ny < C && nx < R) {
        if (matrix[ny][nx] === ".") {
          if (mark === "F") {
            matrix[ny][nx] = "F";
            queue.push([ny, nx, "F"]);
          } else {
            if (ny === 0 || nx === 0 || ny === C - 1 || nx === R - 1)
              return mark + 2;
            matrix[ny][nx] = mark + 1;
            queue.push([ny, nx, mark + 1]);
          }
        }
      }
    }
  }

  return "IMPOSSIBLE";
}

console.log(solution(R, C, matrix));
