# Javascript

**자바스크립트란**  
#### Dynamic, Interpreted Programming Language(동적 해석형 언어)
- 미리 컴파일 되지 않음. 
- 코드가 런타임에 평가되고 실행
- 코드가 런타임에서 변경될 수 있음                

#### Weakly Typed Programming Language(약형 프로그래밍 언어)
- 데이터 타입이 유추된다.
- 변수가 보율할 데이터 타입을 정할 필요가 없다.

#### Javascript runs On A Host Environment

Browser Side 
- 새 페이지를 로드하지 않고도 웹 사이트의 내용을 변경할 수 있음

- 백그라운드 Http 요청을 보낼 수 있음
"Other"(e.g Server-Side)
- V8 엔진 : 어디에서든 실행가능 (Node.js 운영체제와 상호작용 가능)


## Variables & Contents
- **let**   
변수 선언, 선언 뒤 데이터 변경 가능
```javascript
let userName = "myname";
userName = "hyelin";
```

- **const**     
상수 선언. 선언 뒤 데이터 **변경 불가**
```javascript
const userName = "myname";
userName = "hyelin";// error :
```
### Variable naming
```javascript
/*Good Case*/
const userName //camelCase 
let ageGroup5 // Only letters and digits
let $kindOfSpecial // Starting with $ is allowed
let _internalValue //Starting with _ is allowed

/*Bad Case*/
let user_name //Allowed but bad practice
let 21palyers //Starting digits not allowed
let user-b //No special charaters
let let // Keywords not allowed

```

**카멜 케이스**: 첫 단어는 모두 다음 연결단어는 시작은 대문자로 시작하는 규칙   
변수의 목적이 분명하게 드러나야 함

### Operators(연산자)
\+ : Add two numbers    
\- : Subtract two numbers   
\* : multiply two numbers   
\/ : Divide two numbers     
\% : Divide two numbers, yield remainder    
** : Exponentation (거듭제곱)

+=, -=, ... : Perform calculation and re-assign result to variable      
++[variable] : 1증가 뒤의 값을 반환     
[variable]++ : 먼저 값을 반환하고 해당 변수 값을 1증가      

--[variable] : 1감소 뒤의 값을 반환     
[variable]-- : 먼저 값을 반환하고 해당 변수 값을 1감소      

### Data Types
- numbers : 2,-3, 22.956 -> 자연수, 정수, 실수
- Strings(Text) : 'Hi' , "Hi", \`Hi` -> 문자열


### Functions(함수)

#### 함수 정의하기
자바스크립트에서 바로 실행되는 것은 아니지만 메모리에 저장을 해둔다.    
그 뒤 함수를 호출을 하면 함수 내의 코드를 실행한다.
```javascript
//(1) Define function 
function greetuser(name) {
    alert("Hi"+ name);
}
//(2) Call function
greetuser("hyelin");
```
#### 값 반환하기
```javascript
function add(num1, num2) {
    result = num1 + num2;
    return result; 
}
const additionResult = add(1, 2);
// additionResult에 3이 대입된다.
```
미리 할당되지 않은 변수에 넣으면 오류가 난다

```javascript
// Case(1) : 변수 선언전에 할당하면 에러
additionResult = add(1, 2); // 에러

const additionResult = add(1, 2);
```
**선 함수 실행 후 함수 선언시에는 작동한다.**
자바스크립트는 스크립트를 실행하기 전 자동으로 선언된 모든 함수를 등록한다
```javascript
const additionResult = add(1, 2); // 정상 실행
function add(num1, num2) {
    result = num1 + num2;
    return result; 
}
```
#### 전역 변수, 지역변수
전역 변수          
- 함수 밖에서 정의된 변수
- 함수는 전역변수에 접근 가능하다
- 함수 선언시, 최대한 함수 밖 전역변수 의존도가 낮을 수록 좋다.
지역 변수        
- 함수 내에서 정의된 변수
- 함수 밖에서 어떤 함수의 지역변수에 접근이 불가능하다

#### 섀도우 변수
함수에서 선언된 지역변수면서 전역 변수로도 존재하는 변수

#### return 
- 함수를 종료하는 코드 
- return  다음줄은 실행되지 않는다.

### 함수 실행에 관하여
함수 실행 시,

함수이름(); 
```javascript
function add() {
    something = someNum + someOtherNum; 
}
...
add();
```
만약 이벤트 리스너에 특정함수를 실행하도록 지시할 때?
```javascript
...
addBtn.addEventListener("click", add); //함수 이름을 적는다.
```

### 연산자
```javascript
parseInt(int); // 정수형으로 변환
parseFloat(float); // 실수형로 변환
toString(value);  //  어떤 값을 문자열로 변환

typeof "Nax"; // string 
typeof undefined //undefined
typeof null //object
typeof NaN // number

//javascript의 +는 문자열 연결도 포함되어 있어서 확인을 해야한다
3 + '3' // '33'
3 * '3' //9
3 - '3' // 0
3 / '3' // 1
```


## Data Types
|     name      |          example          | usage                                            |
| :-----------: | :-----------------------: | :----------------------------------------------- |
|    Numbers    |     2,-3, 22.956, ...     | 숫자형 데이터, 계산 필요시                       |
| Strings(Text) |     "Hi", 'Hi', \`Hi`     | 결과 출력시, 입력값 (input)값 모을 때            |
|    Boolean    |        true, false        | 2가지 옵션에서의 조건 확인, 상황 판단            |
|    Object     | { name : "Max", age : 31} | {key :value} 데이터를 그룹화 하거나 연관 짓을 때 |
|     Array     |          [1,3,5]          | Important for list data unknown amounts of data  |


### special values
|   name    | example | usage                                                                    |
| :-------: | :-----: | :----------------------------------------------------------------------- |
| undefined |         | Default value uninitailized variables (undefined는 직접 값을 줄 수 없다) |
|   null    |  null   | 변수를 재설정 하거나 정리하고 싶을 때                                    |

Nan : **데이터 타입이 아니다!**     
숫자대 문자 연산같은 **비유효한 연산이 일어날 때 발생**

```javascript
let userName; // undefined 변수 선언만하고 값을 할당 하지 않을 때
console.log(userName);

let nullname = null; // null 타입

3 * "hi" // NaN
```

### 객체(Object)
선언 방법
```javascript
// const objectName = {
//     keyName1 : property1,
//     keyName2 : property2, 
//     ...
// }; //세미콜론으로 끝남
const object = {
    operator: "ADD",
    prevResult: initialResult,
    number: enterNumber,
    result: currentResult,
}; 

```