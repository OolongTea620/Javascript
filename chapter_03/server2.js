const http = require("http");
const fs = require("fs").promises;

const server = http
  .createServer(async (req, res) => {
    try {
      res.writeHead(200, { "Content-Type": "text/html; charset = utf-8" });
      //html 파일을 읽어서 전송
      const data = await fs.readFile("./server2.html");
      res.end(data);
    } catch (error) {
      console.error(error);
      res.writeHead(200, { "Content-Type": "text/plain; charset = utf-8" });
      res.end(error.message);
    }
  })
  .listen(8080);
server.on("listening", () => {
  console.log("8080 포트에서 서버 대기중입니다.");
});

server.on("error", (error) => {
  console.log(error);
});
