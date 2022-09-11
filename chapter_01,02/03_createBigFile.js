/*대용량 파일 만들기 예제 */
const fs = require("fs");
const file = fs.createWriteStream("./big.txt");

for (let i = 0; i <= 500_000; i++) {
  file.write(
    "안녕하세요 아주 큰 파일을 한번 만들어 보겠습니다. 어디 까지 쓸수 있을 까요?\n"
  );
}
file.end();
