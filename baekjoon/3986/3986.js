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
      .split("\n")
  );
});

function solution(N, words) {
  const stack = [];
  let count = 0;
  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words[i].length; j++) {
      if (words[i][j] === stack[stack.length - 1]) {
        stack.pop();
      } else {
        stack.push(words[i][j]);
      }
    }
    if (stack.length === 0) {
      count++;
    }
    stack.length = 0;
  }
  return count;
}

console.log(solution(inputs[0][0], inputs[0].slice(1))); // -> 2
console.log(solution(inputs[1][0], inputs[1].slice(1))); // -> 1
console.log(solution(inputs[2][0], inputs[2].slice(1))); // -> 1
