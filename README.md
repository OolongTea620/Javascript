# Javascript
Javascript 공부를 위한 레포지토리

## 설명
- javascript는 인터프리터 언어이다
- 현재는 ES6를 기준으로 사용하고 있음
- 다양한 분야에서 많이 쓰인다. (웹 프론트는 필수에 가깝고 백엔드는 Node.js 웹프페임 워크)
Naming Rule : camelCase (두 단어를 붙일 때 맨 앞에는 소문자, 뒤에 나오는 단어마다 앞글자는 대문자)
- 변수 , 함수등은 camelCase로 명명함
- boolean 변수는 isValiable / areEqual 과 같이 is 
- class명은 대문자,, 
## Syntax    
### 변수 선언
1. 변수 선언
  let 변수명;
  let 변수명 = 변수값;
  1. let으로 한번 변수를 선언하면 같은 이름으로 선언이 불가능하다
  2. var으로 한변 변수를 선언하면 같은 이름으로 선언이 가능하다.
2. 상수 선언
  const testValue = 12;
  const testValue2 = "test";
  testValue = 13; (x) // const 변수는 한번 생성하고 값을 넣으면 변경이 불가능하다.
### 데이터 타입 
1. Number 
  정수/부동소숫점을 통째로 Number데이터 타입으로 처리함 
  64bit 부동소숫점 형 (-(2^53 - 1) ~ (2^53 - 1))사이의 값
2. String
3. Boolean
  Boolean('name'); //true
  Boolean(''); //false
4. null
값이 없음을 나타냄. null은 null 이라는 데이터 하나만 가질 수 있다.
5. undefined
변수가 들어갈 공간은 있으나 값을 설정하지 않았기 때문에 할당되지 않은 상태

6. object
> 객체 타입을 나타냄 
선언 방법

7. Symbol
ES6에서 추가된 타입
Symbol은 unique한 값을 만듦
Symbol 문법
  
#### typeof 
- 변수의 데이터 타입을 확인하기 위한문법
> 사용방법
  const testValue1 = 1; 
  console.log(typeof testValue1); // number
  let testValue2 = "test";
  console.log(typeof testValue2); // string
  let testValue3 = 1 < 2; // true가 들어간다
  console.log(typeof testValue3) // boolean

#### 데이터 타입 변환
1. Number(): Number 타입으로 변환
2. parseInt(): Number 타입으로 변환하지만 정수로 만듦
3. parseFloat(): Number 타입으로 변환 부동 소숫점까지 그대로 데이터 변환
4. String(): String타입으로 변환
5. Boolean() Boolean 타입으로 변환

#### 동등 연산자(==)와 일치 연산자(===)
[] 동등 연산자 (==, !=) 관대한 연산자로, 기본적으로 값만 같은지 확인한다.
[x] 일치 연산자 (===, !==) 엄격한 연산자로, 값과 데이터타입 둘 다 같은지를 확인한다.

#### 주요 연신자
  - 변수++ : 변수에서 먼저 값을 꺼내고 그 다음에 1을 더함
  - ++변수 : 변수 값에 1을 더한 뒤 값을 꺼냄
