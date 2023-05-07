function solution(s) {
  const returnMessage = (time, distance, direction) =>
    `Time ${time}: Go straight ${distance * 100}m and turn ${direction}`;

  const getDir = (to, from = "E") => {
    if (to === "N") {
      if (from === "E") return "left";
      if (from === "W") return "right";
    }
    if (to === "E") {
      if (from === "N") return "right";
      if (from === "S") return "left";
    }
    if (to === "S") {
      if (from === "E") return "right";
      if (from === "W") return "left";
    }
    if (to === "W") {
      if (from === "N") return "left";
      if (from === "S") return "right";
    }
  };

  const stack = [];
  const answer = [];
  let time = 0;

  // 스택 : 방향 + 거리
  // s의 인덱스(i) : 시간
  for (let i = 0; i < s.length; i++) {
    const now = s[i];
    const last = stack[stack.length - 1];
    // S의 방향이 바뀔 때
    if (last && now !== last) {
      // 스택에 쌓인 움직임(방향 / 100m)의 개수가 5개 미만이면
      if (stack.length < 5) {
        // 메시지 추가
        answer.push(returnMessage(time, stack.length, getDir(now, last)));
        // 5개 이상이면
      } else {
        // 메시지 추가 (거리가 아무리 길어도 500m로 표시, i - 5가 방향이 바뀐 시간)
        answer.push(returnMessage(i - 5, 5, getDir(now, last)));
      }
      // 스택 초기화
      stack.length = 0;
      // 시간 기록
      time = i;
    }
    stack.push(now);
  }

  return answer;
}

console.log(solution("EEESEEEEEENNNN"));
// ["Time 0: Go straight 300m and turn right","Time 3: Go straight 100m and turn left","Time 5: Go straight 500m and turn left"]
console.log(solution("SSSSSSWWWNNNNNN"));
// ["Time 1: Go straight 500m and turn right","Time 6: Go straight 300m and turn right"]
