// .env 설정
const dotenv = require("dotenv");

const express = require("express");
const path = require("path");
//서버 로깅
const morgan = require("morgan");
//
const cookieParser = require("cookie-parser");

//세션
const session = require("express-session");

// 멀티파트
const multer = require("multer");
const fs = require("fs");

dotenv.config();
// 라우터 분리
const indexRouter = require("./routes"); //  잠시 분리했다가 합쳐주고
const userRouter = require("./routes/user");
const router = require("./routes");

const app = express();

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("upload 폴더가 없어서 upload 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}
const upload = multer({
  storage: multer.diskStorage({
    //업로드된 파일이 어디에 저장되는가?(디스크, 메모리, s3, googelcloud 선택 가능)
    destination(req, file, done) {
      done(null, "uploads/");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname); // 확장자를 포함한 이름
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: {
    // 파일 사이즈 제한 5메가 바이트 아래만 전송가능 초과시 400 에러 발생
    fileSize: 5 * 1024 * 1024,
  },
});

app.get("/upload", (req, res) => {
  res.sendFile(path.join(__dirname, "multipart.html"));
});
app.post("/upload", upload.single("image"), (req, res) => {
  // 한 라우터에 만 미들웨어 적용
  console.log(req.file);
  res.send("ok");
});
//app 관련 설정
app.set("port", process.env.PORT || 3000); // 서버에 'port'라는 속성(전역변수)을 준다
/**
 * app.http 메소드 를 쓰는 방식으로 호출 할 수 있다.
 */

// 미들웨어 : 동작 순서가 준비하다.
// morgan 사용
//배포시
// app.use(morgan("combined"));

//개발시
app.use(morgan("dev"));

// app.use("요청경로", express.static("실제경로"));
// 목적 : 보안, 서버의 파일 구조를 예측할 수 없음
// localhost:3000/zerocho.html        learn-express/public/zerocho.html
// localhost:3000/hello.css        learn-express/public/hello.css

app.use("/", (req, res, next) => {
  if (req.session) {
    //로그인 시 사진을 전송할 것이고 아니면 그냥 다음으로 넘어가고
    express.static(path.join(__dirname, "public"))(req, res, next);
    //확장된 미들웨어 작성법
  } else {
    next();
  }
});

//cookie-parser
app.use(cookieParser(process.env.COOKIE_SECRET));
// body parsing 의 기능
app.use(express.json()); // body를 json으로 보내줌
// extended 가 true면 qs , false면 querySting 모듈 사용
app.use(express.urlencoded({ extended: true })); // form  형식의 데이터를 처리
app.use(
  session({
    resave: false, // 요청이 왔을 때 세션에 수정상황이 생기지 않도록 다시 저장할지 여부
    saveUninitialized: false, // 세션에 저장할 냉역이 없더라도 세션을 저장할 지
    secret: "zerochopassword", // 세션 암호 비밀번호
    cookie: {
      httpOnly: true,
    },
    name: "connect.sid",
  })
);
// 만약  데이터 이미지를 처리하기 위해서는? >> 그건 다음장에
app.use(multer().array());
// 공통 미들웨어
app.use((req, res, next) => {
  // 미들웨어 : 모든 요청에 공통적으로 실행된다.
  console.log("모든 요청에 실행하고 싶어요");
  next(); // 미들웨어는 다음과 같이 해줘야 다음으로 넘어갈 수 있다.
});
app.use("/about", (req, res, next) => {
  console.log("/about에서만 실행이 된다.");
  req.data = "zerocho비번";
});

app.use(
  //여러개의 미들웨어를 스크립트 순차적으로 실행시킬 수 있다.
  (req, res, next) => {
    console.log("1 요청에 실행하고 싶어요");
    req.data; // zerocho 비번
    next();
  },
  (req, res, next) => {
    console.log("2 요청에 실행하고 싶어요");
    next(); // next에 인수가 없으면 다음 미들웨어로 넘어가고
  },
  (req, res, next) => {
    try {
      next();
    } catch (error) {
      next(error); //next에 인수가 있다면 아래에 적어둔 에러처리 미들웨어로 넘어간다.
    }
  }
);

// 라우터들 (범위가 넓을 수록 뒤로 보낸다)
// app.get("/", (req, res) => {
//   //1. 여러 자원  send 2번 이상 보내면 안됨
//   // res.writeHead(200, { "Content-Type": "text/plain" });
//   // res.send("hello express");
//   // // 해당 2줄을 다음과 같이 한 줄로 줄일 수 있다.
//   res.status(200).send("hello express");

//   //res.sendFile(path.join(__dirname, "index.html"));
//   // res.json("hello rezocho");
// });
app.use("/", indexRouter);
app.use("/user", userRouter);
app.post("/", (req, res) => {
  res.send("hello express1");
});

app.get("category/:name", (req, res) => {
  res.send("test");
});
app.get("/about", (req, res) => {
  res.send("hello express2");
});
app.get("/json", (req, res) => {
  //json으로 응답보내기
  //res.writeHead(200, { "Content-Type": "application/json" });
  //res.end(JSON.stringify({ hello: "hyelin" }));

  res.json({ hello: "hyelin" });
});

app.get(
  "/route",
  (req, res, next) => {
    //1
    res.send("next가 실행되나요?");
    next("route"); //1번과 3번 실행된다.
  },
  (req, res) => {
    //2
    console.log("다음 같은 url route가 실행될까?");
  }
);

app.get("/route", (req, res) => {
  //3
  console.log("실행됩니다");
});

app.get("/cookieParser", (res, req) => {
  req.cookies;
  //req.signedCookies;
  res.cookie("name", encodeURIComponent(name), {
    expire: new Date(),
    httpOnly: true,
    path: "/",
  });
  res.send("hello cookie");
});

app.post("/body", (req, res, next) => {
  //
  req.body;
});

app.get("/session", (req, res) => {
  req.session.id = "hello"; // 요청을 보낸 클라이언트만 hello
});
app.get("*", (req, res) => {
  res.send("hello wildcard");
});

// 라우터 그룹화 하기
// app.get("/group", (req, res) => {
//   res.send("hello groupGet");
// });
// app.post("/group", (req, res) => {
//   res.send("hello groupPost");
// });
router
  .route("/group")
  .get((req, res) => {
    res.send("hello groupGet");
  })
  .post((req, res) => {
    res.send("hello groupPost");
  });
/**
 * 에러 처리 미들웨어
 * 반드시 매개변수는 4개 여야 한다.
 */

app.use((req, res, next) => {
  res.status(404).send("404에러는 여기에 처리");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("에러났지 하지만 알알랴줌");
});
app.listen(app.get("port"), () => {
  console.log("익스프레스 서버 실행");
});
