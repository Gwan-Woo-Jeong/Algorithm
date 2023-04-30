var fs = require("fs");
var path = require("path");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
var input = fs
  .readFileSync(path.resolve(__dirname, filepath))
  .toString()
  .split("\r\n");

let commands = [];
for (let i = 0; i < input.length; i++) {
  if (input[i].length === 1 && input[i][0] === ".") break;
  else commands.push(input[i]);
}

function solution(commands) {
  const stack = [];
  const result = [];
  for (let i = 0; i < commands.length; i++) {
    for (let j = 0; j < commands[i].length; j++) {
      if (
        (stack[stack.length - 1] === "(" && commands[i][j] === ")") ||
        (stack[stack.length - 1] === "[" && commands[i][j] === "]")
      ) {
        stack.pop();
      } else if (commands[i][j] === "(" || commands[i][j] === "[") {
        stack.push(commands[i][j]);
      } else if (commands[i][j] === ".") break;
    }
    result.push(stack.length ? "no" : "yes");
    stack.length = 0;
  }

  return result;
}

console.log(solution(commands));
