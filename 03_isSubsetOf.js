/*
isSubsetOf

문제
두 개의 배열(base, sample)을 입력받아 sample이 base의 부분집합인지 여부를 리턴해야 합니다.

입력
인자 1 : base
number 타입을 요소로 갖는 임의의 배열
base.length는 100 이하

인자 2 : sample
number 타입을 요소로 갖는 임의의 배열
sample.length는 100 이하

출력
boolean 타입을 리턴해야 합니다.

주의사항
base, sample 내에 중복되는 요소는 없다고 가정합니다.

입출력 예시
let base = [1, 2, 3, 4, 5];
let sample = [1, 3];
let output = isSubsetOf(base, sample);
console.log(output); // --> true

sample = [6, 7];
output = isSubsetOf(base, sample);
console.log(output); // --> false

base = [10, 99, 123, 7];
sample = [11, 100, 99, 123];
output = isSubsetOf(base, sample);
console.log(output); // --> false

Advanced
시간 복잡도를 개선하여, Advanced 테스트 케이스(base, sample의 길이가 70,000 이상)를 통과해 보세요.
*/
const isSubsetOf = function (base, sample) {
    // * 1-1) 배열을 오름차순 정렬
    base.sort((a, b) => a - b);
    sample.sort((a, b) => a - b);

    // base에서 sample의 요소를 찾는 함수
    const findItemInSortedArr = (item, arr, from) => {
        for (let i = from; i < arr.length; i++) {
            // 찾으면, 해당 인덱스를 리턴
            if (item === arr[i]) return i;
            // * 1-2) 순회하는 요소가 찾는 값보다 크면 -1을 리턴 
            else if (item < arr[i]) return -1;
        }
        // 마지막까지 찾지 못하면 -1을 리턴
        return -1;
    };

    // 반복문 시작 인덱스
    let baseIdx = 0;
    // sample의 모든 요소를 순회하여 base에서 일치하는 값을 찾는다
    for (let i = 0; i < sample.length; i++) {
        // * 2) 같은 값을 찾으면 해당 인덱스부터 반복문을 실행한다  
        baseIdx = findItemInSortedArr(sample[i], base, baseIdx);
        // 하나라도 찾지 못하면 부분집합이 아니기 때문에 false를 리턴
        if (baseIdx === -1) return false;
    }
    // 모두 찾으면 true를 리턴
    return true;
};

let base = [1, 2, 3, 4, 5];
let sample = [1, 3];
let output = isSubsetOf(base, sample);
console.log(output); // --> true

sample = [6, 7];
output = isSubsetOf(base, sample);
console.log(output); // --> false

base = [10, 99, 123, 7];
sample = [11, 100, 99, 123];
output = isSubsetOf(base, sample);
console.log(output); // --> false