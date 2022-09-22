# 익스프레스 프로젝트 시작하기
### 1. package.json 만들기
```zsh
$ npm i express
$ npm i -D nodemon
```
  npm 라이브러리를 볼 때 
  - 최근 활동이 1년 이내인 것
  - 인기순(다운로드 많은 수)
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
#### 2-1. **라우터로 응답 보내기**
- html 파일 보내는 방식
- json으로 보내는 방식
### 3. 미들웨어 사용하기
**미들웨어란?**
라우터가 실행되기 전에 반드시 한번 실행되는 함수

### 미들웨어의 순서또한 중요하다.
### 3-1.미들웨어를 이용한 에러처리

### 4. next  활용법
1. 미들웨어 다음으로 
2. 분기처리 때
3. next(route) 인경우-> 같은 url을 가진 경우

### 5. morgan, bodyParser, cookieParser 라이브러리
- morgan  
nodemom 실행시 어떤 요청이 들어왔는지 확인해주는 라이브러리
- cookie-parser 
body 데이터 처리를 도와주는 라이브러리
### 5. express.static

### 6. 멀티파트 데이터 형식
  form 태그의 entype이 multipart/form-data인 경우
  - body-parser로는 요청 본문을 해석할 수 없음
  - multer 패키지 필요 
**multer**
npm install
```zsh
$npm i multer
```
### 7. dotenv
중요한 정보를 환경 변수로 만들어 값을 가리는 역할


### 8. express.Router
app.js가 길어지는 것을 막을 수 있음

- 라우트 매개변수
**:id**를 넣으면 req.params.id로 받을 수 있음

- 쿼리 스트링을 사용한 경우
req.query."이름"으로 받을 수 있음

**req**   
-req.app : req 객체를 통해서 app 객체에 접근가능   
  ex) req.app.get("port");  

req.body : body-parser 미들웨어가 만드는 요청의 본문을 해석한 객체

req.cookies: cookie-parser 미들웨어가 만드는 요청의 본문을 해석한 객체  

req.ip :요청의 ip 주소가 담겨있다

req.params : 라우트 매개변수에 대한 정보가 담긴 객체

req.query : 쿼리스트링에 대한 정보가 담긴 객체

req.signedCookies : 서명된 쿠키들은  req.cookies 대신 여기에 담겨 있다.

req.get(헤더 이름) : 헤더의 값을 가져오고 싶을 때 사용하는 메서드

### 9. 템플릿 엔진
요즘은 잘 사용안해요.
HTML의 정적인 단점을 개선
- 반복문, 조건문, 변수 등을 사용할 수 있음
- 동적인 페이지 작성가능
- PHP, JSP와 유사


#### 9-1. Pug(구 jade)

문법이 Ruby와 비슷해 코등 양이 줄어듦
HTML과 달리 호불호 명확   
익스프레스에 app.set으로 퍼그 연결
```javascript
app.set("port", 3000);
app.set("views", path.join(__dirname,"views")); // views 폴더(templete 폴더) 경로 지정
app.set("view engine", "pug");
app.use(morgan("dev"));
```

#### 9-2. Pug- 변수
```javascript
/**
 * res.render에서 두 번째 인수 객체에 Pug변수 넣음   
*/
router.get("/", function(req,res,next) {
  res.render("index", {title : "express"});
});
//res.locals 객체에 넣는 것도 가능(미들 웨어 간 공유)
router.get("/", function(req,res,next) {
  res.locals.title = "Express";
  res.render("index");
});

```
=이나 #{}으로 변수 렌더링 가능(= 뒤에는 자바스크립트 문법 사용가능)

### 10. 넌적스
Pug의 문법에 적용이 힘들면 넌적스를 사용하면 좋다
```zsh
$npm i nunjucks
```
- Pug를 지우고 Nunjucks 설치
- 확장자는 html 혹은 nkj(view engine을 nkj로)

```javascript
const nunjucks = require("nunjucks");

app.set("port", 3000);
app.set("views", path.join(__dirname,"views")); 
app.set("view engine", "html");
nunjucks.cofigure("views", {
  express : app,
  watch : true,
});

app.use(morgan("dev"));

```