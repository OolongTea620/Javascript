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
4. null
5. undefined 
6. object
7. Symbol
#### typeof 
- 변수의 데이터 타입을 확인하기 위한문법
> 사용방법
  const testValue1 = 1; 
  console.log(typeof testValue1); // number
  let testValue2 = "test";
  console.log(typeof testValue2); // string
  let testValue3 = 1 < 2; // true가 들어간다
  console.log(typeof testValue3) // boolean
