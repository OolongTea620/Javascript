const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  console.log(`마스터 프로세스 아이디 : ${process.pid}`);
  //CPU 갯수만큼 워커를 생산
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }

  // 워커가 종료 되었을 때
  cluster.on("exit", (worker, code, signal) => {
    console.log(`${worker.process.pid}번 워커가 종료되었습니다`);
    console.log("code", code, "signal", signal);
    cluster.fork(); // 프로세서 하나가 만들어지면 하나 더 만들어짐
  });
} else {
  http
    .createServer((req, res) => {
      res.writeHead(200, { Content_Type: "text/html; charset=utf-8" });
      res.write("<h1>Hello Node</h1>");
      res.end("<h1>Hello Cluster</h1>");
      setTimeout(() => {
        //워커 프로세스를 확인하기 위해서 1초마다 강제 종료
        process.exit(1);
        console.error();
      }, 1000);
    })
    .listen(8086);
}
