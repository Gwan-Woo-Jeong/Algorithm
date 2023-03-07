/*
문제 설명
문자열 s가 주어졌을 때, s의 각 위치마다 자신보다 앞에 나왔으면서, 자신과 가장 가까운 곳에 있는 같은 글자가 어디 있는지 알고 싶다.
예를 들어, s="banana"라고 할 때,  각 글자들을 왼쪽부터 오른쪽으로 읽어 나가면서 다음과 같이 진행할 수 있다.

b는 처음 나왔기 때문에 자신의 앞에 같은 글자가 없다. 이는 -1로 표현한다.
a는 처음 나왔기 때문에 자신의 앞에 같은 글자가 없다. 이는 -1로 표현한다.
n은 처음 나왔기 때문에 자신의 앞에 같은 글자가 없다. 이는 -1로 표현한다.
a는 자신보다 두 칸 앞에 a가 있습니다. 이는 2로 표현한다.
n도 자신보다 두 칸 앞에 n이 있습니다. 이는 2로 표현한다.
a는 자신보다 두 칸, 네 칸 앞에 a가 있습니다. 이 중 가까운 것은 두 칸 앞이고, 이는 2로 표현한다.
따라서 최종 결과물은 [-1, -1, -1, 2, 2, 2]가 된다.

문자열 s이 주어질 때, 위와 같이 정의된 연산을 수행하는 함수 solution을 완성해라.

제한사항
1 ≤ s의 길이 ≤ 10,000
s은 영어 소문자로만 이루어져 있다.
입출력 예
s	result
"banana"	[-1, -1, -1, 2, 2, 2]
"foobar"	[-1, -1, 1, -1, -1, -1]
 */

function solution(s) {
  const answer = [];
  const map = new Map();
  s.split("").forEach((el, idx) => {
    const val = map.get(el);
    if (typeof val === "number" && val >= 0) {
      answer.push(idx - val);
    } else {
      answer.push(-1);
    }
    map.set(el, idx);
  });
  return answer;
}

let output1 = solution("banana"); // -> [-1, -1, -1, 2, 2, 2]
console.log(output1);

let output2 = solution("foobar"); // -> [-1, -1, 1, -1, -1, -1]
console.log(output2);
