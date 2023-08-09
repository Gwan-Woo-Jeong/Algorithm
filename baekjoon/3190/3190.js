const fs = require("fs");
const path = require("path");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform !== "win32" ? "\n" : "\r\n";
const input = fs
  .readFileSync(path.resolve(__dirname, filepath))
  .toString()
  .split(splitStr);

const N = +input[0];
const K = +input[1];
const appleInfo = input.slice(2, K + 2).map((el) => el.split(" ").map(Number));
const dirCount = +input[K + 2];
const dirInfo = input
  .slice(K + 3, K + 3 + dirCount)
  .map((el) => el.split(" ").map((el, i) => (i === 0 ? Number(el) : el)));

function solution(N, appleInfo, dirInfo) {
  let time = 0;

  const board = Array(N)
    .fill()
    .map((_) => Array(N).fill(0));

  appleInfo.forEach(([y, x]) => (board[y - 1][x - 1] = 2)); // 사과 기록

  const dirMap = new Map(dirInfo);

  const dy = [0, 1, 0, -1];
  const dx = [1, 0, -1, 0]; // 우, 상, 좌, 하

  let headIdx = 0;
  let tailIdx = 0;

  const queue = [[0, 0]];
  board[0][0] = 1; // 뱀 방문 처리

  while (true) {
    const [hy, hx] = queue[queue.length - 1];

    if (dirMap.has(time)) {
      if (dirMap.get(time) === "D") {
        headIdx = (headIdx + 1) % 4;
      } else {
        headIdx = (headIdx + 3) % 4;
      }
      dirMap.delete(time);
    }

    const [ny, nx] = [hy + dy[headIdx], hx + dx[headIdx]];

    time++;
    if (ny < 0 || nx < 0 || ny >= N || nx >= N || board[ny][nx] === 1)
      return time;

    queue.push([ny, nx]);

    if (board[ny][nx] !== 2) {
      const [ty, tx] = queue[tailIdx];
      board[ty][tx] = 0;
      tailIdx++;
    }

    board[ny][nx] = 1;
  }
}

console.log(solution(N, appleInfo, dirInfo));
