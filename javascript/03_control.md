## Control Structures (제어구조)

### Conditional Statements (if statments) & Expressions

**Boolean Operators**   
true 또는 false를 반환하는 연산자
```javaScript
a == b // 두 값의 동등성 비교 
a != b // 두 값의 부등성 비교 (다르면 true)
a === b // 값과 자료형이 일치하는지 확인
a !== b // 값과 자료형이 하나라도 불일치 하는지 확인

a < b // 왼쪽이 오른쪽 보다 값이 작으면 true 
a > b // 왼쪽이 오른쪽 보다 값이 크면 true

// 문자열의 유니코드도 비교
'ab' > 'ac' // true
'a' > 'B' // true
'a' > 'b' // false

a <= b // 왼쪽이 오른쪽 보다 값이 작거나 같으면 true 
a >= b // 왼쪽이 오른쪽 보다 값이 크거나 같으면 true

!a // a의 부정 (반전)
```
**객체와 배열 비교시 주의점**   
객체와 배열은 특별한 것이라고 생각한다.     
\>> 전반적인 객체와 배열은 비교할 수 없다
```javascript
{name: 'MAX'} == {name: 'MAX'} // false
{name: 'MAX'} === {name: 'MAX'} // false

const hubbies = ["Sports", "Cooking"];
const morehubbies = ["Sports", "Cooking"];
hubbies == morehubbies //false
```

**Combining Conditions**
```javaScript
a && b // a와 b 모두 참이여야 true

|| // a와 b 둘 중 하나라도 참이어야 true
```
**Operator precedence (연산자의 우선순위)**   
[\>> 설명링크](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence) 


### 조건문
#### 1. if 
```javascript
if (condition) {
    // condition is true
    ...
}
```
#### 2. else
```javascript
if (condition) {
    // condition is true
    ...
}else {
    // if condition is not true
}
```
#### 3. else if
```javascript
if (condition1) {
    // condition1 is true
    ...
} else if(condition2) {
    // if condition1 is not true but condition2 is true
} else {
    // both condition1 condition2 are false
}
```

### Boolean Values & Operators
**Falsy and Truthy Values**     
자바스크립트가 true or false 를 판단하는 방식
```javaScript
const nameInput = "Max";
if (nameInput) {...} //true : nameInput이 빈 배열인지 아닌지가 중요
//위와 동일
if (nameInput === true){...}

```
| case                                      | true  | false |
| ----------------------------------------- | :---: | :---: |
| 0                                         |       |   O   |
| Any other number (incl. negative numbers) |   O   |       |
| ""(empty string)                          |       |   O   |
| Any other non-empty string (incl."false") |   O   |       |
| {}, [] & all other objects or arrays      |   O   |       |
| null, undefined, NaN                      |       |   O   |


**Conditional Expressions Ternary Operator(삼항연산자)**    
Use the ternary operator in such case   

    [조건식 or 조건] ? [true인경우 값] :[false인경우 값];
    const userName = isLogin ? Max : null


**Boolean Tricks with Logicla Operators**   
!! : 문자열, 객체등의 실제 true/false 값을 얻을 수 있다.
```javascript
!!"" // false
!!1 // true
```
|| : (예시)무언가 입력한 값이 falsy라면, "Max"라는 문자열을 반환한다.   
기본값 할당에 사용된다.
```javascript
// someInput이 truthy하면  someInput 값을 name에 저장한다.
//someInput이 falsy하면  "Max"를 name에 저장한다.
const name = someInput || "Max";

// altName과 null은 Falsy이므로 'Anna'가 반환됨
altname = "";
console.log(altName || null || 'Anna'); 
```
&& : 모두 참 혹은 truthy 하면 && 다음 값을 반환한다.
Use value if condition is true via AND operator
```javascript
// isLoggedIn 이 참이면 name에 "Max"가 저장되고
// 거짓이면 isLoggedIn의 값이 name에 저장된다.
const name = isLoggedIn && "Max"; 
```
**
절대로 someInput,altName,isLoggedIn의 값은 변하지 않음
**
#### 4. switch
동치 비교, fall through 형식 break로 조절 
```javascript
switch(condition_variable){ // 동치 비교
    //fall through
    case condition1 : 
    ...
    break; //다른 스위치가 실행되지 않도록 해주는 역할 (break가 있으면 해당 부분만 실행하고 switch문 종료)
    case condition2 : 
    ...
    break;
    ...
    default :
    // 어떤 케이스에도 충족이 안된경우 실행될 기본 코드
    break;
}
```


### Loops in JavaScript(반복문)
**Loops**   
특정 코드를 여러번 실행하는 것
#### 1. for loop
```javascript
for (let i =0; i <3 ;i++) { //(반복자, 조건, 증감)
  console.log(i)
}
```
#### 2. for-of loop
Excecute for **every element** in **an array**      
배열에 대한 모든 요소에 대한 코드 실행
```javascript
for (const el of array) {
  console.log(el);//배열의 한 요소에서만 접근가능
}
```
#### 3. for-in loop
Excecute for **every key** in **an object**     
객체에 모든 키에 대해 코드를 실행하도록 해주는
```javascript
for (const key in obj) { 
    console.log(key);
    console.log(obj[key]); //값에 대한 접근
}
```
#### 4. while loop
Excetuce code as long as a condition is true
조건이 참인경우 항상 실행      
조건이 거짓이 되면 루프를 탈출함
```javascript
/*
    (1) 조건이 참이면 (2) 실행
*/ 
while (isLoggedIn){ // (1)
  ... // (2)
}

/*
    (1)을 우선 한번 실행하고 (2)의 조건이 참이면 다시 (1)을 실행 
*/
do {
  ... // (1)
} while (condition); // (2) 
```

**break, continue**     
```javascript
for (condition ... ) {
    if (condition === "continue_case") {
        //코드가 if 안에 진입하면 code3, code4를 실행하고 
        code3;
        code4;
        continue; //다음 루프로 바로 진입
    }
    if (condition === "break_case") { 
        // 만약 코드가 if안에 진입하면  가장 가까운 for 반복문을 탈출(중단), 
        //code1, code2는 실행이 안됨
        break;
    }
    code1;
    code2;
}

outerwhile: do { // [반복문 식별이름] : for,do ...
    console.log("Outer", j);
    innerFor: for (let k = 0; k <5; k++){
        if (k === 3){
            break outerwhile; //outerwhile 반복문 종료
            // continue outerwhile // dangerous => infinite loop
        }
        console.log("Inner", k);
    }
} while(j < 3);
```

### Error Handling
Some errors can't be avoided (개발자가 핸들링하지 못하는 오류)  
ex) User Input Errors, Network Errors, ...
#### 사용자 정의 오류 발생시키기
```javascript
if (isNaN(chosenMaxLife) || chosenMaxLife <= 0){
    // throw로 오류를 발생시킨다.
    throw {message : "오류내용..." }
}
```
**try-catch**
```javascript
if (isNaN(chosenMaxLife) || chosenMaxLife <= 0){
    // throw로 오류를 발생시킨다.
    throw {message : "오류내용..." }
}

try {
    chosenMaxLife = getMaxLifeValues();
}catch (error) {
    console.log(error);
    chosenMaxLife = 100;
    alert("you entered something wrong...");
    throw error; // 오류재발생 작업
} finally {
    ... //  try 에서 오류 발생 여부 상관없이 반드시 실행 되는 코드
}