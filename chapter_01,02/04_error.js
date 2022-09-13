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

/*세션을 사용 예제*/
const session = {};
http.createServer(async (req, res) => {
  const cookies = parseCookies(req.headers.cookie);
  if (req.url.startsWith("login")) {
    const { query } = url.parse(req.url);
    const { name } = qs.parse(query);
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 5);
    const uniqueInt = Date.now();
    session[uniqueInt] = {
      name,
      expires,
    };
    res.writeHead(302, {
      Location: "/",
      "Set-Cookie":
        "session=${uniqueInt}; Expires=${expires.toGMTString()} HttpOnly; Path=/",
    });
    res.end();
  } else if (cookies.session && session[cookies.session].expires > new Date()) {
    res.writeHead(200, { "Content-Type": "text/plain; chartset=utf-8" });
    res.end("${session[cookies.session].name}님 안녕하세요");
  } else {
    try {
      const data = await fs.readFile("./cookie2.html");
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(data);
    } catch (error) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=uft-8" });
      res.end(error.message);
    }
  }
});
