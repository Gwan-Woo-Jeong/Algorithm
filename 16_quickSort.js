/*
문제
정수를 요소로 갖는 배열을 입력받아 오름차순으로 정렬하여 리턴해야 합니다.

입력
인자 1 : arr
number 타입을 요소로 갖는 배열
arr[i]는 정수
arr.length는 100,000 이하

출력
number 타입을 요소로 갖는 배열을 리턴해야 합니다.
배열의 요소는 오름차순으로 정렬되어야 합니다.
arr[i] <= arr[j] (i < j)

주의사항
퀵 정렬을 구현해야 합니다.
arr.sort 사용은 금지됩니다.
입력으로 주어진 배열은 중첩되지 않은 1차원 배열입니다.\

Advanced
quickSort 함수의 두 번째 인자로 callback 함수를 받아서, 그 함수의 리턴값을 기준으로 요소들을 정렬해 보세요.
*/

const quickSort = (arr, transform = item => item) => {
    // base case
    // 배열의 요소가 두 개 밑으로 남을 때까지 분류하는 작업을 반복
    if (arr.length <= 1) return arr;

    // recur case
    // 배열의 임의의 값을 선택
    let pivot = arr[0];
    let left = [];
    let right = [];

    // pivot을 기준으로 큰 수는 right, 작은 수는 left로 분류
    for (let i = 1; i < arr.length; i += 1) {
        if (transform(pivot) > transform(arr[i])) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    
    // pivot을 기준으로 분류된 수들을 다시 재귀로 반복
    let leftSorted = quickSort(left);
    let rightSorted = quickSort(right);

    // 이 과정을 반복하여, 배열을 오름차순으로 정렬시킴
    return [...leftSorted, pivot, ...rightSorted];
};

// 입출력 예시
let output = quickSort([3, 1, 21]);
console.log(output); // --> [1, 3, 21]