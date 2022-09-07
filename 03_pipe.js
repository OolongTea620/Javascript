const fs = require("fs");
const zlib = require("zlib");

const readStream = fs.createReadStream("writeme.txt", { highWaterMark: 16 });
const writeStream = fs.createWriteStream("writeme.txt");

// readStream과 writeStream을 파이프로 연결
// 음..파일 복사 한다.
readStream.pipe(writeStream);

//이거는 압축한 내용은 write 스트림으로 보내준다.
const zlibStream = zlib.createGzip(); // 압축 스트림 선언
readStream.pipe(zlibStream).pipe(writeStream); // pipe끼리 여러번 붙일 수 있다.
