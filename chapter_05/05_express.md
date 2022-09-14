# 익스프레스 프로젝트 시작하기
### 1. package.json 만들기
```zsh
$ npm i express
$ npm i -D nodemon
```
### 2. 서버 작성하기 
```javascript
const express = require("express");
const app = express();

app.set("port", process.env.PORT || 3000); // 서버에 'port'라는 속성(전역변수)을 준다
app.get("/", (req, res) => {
  res.send("hello express");
});
app.post("/", (req, res) => {
  res.send("hello express");
});
app.get("/about", (req, res) => {
  res.send("hello express");
});
app.listen(app.get("port"), () => {
  console.log("익스프레스 서버 실행");
});
```