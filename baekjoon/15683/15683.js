const fs = require("fs");
const path = require("path");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform !== "win32" ? "\n" : "\r\n";
const input = fs
  .readFileSync(path.resolve(__dirname, filepath))
  .toString()
  .split(splitStr);

const [N, M] = input[0].split(" ").map(Number);
const map = input.slice(1, N + 1).map((r) => r.split(" ").map(Number));

function solution(N, M, map) {
  // 카메라 위치 구하기
  const cameras = [];
  const dy = [-1, 0, 1, 0];
  const dx = [0, 1, 0, -1];

  let answer = N * M;

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (map[y][x] !== 0 && map[y][x] !== 6) cameras.push([y, x, map[y][x]]);
    }
  }

  // 카메라 번호에 따라 보는 방향 정보 구하기
  const cameraInfos = [];
  const cameraDir = [[], [1], [1, 3], [0, 1], [0, 1, 3], [0, 1, 2, 3]];

  function getCameraInfos(arr) {
    if (cameras.length === arr.length) {
      return cameraInfos.push(arr.slice());
    }

    for (let i = 0; i < 4; i++) {
      arr.push(i);
      getCameraInfos(arr);
      arr.pop();
    }
  }

  getCameraInfos([]);

  // console.log(cameraInfos);
  // console.log(cameras);

  cameraInfos.forEach((info) => {
    const newMap = map.map((el) => el.slice());
    let cnt = 0;
    info.forEach((dir, i) => {
      const [y, x, val] = cameras[i];
      draw(y, x, val, dir, newMap);
    });

    // 최소 사각지대 구하기
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < M; x++) {
        if (newMap[y][x] === 0) cnt++;
      }
    }

    if (answer > cnt) answer = cnt;
  });

  return answer;

  // 맵 그리기
  function draw(sy, sx, cameraNum, dir, newMap) {
    cameraDir[cameraNum].forEach((d) => {
      let [ny, nx] = [sy, sx];

      while (true) {
        ny += dy[(d + dir) % 4];
        nx += dx[(d + dir) % 4];

        if (ny < 0 || nx < 0 || ny >= N || nx >= M || map[ny][nx] === 6) break;
        newMap[ny][nx] = "#";
      }
    });
  }
}

console.log(solution(N, M, map));
