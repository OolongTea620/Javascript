setInterval(() => {
  console.log("시작");
  try {
    throw new Error("서버를 고장내 주마");
  } catch (err) {
    console.error(err);
  }
}, 1000);

const fs = require("fs").promises;

setInterval(() => {
  fs.unlink("12345.js");
}, 1000);

/*예러 기록용 */
process.on("uncaughtException", (err) => {
  console.error("예기치 못한 에러");
});

setInterval(() => {
  throw new Error("서버를 고장내 주마");
}, 1000);

setTimeout(() => {
  console.log("실행됩니다");
}, 2000);
