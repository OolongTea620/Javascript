# javascript를 간단 요약 스터디

### 1. 호출 스택
(함수호출, 자료구조의 스택)
- LIFO  구조 (선입 후출)
- Anoymous는 가상의 전역 컨텍스트(항상있다고 생각하는게 좋다)
- 함수 호출 순서대로 쌓이고 역순으로 실행된다.
- 함수 실행이 완료되면 스택에서 빠진다.

**+ 만약 setTimeout() 함수라면?**
- setTimeout 함수는 **비동기 함수**다
- 호출 스택 만으로는 해당 함수를 설명 불가능하지만 **비동기 루프(이벤트 루프)**로 설명이 가능하다 

### 2. 이벤트 루프 알아보기
#### 비동기 함수
백드라운드에 있는 함수는 호출스택과 동시에 실행이 가능하다.
(다만 백그라운드에서 실행된 함수가 먼저 끝나더라도 호출스택에서 호출된 함수도 실행이 끝나야 한다.)

이벤트 루프의 역할?
호출 스택이 비어 있을 때, 태스크 큐에 쌓인 실행순서를 다시 호출 스택에 넣어주는 역할을 한다.(이때 호출스택은 비어있는 상태야 한다)

+ 백그라운드로 갈 수 있는 함수가 제한되어 있음.
따라서 노드는 멀티 쓰레드보다 싱글 쓰레드에 가깝다.

+ 백그라운드에 있는 함수는 언제 실행될지 모른다.

### 3. var, const, let
**ES2015부터는 const와 let 이 대체**
- var 
`
if (true) {
    var x = 3;
}
console.log(x) *3 출력*, 
'{}' (블록) 밖에 있어도 변수 호출 가능
`
- const
**한 번 값을 대입하면 수정불가**
const b = { name : 'zerocho'};
b.name = 'hyelin' 
- b안에 구조체가 선언되어 있으면 그 

-let 
계속해서 대입(값 변경) 가능
let c = 5;
c = 3;
c = 10;

### 4. 템플릿 문자열 객체 리터럴

var won = 1000;
var result = `이 과자는 ${won} 입니다`; -<- *이런것을 템플릿 문자열이라고 한다*
function a() {}
a(); *//함수 a 호출*
a``; //태그가 달린 백틱 리터럴

### 5. 화살표 함수
function을 안벽하게 대체 하지는 않는다.
function add1(x,y) {
    return x + y;
}

const add2 = (x, y) => { 
    return x + y;
}
//중괄호 바로 다음줄에 return 이 나오면 그 줄을 생략 가능하다

const add3 = (x,y) => (x + y);

const add4 = (x,y) => x + y;

function not1(x) {
    return !x;
}
// 매개변수가 하나라면 매개변수 가로도 생략 가능

const not2 = x => !x;

const obj = (x,y) => ({x,y})
**객체를 return 하는 경우 소괄호 필수**

화살표 함수 -> this는 부모의 this를 가져야한다.
부모의 function을 가진다.
this를 안쓰는게 베스트지만 쓴다면 function 을 반드시 쓰는게 가독성에 좋다.

### 6. 비구조화 할당
const example = {a: 123, b : {c:135, d : 146}}
const a = example.a;
const b = example.b.d;

const {a, b : {d}} = example
console.log(a); //123
console.log(d); //146

arr = [1,2,3,4,5]
const x = arr[0]
const y = arr[1]
const z = arr[4]

const [x,y,,,z] = arr; //자릿수를 맞춰야 한다.
console.log(x) //1
console.log(z) //5

**this가 있는 경우 구조 분해 할당은 하지마라...**
### 7. 클래스
프로토타입 문법을 깔끔하게 작성할 수 있는 Class 문법 도입

### 8. promise, async/await

#### promise
- 내용이 실행은 되었지만 결과를 아직 반환하지 않은 객체
- Then을 붙이면 결과를 반환함
- 실행이 완료되지 않았으면 완료된 뒤 Then 내부 함수가 실행됨

Resolve(성공 리턴 값) -> then으로 연결
Resolve(실패 리턴 값) ->catch 로 연결
Finaly 부분은 무조건 실행됨
나중에 필요할 때 호출 할 수 있음

Promise.all(배열): 여러개의 프로미스를 동시에 실행
- 하나라도 실패하면 catch로 감
- allSettled로 실패한 것만 추려낼 수 있음

#### async/await
- 변수 = await 프로미스;인 경우, 프로미스가 resolve된 값이 변수에 저장

- 변수 await값인 경우 그 값이 변수에 저장/오른쪽에서 왼쪽으로 간다.

const promise = new Promise(...)

promise.then((result)=> ...) *//구*

const result = await promise; *//신*

async function main() {
    try {
        const result = await.promise;
        return result;
    }catch {
        console.error(error);
    }
}

main().then((name) =>...) *//async에서 리턴한 값은 then으로 받아야 한다*
const name = await.main()
 
### 9. 프론트엔드 자바스크립트