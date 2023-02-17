/*
카드 뭉치

문제 설명

다음과 같은 규칙으로 단어 카드를 사용해 원하는 순서의 단어 배열을 만들 수 있는지 확인하는 함수를 만들어라.

- 원하는 카드 뭉치에서 카드를 순서대로 한 장씩 사용.
- 한 번 사용한 카드는 다시 사용할 수 없음.
- 카드를 사용하지 않고 다음 카드로 넘어갈 수 없음.
- 기존에 주어진 카드 뭉치의 단어 순서는 못바꿈.

매개변수
- cards1 : 문자열로 이루어진 카드 단어 배열 1
- cards2 : 문자열로 이루어진 카드 단어 배열 2
- goal : 원하는 단어 배열

입출력 예
| cards1 | cards2 | goal | result |
| --- | --- | --- | --- |
| ["i", "drink", "water"] | ["want", "to"] | ["i", "want", "to", "drink", "water"] | "Yes" |
| ["i", "water", "drink"] | ["want", "to"] | ["i", "want", "to", "drink", "water"] | "No" |
 */

function solution(card1, card2, goal) {
  const c1 = new Map(card1.map((v, i) => [v, i]));
  const c2 = new Map(card2.map((v, i) => [v, i]));
  const c1i = c1.keys();
  const c2i = c2.keys();

  for (word of goal) {
    if (c1.has(word)) {
      if (c1i.next().value !== word) {
        return "No";
      }
    } else if (c2.has(word)) {
      if (c2i.next().value !== word) {
        return "No";
      }
    } else {
      return "No";
    }
  }

  return "Yes";
}

let output1 = solution(
  ["i", "drink", "water"],
  ["want", "to"],
  ["i", "want", "to", "drink", "water"]
); // -> "Yes"
console.log(output1);

let output2 = solution(
  ["i", "water", "drink"],
  ["want", "to"],
  ["i", "want", "to", "drink", "water"]
); // -> "No"

console.log(output2);
