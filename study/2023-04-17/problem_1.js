/*
문제 1 )
알파벳 소문자로만 이루어진 단어 S가 주어진다. 각 알파벳이 단어에 몇 개가 포함되어 있는지 구하는 프로그램을 작성하시오.

입력
첫째 줄에 단어 S가 주어진다. 단어의 길이는 1000000을 넘지 않으며, 알파벳 소문자로만 이루어져 있다.

출력
단어에 포함되어 있는 a의 개수, b의 개수, …, z의 개수를 공백으로 구분해서 출력한다.

예제 입력 1 
abcda
예제 출력 1 
2 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 
*/

function solution(s) {
  let answer = "";
  const map = new Map();
  "abcdefghijklmnopqrstuvwxyz".split("").forEach((el) => map.set(el, 0));
  s.split("").forEach((el) => map.set(el, map.get(el) + 1));
  map.forEach(
    (val) => (answer = answer + (answer.length > 0 ? " " : "") + val)
  );
  return answer;
}

let output1 = solution("abcda"); // -> 2 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
console.log(output1);
