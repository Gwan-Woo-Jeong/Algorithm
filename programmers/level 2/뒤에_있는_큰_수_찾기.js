/*
문제 설명

배열의 각 원소들에 대해 자신보다 뒤에 있는 숫자 중에서 자신보다 크면서 가장 가까이 있는 수를 뒷 큰수라고 한다. 
정수 배열 `numbers`가 매개변수로 주어질 때, 모든 원소에 대한 뒷 큰수들을 차례로 담은 배열을 리턴하도록 함수를 완성해라.
단, 뒷 큰수가 존재하지 않는 원소는 -1을 담는다.

제한사항

- 4 ≤ `numbers`의 길이 ≤ 1,000,000
    - 1 ≤ `numbers[i]` ≤ 1,000,000

입출력 예

| numbers | result |
| --- | --- |
| [2, 3, 3, 5] | [3, 5, 5, -1] |
| [9, 1, 5, 3, 6, 2] | [-1, 5, 6, 6, -1, -1] |
 */

function solution(numbers) {
  // 우선 모두 뒷 큰수가 존재하지 않는다고 가정한 후, 뒷 큰수를 찾아 교체해준다.
  const answer = Array(numbers.length).fill(-1);
  const stack = [];
  for (let i = 0; i < numbers.length; i++) {
    // 스택에 쌓인 마지막 인덱스를 참조하여 수를 비교, 현재 수가 더 크면 이게 뒷 큰수
    while (numbers[stack[stack.length - 1]] < numbers[i]) {
      // 스택에 마지막 수의 인덱스를 버리고, -1을 뒷 큰수로 교체
      answer[stack.pop()] = numbers[i];
    }
    // 차례대로 numbers의 인덱스를 스택에 쌓는다.
    stack.push(i);
  }
  return answer;
}

// let output1 = solution([2, 3, 3, 5]); // -> [3, 5, 5, -1]
// console.log(output1);

let output2 = solution([9, 1, 5, 3, 6, 2]); // -> [-1, 5, 6, 6, -1, -1]
console.log(output2);
