const board = [
  "11101000",
  "11101000",
  "11101000",
  "11001000",
  "01000000",
  "00000000",
];

const board2 = ["000000", "000000", "000000", "000000", "000000", "000000"];

function solution(board, board2) {
  board.forEach((el, i) => (board[i] = el.split("").map(Number)));

  // board.forEach((el) => console.log(el.join("")));

  let visit = Array(board.length)
    .fill()
    .map((_) => Array(board[0].length).fill(0));

  let count = 1;
  let dy = [-1, 0, 1, 0];
  let dx = [0, 1, 0, -1];

  dfs(0, 0);

  visit.forEach((el) => console.log(el.join(" ")));

  // 재귀 (콜 스택)
  function dfs(y, x) {
    if (visit[y][x]) return;
    visit[y][x] = count++;

    for (let i = 0; i < 4; i++) {
      const [ny, nx] = [y + dy[i], x + dx[i]];

      if (ny < 0 || nx < 0 || ny >= board.length || nx >= board[0].length)
        continue;
      if (visit[ny][nx] === 1 || board[ny][nx] !== 1) continue;

      dfs(ny, nx);
    }
  }

  // 스택
  function dfs(sy, sx) {
    const stack = [[sy, sx]];

    while (stack.length) {
      const [y, x] = stack.pop();
      if (visit[y][x]) continue;

      visit[y][x] = 1;

      for (let i = 0; i < 4; i++) {
        const [ny, nx] = [y + dy[i], x + dx[i]];

        if (ny < 0 || nx < 0 || ny >= board.length || nx >= board[0].length)
          continue;
        if (visit[ny][nx] === 1 || board[ny][nx] !== 1) continue;
        stack.push([ny, nx]);
      }
    }
  }
}

console.log(solution(board, board2));
