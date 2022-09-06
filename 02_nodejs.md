# Node.js의 내장 객체

### 1. REPL
자바 스크립트는 스크립트 언어라서 즉석으로 코드를 실행 가능하다.
- REPL이라는 콘솔 제공
- R(Read) , E(Evaluate), P(Print), L(Loop)
- 윈도우에서 명령 프롬프트, 맥이나 리눅스에서는 
터미널에 node 입력
`$ node [.js 파일명]` // 여기에 자바스크립트코드 를 작성할 수 있다. 

### 2. Module 만들기 
-> 2-2_module 참조하기

### 3. global과 콘솔, 타이머
- 노드의 전역 전체
- 브라우저의 window 같은 역할
- **모든 파일에서 접근가능**
- [비추] global 속성에 값을 대입하면 다른 파일에서도 사용가능

### 4. console 객체
- console.time, console.timeEnd : 시간 로깅
- console.error: 에러 로깅
- console.log : 평범한 로그
- console.dir : 객체 로깅
- console.trace :호출스택 로깅 >> 함수 안에서 사용하면 호출스택을 로깅해줌
- console.table : 테이블 형식으로 깔끔하게 보여줌

### 5.타이머 메서드
set 메서드에 clear 메서드가 대응됨
- set 메서드의 리턴 값(아이디)을 clear 메서드에 넣어 취소

취소를 할려면 변수를 넣어서 취소해야한다.

### 6. export 와 this
__filename : 현재 파일 주소
__dirname : 현재 폴더 주소 주소

#### exports
module.exports === exports === {} // 기본적으로 빈 객체다... >> 변수는 괜찮다. 

- 모듈에 다른것을 대입 하면 안된다.
한가지만 모듈로 만들고 싶을 때 > module.export
두가지 이상 > 각각 따로 빼거나, 아니면 export를 여러개 선언하거나

#### this
- this는 전역 객체를 가리킨다
ex)
1. anomymous에서의 this는 global이 아닌 빈 객체다.
```javascript
console.log(this);
```
    
2. function안에 있는 this는 global이다
```javascript
console.log(this);
```
### 7.모듈 심화/ 순환 참조
#### require
- 어떤 경로에 있는 파일을 실행하고 싶지만, 
거기에 선언된 객체, 변수 등을 사용하고 싶지 않을 때 사용.
자바스크립트 파일을 모듈로 실행하면 해당 파일은 모듈이 된다.
- require.cache에 한 번 require한 모듈에 대한 캐싱 정보가 들어있음
- **require.main은 노드 실행시 첫 모듈을 가리킴**    어떤 파일을 실행한건지 알 수 있다.
#### 순환 참조
두개의 모듈이 서로를 require하는 상황을 주의해야 한다.
- 서로가 서로룰 참조하는 경우 > 2번째로 참조하는 것을 빈 객체로 만들어 버린다. (노드에서 순환참조를 찾아서 한쪽을 빈 객체로 만들어 버린다)

### 8. process : 운영체제 접근
- 현재 실행중인 노드 프로세스에 대한 정보를 담고 있음

#### process.env    
시스템 환경 변수들이 들어있는 객체
- 비밀키를 보관하는 용도로 쓰임
- 환경 변수는 process.env로 접근 가능   

```javascript
const secretId = process.env.SECRET_ID;
const secretCode = process.env.SECRET_CODE;
```
- 일부 환경 변수는 노드 실행 시 영향을 미침
ex) NODE_OPTIONS(노드 실행 옵션), UV_THREADPOOL_SIZE(스레드풀 개수)
    - max-old-space-size 는 노드가 사용할 수 있는 메모리를 지정하는 옵션
```javascript
NODE_OPTIONS=~~max-old-space-size=8192
UV_THREADPOOL_SIZE=8
```

#### process.nextTick(콜백)
 이벤트 루프가 다른 콜백 함수들 보다 nextTick의 콜백 함수를 우선적으로 처리함
- 남용시, 다른 콜백 함수들 실행이 늦어짐
- 비슷한 경우로 promise가 있음(nextTick 처럼 우선 순위가 높음)
- 예제에 따르면?? setImmediate, setTimeout보다 promise와 nextTick이 먼저 실행됨

#### process.exit(1)
프로세스에서 오류가 있다는 것을 알리고 노드를 종료

#### 9.os 와 path

#### OS
- node.js는 운영체제의 정보를 담고 있다.
    내장모듈이라서 경로 대신 이름만 적어줘도 된다
