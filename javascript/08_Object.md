# Object(객체)
**객체란?**     
javascript의 핵심 구조 

(Typicall reflect "real-world" entities)    
실제 객체를 나타낼 때 사용될 수 있음

- Allow us to apply real-world logic to coding

(Made up of properties & methods)
프로퍼티와 메소드로 구성됨

- 코드를 논리에 따라 나눌 수 있게 됨
- Allow you to group related data together and split your code into logical pieces

Reference Values (= Objects)    
\> 레퍼런스 타입의 값은 즉.. 객체다
- {...} : 객체 리터럴을 이용해서 객체를 생성한다.
- Arrays 
- DOM Nodes
- ... other built-in objects

## 객체 선언 방법
문법

    [const|let] 객체명 = {
        프로퍼티명1 : 값1,
        프로퍼티명2 : 값2, 
        ...
    };
예시
```javascript
const person = {
  name: "Max",
  age: 30,
  hobbies: ["Sports", "Cooking"],
  greet: function () {
    alert("Hi there!");
  },
};
```

### 프로퍼티 명 규칙
- 공백 사용 금지

    { ..., first name : "Hyelin", ...} (x)

- 프로퍼티명을 "" 또는 ''로 문자열로 만들 수 있음

    { ..., 'first name' : "Hyelin", ...} (O)

- 객체[프로퍼티명]으로 접근 가능

    person["first name"];

- 숫자로 프로퍼티명 지정 가능
  
  { ..., 1 : true, 4 : "hello", ...};   
  // 접근은 []사용해서 접근

## 프로퍼티 추가 및 삭제

## 프로퍼티 유형