/*
문제
문자열을 입력받아 문자열 내의 모든 괄호의 짝이 맞는지 여부를 리턴해야 합니다.

다음 단계에 맞춰 함수를 작성해 보세요
괄호의 종류를 단 한가지로 한정합니다.
괄호의 종류를 늘려 모든 종류의 괄호에도 작동하도록 합니다.
괄호를 제외한 문자열이 포함된 경우에도 작동하도록 합니다.

입력
인자 1 : str
string 타입의 괄호가 포함된 문자열

출력
boolean 타입을 리턴해야 합니다.

주의사항
괄호의 종류는 (, )만 고려합니다.
괄호는 먼저 열리고((), 열린만큼만 닫혀야()) 합니다.
빈 문자열을 입력받은 경우, true를 리턴해야 합니다.
*/

const balancedBrackets = function (str) {
    // 여는 괄호와 닫는 괄호를 객체의 키와 값으로 설정
    const opener = {
        "[": "]",
        "{": "}",
        "(": ")",
    };

    // 닫는 괄호를 배열로 설정
    const closer = ["]", ")", "}"];

    // 스택
    const stack = [];

    for (let i = 0; i < str.length; i += 1) {
        // str[i]가 opener의 키로 존재한다면
        if (str[i] in opener) {
            // 스택에 str[i]를 푸쉬
            stack.push(str[i]);
            // str[i]가 closer에 존재한다면
        } else if (closer.includes(str[i])) {
            // 스택의 마지막 값을 제거
            const top = stack.pop();
            // 제거한 값의 짝을 찾는다
            const pair = opener[top];
            // 짝이 맞지 않으면 false를 리턴
            if (pair !== str[i]) {
                return false;
            }
        }
    }
    // 스택이 모두 제거되면 true를 리턴
    return stack.length === 0;
};

// 입출력 예시
let output1 = balancedBrackets('(');
console.log(output1); // -> false

output1 = balancedBrackets('()');
console.log(output1); // --> true

// Advanced
// 모든 종류의 괄호((, ), {, }, [, ])가 포함된 문자열을 입력받아 모든 괄호의 짝이 맞는지 여부를 리턴해 보세요.
let output2 = balancedBrackets('[](){}');
console.log(output2); // --> true

output2 = balancedBrackets('[({})]');
console.log(output2); // --> true

let output3 = balancedBrackets('[(]{)}');
console.log(output3); // --> falsed