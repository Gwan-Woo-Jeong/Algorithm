/*
### **문제 설명**

성격 유형 검사지를 만들려고 한다.다음과 같은 4개 지표로 성격 유형을 구분한다. 성격은 두 유형 중 하나.

| 지표 번호 | 성격 유형 |
| --- | --- |
| 1번 지표 | 라이언형(R), 튜브형(T) |
| 2번 지표 | 콘형(C), 프로도형(F) |
| 3번 지표 | 제이지형(J), 무지형(M) |
| 4번 지표 | 어피치형(A), 네오형(N) |

유형은 총 16(=2 x 2 x 2 x 2)가지가 나올 수 있다.

질문마다 판단하는 지표를 담은 1차원 문자열 배열 `survey`와 검사자가 각 질문마다 선택한 선택지를 담은 1차원 정수 배열 `choices`가 매개변수로 주어진다. 고로, `choices`의 길이와 `survey`의 길이는 같다.

`survey`의 원소는 `"RT", "TR", "FC", "CF", "MJ", "JM", "AN", "NA"` 중 하나다. `survey[i][0]`은 질문의 비동의 선택지를 선택하면 받는 성격 유형을 의미한다. `survey[i][1]`은 질문의 동의 선택지를 선택하면 받는 성격 유형을 의미한다. 

`choices` 에는 다음과 같은 7개의 선택지가 있고 각 숫자는 오른쪽 뜻을 의미한다. 

| choices | 뜻 |
| --- | --- |
| 1 | 매우 비동의 |
| 2 | 비동의 |
| 3 | 약간 비동의 |
| 4 | 모르겠음 |
| 5 | 약간 동의 |
| 6 | 동의 |
| 7 | 매우 동의 |

이 `choices` 를 지표로 성격 유형 점수를 합산한 후, 각 지표에서 더 높은 점수를 받은 성격 유형을 산출한다. 단, 하나의 지표에서 성격 유형 점수가 같으면, 둘 중 사전 순으로 빠른 유형을 성격 유형으로 판단한다.

> 검사자의 성격 유형 검사 결과를 지표 번호 순서대로 리턴하도록 함수를 완성해라.
> 

### 매개변수

- survey : 질문마다 판단하는 지표를 담은 1차원 문자열 배열
    - `"RT", "TR", "FC", "CF", "MJ", "JM", "AN", "NA"` 중 하나
- choices : 각 질문마다 선택한 선택지를 담은 1차원 정수 배열
    - 1 ~ 7의 숫자

### 입출력 예

| survey | choices | result |
| --- | --- | --- |
| ["AN", "CF", "MJ", "RT", "NA"] | [5, 3, 2, 7, 5] | "TCMA" |
| ["TR", "RT", "TR"] | [7, 1, 3] | "RCJA" |
 */

function solution(survey, choices) {
  const res = new Map();

  const returnType = (type1, type2) => {
    const sorted = [type1, type2].sort();
    const mtype1 = res.get(type1) || 0;
    const mtype2 = res.get(type2) || 0;

    if (mtype1 < mtype2) {
      return type2;
    } else if (mtype1 > mtype2) {
      return type1;
    } else {
      return sorted[0];
    }
  };

  const setType = (type, addNum = 0) =>
    res.set(type, (res.get(type) || 0) + addNum);

  for (let i = 0; i < survey.length; i++) {
    const type1 = survey[i][0];
    const type2 = survey[i][1];

    if (choices[i] === 1) setType(type1, 3);
    if (choices[i] === 2) setType(type1, 2);
    if (choices[i] === 3) setType(type1, 1);
    if (choices[i] === 4) {
      setType(type1);
      setType(type2);
    }
    if (choices[i] === 5) setType(type2, 1);
    if (choices[i] === 6) setType(type2, 2);
    if (choices[i] === 7) setType(type2, 3);
  }

  return (
    returnType("R", "T") +
    returnType("C", "F") +
    returnType("J", "M") +
    returnType("A", "N")
  );
}

let output1 = solution(["AN", "CF", "MJ", "RT", "NA"], [5, 3, 2, 7, 5]); // ->"TCMA"
console.log(output1);

let output2 = solution(["TR", "RT", "TR"], [7, 1, 3]); // -> "RCJA"
console.log(output2);
