/*
문제 설명
한자리 숫자가 적힌 종이 조각이 흩어져있습니다. 흩어진 종이 조각을 붙여 소수를 몇 개 만들 수 있는지 알아내려 합니다.

각 종이 조각에 적힌 숫자가 적힌 문자열 numbers가 주어졌을 때, 종이 조각으로 만들 수 있는 소수가 몇 개인지 return 하도록 solution 함수를 완성해주세요.

제한사항
numbers는 길이 1 이상 7 이하인 문자열입니다.
numbers는 0~9까지 숫자만으로 이루어져 있습니다.
"013"은 0, 1, 3 숫자가 적힌 종이 조각이 흩어져있다는 의미입니다.
입출력 예
numbers	return
"17"	3
"011"	2
입출력 예 설명
예제 #1
[1, 7]으로는 소수 [7, 17, 71]를 만들 수 있습니다.

예제 #2
[0, 1, 1]으로는 소수 [11, 101]를 만들 수 있습니다.

11과 011은 같은 숫자로 취급합니다.
 */

function solution(numbers) {
  // 고유한 값만 저장
  const answer = new Set();

  // 방문 처리 배열
  const visit = Array(numbers.length).fill(0);

  getCombination(0);
  return answer.size;

  // 재귀 함수
  function getCombination(num) {
    // 현재 숫자가 소수이면 저장
    if (checkIsPrime(num)) answer.add(num);

    // 숫자의 길이가 최대에 도달하면 재귀 종료
    if (num.toString().length === numbers.length) return;

    // 주어진 숫자들 중에서
    for (let i = 0; i < numbers.length; i++) {
      // 이미 사용한 숫자는 스킵
      if (visit[i]) continue;
      // 숫자 방문 처리
      visit[i] = 1;
      // 다음 수를 만들어 재귀
      getCombination(num * 10 + numbers[i] * 1);
      // 숫자 방문 초기화
      visit[i] = 0;
    }
  }

  // 소수 찾기 함수
  function checkIsPrime(num) {
    // 1 이하면 소수가 아님
    if (num <= 1) return false;
    // 제곱근을 구해
    const sqrt = Math.sqrt(num);
    // 2부터 제곱근까지 수 중에
    for (let n = 2; n <= sqrt; n++) {
      // 해당 숫자로 나누어 떨어지면 소수가 아님
      if (num % n === 0) return false;
    }
    // 나머지 숫자는 소수
    return true;
  }
}

let output1 = solution("17"); // -> 3
console.log(output1);

let output2 = solution("011"); // -> 2
console.log(output2);
