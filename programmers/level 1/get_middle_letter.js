/*
가운데 글자 가져오기

문제 설명
단어 s의 가운데 글자를 반환하는 함수, solution을 만들어 보세요. 단어의 길이가 짝수라면 가운데 두글자를 반환하면 됩니다.

재한사항
s는 길이가 1 이상, 100이하인 스트링입니다.

입출력 예
s	return
"abcde"	"c"
"qwer"	"we"
*/

function solution(s) {
    const midIdx = s.length / 2;
    return midIdx % 1 === 0 ? s[midIdx - 1] + s[midIdx] : s[midIdx - 0.5];
}

let output1 = solution("abcde"); // -> "c"
console.log(output1);

let output2 = solution("qwer"); // -> "we"
console.log(output2);
