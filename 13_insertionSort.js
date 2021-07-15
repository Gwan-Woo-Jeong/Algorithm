/*
문제
정수를 요소로 갖는 배열을 입력받아 오름차순으로 정렬하여 리턴해야 합니다.

입력
인자 1 : arr
number 타입을 요소로 갖는 배열
arr[i]는 정수
arr.length는 1,000 이하

출력
number 타입을 요소로 갖는 배열을 리턴해야 합니다.
배열의 요소는 오름차순으로 정렬되어야 합니다.
arr[i] <= arr[j] (i < j)

주의사항
삽입 정렬을 구현해야 합니다.
arr.sort 사용은 금지됩니다.
입력으로 주어진 배열은 중첩되지 않은 1차원 배열입니다.\

Advanced
insertionSort 함수의 두 번째 인자로 callback 함수를 받아서, 그 함수의 리턴값을 기준으로 요소들을 정렬해 보세요.
*/

const insertionSort = function (arr, transform = (item) => item) {
    // 오름차순으로 정렬된 배열
    let sorted = [arr[0]];
    // arr의 1번째 인덱스부터 순회
    for (let i = 1; i < arr.length; i += 1) {
        // arr[i]가 정렬된 배열의 마지막 인덱스 이상이면,
        if (transform(arr[i]) >= transform(sorted[i - 1])) {
            // 올바른 위치이므로 그대로 삽입
            sorted.push(arr[i]);
        } else { // 이하이면, 다시 재정렬
            // 순회하고 있는 인덱스까지 처음부터 다시 순회
            for (let j = 0; j < i; j += 1) {
                // arr[i]의 올바른 위치를 찾는다
                if (transform(arr[i]) <= transform(sorted[j])) { // 찾으면,
                    // arr[i]가 들어갈 위치를 기준으로 배열을 둘로 나눈다.
                    let left = sorted.slice(0, j);
                    let right = sorted.slice(j);
                    // 그 사이에 arr[i]를 넣어준 후 정렬된 배열을 재선언
                    sorted = left.concat(arr[i], right);
                    // 이 반복문을 끝낸다
                    break;
                }
            }
        }
    }
    // 정렬된 배열을 리턴
    return sorted;
};

//입출력 예시
let output = insertionSort([3, 1, 21]);
console.log(output); // --> [1, 3, 21]