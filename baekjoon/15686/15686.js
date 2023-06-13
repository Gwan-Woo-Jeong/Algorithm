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
  // 치킨집의 위치와 집의 위치를 모두 뽑아냄
  // 치킨집의 조합을 모두 구함
  // 치킨집 위치를 순회하여 새로운 맵을 그림
  // 집 위치에서 새로운 맵의 치킨집까지의 최소 거리를 구함
  // 각 최소 거리의 합을 구함
  // 각 최소 거리의 합 중 최솟값을 구한 후 리턴

  let answer = Infinity;

  const ones = [];
  const twos = [];

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (map[y][x] === 1) ones.push([y, x]);
      if (map[y][x] === 2) twos.push([y, x]);
    }
  }

  function combination(arr, index) {
    if (arr.length === M) {
      let sum = 0;
      ones.forEach(([sy, sx]) => {
        let shortest = Infinity;
        arr.forEach(([ey, ex]) => {
          shortest = Math.min(shortest, Math.abs(sy - ey) + Math.abs(sx - ex));
        });
        sum += shortest;
      });
      if (answer > sum) answer = sum;
      return;
    }

    for (let i = index; i < twos.length; i++) {
      arr.push(twos[i]);
      combination(arr, i + 1);
      arr.pop();
    }
  }

  combination([], 0);
  return answer;
}

console.log(solution(N, M, map));
