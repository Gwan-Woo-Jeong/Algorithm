/*
문제
하나의 집합을 의미하는 문자열을 입력받아 각 문자를 가지고 만들 수 있는 모든 부분집합을 리턴해야 합니다.

입력
인자 1 : str
string 타입의 공백이 없는 알파벳 소문자 문자열

출력
배열(arr)을 리턴해야 합니다.
arr[i]는 각 부분집합의 원소로 구성된 문자열

주의사항
arr[i]는 각 부분집합을 구성하는 원소를 연결한 문자열입니다.
arr[i]는 알파벳 순서로 정렬되어야 합니다.
집합은 중복된 원소를 허용하지 않습니다.
부분집합은 빈 문자열을 포함합니다.
arr은 사전식 순서(lexical order)로 정렬되어야 합니다.
*/

const powerSet = function (str) {
    // 문자 배열 알파벳 순 정렬
    const sorted = str.split("").sort();
    // 중복 요소 제거
    const uniqueEle = sorted.reduce((acc, cur) => {
        if (acc[acc.length - 1] === cur) {
            return acc;
        } else {
            return acc + cur;
        }
    })
    // 문자 조합 찾는 재귀함수
    const subsets = [];
    const findCombi = (subset, idx) => {
        // base case : 모든 요소를 검사했을 경우
        if (idx === uniqueEle.length) {
            return subsets.push(subset);
        }
        // recur case : 모든 idx를 검사할 때까지 아래를 반복
        // idx의 요소를 포함하지 않을 경우, 그냥 다음 idx로 넘어감
        findCombi(subset, idx + 1);
        // idx의 요소를 포함할 경우, 해당 idx의 요소를 더해줌
        findCombi(subset + uniqueEle[idx], idx + 1);
    }
    // 재귀함수 실행
    findCombi("", 0)
    // 결과 알파벳 순서 정렬
    return subsets.sort();
};


// 입출력 예시
let output1 = powerSet('abc');
console.log(output1); // ['', 'a', 'ab', 'abc', 'ac', 'b', 'bc', 'c']

let output2 = powerSet('jjump');
console.log(output2); // ['', 'j', 'jm', 'jmp', 'jmpu', 'jmu', 'jp', 'jpu', 'ju', 'm', 'mp', 'mpu',