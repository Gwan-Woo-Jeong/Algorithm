/*
문제 설명
두 정수 X, Y의 임의의 자리에서 공통으로 나타나는 정수들을 이용하여 만들 수 있는 가장 큰 정수를 두 수의 짝꿍이라 한다.
X, Y의 짝꿍이 존재하지 않으면, 짝꿍은 -1이다. X, Y의 짝꿍이 0으로만 구성되어 있다면, 짝꿍은 0이다.

예를 들어, X = 3403이고 Y = 13203이라면, 
X와 Y의 짝꿍은 X와 Y에서 공통으로 나타나는 3, 0, 3으로 만들 수 있는 가장 큰 정수인 330입니다. 
다른 예시로 X = 5525이고 Y = 1255이면 X와 Y의 짝꿍은 X와 Y에서 공통으로 나타나는 2, 5, 5로 만들 수 있는 가장 큰 정수인 552이다
(X에는 5가 3개, Y에는 5가 2개 나타나므로 남는 5 한 개는 짝 지을 수 없다.)
두 정수 X, Y가 주어졌을 때, X, Y의 짝꿍을 return하는 solution 함수를 완성해라.
 */

function map(m, string) {
  [...string]
    .sort((a, b) => b - a)
    .forEach((el) => m.set(el, (m.get(el) || 0) + 1));
}

function solution(enter, leave) {
  let answer = "";
  const enterMap = new Map();
  const leaveMap = new Map();

  map(enterMap, enter);
  map(leaveMap, leave);

  enterMap.forEach((ev, ek) => {
    const lv = leaveMap.get(ek);
    if (lv)
      answer =
        answer +
        (answer.length === 0 && ek === "0" ? ek : ek.repeat(Math.min(ev, lv)));
  });

  if (answer.length === 0) return "-1";
  return answer;
}

let output1 = solution("100", "2345"); // -> "-1"
console.log(output1);

let output2 = solution("100", "203045"); // -> "0"
console.log(output2);

let output3 = solution("100", "123450"); // ->  "10"
console.log(output3);

let output4 = solution("42531", "12321"); // -> "321"
console.log(output4);

let output5 = solution("5525", "1255"); // -> "552"
console.log(output5);
