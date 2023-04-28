/*
1 x 1 크기의 칸들로 이루어진 직사각형 격자 형태의 미로에서 탈출하려고 합니다. 각 칸은 통로 또는 벽으로 구성되어 있으며, 벽으로 된 칸은 지나갈 수 없고 통로로 된 칸으로만 이동할 수 있습니다. 통로들 중 한 칸에는 미로를 빠져나가는 문이 있는데, 이 문은 레버를 당겨서만 열 수 있습니다. 레버 또한 통로들 중 한 칸에 있습니다. 따라서, 출발 지점에서 먼저 레버가 있는 칸으로 이동하여 레버를 당긴 후 미로를 빠져나가는 문이 있는 칸으로 이동하면 됩니다. 이때 아직 레버를 당기지 않았더라도 출구가 있는 칸을 지나갈 수 있습니다. 미로에서 한 칸을 이동하는데 1초가 걸린다고 할 때, 최대한 빠르게 미로를 빠져나가는데 걸리는 시간을 구하려 합니다.

미로를 나타낸 문자열 배열 maps가 매개변수로 주어질 때, 미로를 탈출하는데 필요한 최소 시간을 return 하는 solution 함수를 완성해주세요. 만약, 탈출할 수 없다면 -1을 return 해주세요.

제한사항
5 ≤ maps의 길이 ≤ 100
5 ≤ maps[i]의 길이 ≤ 100
maps[i]는 다음 5개의 문자들로만 이루어져 있습니다.
S : 시작 지점
E : 출구
L : 레버
O : 통로
X : 벽
시작 지점과 출구, 레버는 항상 다른 곳에 존재하며 한 개씩만 존재합니다.
출구는 레버가 당겨지지 않아도 지나갈 수 있으며, 모든 통로, 출구, 레버, 시작점은 여러 번 지나갈 수 있습니다.
입출력 예
maps	result
["SOOOL","XXXXO","OOOOO","OXXXX","OOOOE"]	16
["LOOXS","OOOOX","OOOOO","OOOOO","EOOOO"]	-1
입출력 예 설명
입출력 예 #1

주어진 문자열은 다음과 같은 미로이며


다음과 같이 이동하면 가장 빠른 시간에 탈출할 수 있습니다.


4번 이동하여 레버를 당기고 출구까지 이동하면 총 16초의 시간이 걸립니다. 따라서 16을 반환합니다.

입출력 예 #2

주어진 문자열은 다음과 같은 미로입니다.

시작 지점에서 이동할 수 있는 공간이 없어서 탈출할 수 없습니다. 따라서 -1을 반환합니다.
 */

function solution(maps) {
  const N = maps.length;
  const M = maps[0].length;

  // 시작, 끝, 레버의 위치 저장
  let start;
  let end;
  let lever;

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (maps[y][x] === "S") start = [y, x];
      if (maps[y][x] === "L") lever = [y, x];
      if (maps[y][x] === "E") end = [y, x];
    }
  }

  // 각각의 경로 최단거리를 bfs로 계산
  const path1 = bfs(start[0], start[1], lever[0], lever[1]);
  const path2 = bfs(lever[0], lever[1], end[0], end[1]);

  // 최단거리 더해서 해답 리턴
  if (path1 === -1 || path2 === -1) return -1;
  return path1 + path2;

  // bfs 함수
  function bfs(sy, sx, ey, ex) {
    // 방문한 좌표 저장하는 2차원 배열 (visits)
    // 0부터 시작할 것이기 때문에 -1로 초기화
    const visits = Array(N)
      .fill()
      .map((_) => Array(M).fill(-1));

    // queue에 시작 좌표 저장
    const queue = [[sy, sx]];
    // 시작 좌표 visits에 표시 - 시작 지점 (0)
    visits[sy][sx] = 0;
    // 방문한 좌표로부터 인접 좌표 탐색
    // dy[i] : -1  0  1  0
    // dx[i] : 0  1  0  -1
    // 방향   : 상  우  하  좌
    const dx = [0, 1, 0, -1];
    const dy = [1, 0, -1, 0];

    // queue가 빌 때까지 = 모든 경로 탐색
    while (queue.length) {
      // queue에서 좌표 하나 뽑아옴
      const [y, x] = queue.shift();
      // 좌표 주위로 인접 좌표 탐색
      for (let i = 0; i < dx.length; i++) {
        // 인접 좌표 (ny, nx)
        const [ny, nx] = [y + dy[i], x + dx[i]];

        // 인접 좌표가 지도 안의 유효 범위 안에 있고
        if (ny >= 0 && nx >= 0 && ny < N && nx < M) {
          // 지도에 X 표시가 아니고 방문한 좌표가 아니면
          if (maps[ny][nx] !== "X" && visits[ny][nx] === -1) {
            // 탐색한 인접 좌표에 최단 거리 표시 (현재 좌표 + 1)
            visits[ny][nx] = visits[y][x] + 1
            // 탐색한 인접 좌표 queue에 푸시
            queue.push([ny, nx]);

            // 만약 탐색 좌표가 도착 좌표와 일치하면
            if (ny === ey && nx === ex) {
              // 최단 거리 리턴
              return visits[ny][nx];
            }
          }
        }
      }
    }
    // 모든 경로를 탐색한 후, 도착 좌표를 찾지 못하면 -1 리턴
    return -1;
  }
}

let output1 = solution(["SOOOL", "XXXXO", "OOOOO", "OXXXX", "OOOOE"]); // -> 16
console.log(output1);

let output2 = solution(["LOOXS", "OOOOX", "OOOOO", "OOOOO", "EOOOO"]); // -> -1
console.log(output2);
