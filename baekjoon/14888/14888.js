var fs = require("fs");
var path = require("path");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = "\n";
var input = fs
  .readFileSync(path.resolve(__dirname, filepath))
  .toString()
  .split(splitStr);

const N = +input[0];
const nums = input[1].split(" ").map(Number);
let [p, m, x, d] = input[2].split(" ").map(Number);

function solution(N, nums, p, m, x, d) {
  let max = -1000000000;
  let min = 1000000000;

  // 연산자를 개수만큼 기호로 변환
  const operators = [
    ...(p ? "p".repeat(p) : []),
    ...(m ? "m".repeat(m) : []),
    ...(x ? "x".repeat(x) : []),
    ...(d ? "d".repeat(d) : []),
  ];

  const visits = Array(operators.length).fill(0);

  findMinMax(0, nums[0], operators);

  function findMinMax(index, num) {
    // nums의 마자막 숫자까지 계산했다면 재귀를 끝낸다.
    if (index === N - 1) {
      // 마지막 계산 값이 최소값이나 최대값이면 값을 갱신한다.
      console.log(num);
      if (num > max) max = num;
      if (num < min) min = num;
      return;
    }

    for (let i = 0; i < operators.length; i++) {
      // 이미 사용한 연산자 스킵
      if (visits[i]) continue;
      // 연산자 방문 처리
      visits[i] = 1;
      // 다음 숫자 재귀
      findMinMax(index + 1, calculate(operators[i], num, nums[index + 1]));
      // 연산자 방문 처리 되돌림
      visits[i] = 0;
    }
  }

  // 연산자 처리 함수
  function calculate(operator, num1, num2) {
    if (num2 === undefined) return num1;

    if (operator === "p") {
      return num1 + num2;
    }
    if (operator === "m") {
      return num1 - num2;
    }
    if (operator === "x") {
      return num1 * num2;
    }
    if (operator === "d") {
      if (num1 < 0) {
        return Math.trunc(-(-num1 / num2));
      } else {
        return Math.trunc(num1 / num2);
      }
    }
  }

  return `${max}\n${min}`;
}

console.log(solution(N, nums, p, m, x, d));
