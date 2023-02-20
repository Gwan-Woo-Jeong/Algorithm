/*
문제 설명

수확한 귤 중 'k'개를 골라 상자 하나에 담아 판매하려고 한다. 그런데 귤의 크기가 일정하지 않아 크기별로 분류했을 때 서로 다른 종류의 수를 최소화려고 한다.

> 서로 다른 종류의 수의 최솟값을 리턴하는 함수를 작성하라.
> 

### 매개 변수

- k :  한 상자에 담으려는 귤의 개수
- tangerine : 귤의 크기를 담은 배열

### 제한사항

- 1 ≤ `k` ≤ `tangerine`의 길이 ≤ 100,000
- 1 ≤ `tangerine`의 원소 ≤ 10,000,000

### 입출력 예

| k | tangerine | result |
| --- | --- | --- |
| 6 | [1, 3, 2, 5, 4, 5, 2, 3] | 3 |
| 4 | [1, 3, 2, 5, 4, 5, 2, 3] | 2 |
| 2 | [1, 1, 1, 1, 2, 2, 2, 3] | 1 |
 */

function solution(k, tangerine) {
  // 귤 크기로 오름차순 정렬
  tangerine = tangerine.sort();

  let box = [];
  let answer = 0;
  let count = 1;
  // 귤 크기에 마다 갯수를 샌다.
  for (let i = 0; i < tangerine.length; i++) {
    if (tangerine[i] === tangerine[i + 1]) {
      count++;
    } else {
      box.push(count);
      count = 1;
    }
  }

  // 갯수 배열은 내림차순 정렬
  box = box.sort((a, b) => b - a);
  for (t of box) {
    // k가 없으면 누적된 종류 수를 리턴
    if (k <= 0) return answer;
    // k에 도달할 때까지 갯수를 감산
    k = k - t;
    // 뺄 때마다, 종류를 하나씩 늘림
    answer++;
  }

  // k가 남으면, 누적된 종류 수를 리턴
  return answer;
}

let output1 = solution(6, [1, 3, 2, 5, 4, 5, 2, 3]); // -> 3
console.log(output1);

let output2 = solution(4, [1, 3, 2, 5, 4, 5, 2, 3]); // -> 2
console.log(output2);

let output3 = solution(2, [1, 1, 1, 1, 2, 2, 2, 3]); // -> 1
console.log(output3);
