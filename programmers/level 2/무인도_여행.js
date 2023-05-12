/*
문제 설명

지도는 1 x 1크기의 사각형들로 이루어진 직사각형 격자, 각 칸 안에는 바다를 뜻하는 'X' 또는 무인도를 뜻하는  1~9의 자연수가 있다. 상, 하, 좌, 우로 연결된 땅들은 하나의 무인도를 이룬다. 각 칸의 숫자는 식량을 나타내는데, 연결된 칸에 적힌 숫자의 합은 해당 무인도에서 머물 수 있는 날짜 수를 나타낸다. 각 섬에서 최대 며칠씩 머무를 수 있는지 배열에 오름차순으로 담아 리턴하는 함수를 완성해라. 단, 지낼 수 있는 무인도가 없으면 -1을 담아 리턴.

매개변수

- maps : 지도를 나타내는 문자열 배열

제한사항

- 3 ≤ `maps`의 길이 ≤ 100
    - 3 ≤ `maps[i]`의 길이 ≤ 100
    - `maps[i]`는 'X' 또는 1 과 9 사이의 자연수로 이루어진 문자열입니다.
    - 지도는 직사각형 형태입니다.

입출력 예

| maps | result |
| --- | --- |
| ["X591X","X1X5X","X231X", "1XXX1"] | [1, 1, 27] |
| ["XXX","XXX","XXX"] | [-1] |
 */

function solution(maps) {
  const newMap = maps.map((n) => n.split(""));

  // 상 하 좌 우 좌표
  const dx = [1, 0, -1, 0];
  const dy = [0, 1, 0, -1];

  function DFS(x, y, num) {
    let sum = Number(num);

    // 상 하 좌 우를 탐색
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      // 지도 범위 내에서,
      if (nx >= 0 && ny >= 0 && nx < newMap.length && ny < newMap[0].length) {
        // X가 아닌 곳을 찾으면,
        if (newMap[nx][ny] !== "X") {
          // 식량 수를 저장
          const next = newMap[nx][ny];

          // 해당 위치에 "X"를 할당
          newMap[nx][ny] = "X";

          // DFS로 해당 좌표부터 다시 탐색.
          // 리턴 값을 sum에 합산.
          sum += DFS(nx, ny, next);
        }
      }
    }

    // 합산된 값을 리턴
    return sum;
  }

  const answer = [];

  for (let i = 0; i < newMap.length; i++) {
    for (let j = 0; j < newMap[0].length; j++) {
      // "X"가 아닌 위치에서
      if (newMap[i][j] !== "X") {
        // 현재 식량 수 저장.
        const start = newMap[i][j];

        // 해당 위치를 X로 변환
        newMap[i][j] = "X";

        // DFS로 범위 내 식량 수의 총합을 구한 후, 해당 값을 answer에 추가
        answer.push(DFS(i, j, start));
      }
    }
  }

  // answer의 길이가 0이라면 [-1], 아니면 배열을 오름차순으로 정렬 후 리턴
  return answer.length ? answer.sort((a, b) => a - b) : [-1];
}

let output1 = solution(["X591X", "X1X5X", "X231X", "1XXX1"]); // -> [1, 1, 27]
console.log(output1);

let output2 = solution(["XXX", "XXX", "XXX"]); // -> [-1]
console.log(output2);
