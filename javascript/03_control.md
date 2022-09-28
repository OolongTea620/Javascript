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
#### 4. switch
```javascript
```
### Boolean Values & Operators

### Loops in JavaScript

### Error Handling