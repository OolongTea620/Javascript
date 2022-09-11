### 1. 쓰레드풀
#### 쓰레드풀
fs,crypto,zlib 모듈의 메서드를 실행할 때는 백그라운드에서 동시에 실행됨.    
쓰레드 풀이 동시에 처리해줌

쓰레드의 갯수를 조정할 수 있는 명령어
```shell
$ UV_THREADPOOL_SIZE=8 //노드의 쓰레드를 8개로 변경
```

### 2. 이벤트
커스텀 이벤트 예제 참조
<< 04_threadpool.js

### 3.에러/예외 처리

#### 예외(Exception)처리
예외: 처리하지 못한 에러
노드 쓰레드를 멈춤  
노드는 기본적으로 싱글 쓰레드라 스레드가 멈춘다 == 프로세스가 멈춘다.    
**에러처리는 필수**

**1. try-catch문 사용**
- 에러가 발생할 만한 곳을 try-catch로 감싼다.
```javascript
setInterval(() => {
  console.log("시작");
  try {
    throw new Error("서버를 고장내 주마");
  } catch (err) {
    console.error(err);
  }
}, 1000);
```
- 프로미스의 에러는 따로 처리하지 않아도 된다.
##### >> 혹여나 버전이 바뀌면 달라질 수 있음 
catch를 붙여주자...
```javascript
const fs = require("fs").promises;

setInterval(() => {
  fs.unlink("12345.js");
}, 1000);
```

- 최후의 수단으로 사용   

- 콜백 함수의 동작이 보장되지 않음   
따라서 복구 작업용으로 사용하기에 부적합  
- 에러내용은 **기록용으로만** 쓰는 것이 좋음

```javascript
process.on("uncaughtException", (err) => {
  console.error("예기치 못한 에러");
});

setInterval(() => {
  throw new Error("서버를 고장내 주마");
}, 1000);

setTimeout(() => {
  console.log("실행됩니다");
}, 2000);
```
### 4. 프로세스 종료하기

윈도명령어
```shell
$ netstat -ano | findstr [포트]
S taskkill /pid [프로세스아이디] /f
```
맥/리눅스 명령어
```shell
$ lsof -i tcp:[포트]
S kill -9 [프로세스아이디] // 노드의 process.pid로 알 수 있음
```