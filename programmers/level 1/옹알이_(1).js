/*
아기는 아직 "aya", "ye", "woo", "ma" 네 가지 발음과 네 가지 발음을 조합해서 만들 수 있는 발음밖에 하지 못하고 연속해서 같은 발음을 하지 못한다.
문자열 배열 babbling이 매개변수로 주어질 때, 아기가 발음할 수 있는 단어의 개수를 return하도록 solution 함수를 완성하라.

제한사항
1 ≤ babbling의 길이 ≤ 100
1 ≤ babbling[i]의 길이 ≤ 30
문자열은 알파벳 소문자로만 이루어져 있다.

입출력 예
babbling	result
["aya", "yee", "u", "maa"]	1
["ayaye", "uuu", "yeye", "yemawoo", "ayaayaa"]	2
입출력 예 설명
입출력 예 #1

["aya", "yee", "u", "maa"]에서 발음할 수 있는 것은 "aya"뿐입니다. 따라서 1을 return

입출력 예 #2
["ayaye", "uuuma", "yeye", "yemawoo", "ayaayaa"]에서 발음할 수 있는 것은 "aya" + "ye" = "ayaye", "ye" + "ma" + "woo" = "yemawoo"로 2개다. "yeye"는 같은 발음이 연속되므로 발음할 수 없다. 따라서 2를 return한다.

유의사항
네 가지를 붙여 만들 수 있는 발음 이외에는 어떤 발음도 할 수 없는 것으로 규정합니다. 예를 들어 "woowo"는 "woo"는 발음할 수 있지만 "wo"를 발음할 수 없기 때문에 할 수 없는 발음이다.
 */

function solution(babbling) {
  let answer = 0;

  babbling.forEach((b) => {
    if (
      !(
        b.includes("ayaaya") ||
        b.includes("yeeyee") ||
        b.includes("uu") ||
        b.includes("ma")
      )
    ) {
      b = b.replace(/aya/g, " ");
      b = b.replace(/ye/g, " ");
      b = b.replace(/woo/g, " ");
      b = b.replace(/ma/g, " ");
      b = b.replace(" ", "");
      if (b.length === 0) answer++;
    }
  });

  return answer;
}

let output1 = solution(["aya", "yee", "u", "maa"]); // -> 1
console.log(output1);

let output2 = solution(["ayaye", "uuu", "yeye", "yemawoo", "ayaayaa"]); // -> 2
console.log(output2);
