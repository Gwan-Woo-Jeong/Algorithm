var fs = require("fs");
const path = require("path");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
var input = fs.readFileSync(path.resolve(__dirname, filepath)).toString();

let [N, K] = input.split(" ").map(Number);

function solution(N, K) {
  if (N === K) return 0;

  // 탐색한 위치 배열 (-1로 초기화)
  let visit = Array(100001).fill(-1);
  // 시작 위치는 이미 방문 했으므로, 0을 할당하고 큐에 추가
  visit[N] = 0;
  const queue = [N];

  // 큐가 빌 때 까지 (모든 위치를 탐색)
  while (queue.length) {
    // 큐에서 탐색 위치를 꺼냄
    const now = queue.shift();
    // 탐색할 다음 숫자의 상대적 위치 (x-1, x+1, x*2)
    const dir = [-1, 1, now];

    for (let i = 0; i < dir.length; i++) {
      // 다음 위치를 구함
      const next = now + dir[i];
      // 다음 위치가 유효 범위 안이고 아직 탐색하지 않은 곳(-1)이면
      if (next >= 0 && next <= 1000000 && visit[next] === -1) {
        // 현재 위치의 값에서 1초를 더함
        visit[next] = visit[now] + 1;

        // 다음 위치가 K와 일치하면 해당 값 (걸린 초)를 리턴
        if (next === K) return visit[next];
        queue.push(next); // 다음 위치를 큐에 추가하여 추후에 탐색
      }
    }
  }
}

console.log(solution(N, K));
