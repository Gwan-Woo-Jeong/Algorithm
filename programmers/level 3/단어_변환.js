/*
문제 설명
두 개의 단어 begin, target과 단어의 집합 words가 있습니다. 아래와 같은 규칙을 이용하여 begin에서 target으로 변환하는 가장 짧은 변환 과정을 찾으려고 합니다.

1. 한 번에 한 개의 알파벳만 바꿀 수 있습니다.
2. words에 있는 단어로만 변환할 수 있습니다.
예를 들어 begin이 "hit", target가 "cog", words가 ["hot","dot","dog","lot","log","cog"]라면 "hit" -> "hot" -> "dot" -> "dog" -> "cog"와 같이 4단계를 거쳐 변환할 수 있습니다.

두 개의 단어 begin, target과 단어의 집합 words가 매개변수로 주어질 때, 최소 몇 단계의 과정을 거쳐 begin을 target으로 변환할 수 있는지 return 하도록 solution 함수를 작성해주세요.

제한사항
각 단어는 알파벳 소문자로만 이루어져 있습니다.
각 단어의 길이는 3 이상 10 이하이며 모든 단어의 길이는 같습니다.
words에는 3개 이상 50개 이하의 단어가 있으며 중복되는 단어는 없습니다.
begin과 target은 같지 않습니다.
변환할 수 없는 경우에는 0를 return 합니다.
입출력 예
begin	target	words	return
"hit"	"cog"	["hot", "dot", "dog", "lot", "log", "cog"]	4
"hit"	"cog"	["hot", "dot", "dog", "lot", "log"]	0
입출력 예 설명
예제 #1
문제에 나온 예와 같습니다.

예제 #2
target인 "cog"는 words 안에 없기 때문에 변환할 수 없습니다.
*/

// 인접 행렬 풀이
function solution(begin, target, words) {
  // words에 모든 단어(노드)를 담기
  words = [begin, ...words];

  // 방문 표시할 그래프 만들기
  const graph = Array(words.length)
    .fill()
    .map((_) => Array(words.length).fill(0));

  // 그래프에서 타겟의 인덱스를 찾기
  let end = words.indexOf(target);
  // 타겟이 없으면 0 리턴
  if (end === -1) return 0;

  // 단어(노드)끼리 비교하여 서로 연결되어 있는지 표시
  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words.length; j++) {
      if (countDiffStr(words[i], words[j]) === 1) graph[i][j] = 1;
    }
  }

  // 몇 번 안에 시작 단어 -> 타겟 단어까지 도착할 수 있는지 계산 후 리턴
  return bfs(0, end);

  function bfs(start, end) {
    // 방문한 노드 표시
    let visited = Array(words.length).fill(0);
    // 시작 단어 (초기 노드) 방문 표시
    visited[start] = 1;

    // 큐에 초기 노드 [시작, 도착, 거리] 추가
    let queue = [[start, 0]];

    // 그래프 상의 모든 노드 탐색
    while (queue.length) {
      // 큐에서 노드 하나를 꺼냄
      let [v, move] = queue.shift();

      // 노드가 도착 노드라면 거리 리턴
      if (v === end) return move;

      for (let nv = 0; nv < visited.length; nv++) {
        // 탐색 노드가 이미 방문한 노드이거나 그래프 상에서 연결되지 않은 노드라면 스킵
        if (visited[nv] === 1 || graph[v][nv] === 0) continue;
        // 탐색 노드 방문 처리
        visited[nv] = 1;
        // 거리를 1 추가한 후, 큐에 푸시
        queue.push([nv, move + 1]);
      }
    }
  }

  // 두 단어를 비교하여 일치하지 않는 철자 개수 리턴
  function countDiffStr(word, word2) {
    let count = 0;
    for (let i = 0; i < word.length; i++) {
      if (word[i] === word2[i]) count++;
    }
    return word.length - count;
  }
}

let output1 = solution("hit", "cog", [
  "hot",
  "dot",
  "dog",
  "lot",
  "log",
  "cog",
]); // -> 4
console.log(output1);

let output2 = solution("hit", "cog", ["hot", "dot", "dog", "lot", "log"]); // -> 0
console.log(output2);
