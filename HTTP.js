const http = require("http");

const server = http
  .createServer((req, res) => {
    //여기에 어떻게 응답할 지 적음
    res.writeHead(200, { "Content-Type": "text/html; charset = utf-8" });
    res.write("<h1> Hello World </h1>");
    res.write("<p>hello server</p>");
    res.end("<p>hello Hyelin</p>");
    console.log("연결");
  })
  .listen(8080);
server.on("listening", () => {
  console.log("8080 포트에서 서버 대기중입니다.");
});

server.on("error", (error) => {
  console.log(error);
});
// 스크립트 수정 뒤에는 반드시 다시 노드를 재실행 해야 한다.

// 바로 다른 포트를 개방해서 다른 서버를 실행할 수 있음
const server1 = http
  .createServer((req, res) => {
    //여기에 어떻게 응답할 지 적음
    res.writeHead(200, { "Content-Type": "text/html; charset = utf-8" });
    res.write("<h1> Hello World </h1>");
    res.write("<p>hello server</p>");
    res.end("<p>hello Hyelin</p>");
    console.log("연결");
  })
  .listen(8081);
