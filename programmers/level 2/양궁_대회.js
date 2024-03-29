/*
문제 설명
문제 설명
라이언은 저번 카카오배 양궁대회 우승자이고 이번 대회에도 결승전까지 올라왔다. 결승전 상대는 어피치이다.
결승전 규칙은 전 대회 우승자인 라이언에게 불리하게 다음과 같이 정했다.

어피치가 화살 n발을 다 쏜 후에 라이언이 화살 n발을 쏜다.
점수를 계산한다.
과녁판의 가장 작은 원의 과녁 점수는 10점이고 가장 큰 원의 바깥쪽은 과녁 점수가 0점이다. 
만약, k(k는 1~10사이의 자연수)점을 어피치가 a발을 맞혔고 라이언이 b발을 맞혔을 경우
더 많은 화살을 k점에 맞힌 선수가 k 점을 가져간다. 단, a = b일 경우는 어피치가 k점을 가져간다.
k점을 여러 발 맞혀도 k점 보다 많은 점수를 가져가는 게 아니고 k점만 가져가는 것을 유의해라.
또한 a = b = 0 인 경우, 즉, 라이언과 어피치 모두 k점에 단 하나의 화살도 맞히지 못한 경우는 어느 누구도 k점을 가져가지 않는다.
예를 들어, 어피치가 10점을 2발 맞혔고 라이언도 10점을 2발 맞혔을 경우 어피치가 10점을 가져간다.
다른 예로, 어피치가 10점을 0발 맞혔고 라이언이 10점을 2발 맞혔을 경우 라이언이 10점을 가져간다.
모든 과녁 점수에 대하여 각 선수의 최종 점수를 계산한다.
최종 점수가 더 높은 선수를 우승자로 결정한다. 단, 최종 점수가 같을 경우 어피치를 우승자로 결정한다.
현재 상황은 어피치가 화살 n발을 다 쏜 후이고 라이언이 화살을 쏠 차례이다.
라이언은 어피치를 가장 큰 점수 차이로 이기기 위해서 n발의 화살을 어떤 과녁 점수에 맞혀야 하는지를 구하려고 한다.

화살의 개수를 담은 자연수 n, 어피치가 맞힌 과녁 점수의 개수를 10점부터 0점까지 순서대로 담은 정수 배열 info가 매개변수로 주어진다.
이때, 라이언이 가장 큰 점수 차이로 우승하기 위해 n발의 화살을 어떤 과녁 점수에 맞혀야 하는지를 10점부터 0점까지 순서대로
정수 배열에 담아 return 하도록 solution 함수를 완성해라.
만약, 라이언이 우승할 수 없는 경우(무조건 지거나 비기는 경우)는 [-1]을 return 해라.

제한사항
1 ≤ n ≤ 10
info의 길이 = 11
0 ≤ info의 원소 ≤ n
info의 원소 총합 = n
info의 i번째 원소는 과녁의 10 - i 점을 맞힌 화살 개수이다. ( i는 0~10 사이의 정수이다.)
라이언이 우승할 방법이 있는 경우, return 할 정수 배열의 길이는 11이다.
0 ≤ return할 정수 배열의 원소 ≤ n
return할 정수 배열의 원소 총합 = n (꼭 n발을 다 쏴야 한다.)
return할 정수 배열의 i번째 원소는 과녁의 10 - i 점을 맞힌 화살 개수이다. ( i는 0~10 사이의 정수이다.)
라이언이 가장 큰 점수 차이로 우승할 수 있는 방법이 여러 가지 일 경우, 가장 낮은 점수를 더 많이 맞힌 경우를 return 해주세요.
가장 낮은 점수를 맞힌 개수가 같을 경우 계속해서 그다음으로 낮은 점수를 더 많이 맞힌 경우를 return 해주세요.
예를 들어, [2,3,1,0,0,0,0,1,3,0,0]과 [2,1,0,2,0,0,0,2,3,0,0]를 비교하면 [2,1,0,2,0,0,0,2,3,0,0]를 return 해야 한다.
다른 예로, [0,0,2,3,4,1,0,0,0,0,0]과 [9,0,0,0,0,0,0,0,1,0,0]를 비교하면[9,0,0,0,0,0,0,0,1,0,0]를 return 해야 한다.
라이언이 우승할 방법이 없는 경우, return 할 정수 배열의 길이는 1이다.
라이언이 어떻게 화살을 쏘든 라이언의 점수가 어피치의 점수보다 낮거나 같으면 [-1]을 return 해야 한다.
입출력 예
n	info	result
5	[2,1,1,1,0,0,0,0,0,0,0]	[0,2,2,0,1,0,0,0,0,0,0]
1	[1,0,0,0,0,0,0,0,0,0,0]	[-1]
9	[0,0,1,2,0,1,1,1,1,1,1]	[1,1,2,0,1,2,2,0,0,0,0]
10	[0,0,0,0,0,0,0,0,3,4,3]	[1,1,1,1,1,1,1,1,0,0,2]
입출력 예 설명
입출력 예 #1

어피치와 라이언이 아래와 같이 화살을 맞힐 경우,

과녁 점수	어피치가 맞힌 화살 개수	라이언이 맞힌 화살 개수	결과
10	2	3	라이언이 10점 획득
9	1	2	라이언이 9점 획득
8	1	0	어피치가 8점 획득
7	1	0	어피치가 7점 획득
6	0	0	
5	0	0	
4	0	0	
3	0	0	
2	0	0	
1	0	0	
0	0	0	
어피치의 최종 점수는 15점, 라이언의 최종 점수는 19점이다. 4점 차이로 라이언이 우승한다.

하지만, 라이언이 아래와 같이 화살을 맞힐 경우 더 큰 점수 차로 우승할 수 있다.

과녁 점수	어피치가 맞힌 화살 개수	라이언이 맞힌 화살 개수	결과
10	2	0	어피치가 10점 획득
9	1	2	라이언이 9점 획득
8	1	2	라이언이 8점 획득
7	1	0	어피치가 7점 획득
6	0	1	라이언이 6점 획득
5	0	0	
4	0	0	
3	0	0	
2	0	0	
1	0	0	
0	0	0	
어피치의 최종 점수는 17점, 라이언의 최종 점수는 23점이다. 6점 차이로 라이언이 우승한다.

따라서 [0,2,2,0,1,0,0,0,0,0,0]을 return 해야 한다.

입출력 예 #2

라이언이 10점을 맞혀도 어피치가 10점을 가져가게 됩니다.
따라서, 라이언은 우승할 수 없기 때문에 [-1]을 return 해야 한다.

입출력 예 #3

어피치와 라이언이 아래와 같이 화살을 맞힐 경우,

과녁 점수	어피치가 맞힌 화살 개수	라이언이 맞힌 화살 개수	결과
10	0	1	라이언이 10점 획득
9	0	1	라이언이 9점 획득
8	1	2	라이언이 8점 획득
7	2	3	라이언이 7점 획득
6	0	0	
5	1	2	라이언이 5점 획득
4	1	0	어피치가 4점 획득
3	1	0	어피치가 3점 획득
2	1	0	어피치가 2점 획득
1	1	0	어피치가 1점 획득
0	1	0	어피치가 0점 획득
어피치의 최종 점수는 10점, 라이언의 최종 점수는 39점이다. 29점 차이로 라이언이 우승한다.

하지만 라이언이 아래와 같이 화살을 맞힐 경우,

과녁 점수	어피치가 맞힌 화살 개수	라이언이 맞힌 화살 개수	결과
10	0	1	라이언이 10점 획득
9	0	1	라이언이 9점 획득
8	1	2	라이언이 8점 획득
7	2	0	어피치가 7점 획득
6	0	1	라이언이 6점 획득
5	1	2	라이언이 5점 획득
4	1	2	라이언이 4점 획득
3	1	0	어피치가 3점 획득
2	1	0	어피치가 2점 획득
1	1	0	어피치가 1점 획득
0	1	0	어피치가 0점 획득
어피치의 최종 점수는 13점, 라이언의 최종 점수는 42점이다. 이 경우도 29점 차이로 라이언이 우승한다.
하지만, 첫 번째 경우와 두 번째 경우를 비교했을 때, 두 번째 경우가 두 경우 중 가장 낮은 점수인 4점을 더 많이 맞혔기 때문에
[1,1,2,3,0,2,0,0,0,0,0]이 아닌 [1,1,2,0,1,2,2,0,0,0,0]을 return 해야 한다.

입출력 예 #4

가장 큰 점수 차이로 이기는 경우 중에서 가장 낮은 점수를 가장 많이 맞힌, 10~3점을 한 발씩 맞히고 
나머지 두 발을 0점에 맞히는 경우인 [1,1,1,1,1,1,1,1,0,0,2]를 return 해야 한다.
 */

