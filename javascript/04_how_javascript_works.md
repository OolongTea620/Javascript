# How Javascript Works (자바스크립트 동작방식)

## ES5 VS ES6+ + Syntax
ECMAScript == JavaScript   
### Javascript Evolution
ES5(and older) -> ES6(and newer): Modern JavaScript
- ES6에서 새로운 기능들이 도입이 되어 있다.
- ES6는 최신 브라우저 기능을 많이 지원한다.
- ES6는 문법이 긍정적인 방향(간결, 효율적)으로 많이 발전되었다.

### **var vs let vs cost**
var
- ES5이전에서의 변수 선언 방법.
-  Function, Global(함수, 전역) scope를 가진다.   
- 호이스팅 

    (변수 사용이 선언보다 먼저 이루어지는 스크립트에서 코드 검사시  
    미리 같은 변수 이름으로 var 변수를 선언하는 것)

let
- ES6이후 변수 선언 방법.
- Block scope를 가진다.

const
- ES6이후 상수 선언 방법
- Block scope를 가진다.

※ Block scope란?

    블록({}) 내에서 let, const로 선언된 변수는   
    해당 블록에 속하게 된다.

## How Javascript Engine Works
Javascript는 브라우저에서 작동한다.     

브라우저 엔진이 자바스크립트 코드를 해석하고 실행한다   
(크롬은 v8, firefox는 spider Monkey)
    
    인터프리터의 역할
    - 코드를 바이트코드로 변환하고 그것을 컴파일러에게 전달한다.
    - 변환한 코드를 실행하는 역할
    컴파일러의 역할 (Just in Time)
    - 인터프리터가 읽고, 실행하는 동안 머신코드로 전환한다.
    - 머신코드를 내 컴퓨터(운영체제)에 전달하는 역할
브라우저 API들이 컴파일된 코드에 접근해 실행하기도 한다.

**Javascript vs 브라우저API**   
Javascript언어  
\> 핵심 구문(let, const등)은 이해하지만 DOM에 대해서는 아무것도 모른다.

Browser API     
\> 코드를 이해할 책임이 없는 대신, 스크립트 내부에서 사용할 수 있는 DOM API같은 API를 호출해야 된다.

## The Weired Parts in Javascript
**Primitive vs Reference Values**
### 1. Primitive Values
메모리에 저장된다(주로 Stack)  
variable stores value itself(변수영역에 직접 값이 저장된다)     
원시값을 가진 새로운 변수에 할당하고 **실제로 그 값을 복사한다 (그대로 가진다)**.   
Copying a variable (= assign to different variable)copies the value

    /* 종류 */
    Strings
    Numbers
    Booleans
    null
    undefined
    Symbol(심화)

### 2. Reference Values
All other **objects**("more expensive to create")   
Stored in memory **Heap** // 힙에 저장된다.   
variable stores a pointer(address) to location in memory    
**변수가** 값을 받을 때 원본이 아닌 **데이터의 주소를 복사** 받는다.

