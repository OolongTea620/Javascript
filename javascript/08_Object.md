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

### 프로퍼티 규칙과 유형
- 공백 사용 금지

    { ..., first name : "Hyelin", ...} (x)

- 프로퍼티명을 "" 또는 ''로 문자열로 만들 수 있음

    { ..., 'first name' : "Hyelin", ...} (O)

- 객체[프로퍼티명]으로 접근 가능

    person["first name"];

- 숫자로 프로퍼티명 지정 가능(양의 실수가능, 음수 불가능)
  
  { ..., 1 : true, 4 : "hello", ...};   
  // 접근은 []사용해서 접근
- 동적으로 키 이름을 설정 가능(동적 프로퍼티 할당)
```javascript
const userChosenKeyName = "level";

let person = {
  ...,
  hobbies: ["Sports", "Cooking"],
  [userChosenKeyName]: "...", // 키 이름을 동적으로 설정할 수 있다.
  ...
};
```
## 프로퍼티 추가 및 삭제

예시
```javascript
let person = {
  "first name": "Max",
  age: 30,
  hobbies: ["Sports", "Cooking"],
  greet: function () {
    alert("Hi there!");
  },
  1.5: "hello",
};
```
프로퍼티 추가   
객체에 '.'으로 접근해서 아직 정의되지 않은 프로퍼티에 엑세스 가능   
아직 **정의되지 않은 프로퍼티에 접근하면** **undefined** 가 표시된다

```javascript
person.isAdmin = true;
// person.age = 31; // 데이터 덮어쓰기 (수정) 가능

//  프로퍼티명이 전부 숫자면 오름차순으로 자동 정렬
const numbers = { 5: "hi", 1: true };
console.log(numbers);
```

프로퍼티 삭제   
delete : 프로퍼티 삭제
```javascript
delete person.age;
```
## 프로퍼티 참조 : bind, call, apply

## 객체에서의 This 
this는 사용위치와 (함수에서 사용되는 경우) 함수 호출 방법에 따라 다른 것을 참조한다.

보통 this는 (함수내부에서 사용되는 경우), 함수를 호출한 '무언가'를 나타낸다.    
이는 전역 컨텍스트, 객체 또는 바인딩된 데이터/객체일 수도 있다.

### 1. 전역 컨텍스트(함수 외부)에서의 this
```javascript
function something() {...}
console.log(this); // 전역객체 (브라우저의 창)를 기록한다. -항상
```

### 2. (화살표 함수가 아닌)함수에서의 this - 전역 컨텍스트에서 호출 시
```javascript
function something() {
    console.log(this);
}
something(this); // 엄격 모드가 아니라면 전역 객체(브라우저의 창)를 기록하고 엄격 모드라면 내부 함수
```
### 3. 화살표 함수에서의 this - 전역 컨텍스트에서 호출 시
```javascript
const something = () => {
    console.log(this);
}
something(this); // 전역객체(브라우저의 창) - 항상
```
### 4. (화살표가 아닌) 메서드에서의 this - 객체에 호출 시
```javascript
const person = { 
    name: 'Max',
    greet: function() { // or use method shorthand: greet() { ... }
        console.log(this.name);
    }
};
 
person.greet(); // 'Max'를 기록하고, "this"는 person 객체를 참조함
```

### 5.(화살표 함수) 메서드에서의 this - 객체에서 호출됐을 때
```javascript
const person = { 
    name: 'Max',
    greet: () => {
        console.log(this.name);
    }
};
 
person.greet(); // 아무것도 기록하지 않음(아니면 창 객체의 일부 전역 이름을 기록), 
//"this"는 엄격 모드에서도 전역(창) 객체를 나타냅니다.
```
**주의**    
this는 다른 객체에서 호출하는 경우 예상치 못한 것을 나타낼 수도 있습니다.
```javascript
const person = { 
    name: 'Max',
    greet() {
        console.log(this.name);
    }
};
 
const anotherPerson = { name: 'Manuel' }; // 내장된 greet 메서드가 없습니다!

anotherPerson.sayHi = person.greet; // greet은 여기서 호출되는 것이 아니라 "anotherPerson" 객체의 새로운 프로퍼티/메서드에 할당됩니다.
 
anotherPerson.sayHi(); // "anotherPerson" 객체에서 호출되었기 때문에 ‘Manuel’을 기록합니다 => "this"는 호출한 "무언가"를 나타냅니다
```

## getter과 setter
프로퍼티 값의 수정을 어렵게 한다.
(둘다 쓰거나 둘다 사용하지 않거나)
```javascript
const newMovie = {
    info: {
      set title(val) {
        if (val.trim() === "") {
          this._title = "Default";
        }
        this._title = val;
      },
      get title() {
        return this._title; // this._[프로퍼티명]
      },
      //title // title : title과 동일 (프로퍼티 명 === 변수명인 경우)
      [extraName]: extraValue,
    },
    id: Math.random().toString(),
    getFormattedTitle() {

      return this.info.title;
    },
  };
```