function solution(n, info) {
  let answer = Array(11).fill(0);
  let maxDiff = 0;

  const dfs = (aTotalScore, rTotalScore, nUse, point, scoreArr) => {
    // 화살을 다 쓴 경우 (재귀 종료)
    if (n < nUse) return;

    // 현재 점수 인덱스
    const index = 10 - point;

    // 마지막 10점까지 계산한 경우 (재귀 종료)
    if (point > 10) {
      let diff = rTotalScore - aTotalScore;
      if (diff > maxDiff) {
        maxDiff = diff;
        // 남은 화살은 모두 0점 처리
        scoreArr[10] = n - nUse;
        answer = scoreArr;
      }
      return;
    }

    // 라이언이 이길 경우
    if (n > nUse) {
      const currentScoreArr = [...scoreArr];
      // 어피치가 쏜 화살 + 1
      const nShots = info[index] + 1;
      currentScoreArr[index] = nShots;
      dfs(
        aTotalScore,
        rTotalScore + point,
        nUse + nShots,
        point + 1,
        currentScoreArr
      );
    }

    if (info[index] > 0) {
      // 어피치가 이길 경우
      dfs(aTotalScore + point, rTotalScore, nUse, point + 1, scoreArr);
    } else {
      // 비길 경우
      dfs(aTotalScore, rTotalScore, nUse, point + 1, scoreArr);
    }
  };

  dfs(0, 0, 0, 0, answer);

  return maxDiff > 0 ? answer : [-1];
}

let output1 = solution(5, [2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]); // -> [0,2,2,0,1,0,0,0,0,0,0]

console.log(output1);

let output2 = solution(1, [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]); // -> [-1]
console.log(output2);

let output3 = solution(9, [0, 0, 1, 2, 0, 1, 1, 1, 1, 1, 1]); // -> [1,1,2,0,1,2,2,0,0,0,0]
console.log(output3);

let output4 = solution(10, [0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 3]); // -> [1,1,1,1,1,1,1,1,0,0,2]
console.log(output4);
