const fs = require("fs");

const path = require("path");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs
  .readFileSync(path.resolve(__dirname, filepath))
  .toString()
  .trim();

function solution(input) {
  const stack = [];
  let values = [];
  let answer = 0;
  let isMultiply = false;

  const handleValue = (value) => {
    stack.pop();
    if (stack.length === 0) {
      answer += values.length ? values.reduce((a, c) => a + c) * value : value;
      values.length = 0;
    } else if (isMultiply) {
      values[values.length - 1] = values[values.length - 1] * value;
      values = [values.reduce((a, c) => a + c) * value];
    } else {
      values.push(value);
    }
    if (isMultiply === false) isMultiply = true;
  };

  for (let i = 0; i < input.length; i++) {
    const last = stack[stack.length - 1];
    if (last === ")" || last === "]") return 0;
    if (last === "(" && input[i] === ")") {
      handleValue(2);
    } else if (last === "[" && input[i] === "]") {
      handleValue(3);
    } else {
      stack.push(input[i]);
      if (isMultiply) isMultiply = false;
    }
  }

  if (stack.length) return 0;
  return answer;
}

console.log(solution(input));

// function solution(input) {
//   let stack = [input[0]];
//   let i = 1;

//   while (input[i]) {
//     const top = stack[stack.length - 1];
//     if (top === "(" && input[i] === ")") {
//       stack.pop();
//       stack.push(2);
//     } else {
//       stack.push(input[i]);
//     }
//     i++;
//   }
//   console.log(stack);
// }

// console.log(solution(input));
