const fs = require("fs");
const path = require("path");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform !== "win32" ? "\n" : "\r\n";
const input = fs
  .readFileSync(path.resolve(__dirname, filepath))
  .toString()
  .split(splitStr);

function solution(board, n, m) {
  /*
     1. 보드를 시계 방향 90도 회전
     2. bfs로 4개 이어진 알파벳 표시
     3. 표시된 알파벳 제거 후, 위에 있는 알파벳 내리기
     4. 제거된 알파벳이 없을 때까지 1-3번 반복
   */
  let cnt = 0;

  const rotated = Array(m)
    .fill()
    .map((_) => Array(n).fill(0));

  const dy = [1, 0, -1, 0];
  const dx = [0, 1, 0, -1];

  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      rotated[x][n - y - 1] = board[y][x];
    }
  }

  while (true) {
    for (let y = 0; y < m; y++) {
      for (let x = 0; x < n; x++) {
        if (rotated[y][x] !== "." && rotated[y][x].length === 1) check(y, x);
      }
    }

    if (erase()) {
      cnt++;
    } else {
      return cnt;
    }
  }

  function check(sy, sx) {
    const visited = Array(m)
      .fill()
      .map((_) => Array(n).fill(0));

    const queue = [[sy, sx]];
    const history = [[sy, sx]];

    visited[sy][sx] = 1;

    while (queue.length) {
      const [y, x] = queue.shift();
      visited[y][x] = 1;

      for (let i = 0; i < 4; i++) {
        const [ny, nx] = [y + dy[i], x + dx[i]];

        if (ny < 0 || nx < 0 || ny >= m || nx >= n) continue;

        if (
          visited[ny][nx] === 0 &&
          rotated[ny][nx][0] === rotated[sy][sx][0]
        ) {
          queue.push([ny, nx]);
          history.push([ny, nx]);
        }
      }
    }

    if (history.length >= 4) {
      history.forEach(([y, x]) => (rotated[y][x] += "-"));
    }
  }

  function erase() {
    let isErased = false;

    rotated.forEach((_, i) => {
      const filtered = rotated[i].filter((el) => el.length === 1);
      const erased = n - filtered.length;
      if (erased > 0) isErased = true;
      rotated[i] = filtered.concat(Array(erased).fill("."));
    });

    return isErased;
  }
}

console.log(solution(input, input.length, input[0].length));
