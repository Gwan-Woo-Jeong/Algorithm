/*
문제
다음의 조건을 만족하면서 현재의 비밀번호('curPwd')를 새 비밀번호(newPwd)로 변경하는 데 필요한 최소 동작의 수를 리턴해야 합니다.

한 번에 한 개의 숫자만 변경가능하다.
4자리의 소수(prime)인 비밀번호로만 변경가능하다.
정리하면, 비밀번호가 계속 소수를 유지하도록 숫자 한 개씩을 바꿔갈 때 현재 비밀번호에서 새 비밀번호로 바꾸는 데 최소 몇 개의 숫자를 변경해야 하는지를 리턴해야 합니다.

입력
인자 1 : curPwd
number 타입의 1,000 이상 9,999 이하의 자연수

인자 2 : newPwd
number 타입의 1,000 이상 9,999 이하의 자연수

출력
number 타입을 리턴해야 합니다.

주의사항
4자리인 소수는 1,000 이상의 소수를 말합니다.(0011, 0997 등은 제외)
*/

const isPrime = (num) => {
    if (num % 2 === 0) return false;
    let sqrt = parseInt(Math.sqrt(num));
    for (let divider = 3; divider <= sqrt; divider += 2) {
        if (num % divider === 0) {
            return false;
        }
    }
    return true;
};

const splitNum = (num) => {
    const digits = num.toString().split('');
    return digits.map((d) => Number(d));
};

const joinDigits = (digits) => Number(digits.join(''));

const primePassword = (curPwd, newPwd) => {
    if (curPwd === newPwd) return 0;
    let front = 0;
    let rear = 0;
    const queue = [];
    const isEmpty = (queue) => front === rear;
    const enQueue = (queue, item) => {
        queue.push(item);
        rear++;
    };
    const deQueue = (queue) => {
        return queue[front++];
    };

    const isVisited = Array(10000).fill(false);
    isVisited[curPwd] = true;
    enQueue(queue, [0, curPwd]);
    while (isEmpty(queue) === false) {
        const [step, num] = deQueue(queue);
        for (let i = 0; i < 4; i++) {
            const digits = splitNum(num);
            for (let d = 0; d < 10; d++) {
                if (d !== digits[i]) {
                    digits[i] = d;
                    const next = joinDigits(digits);
                    if (next === newPwd) return step + 1;
                    if (next > 1000 && isPrime(next) && isVisited[next] === false) {
                        isVisited[next] = true;
                        enQueue(queue, [step + 1, next]);
                    }
                }
            }
        }
    }
    return -1;
};

// 입출력 예시
let output = primePassword(1033, 1033);
console.log(output); // --> 0

output = primePassword(3733, 8779);
console.log(output); // --> 3 (3733 -> 3739 -> 3779 -> 8779)