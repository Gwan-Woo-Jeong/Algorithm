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
    base.sort((a, b) => (a - b));
    sample.sort((a, b) => (a - b));
  
    const subsetFinder = (start, lookFor, base) => {
      for(let i = start; i < base.length; i += 1){
        if(lookFor === base[i]) return i;
        if(lookFor < base[i]) return -1;
      }
      return -1;
    };
    
    let baseIdx = 0;
    for(let i = 0; i < sample.length; i += 1){
      baseIdx = subsetFinder(baseIdx, sample[i], base);
      if(baseIdx === -1) return false;
    }
    return true;
  };
  
  // base와 sample 배열을 오름차순 정렬한다.
  
  // base의 모든 요소와 sample의 일치 여부를 판단하는 함수 (subSetFinder) => (start, lookFor, base)를 선언한다.
  // start로 시작해서 base의 마지막 요소까지 순회한다.
  // lookFor와 base[i]가 일치하면, i를 리턴한다.
  // lookFor가 base[i]보다 작으면, -1을 리턴한다.
  // 어떤 조건도 충족하지 못하면, -1을 리턴한다.
  
  // 마지막으로 탐색한 base의 인덱스를 저장하는 변수(baseIdx)를 0을 넣고 선언한다.
  // sample의 모든 요소를 순회한다.
  // subSetFinder에 sample[i]를 실행시킨 결과를 baseIdx에 할당한다.
  // baseIdx가 -1이면 false를 리턴한다.
  // 그 외의 값(i)이 나오면 true를 리턴한다.