const fs = require("fs");
const filename = __filename.slice(__dirname.length + 1, -3);
const directory = `baekjoon/${filename}`;
const testFiles = fs.readdirSync(directory).slice(1);
const inputs = [];

testFiles.forEach((tf) => {
  inputs.push(
    fs
      .readFileSync(directory + "/" + tf)
      .toString()
      .trim()
      .split("\r\n")
  );
});

/*
알파벳 소문자로만 이루어진 단어 S가 주어진다. 각 알파벳이 단어에 몇 개가 포함되어 있는지 구하는 프로그램을 작성하시오.

입력
첫째 줄에 단어 S가 주어진다. 단어의 길이는 1000000을 넘지 않으며, 알파벳 소문자로만 이루어져 있다.

출력
단어에 포함되어 있는 a의 개수, b의 개수, …, z의 개수를 공백으로 구분해서 출력한다.
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

console.log(solution(inputs[0][0])); // -> 1 1 0 0 1 0 0 0 0 1 1 0 0 1 2 0 0 0 0 0 0 0 0 0 0 0
