/*
 */

function solution(word) {
  const words = {};
  const vowels = ["A", "E", "I", "O", "U"];
  let idx = 0;
  dfs("", 0);

  // dfs로 만들어진 사전 객체에서 주어진 단어의 인덱스를 찾음
  return words[word];

  function dfs(word, length) {
    // 단어가 5개를 넘으면 재귀 종료
    if (length > 5) return;
    // 단어 - 키 / 순서 - 값 으로 객체 등록
    words[word] = idx++;

    vowels.forEach((vowel) => {
      // 모든 모음의 조합을 재귀로 실행
      dfs(word + vowel, length + 1);
    });
  }
}

let output1 = solution("AAAAE"); // -> 6
console.log(output1);

let output2 = solution("AAAE"); // -> 10
console.log(output2);

let output3 = solution("I"); // -> 1563
console.log(output3);

let output4 = solution("EIO"); // -> 1189
console.log(output4);
