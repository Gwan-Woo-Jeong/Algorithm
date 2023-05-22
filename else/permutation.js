function solution(numbers) {
  let visit = Array(numbers.length).fill(0);
  let answer = [];

  permutation([]);

  function permutation(arr) {
    if (arr.length === 4) {
      answer.push(arr.slice());
      return;
    }

    for (let i = 0; i < numbers.length; i++) {
      if (visit[i]) continue;

      visit[i] = 1;
      arr.push(numbers[i]);
      permutation(arr);
      arr.pop();
      visit[i] = 0;
    }
  }

  return answer;
}

console.log(solution([1, 2, 3, 4]));
