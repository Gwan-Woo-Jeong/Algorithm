/*
문제 설명
두 문자열 s와 skip, 그리고 자연수 index가 주어질 때, 다음 규칙에 따라 문자열을 만들려 한다. 암호의 규칙은 다음과 같다.

문자열 s의 각 알파벳을 index만큼 뒤의 알파벳으로 바꿔준다.
index만큼의 뒤의 알파벳이 z를 넘어갈 경우 다시 a로 돌아간다.
skip에 있는 알파벳은 제외하고 건너뛴다.

두 문자열 s와 skip, 그리고 자연수 index가 매개변수로 주어질 때 위 규칙대로 s를 변환한 결과를 return하도록 solution 함수를 완성해라.
 */

function solution(s, skip, index) {
  let answer = "";
  s = s.split("");
  skip = skip.split("");
  const alphabet = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .filter((el) => !skip.includes(el));

  s.forEach(
    (el) =>
      (answer += alphabet[(alphabet.indexOf(el) + index) % alphabet.length])
  );

  return answer;
}

let output1 = solution("aukks", "wbqd", 5); // -> happy
console.log(output1);
