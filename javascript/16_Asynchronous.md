# 비동기 (Asynchronous)

**참고 링크**   
[프로미스](https://developers.google.com/web/fundamentals/primers/promises)     
[async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)


**Javascript is Single-Treaded**    
\> 자바스크립트는 싱글 스레드로 진행된다.
브라우저와 자바스크립트가 통신할 방법이 필요하다.
동기 코드는 행 단위로 실행된다.
비동기 코드는 일부 작업이 완료되면 실행된다.

Javascript는 비동기 코드를 실행할 때    
단일 스레드지만 **더 오래 걸리는 작업**(ex: setTimeout())을 다중 스레드를 사용하는 **브라우저로 넘긴다**.
### 이벤트 루프의 역할
- 비동기 코드를 처리하는 콜백함수의 처리를 돕는다.
- 브라우저의 일부, 대기하는 메시지 큐와 동기화
- 상시 실행 상태
- Stack이 비어있는 경우, 비어 있을 때 이벤트 루프가 실행
- 대기 상태거나 메시지 큐에 있는 함수를 스택으로 푸시하는 역할을 한다.
### 메시지 큐
- setTimeOut()함수가 실행되면 메시지 큐에 실행될 함수를 넣어둠


## 동기 비동기 코드 실행순서
```javascript

```
## Promise
목적: 콜백지옥 방지.    
**Promise는 작업을 더 쉽게 하기 위해서 (비동기)코드를 감싸는 객체다!**
```javascript
// 콜백지옥 Case
getCurrentPosition(() => {
    setTimeout(() => {
        doMoreAsumcStuff(()=> {
            ...
        })
    },1000);
}, ...)
```
이런식으로 바꾼다.
```javascript
someAsyncTask().
then(() => {
    return anotherTask();
})
.then(() => {
    return yetAnotherTask();
})
.then(...);
```

### 다수의 프로미스 체이닝
then()과 catch() 메서드는 아직 SETTLED 하는 새로운 프로미스를 반환하기 때문에 then()과 catch()매서더를 서로 연결할 수 있다.
### 프로미스 오류 처리하기
**프로미스의 상태**    
PENDING : 프로미스가 작동중. then() or catch가 실행되지 않는다. 

RERSOLVE : 프로미스가 해결됨 => then()이 실행됨   

REJECT: 프로미스가 거절되었습니다 => catch()가 실행됨      

catch() 나 then() 블록다음에 then() 블록이 있으면   
프로미스가 **PENDING**모드로 다시 들어간다.     
(then()과 catch()는 항상 새로운 프로미스를 반환한다.    
catch()는 항상 새로운 프로미스를 반환한다.
- 어떤 것으로 해결 되지 않거나 then() 내부에서 return한 것으로 해결된다)    
- 더 이상 then 블록이 남아있지 않은 경우에만 아래의 최종 모드(SETTLED)로 들어간다.

**SETTLED**     
특수 블록인 finally()로 최종 정리 작업을 할 수 있다.
이전에 해결되었든 아니던 상관없이 finally()는 도달한다.
```javascript
somePromiseCreatingCode()
    .then(firstResult => {
        return 'done with first promise';
    })
    .catch(err => {
        // would handle any errors thrown before
        // implicitly returns a new promise - just like then()
    })
    .finally(() => {
        // the promise is settled now - finally() will NOT return a new promise!
        // you can do final cleanup work here
    });
```

```javascript
getPosition().then(
    success => {
        // 여기에 성공 케이스
    },
    error => {
        // 여기에 resolve 오류시 처리할 부분
    }
)
```
#### then().catch()
catch() 부분에 콜백 함수를 넣는다.
```javascript
getPosition().then(
    success => {
        // 여기에 성공 케이스
    }
).catch(
    error => {
        //여기에 에러시 처리할 로직 처리
    }
);
```

```javascript
function trackUserHandler() {
    let positionData;
    getPosition()
    .then()
    .then()
    ...
}
```
## Async await

### Async await 사용하기
.then(), .catch()의 대안    
**함수에서만 사용가능**     
async가 있으면 해당 함수는 **자동으로 프로미스를 반환한다.** 
```javascript
// 함수 전체를 큰 프로미스로 묶는다.
async function 함수이름 () {
  ...
  await getPosition(){
  //async가 모든 것들을 프로미스로 감싼다.
  // await로 감싸진 다른 프로미스가 해결될 때 까지 기다리고
  // 큰 프로미스로 반환 뒤 보이지 않은 then 블록 반환
  // 내부적으로 코드가 변환된다.
  
  console.log("Clicked!");
  const posData = await getPosition();
  const timerData = await setTimer(2000);
  console.log(timerData, posData);
  }
}

const 함수이름 = async (duration) => {
  ...
};
```

### async await 오류 처리하기
try-catch 사용
```javascript
async function 함수이름 () {
  
  try {
    const posData = await getPosition();
  } catch(error) {
    console.log(error);
  }
  const timerData = await setTimer(2000);
  console.log(timerData, posData);
}
```
### Raw 프로미스
async-await의 단점  
동일한 함수 내에서 동시에 작업을 실행할 수 없음

```javascript
// (X) 전역에서 다음과 같이 쓰임
await setTimer(2000); // 이렇게 쓰지 않는다.

// 이렇게 사용해야 한다.
(async function(){
    // 익명함수에 대한 쌍방
    await setTimer(1000);
})(); 
```

### Promise.all(), Promise.race()
#### Promise.race()
- 인자로 프로미스 배열이 들어간다.
- 데이터의 반환이 가장 빠른 프로미스의 결과를 넘긴다.
- '.'체인을 구축하면 일반 프로미스를 반환한다.
- 만약 프로미스 결과가 실패한다면 **취소가 아닌 무시가 된다**.
```javascript
Promise.race([getPosition(), setTimer(1000)]).then((data) => {
  console.log(data);
});
```
#### Promise.all()
- 인자로 프로미스 배열이 들어간다.
- 모든 프로미스의 반환값이 배열로 들어가 있다.
- 어떤 프로미스 하나가 실패하면 다른 프로미스 역시 실행되지 않는다 => 모두 해결되거나 적어도 하나는 거부가 된다.
- 실패시,  catch()로 처리될 수 있는 오류가 뜬다.
```javascript
Promise.all([getPosition(), setTimer(1000)]).then((promiseData) => {
  console.log(promiseData);
});
```

#### Promise.allSettled()
- 프로미스 배열 하나가 인자로 들어간다.
- **프로미스 결과를 객체 배열로 반환한다.**
- **프로미스 하나가 오류가 나도 취소하지 않고** 다른 프로미스를 완료하거나 **프로미스 실행 성공여부를 저장한다.**
```javascript
Promise.allSettled([getPosition(), setTimer(1000)]).then((promiseData) => {
  console.log(promiseData);
});
```