/*# 3_nodejs 파일예제 */

const { setFips } = require("crypto");

// ## 1. 파일 읽기
const fs = require("fs").promises;

fs.readFile("./README.md")
  .then((data) => {
    console.log(data);
    console.log(data.toString());
  })
  .catch((err) => {
    throw err;
  });

// ## 2. 파일 생성하기
fs.writeFile("writeme.txt", "노드 학습을 합시다!")
  .then(() => {
    return fs.readFile("./writeme.txt");
  })
  .then((data) => {
    console.log(data.toString());
  })
  .catch((err) => {
    throw err;
  });

fs.readFile("./README.md", (err, data) => {});

// ## 2. 버퍼와 스트리밍 예제
// ### 2-1. 버퍼 예제
const buffer = Buffer.from("버퍼로 바꿀 데이터");
console.log("from:", buffer);
console.log("length:", buffer.length);
console.log("toString:", buffer.toString());

const array = [
  Buffer.from("띄엄"),
  Buffer.from("띄엄"),
  Buffer.from("띄어쓰기"),
];
const buffer2 = Buffer.concat(array); // concat() 버퍼를 합치는 함수
console.log("concat()", buffer2.toString());

const buffer3 = Buffer.alloc(5); // 데이터가 없는 빈 버퍼를 생성
console.log("alloc():", buffer3);

// ### 2-2. 스트림 예제
// 파일 읽기
const readStream = fs.createStream("README.md");
//createStream은 defualt로 한번에 64kbyte를 읽는다.
// const readStream = fs.createStream("README.md", { highWaterMark: 16 }); 16 byte씩 읽게하는 변수
const data = [];
readStream.on("data", (chunk) => {
  data.push(chunk);
  console.log("data :", chunk, chunk.length);
}); //stream 방식으로 전송 (순서대로 전송)

readStream.on("end", () => {
  // 흩 뿌려진 버퍼 모으기
  console.log("end", Buffer.concat(data).toString());
});

readStream.on("error", (err) => {
  console.log("error:", err);
});

// 파일 입력
const writeStream = fs.createWriteStream("README.md");

writeStream.on("finish", () => {
  console.log("파일 쓰기 완료");
});

writeStream.write("이 글을 작성합니다.\n");
writeStream.write("한번 더 작성합니다.\n");
writeStream.end();
