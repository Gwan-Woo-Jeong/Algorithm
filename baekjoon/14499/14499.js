var fs = require("fs");
var path = require("path");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = "\n";
var input = fs
  .readFileSync(path.resolve(__dirname, filepath))
  .toString()
  .split(splitStr);

const [N, M, x, y] = input[0].split(" ").map(Number);
const map = input.slice(1, N + 1).map((r) => r.split(" "));
const orders = input[N + 1].split(" ");

/* 
  주사위 전개도 
    2
  4 1 3
    5
    6

  지도 각 칸 정수

  이동한 지도의 칸의 숫자가 
  1. 0이면 주사위 바닥면에 쓰여진 수 복사
  2. 0이 아니면 칸의 숫자가 주사위 바닥면에 복사 + 칸에 쓰여진 수가 0이 됨

  주사위 놓은 곳 좌표 + 이동 명령 -> 주사위 상단에 쓰여진 수 리턴

  단, 지도 바깥 이동하면 명령 무시
 */

function solution(N, M, sy, sx, map, orders) {
  // 주사위 배열
  let dice = Array(6).fill("0");

  const dy = [0, 0, -1, 1];
  const dx = [1, -1, 0, 0];

  // 명령 순회해서 주사위 움직이는 함수 실행
  orders.forEach((dir) => move(sy, sx, dir));

  // 주사위 굴리는 함수
  function roll(dir) {
    const [bottom, front, right, left, back, top] = dice;
    if (dir === "1") dice = [right, front, top, bottom, back, left];
    if (dir === "2") dice = [left, front, bottom, top, back, right];
    if (dir === "3") dice = [front, top, right, left, bottom, back];
    if (dir === "4") dice = [back, bottom, right, left, top, front];
  }

  // 지도 위에서 주사위 움직이는 함수 (조건에 따라 지도 or 주사위 바닥면 복사)
  function move(y, x, dir) {
    const [ny, nx] = [y + dy[dir - 1], x + dx[dir - 1]];

    if (ny < 0 || nx < 0 || ny >= N || nx >= M) return;
    roll(dir);

    if (map[ny][nx] === "0") {
      map[ny][nx] = dice[0];
    } else {
      dice[0] = map[ny][nx];
      map[ny][nx] = "0";
    }

    // 이동한 위치 저장
    sx = nx;
    sy = ny;

    // 윗면 숫자 출력
    console.log(dice[5]);
  }
}

solution(N, M, x, y, map, orders);
