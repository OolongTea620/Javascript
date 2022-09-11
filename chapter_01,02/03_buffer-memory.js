const fs = require("fs");
console.log("before :", process.memoryUsage().rss);

const data1 = fs.readFileSync("./big.txt");
fs.writeFileSync("./big2.txt", data1); // 버퍼로 통째로 옮기는 방법

console.log("buffer", process.memoryUsage().rss);
