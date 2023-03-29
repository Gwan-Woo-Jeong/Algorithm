/*
 */

function solution(park, routes) {
  let location = [0, 0];
  for (let i = 0; i < park.length; i++) {
    park[i] = park[i].split("");
    for (let j = 0; j < park[i].length; j++) {
      if (park[i][j] === "S") {
        location = [i, j];
      }
    }
  }

  routes = routes.map((route) => {
    if (route[0] === "E") {
      return [0, +route[2]];
    } else if (route[0] === "W") {
      return [0, -route[2]];
    } else if (route[0] === "N") {
      return [-route[2], 0];
    } else if (route[0] === "S") {
      return [+route[2], 0];
    }
  });

  routes.forEach((route) => {
    const x = location[0] + route[0];
    const y = location[1] + route[1];
    if (park[x][y] === "O") {
      let isOpen = true;

      Array.from({ length: route[0] !== 0 ? x : y }, (_, k) => k + 1).forEach(
        (path) => {
          if ((route[0] !== 0 ? park[path][y] : park[x][path]) === "X")
            isOpen = false;
          return false;
        }
      );

      if (isOpen) location = [x, y];
    }
  });

  return location;
}

let output1 = solution(["SOO", "OOO", "OOO"], ["E 2", "S 2", "W 1"]); // -> [2,1]
console.log(output1);

let output2 = solution(["SOO", "OXX", "OOO"], ["E 2", "S 2", "W 1"]); // -> [0,1]
console.log(output2);

let output3 = solution(["OSO", "OOO", "OXO", "OOO"], ["E 2", "S 3", "W 1"]); // -> [0,0]
console.log(output3);
