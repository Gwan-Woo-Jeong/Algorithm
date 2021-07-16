/*
문제
부분적으로 오름차순 정렬*된 정수의 배열(rotated)과 정수(target)를 입력받아 target의 인덱스를 리턴해야 합니다.

부분적으로 정렬된 배열: 배열을 왼쪽 혹은 오른쪽으로 0칸 이상 순환 이동할 경우 완전히 정렬되는 배열
예시: [4, 5, 6, 0, 1, 2, 3]은 왼쪽으로 3칸 또는 오른쪽으로 4칸 순환 이동할 경우 완전히 정렬됩니다.

입력
인자 1 : rotated
number 타입을 요소로 갖는 배열
rotated[i]는 정수

인자 2 : target
number 타입의 정수

출력
number 타입을 리턴해야 합니다.

주의사항
rotated에 중복된 요소는 없습니다.
target이 없는 경우, -1을 리턴해야 합니다.

Advanced
단순히 처음부터 끝까지 찾아보는 방법(O(N)) 대신 다른 방법(O(logN))을 탐구해 보세요.

힌트
이진 탐색(binary search)을 약간 변형하여 해결합니다.
*/

const rotatedArraySearch = function (rotated, target) {
    let left = 0;
    let right = rotated.length - 1;
    while (left <= right) {
        let mid = parseInt((left + right) / 2);
        if (rotated[mid] === target) {
            return mid;
        }
        if (rotated[left] < rotated[mid]) {
            // 왼쪽 배열이 오름차순으로 정렬되어 있을 때,
            if (target < rotated[mid] && target >= rotated[left]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            // 오른쪽 배열이 오름차순으로 정렬되어 있을 때,
            if (target > rotated[mid] && target <= rotated[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return -1;
};

// 입출력 예시
let output = rotatedArraySearch([4, 5, 6, 0, 1, 2, 3], 2);
console.log(output); // --> 5

output = rotatedArraySearch([4, 5, 6, 0, 1, 2, 3], 100);
console.log(output); // --> -1