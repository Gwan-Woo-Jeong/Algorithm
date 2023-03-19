/*
문제 설명
문자열 s가 입력되었을 때 다음 규칙을 따라서 이 문자열을 여러 문자열로 분해하려고 한다.

먼저 첫 글자를 읽는다. 이 글자를 x라고 하자.
이제 이 문자열을 왼쪽에서 오른쪽으로 읽어나가면서, x와 x가 아닌 다른 글자들이 나온 횟수를 각각 센다. 처음으로 두 횟수가 같아지는 순간 멈추고, 지금까지 읽은 문자열을 분리한다.
s에서 분리한 문자열을 빼고 남은 부분에 대해서 이 과정을 반복한다. 남은 부분이 없다면 종료한다.
만약 두 횟수가 다른 상태에서 더 이상 읽을 글자가 없다면, 역시 지금까지 읽은 문자열을 분리하고, 종료한다.
문자열 s가 매개변수로 주어질 때, 위 과정과 같이 문자열들로 분해하고, 분해한 문자열의 개수를 return 하는 함수 solution을 완성하라.

제한사항
1 ≤ s의 길이 ≤ 10,000
s는 영어 소문자로만 이루어져 있습니다.

입출력 예
s	result
"banana"	3
"abracadabra"	6
"aaabbaccccabba"	3

입출력 예 설명
입출력 예 #1
s="banana"인 경우 ba - na - na와 같이 분해된다.

입출력 예 #2
s="abracadabra"인 경우 ab - ra - ca - da - br - a와 같이  분해된다.

입출력 예 #3
s="aaabbaccccabba"인 경우 aaabbacc - ccab - ba와 같이 분해된다.
 */

function solution(s) {
  let answer = 0;
  const count = [1, 0];
  let x = s[0];

  for (let i = 1; i < s.length; i++) {
    if (x === s[i]) {
      count[0] = count[0] + 1;
    } else {
      count[1] = count[1] + 1;
    }
    if (count[0] === count[1]) {
      answer++;
      x = s[i + 1];
      count[0] = 0;
      count[1] = 0;
    }
  }
  return answer + (x ? 1 : 0);
}

let output1 = solution("banana"); // -> 3
console.log(output1);

let output2 = solution("abracadabra"); // -> 6
console.log(output2);

let output3 = solution("aaabbaccccabba"); // -> 3
console.log(output3);
