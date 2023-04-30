const fs = require("fs");
const path = require("path");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs
  .readFileSync(path.resolve(__dirname, filepath))
  .toString()
  .trim();

function solution(input) {
  const sInput = input.split("\n");
  const [Y, X] = sInput[0].split(" ").map(Number);
  const board = sInput.slice(1).map((row) => row.split(" ").map(Number));
  const visit = Array(Y)
    .fill()
    .map((_) => Array(X).fill(0));
  // 최대 크기
  let maxArea = 0;
  //  그림 개수
  let picCount = 0;

  // board와 visit을 비교하여, 방문하지 않은 좌표에 bfs 함수 실행
  for (let y = 0; y < Y; y++) {
    for (let x = 0; x < X; x++) {
      if (board[y][x] === 1 && visit[y][x] === 0) {
        const area = bfs(y, x, 1);
        // bfs가 실행될 때 마다, 그림 개수 증가
        picCount++;
        // bfs로 그림의 너비가 리턴, 기존과 비교하여 최대 크기 갱신
        if (area > maxArea) maxArea = area;
      }
    }
  }

  return `${picCount}\n${maxArea}`;

  function bfs(y, x) {
    const queue = [[y, x]];
    const dx = [0, 1, 0, -1];
    const dy = [-1, 0, 1, 0];
    let areaCount = 1;
    visit[y][x] = 1;

    while (queue.length) {
      const [y, x] = queue.shift();
      for (let i = 0; i < dx.length; i++) {
        const [ny, nx] = [y + dy[i], x + dx[i]];
        // board의 유효 범위 안에서
        if (ny >= 0 && nx >= 0 && ny < Y && nx < X) {
          // board와 visit을 비교하여, 방문하지 않은 visit 좌표를 1로 변경
          if (visit[ny][nx] === 0 && board[ny][nx] === 1) {
            visit[ny][nx] = 1;
            // 너비 증가
            areaCount++;
            queue.push([ny, nx]);
          }
        }
      }
    }
    // board를 모두 순회한 후, 너비를 리턴
    return areaCount;
  }
}

console.log(solution(input));
