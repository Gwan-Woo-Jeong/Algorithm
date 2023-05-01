var fs = require("fs");
const path = require("path");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform !== "win32" ? "\n" : "\r\n";
var input = fs
  .readFileSync(path.resolve(__dirname, filepath))
  .toString()
  .split(splitStr);

let T = +input[0];

for (let i = 1; i <= 3 * T; i += 3) {
  let N = +input[i];
  let startPos = input[i + 1].split(" ").map(Number);
  let endPos = input[i + 2].split(" ").map(Number);
  console.log(solution(N, startPos, endPos));
}

function solution(N, startPos, endPos) {
  // 탐색한 체스판 위치 (0으로 초기화)
  let visit = Array(N)
    .fill()
    .map((_) => Array(N).fill(0));

  // 큐에 시작 위치 추가
  const queue = [[startPos[0], startPos[1], 0]];

  // 탐색 위치 1 할당
  visit[startPos[0]][startPos[1]] = 1;

  // 나이트가 움직일 수 있는 상대 위치
  const dy = [-2, -2, -1, -1, 1, 1, 2, 2];
  const dx = [-1, 1, -2, 2, -2, 2, -1, 1];

  // 큐가 빌 때 까지 (모든 경로 탐색)
  while (queue.length) {
    // 큐에서 위치 값 하나를 꺼냄
    const [y, x, move] = queue.shift();

    for (let i = 0; i < dx.length; i++) {
      // 나이트가 움직일 수 있는 모든 위치 (ny, nx)
      const [ny, nx] = [y + dy[i], x + dx[i]];

      // ny, nx가 유효 범위 안이고 아직 탐색하지 않은 위치(= 0)면
      if (ny >= 0 && nx >= 0 && ny < N && nx < N && visit[ny][nx] === 0) {
        // 해당 위치에 이동 횟수 기록
        visit[ny][nx] = move + 1;
        queue.push([ny, nx, move + 1]);

        // ny, nx가 도착 지점과 일치하면, 이동 횟수 리턴
        if (ny === endPos[0] && nx === endPos[1]) return move + 1;
      }
    }
  }

  // 도착 지점에 도달할 수 없으면 0 리턴
  return 0;
}
