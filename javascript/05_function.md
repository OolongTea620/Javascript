# Javascript Function
**매개변수 vs 인수**
**매개변수**    
함수를 정의할 때 **괄호 안에 지정하는 변수**

**인수**    
함수를 호출할 때 함수 안에 **전달하는 구체적인 값**

```Javascript
function sayHi(name) { ... } // name은 매개변수

sayHi("Max"); // 매개변수 name에 대해서 "Max"는 함수의 인수
```

## 1. Function (함수)
- 함수 자체가 객체이다 -> Heap영역에 저장된다.
- 객체에 함수를 저장할 수 있다.
```javascript
function startGame() {
  console.log("Game is starting...");
}

console.dir(startGame); // function

```
## 2. 함수 선언과 함수 표현식의 차이점

**함수 선언**   
- Javascript가 자동으로 함수를 맨 위로 호이스트하고(hoist), 초기화함

**함수 표현식**     
수동으로 어딘가에 저장해야하는 값(함수 객체)를 생성한다.
- 상수가 정의되지 않은 상태로 호이스트된다.

### 익명함수
함수 이름이 할당되지 않은 함수객체

어떤 변수에 함수객체를 할당한다면 뒤에 함수 선언시, 함수이름을 생략 가능하다.
```javascript
const start = function () {
  console.log("Game is starting...");
};

startGameBtn.addEventListener("click", start);
```
변수에 저장하지 않을 때에도 사용가능하다.
```javascript
startGameBtn.addEventListener("click", function() {
  console.log("Game is starting...");
});
```
### 화살표 함수
어떤 변수에 함수를 저장할 때나, 익명함수 사용위치에서 사용가능      
익명함수는 어떤 식으로든 이름을 할당할 수 없음

```javascript
const someFunc = (cChoice, pChoice) => { //화살표함수
  ...
};


() => {} // (X) 할당받을 변수는 있어야 한다.

/*add와 add2는 같은 기능을 한다.*/
const add = (a, b) => a + b;

const add2 = function (a, b) {
  return a + b;
};
```
**언제 쓸까?**  

No Arguments| Parameters
(인수가 없는 경우)  
\>> 한쌍의 빈 괄호 필요

    () => {...}

Exactly one(1) Argument/Parameter
(파라미터, 인수가 반드시 1개인 경우)    
\>> () 생략가능

    arg => {...}

Exactly one expression in function body
(함수 본문이 1줄인 경우)    
\>> {} 생략, return 생략

    (a, b) => a + b; 

More than one expression in function body
(함수 본문이 1줄 이상인 경우)   
\>> 중괄호({}) 생략 불가 

    (a, b) => {
        a *= 2;
        return a + b;
    } 

함수가 객체를 반환하는 경우     
\>> 객체에 대한 추가괄호 필요

    const loadPerson = pName => ({name : pName});


### 인수 기본값 정하기
(1) 기본값을 가진 매개 변수는 늘 매개변수 리스트의 가장 마지막이 된다.
```javascript
const gettest = (val1, val2 = val1 === 1 ? 4 : 5) => {
  console.log(val1, val2);
};

gettest(1); // val1 : 1 , val2 : 4
gettest(1, 2); // val1 : 1 , val2 : 2
gettest(2); // val1 : 2 , val2 : 5
gettest(undefined); // val1 : undefined  , val2 : 5
gettest(); // val1 : undefined , val2 : 5

const getCase = (val1 = 3, val2) {
    console.log(val1, val2);
}
getCase(3);


// 기본값이 설정된 매개변수는 가장 마지막으로 인식된다.
const getCase = (val1 = 3, val2) => {
  console.log(val1, val2);
};
getCase(2); // 2, undefined
getCase(undefined, 1); // 3, undefined
getCase(null, 1); // null, 1
getCase(); // 3, undefined
```

### Rest 매개변수 연산자
인수받기에 유연함을 제공한다.
지정된 앞부분 이후의 모든 인수를 접근할 수 있는 배열로 묶는다.
```javascript
const sumUp = (...numbers) => { // Rest연산자. 전달받은 인수를 자동으로 모아서 객체 혹은 배열로 만든다.
  let sum = 0;
  for (const num of numbers) {
    sum += num;
  }
  return sum;
};
console.log(sumUp(1, 5, 10, -3, 6, 10));

const sumUp = (a, b ,...numbers) => { // Rest 연산자 앞에 추가로 매개변수를 선언할 수 있다.
  let sum = 0;
  for (const num of numbers) {
    sum += num;
  }
  return sum;
};

(X) const sumUp = (...numbers, a) => { //rest 연산자 뒤에 추가로 더 매개변수를 선언할수는 없다.
  let sum = 0;
  for (const num of numbers) {
    sum += num;
  }
  return sum;
};
```

### 함수 내부에 함수 선언
함수 내부에 전역적으로 함수 호출이 가능ㅇ
```javascript
const checkNumSum = (...numbers) => {
  sum = 0;
  const validateNumber = (number) => {
    return isNaN(number) ? 0 : number;
  };
  for (const num of numbers) {
    sum += validateNumber(num);
  }
  return sum;

  console.log(1,2,3,4,5,6);
  console.log(validateNumber("4")); // error
};
```

### 콜백 함수
함수를 등록하고 어떤 이벤트가 발생하거나 특정 시점에 도달했을 때 시스템에서 초출하는 함수   
함수자 인자로 넘겨지는 경우에 이 함수를 콜백함수라고 한다.  
이름이 지정된 함수를 포인팅해준다.

```javascript
const sumUp = (resultHandler, ...numbers) => { // resultHandler가 바로 함수를 담은 매개변수가 된다.
  let sum = 0;
  for (const num of numbers) {
    sum += num;
  }
  resultHandler(sum); //(2) resultHandler변수에 담긴 showResult(sum);으로 실행된다. 
};

const showResult = (result) => {
  alert("The result after adding all number is" + result);
};

console.log(sumUp(showResult, 1, 10, 15, 20, 30));
```

### .bind()
bind는 새로운 함수, 새로운 참조를 생성해 준다.  
bind로는 즉시 실행되지 않는 함수를 생성     
함수는 객체에 따라서 객체에 메서드 연결가능

함수의 인자를 "사전구성" 하려는 상황에서 함수를 직접 호출하지 않을때.

[>> 참고 링크](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
```javascript
this.x = 9; // 'this' refers to the global object (e.g. 'window') in non-strict mode
const module = {
  x: 81,
  getX() {
    return this.x;
  },
};

module.getX();
//  returns 81

const retrieveX = module.getX;
retrieveX();
//  returns 9; the function gets invoked at the global scope

//  Create a new function with 'this' bound to module
//  New programmers might confuse the
//  global variable 'x' with module's property 'x'
const boundGetX = retrieveX.bind(module);
boundGetX();
//  returns 81
```
기본 함수 인자/ 매개변수의 장점     
함수는 더 적은 인자를 사용하여 호출할 수 있다.

### call(), apply() 메서드

```javascript

```