const fs = require("fs");
const path = require("path");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform !== "win32" ? "\n" : "\r\n";
const input = fs
  .readFileSync(path.resolve(__dirname, filepath))
  .toString()
  .split(splitStr);

const [N, M, K] = input[0].split(" ").map(Number);

let index = 1;
const stickerInfos = [];
const stickers = [];

while (stickerInfos.length < K) {
  stickerInfos.push(input[index].split(" ").map(Number));
  index += 1;
  stickers.push(
    input
      .slice(index, index + stickerInfos[stickerInfos.length - 1][0])
      .map((el) => el.split(" ").map(Number))
  );
  index += stickerInfos[stickerInfos.length - 1][0];
}

function solution(N, M, K, stickers, stickerInfos) {
  const note = Array(N)
    .fill()
    .map((_) => Array(M).fill(0));

  // 스티커를 순회하여
  for (let i = 0; i < K; i++) {
    let sticker = stickers[i];
    let info = stickerInfos[i];

    for (let j = 0; j < 4; j++) {
      const [canDraw, y, x] = check(sticker, info);
      if (canDraw) {
        draw(y, x, sticker, info);
        break;
      }
      sticker = rotate(sticker, info);
      info = info.reverse();
    }
  }

  let cnt = 0;

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (note[y][x] === 1) cnt++;
    }
  }

  return cnt;

  // 노트북에 붙인다
  // 만약 노트북에 붙이지 못하면 90도 돌려서 붙인다
  // 모두 순회하면 스티커가 붙은 좌표 카운트

  // 스티커 붙이는 함수
  function draw(sy, sx, sticker, [n, m]) {
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < m; x++) {
        if (sticker[y][x] === 1) {
          note[sy + y][sx + x] = 1;
        }
      }
    }
  }

  // 스티커를 붙일 수 있는지 확인하는 함수
  function check(sticker, [n, m]) {
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < M; x++) {
        let boolean = true;

        for (let sy = 0; sy < n; sy++) {
          if (!boolean) break;
          for (let sx = 0; sx < m; sx++) {
            const [ny, nx] = [y + sy, x + sx];
            if (
              ny < 0 ||
              nx < 0 ||
              ny >= N ||
              nx >= M ||
              (note[ny][nx] === 1 && sticker[sy][sx] === 1)
            ) {
              boolean = false;
              break;
            }
          }
        }

        if (boolean) return [true, y, x];
      }
    }

    return [false, -1, -1];
  }

  // 스티커 회전 함수
  function rotate(sticker, [n, m]) {
    let newSticker = Array(m)
      .fill()
      .map((_) => Array(n).fill(0));

    for (let y = 0; y < n; y++) {
      for (let x = 0; x < m; x++) {
        newSticker[x][n - y - 1] = sticker[y][x];
      }
    }

    return newSticker;
  }
}

console.log(solution(N, M, K, stickers, stickerInfos));
