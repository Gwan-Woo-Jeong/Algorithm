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

/*
n개의 서로 다른 양의 정수 a1, a2, ..., an으로 이루어진 수열이 있다.
ai의 값은 1보다 크거나 같고, 1000000보다 작거나 같은 자연수이다.
자연수 x가 주어졌을 때, ai + aj = x (1 ≤ i < j ≤ n)을 만족하는 (ai, aj)쌍의 수를 구하는 프로그램을 작성하시오.

입력
첫째 줄에 수열의 크기 n이 주어진다. 다음 줄에는 수열에 포함되는 수가 주어진다. 셋째 줄에는 x가 주어진다. (1 ≤ n ≤ 100000, 1 ≤ x ≤ 2000000)

출력
문제의 조건을 만족하는 쌍의 개수를 출력한다.
*/

function solution(N, n, x) {
  const nums = n
    .split(" ")
    .map((val) => Number(val))
    .sort((a, b) => a - b);

  let start = 0;
  let end = +N - 1;
  let answer = 0;

  while (start !== end) {
    if (nums[start] + nums[end] === +x) {
      start++;
      answer++;
    } else if (nums[start] + nums[end] > +x) {
      end--;
    } else {
      start++;
    }
  }

  return answer;
}

console.log(solution(inputs[0][0], inputs[0][1], inputs[0][2])); // -> 3
