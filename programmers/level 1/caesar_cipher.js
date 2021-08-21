/*
시저 암호
문제 설명
어떤 문장의 각 알파벳을 일정한 거리만큼 밀어서 다른 알파벳으로 바꾸는 암호화 방식을 시저 암호라고 합니다. 예를 들어 "AB"는 1만큼 밀면 "BC"가 되고, 3만큼 밀면 "DE"가 됩니다. "z"는 1만큼 밀면 "a"가 됩니다. 문자열 s와 거리 n을 입력받아 s를 n만큼 민 암호문을 만드는 함수, solution을 완성해 보세요.

제한 조건
공백은 아무리 밀어도 공백입니다.
s는 알파벳 소문자, 대문자, 공백으로만 이루어져 있습니다.
s의 길이는 8000이하입니다.
n은 1 이상, 25이하인 자연수입니다.

입출력 예
s	n	result
"AB"	1	"BC"
"z"	1	"a"
"a B z"	4	"e F d"
*/

function solution(s, n) {
    const alphabet_L = "abcdefghijklmnopqrstuvwxyz";
    const alphabet_U = alphabet_L.toUpperCase();
    let answer = "";
    let index = 0;
    for (let i = 0; i < s.length; i++) {
        // 공백이면 공백 추가
        if (s[i] === " ") {
            answer += " ";
            continue;
        }
        // 소문자 인덱스 검색
        index = alphabet_L.indexOf(s[i]);
        // 소문자이면
        if (index > -1) {
            // 소문자 문자열에서 n을 더한 인덱스의 값을 할당 
            // (25자를 초과할 경우, 다시 0부터 시작)
            answer += alphabet_L[(index + n) % 26];
            // 소문자가 아니면 (대문자이면)
        } else {
            // 대문자 문자열에서 n을 더한 인덱스의 값을 할당
            answer += alphabet_U[(alphabet_U.indexOf(s[i]) + n) % 26];
        }
    }
    return answer;
}

let output1 = solution("AB", 1); // -> "BC"
console.log(output1);

let output2 = solution("z", 1); // -> "a"
console.log(output2);

let output3 = solution("a B z", 4); // -> "e F d"
console.log(output3);