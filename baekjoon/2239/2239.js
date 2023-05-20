const fs = require("fs");
const path = require("path");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform !== "win32" ? "\n" : "\r\n";
const input = fs
  .readFileSync(path.resolve(__dirname, filepath))
  .toString()
  .trim()
  .split(splitStr);

const board = input.map((row) => row.split("").map(Number));

function solution(board) {
  // 방문 배열
  // 가로
  const visit1 = Array(10)
    .fill()
    .map((_) => Array(10).fill(0));

  // 세로
  const visit2 = Array(10)
    .fill()
    .map((_) => Array(10).fill(0));

  // 정사각형
  const visit3 = Array(10)
    .fill()
    .map((_) => Array(10).fill(0));

  // board에서 빈 칸이 아닌 곳 방문처리
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board.length; x++) {
      if (board[y][x] !== 0)
        visit1[y][board[y][x]] =
          visit2[x][board[y][x]] =
          visit3[getSquareNum(y, x)][board[y][x]] =
            1;
    }
  }

  let answer = "";
  let flag = false;

  rec(0);
  return answer;

  // 재귀 함수
  function rec(pos) {
    // 마지막 숫자 81(= 9 X 9)를 계산하거나 정답이 존재하면 재귀 종료
    if (flag) return;
    if (pos === 81) {
      flag = true;
      board.forEach(
        (el) => (answer += (answer.length ? "\n" : "") + el.join(""))
      );
      return;
    }

    const y = Math.floor(pos / 9);
    const x = pos % 9;

    // 칸이 비었으면
    if (board[y][x] === 0) {
      // 넣을 수 있는 수 (1 ~ 9)에서
      for (let n = 1; n <= 9; n++) {
        // 이미 있는 숫자면 스킵
        if (visit1[y][n] || visit2[x][n] || visit3[getSquareNum(y, x)][n])
          continue;
        // 해당 숫자 방문 처리
        visit1[y][n] = visit2[x][n] = visit3[getSquareNum(y, x)][n] = 1;
        // 해당 숫자 board에 삽입
        board[y][x] = n;
        // 다음 숫자로 재귀
        rec(pos + 1);
        // 해당 숫자 board에서 빼기
        board[y][x] = 0;
        // 해당 숫자 방문 초기화
        visit1[y][n] = visit2[x][n] = visit3[getSquareNum(y, x)][n] = 0;
      }
      // 칸에 숫자가 있으면
    } else {
      // 다음 숫자로 재귀
      rec(pos + 1);
    }
  }

  // 빈 칸이 속한 정사각형 위치를 찾는 함수
  function getSquareNum(y, x) {
    if (y < 3) {
      if (x < 3) return 1;
      if (x < 6) return 2;
      if (x < 9) return 3;
    }
    if (y < 6) {
      if (x < 3) return 4;
      if (x < 6) return 5;
      if (x < 9) return 6;
    }
    if (y < 9) {
      if (x < 3) return 7;
      if (x < 6) return 8;
      if (x < 9) return 9;
    }
  }
}

console.log(solution(board));
