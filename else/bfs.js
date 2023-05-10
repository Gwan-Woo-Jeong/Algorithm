const board = [
  "11101000",
  "10001000",
  "11101000",
  "11001000",
  "01000000",
  "00000000",
];

function solution(board) {
  let visit = Array(board.length)
    .fill()
    .map((_) => Array(board[0].length).fill("0"));

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (visit[i][j] === "0" && board[i][j] === "1") {
        bfs(i, j);
      }
    }
  }

  visit.forEach((el) => console.log(el.join("")));

  function bfs(y, x) {
    let queue = [[y, x]];
    visit[y][x] = "1";

    while (queue.length) {
      let [y, x] = queue.shift();
      let dy = [-1, 0, 1, 0];
      let dx = [0, 1, 0, -1];
      for (let i = 0; i < dx.length; i++) {
        let [ny, nx] = [y + dy[i], x + dx[i]];
        if (ny > 0 && nx > 0 && board.length > ny && board[0].length > nx) {
          if (visit[ny][nx] !== "1" && board[ny][nx] === "1") {
            visit[ny][nx] = "1";
            queue.push([ny, nx]);
          }
        }
      }
    }
  }
}

solution(board);
