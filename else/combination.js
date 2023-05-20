const numbers = [1, 2, 3, 4, 5];
const answer = [];

function combination(arr, index, target) {
  if (arr.length === target) {
    answer.push(arr.slice());
    return;
  }

  for (let i = index; i < numbers.length; i++) {
    arr.push(numbers[i]);
    combination(arr, i + 1, target);
    arr.pop();
  }

  return answer;
}

combination([], 0, 3);
console.log(answer);
