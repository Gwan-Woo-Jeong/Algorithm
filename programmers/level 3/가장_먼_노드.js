/*
문제 설명
n개의 노드가 있는 그래프가 있습니다. 각 노드는 1부터 n까지 번호가 적혀있습니다. 1번 노드에서 가장 멀리 떨어진 노드의 갯수를 구하려고 합니다. 가장 멀리 떨어진 노드란 최단경로로 이동했을 때 간선의 개수가 가장 많은 노드들을 의미합니다.

노드의 개수 n, 간선에 대한 정보가 담긴 2차원 배열 vertex가 매개변수로 주어질 때, 1번 노드로부터 가장 멀리 떨어진 노드가 몇 개인지를 return 하도록 solution 함수를 작성해주세요.

제한사항
노드의 개수 n은 2 이상 20,000 이하입니다.
간선은 양방향이며 총 1개 이상 50,000개 이하의 간선이 있습니다.
vertex 배열 각 행 [a, b]는 a번 노드와 b번 노드 사이에 간선이 있다는 의미입니다.
입출력 예
n	vertex	return
6	[[3, 6], [4, 3], [3, 2], [1, 3], [1, 2], [2, 4], [5, 2]]	3
 */

function solution(n, vertex) {
  // 이동 횟수와 최대 이동거리
  let cnt = 0;
  let maxMove = 0;

  // 노드의 수 만큼 배열을 생성
  const graph = Array(n)
    .fill()
    .map((_) => []);

  const visited = Array(n).fill(0);

  // 각 배열의 인덱스(노드) 배열에 연결된 다른 노드들을 푸시
  for (let i = 0; i < vertex.length; i++) {
    graph[vertex[i][0] - 1].push(vertex[i][1]);
    graph[vertex[i][1] - 1].push(vertex[i][0]);
  }

  const queue = [[1, 0]];
  visited[0] = 1;

  while (queue.length) {
    const [v, move] = queue.shift();

    // 노드 이동이 일어날 때 마다 이동 거리와 횟수 기록
    if (move > maxMove) {
      maxMove = move;
      cnt = 1;
    } else if (move && move === maxMove) {
      cnt++;
    }

    for (let node of graph[v - 1]) {
      // 아직 탐색 노드를 방문하지 않았고 탐색 노드와 연결되어 있지 않으면 스킵
      if (visited[node - 1] === 1) continue;
      // 탐색 노드 방문 처리
      visited[node - 1] = 1;
      // 이동 거리 추가한 후 큐에 푸시
      queue.push([node, move + 1]);
    }
  }

  // 최대 이동 거리의 횟수 리턴
  return cnt;
}

let output1 = solution(6, [
  [3, 6],
  [4, 3],
  [3, 2],
  [1, 3],
  [1, 2],
  [2, 4],
  [5, 2],
]); // -> 3
console.log(output1);