```javascript
/*
node.js의 API documentation에 설명이 충분히 되어 있다.
*/
const os = require('os'); // node에서 미리 os.js를 생성해서 불러올 수 있다.
os.arch(); //process.arch와 동일
os.platform(); //process.platfrom과 동일
os.type(); //운영체제의 종류를 보여준다.
os.uptime(); //os의 부팅 후 흐른 시간(초)를 보여준다. 
os.hostname(); //컴퓨터의 이름을 보여줍니다.
os.release(); //운영체제의 버전을 보여준다.
os.homedir(); //홈 디렉토리 경로를 보여준다
os.tmpdir(); //임시 파일 저장 경로를 보여준다.
os.cpus(); // 컴퓨터의 코어 정보를 출력한다. 지금 프로그램이 구동중인 환경을 알 수있다. (운영체제의 thread와 node.js의 thread는 다른 개념이다)
os.freemem(); // 사용 가능한 메모리(RAM) 용량을 보여준다.
os.totalmem(); //전체 메모리 용량을 보여준다.
```
#### path
- 폴더와 파일의 경로를 쉽게 조작하도록 도와주는 모듈    
운영체제별로 경로 구분자가 다름(Windows: '\' , POSIX : '/')
```javascript
const path = require('path');
/*
C:\users\test -> 윈도우 방식 경로 표기
C:/users/test -> 리눅스/ 맥 방식 경로 표기 (POSIX)
# path는 운영체제 마다 다른 경로 표기를 하나로 표시할 수 있도록 해준다.
*/
path.join(__dirname, 'var.js'); // 현재 디렉토리에 var.js를 찾아라
path.join(__dirname, '/var.js'); // 앞에 '/'를 붙여도 일단 상대 경로로 생각한다. 

path.join(__dirname,'..', 'var.js'); // 현재 디렉토리 상단 디렉토리의 var.js를 찾아라

path.resolve(__dirname,'..','/var.js');// 루트 폴더의 var.js를 절대경로(/)표기를 우선시해서 파일을 접근한다.

path.normalize(''); //경로의 이름을 정리해서 보여준다.
```

### 10. url, querystring
- 인턴넷 주소 조작을 쉽게 할 수 있도록 도와주는 기능
WHATWG방식과 기존 노드 방식 2가지가 있다.

#### url

#### querystring
- WHATWG 방식에서 쿼리스트링부분 처리를 도와주는 객체
#### searchParams(WHATTWG)
- getAll('키') : 키에 해당하는 **모든 값들을 가져옴**.
- get('키') : 키에 해당하는 **첫번째 값만 가져옵니다**.
- has('키') : 해당 키가 있는지 없는지 여부를 검사.
- keys('키') : searchParams의 모든 키를 반복기(iterator, ES2015)로 가져온다.
- values(): searchParams의 모든 값을 반복기 객체로 가져온다.
- append('키', 값) : 해당 키를 추가 합니다. **같은 키의 값이 있다면 유지하고 하나 더 추가**.
- set('키', 값): **값은 키의 값을 지우고** 새로 추가.
- delete(키) : 해당 키를 제거한다.
- toString(): 조작한 searchParams객체를 다시 문자열로 만든다. + 이 문자열을 Search에 대입하면 주소 객체에 반영된다.

#### querysting(기존 노드 방식)
- 기존 노드 방식에서는 url querystring을 querystring 모듈로 처리
- querystring.parse(쿼리): url의 query부분을 자바스크립트 객체로 분해해 준다.
- querystring.string(객체): 분해된 query 객체를 문자열로 다시 조립해준다.

### 11. Crypto, util
#### Crypto : 단방향 암호화
- 암호화는 가능하지만 복호화는 불가능
암호화 - 평문을 암호로 만듦
복호화 - 암호문을 평문으로 해독

- 해시 기법 : 단방향 암호의 대표
문자열을 고정된 길이의 다른 문자열로 바꾸는 방식
다이제스트를 다시 비밀번호로 만들 수 없다.(복호화 불가능)

비밀번호 -> 해시함수 <-> 다이제스트
#### Hash
- createHash(알고리즘) : 사용할 해시 알고리즘을 넣어준다. >> sha256, sha512...
- update(문자열) : 변환할 문자열을 넣어준다.
- digest(인코딩) : 인코딩할 알고리즘을 넣어준다. >> base64,hex,latin1

```javascript
const crypto = require('crypto');

crypto.createHash('sha256').update('비밀번호').digest('base64');
```
#### pbkdf2 
- 컴퓨터의 발달로 기존 암호화 알고리즘이 위협받고 있음
sha512가 취약해지만 sha3로 넘어가야함
- 현재 pbkdf2나 bcrypt, scrypt 알고리즘으로 비밀번호를 암호화

```javascript
const crypto = require('crypto');
crypto.randomBytes(64, (err,buf) => {
    const salt = buf.toString('base64);
    
    crypto.pbkdf2('비밀번호', salt, 100000,64,'sha512', (err,key) =>{
        console.log('password', key.toString('base64'));
    });
    // pbkdf2를 사용시, salt와 비번을 둘다 저장해야한다.
};)
```
- **Node는 pbkdf2와 scrypt지원**
#### 양방향 암호화
- 대칭형 암호화(암호문 복호화 가능)
- key가 사용됨
- 암호화 할때와 복호화 할 때 같은 키를 사용해야한다(대칭형 암호)

```javascript
const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = 'abcdefghijklmnopqrstuvwxyz123456'; //32바이트 문자열 사용
const iv = '1234567890123456'; // 16바이트 문자열 사용

//암호화 과정
const cipher = crypto.createCipheriv(algorithm, key, iv); //암호화 설정
let result = cipher.update('암호화할 문장', 'utf8','base64'); // 암호화
result += cipher.final('base64'); 

//복호화 과정
const decipher = crypto.createDecipheriv(algorithm, key, iv);
let result2 = decipher.update(result,'base64', 'utf8');
result2 += decipher.final('utf8');
```
>> 기본 노드의 crypto는 암호화 지식이 있어야 사용 가능하다.

>> 현업에서 key관리는?? aws kms 서비스 이용...?
#### util 
- 노드에서 각종 편의 기능을 모아둔 모듈
deprecated와 promisify가 자주 쓰임
```javascript
const util = require('util');
const crypto = require('crypto');

/*
    util.deprecated로 함수를 감싼다.
    해당 함수를 쓸 때 마다 경고창을 출력, 라이브러리 만들때 주로 사용.
    (deprecated : 중요도가 떨어져 더 이상 사용되지 않고 앞으로 사라지게 될 것)
*/
const contUseMe = util.deprecated((x, y) =>{
    console.log(x+y);
},'dontUseMe는 deprecated되었으니 더 이상 사용하지 마세요', 
dontUseMe(1,2));

/*
    콜백 패턴을 프로미스 패턴으로 바꿔준다
    단, 콜백이 (error,data) => {} 형식이여야 한다.
*/
const randomBytesPromise = util.promisify(
    crypto.randomBytes
);
```

### 12. worker_threads

노드에서 멀티 쓰레드 방식으로 작업할 수 있음(사용은 드뭄...cpu를 사용하는 암호화나 압축때 사용)

- isMainThread: 현재 코드가 메인 스레드 에서 실행되는지 워커 스레드에 실행되는지 구분

메인 쓰레드에는 new Worker를 통해 현재 파일(__filename)을 워커 쓰레드에서 실행시킴

worker.postMessage로 부모에서 워커로 데이터를 보냄
parentPort.on('message') 로 부모로 부터 데이터를 받고 postMessage로 데이터를 보냄
```javascript
const {Worker, isMainThread, parentPort, workerData} = require('worker_threads');

if (isMainThread) { //메인쓰레드
    const threads = new Set();
    threads.add(new worker(__filename, {
        workerData : { start : 1}, // 초기데이터
    }));
    threads.add(new worker(__filename, {
        workerData : { start : 2}, // 초기데이터
    }));
    for (let worker of threads) {
        worker.on('message', (value) => console.log('워커로부터', value));
        worker.on('exit' ()=> {
            threads.delete(worker); // 작업이 끝난 워커는 제거(종료)
            if (threads.size === 0) {
              console.log('워커 끝');  
            }
        });
    }
    const worker = new Worker(__filename);
    
    worker.postMessage('ping');

}else { // 워커 쓰레드
    parentPort.on('message', (value) => {
        console.log('부모로부터', value);
        parentPort.postMessage('Pong');
        parentPort.close();
    })

}
```

### 13. child_process
- 노드가 아닌 다른 프로세서(프로그램, 터미널)를 띄어준다. 그러니까.. 터미널을 이용한 명령을 해준다.

```javascript
const exec = require('child_process').exec;
var process = exec('dir');

process.stdout.on('data', function (data) {
    console.log(data.toString());
})
process.stderr.on('data', function (data) {
    console.error(data.toString());
})
```

### 14. 기타 모듈
assert : 값을 비교하여 프로그램이 제대로 동작하는지 테스트 하는데 사용합니다
dns : 도메인 이름에 대한 IP주소를 얻어내는데 사용
net : HTTP보다 로우 레벨인 TCP IPC 통신을 할 때 사용
string.decoder : 버퍼데이터를 문자열로 바꾸는데 사용
tls : TLS와 SSL에 관련된 작업을 할 때 사용
tty : 터미널과 관련된 작업을 할 때 사용
dgram : UDP와 관련된 작업을 할 때 사용
v8 : V8엔진에 직접 접근할 때 사용
vm : 가상 머신에 직접 접근할 때 사용