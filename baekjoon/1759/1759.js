const fs = require("fs");
const path = require("path");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs
  .readFileSync(path.resolve(__dirname, filepath))
  .toString()
  .trim()
  .split("\n");

const [L, C] = input[0].split(" ").map(Number);
const words = input[1].split(" ");

function solution(L, C, words) {
  // 알파벳 순으로 정렬
  words = words.sort();
  let cnt = 0;
  let ans = "";

  getCombinations([], 0);
  return ans;

  // 알파벳 조합 구하는 재귀 함수
  function getCombinations(arr, idx) {
    // 모음 카운트가 2개 이상 혹은 자음이 1개 이상이면 정답 추가
    // 문자 길이가 L과 같으면  재귀 종료
    if (arr.length === L) {
      if (cnt >= 2 || arr.length - cnt >= 1) {
        ans += arr.join("") + "\n";
      }
      return;
    }

    for (let i = idx; i < C; i++) {
      const isVowel =
        words[i] === "a" ||
        words[i] === "e" ||
        words[i] === "i" ||
        words[i] === "o" ||
        words[i] === "u";
      // 조합 가능한 알파벳 중에서 모음이 포함되면 카운트 추가
      if (isVowel) cnt++;
      // 알파벳 추가
      arr.push(words[i]);
      // 다음 재귀
      getCombinations(arr, i + 1);
      // 알파벳 제거
      arr.pop();
      //조합 가능한 알파벳 중에서 모음이 포함되면 카운트 빼기
      if (isVowel) cnt--;
    }
  }
}

console.log(solution(L, C, words));
