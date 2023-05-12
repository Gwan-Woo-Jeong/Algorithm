function solution(numbers) {
  let visit = Array(numbers.length).fill(0);
  let answer = [];
  let temp = [];

  permutation([]);

  function permutation() {
    if (temp.length === 4) {
      answer.push(temp.slice());
      return;
    }

    for (let i = 0; i < numbers.length; i++) {
      if (visit[i]) continue;

      visit[i] = 1;
      temp.push(numbers[i]);
      permutation(temp);
      temp.pop();
      visit[i] = 0;
    }
  }

  return answer;
}

console.log(solution([1, 2, 3, 4]));
