const fs = require("fs");
const path = require("path");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform !== "win32" ? "\n" : "\r\n";
const input = fs
  .readFileSync(path.resolve(__dirname, filepath))
  .toString()
  .split(splitStr);

const [n, w, L] = input[0].split(" ").map(Number);
const trucks = input[1].split(" ").map(Number);

/*
트럭 n대가 다리를 지남
대당 다리의 길이(w)의 시간이 걸림
다리 위의 트럭의 무게 합은 최대하중(L)을 초과할 수 없음
모든 트럭이 다리를 지나갈 수 있는 최단 시간?
 */

function solution(n, w, L, trucks) {
  const bridge = new Map();

  let t = 0,
    i = 0,
    tw = 0;

  while (i < n) {
    t++;

    const off = bridge.get(t - w);

    if (off) {
      tw -= off;
      bridge.delete(t - w);
    }

    if (tw + trucks[i] <= L) {
      bridge.set(t, trucks[i]);
      tw += trucks[i];
      i++;
    }
  }

  return t + w;
}

console.log(solution(n, w, L, trucks));
