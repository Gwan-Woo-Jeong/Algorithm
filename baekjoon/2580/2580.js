var fs = require("fs");
var path = require("path");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs
  .readFileSync(path.resolve(__dirname, filepath))
  .toString()
  .trim()
  .split(splitStr);
let matrix = input.map((el) => el.split(" ").map(Number));

function solution(matrix) {
  let answer = "";

  // x축 방문 배열
  const visitX = Array(10)
    .fill()
    .map((_) => Array(10).fill(0));

  // y축 방문 배열
  const visitY = Array(10)
    .fill()
    .map((_) => Array(10).fill(0));

  // 정사각형 범위 방문 배열
  const visitS = Array(10)
    .fill()
    .map((_) => Array(10).fill(0));

  //
  let flag = 0;

  // 스도쿠 판을 순회하여
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix.length; x++) {
      // 숫자가 존재하면
      if (matrix[y][x] !== 0)
        // 각 방문 배열에 숫자에 해당하는 인덱스에 방문 표시
        visitS[getSquareNum(y, x)][matrix[y][x]] =
          visitY[y][matrix[y][x]] =
          visitX[x][matrix[y][x]] =
            1;
    }
  }

  // 0부터 시작
  rec(0);

  return answer;

  function rec(pos) {
    // 마지막 숫자에 도달하면 재귀 종료한 후 완성된 스도쿠 판 하나를 리턴
    if (flag) return;

    if (pos === 81) {
      flag = 1;
      matrix.forEach((el) => (answer += "\n" + el.join(" ")));
      return;
    }

    // y값 : 숫자를 9로 나눈 몫의 값
    // x값 : 숫자를 9로 나눈 나머지의 값
    let y = Math.floor(pos / 9);
    let x = pos % 9;

    // 스도쿠 칸이 비어있으면
    if (matrix[y][x] === 0) {
      // 1~9까지 수 중에서
      for (let i = 1; i <= 9; i++) {
        // 방문 배열에 방문 표시가 되어있다면 스킵
        if (visitX[x][i] || visitY[y][i] || visitS[getSquareNum(y, x)][i])
          continue;
        // 각 방문 배열에 방문 표시
        visitX[x][i] = visitY[y][i] = visitS[getSquareNum(y, x)][i] = 1;
        // 스도쿠 칸에 숫자 삽입
        matrix[y][x] = i;
        // 다음 수를 재귀 실행
        rec(pos + 1);
        // 스도쿠 칸의 숫자를 제거
        matrix[y][x] = 0;
        // 각 방문 배열의 방문 표시 제거
        visitX[x][i] = visitY[y][i] = visitS[getSquareNum(y, x)][i] = 0;
      }
      // 스도쿠 칸에 숫자가 있으면
    } else {
      //  다음 수를 재귀 실행
      rec(pos + 1);
    }
  }

  // 숫자가 위치하는 정사각형 범위를 리턴
  function getSquareNum(y, x) {
    if (y < 3 && x < 3) return 1;
    if (y < 3 && x < 6) return 2;
    if (y < 3 && x < 9) return 3;
    if (y < 6 && x < 3) return 4;
    if (y < 6 && x < 6) return 5;
    if (y < 6 && x < 9) return 6;
    if (y < 9 && x < 3) return 7;
    if (y < 9 && x < 6) return 8;
    if (y < 9 && x < 9) return 9;
  }
}

console.log(solution(matrix));
