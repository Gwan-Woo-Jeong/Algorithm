/*
문제
아래와 같이 정의된 피보나치 수열 중 n번째 항의 수를 리턴해야 합니다.

0번째 피보나치 수는 0이고, 1번째 피보나치 수는 1입니다. 그 다음 2번째 피보나치 수부터는 바로 직전의 두 피보나치 수의 합으로 정의합니다.
0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, ...

입력
인자 1 : n
number 타입의 n (n은 0 이상의 정수)

출력
number 타입을 리턴해야합니다.

주의사항
재귀함수를 이용해 구현해야 합니다.
반복문(for, while) 사용은 금지됩니다.
함수 fibonacci가 반드시 재귀함수일 필요는 없습니다.

Advanced
피보나치 수열을 구하는 효율적인 알고리즘(O(N))이 존재합니다. 재귀함수의 호출을 직접 관찰하여 비효율이 있는지 확인해 보시기 바랍니다.
*/

// 피보나치 수열을 저장하는 객체 (memo)를 파라미터화 
function fibonacci(n, memo = {}) {
    // n이 memo에 있으면, memo[n] 리턴
    if (memo[n] !== undefined) return memo[n];

    if (n === 0) return 0;
    if (n === 1) return 1;

    // 피보나치 수열을 구한 다음 memo[n]에 저장한 후 리턴
    return memo[n] = fibonacci(n - 2, memo) + fibonacci(n - 1, memo);
};

let output = fibonacci(0);
console.log(output); // --> 0

output = fibonacci(1);
console.log(output); // --> 1

output = fibonacci(5);
console.log(output); // --> 5

output = fibonacci(9);
console.log(output); // --> 34