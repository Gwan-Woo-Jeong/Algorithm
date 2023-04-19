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

function solution(N, K, students) {
  console.log(N, K, students);
}

console.log(
  solution(
    +inputs[0][0].split(" ")[0],
    +inputs[0][0].split(" ")[1],
    inputs[0].slice(1)
  )
); // -> 12

console.log(
  solution(
    +inputs[1][0].split(" ")[0],
    +inputs[1][0].split(" ")[1],
    inputs[1].slice(1)
  )
); // -> 3
