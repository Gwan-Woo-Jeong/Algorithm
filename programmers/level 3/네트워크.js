/*
문제 설명
네트워크란 컴퓨터 상호 간에 정보를 교환할 수 있도록 연결된 형태를 의미합니다.
예를 들어, 컴퓨터 A와 컴퓨터 B가 직접적으로 연결되어있고, 컴퓨터 B와 컴퓨터 C가 직접적으로 연결되어 있을 때 컴퓨터 A와 컴퓨터 C도 간접적으로 연결되어 정보를 교환할 수 있습니다. 따라서 컴퓨터 A, B, C는 모두 같은 네트워크 상에 있다고 할 수 있습니다.

컴퓨터의 개수 n, 연결에 대한 정보가 담긴 2차원 배열 computers가 매개변수로 주어질 때, 네트워크의 개수를 return 하도록 solution 함수를 작성하시오.

제한사항
컴퓨터의 개수 n은 1 이상 200 이하인 자연수입니다.
각 컴퓨터는 0부터 n-1인 정수로 표현합니다.
i번 컴퓨터와 j번 컴퓨터가 연결되어 있으면 computers[i][j]를 1로 표현합니다.
computer[i][i]는 항상 1입니다.

입출력 예
n	computers	return
3	[[1, 1, 0], [1, 1, 0], [0, 0, 1]]	2
3	[[1, 1, 0], [1, 1, 1], [0, 1, 1]]	1
*/

function solution(n, computers) {
  let answer = [];

  // 방문한 노드 표시
  const visited = Array(n).fill(0);

  for (let i = 0; i < visited.length; i++) {
    // 방문하지 않는 노드를 대상으로 bfs 함수 실행
    if (!visited[i]) {
      bfs(i);
      // bfs를 실행할 때 마다, 네트워크 추가
      answer++;
    }
  }

  return answer;

  function bfs(v) {
    // 큐에 초기 노드 추가
    const queue = [v];
    // 노드 방문 표시
    visited[v] = 1;

    // 그래프 상의 모든 노드 탐색
    while (queue.length) {
      const v = queue.shift();
      for (let nv = 0; nv < computers.length; nv++) {
        // 큐에서 노드 하나를 꺼냄

        // 이미 방문한 노드이거나 그래프 상에서 연결되지 않은 노드라면 스킵
        if (visited[nv] === 1 || computers[v][nv] === 0) continue;

        // 노드 방문 처리
        visited[v] = 1;
        // 큐에 푸시
        queue.push(nv);
      }
    }
  }
}

let output1 = solution(3, [
  [1, 1, 0],
  [1, 1, 0],
  [0, 0, 1],
]); // -> 2
console.log(output1);

let output2 = solution(3, [
  [1, 1, 0],
  [1, 1, 1],
  [0, 1, 1],
]); // ->1
console.log(output2);
