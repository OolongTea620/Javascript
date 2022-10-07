# Class 와 OOP(객체지향프로그래밍)

## Obejct-oriented Programming(OOP)이란?
\> **코드 내에서 실생활 개체(논리)로 작업을 하는 것**    


## Classes & Instance
Object  
The things you work with in code    
Instances of classes (based on classes)     
Class-based creation is an alternative to using object literals

Classes     
Blueprints for objects (구조적 정의 제시)   
Defined how objects look like, which properties and methods they have   
Classes make creation of multiple silmilar objects much easier

## 자바스크립트의 클래스
**클래스는 Javascript 객체의 블루프린트다**
## 클래스 생성 방법
- 클래스 {} 내부를 필드라고 한다.
- 모든 필드가 그 객체의 속성(property)로 바뀐다.
필드 : 클래스 본문 내부에 있는 생성자 매서드 외부에 정의된 프로퍼티
```javascript
class [클래스이름] {
    // 내부를 필드라 한다.
    title; // 이렇것을 [클래스이름]의 프로퍼티라고 한다.
}
```
## 클래스의 특징

### 생성자
필드에서 선언된 것을 생성자에서 덮어쓴다.
생성자에서 필드를 선언해도 된다.
- 생성자 함수안에 있는 모든 것은 속성이다.
```javascript
class Product {
    constructor(title, imageUrl, desc, price) {
    this.title = title; // 클래스를 인용하는 this
    this.imageUrl = imageUrl;
    this.description = desc;
    this.price = price;
  }
}
```

### 동적 프로퍼티,메서드,필드 (인스턴스 프로퍼티)
- static 키워드가 없다.
- 클래스를 기반으로 하는 인스턴스에만 액세스 가능 
클래스 인스턴스화 하기
```javascript
class Product {
}
```
### 정적 프로퍼티, 메서드, 필드 (스테틱 프로퍼티)
- 앞에 "static" 키워드가 붙는다.
- 클래스 자체에서 액세스 가능하다 
\> **클래스를 인스턴스화 할 필요가 없다.**
- 헬퍼 클래스, 전역 구성에 등에 사용된다.


### 클래스를 사용하는 것

|                   객체 리터럴을 사용할 때                   |                     클래스를 사용할 때                     |
| :---------------------------------------------------------: | :--------------------------------------------------------: |
| 한두번만 사용하는 함수, 데이터를 수집하고 그룹핑 하는 경우, |                여러번 재사용되는 코드(논리)                |
|               빠르고 쉬운 생성, 오버헤드 없음               | 초반 오버헤드는 존재하지만 그 뒤 객체 재사용이 수월해진다. |

## Getter & Setter (획득자와 설정자)
프로퍼티 값의 직접 접근 가능, 불가능 여부를 알 수 있음


## 상속 (Inheritance)
**목적**    
클래스는 다른 클래스를 기반으로 할 수 있으므로 기능을 공유한다.     
-> 클래스간 스크립트 공유를 수월하게함(코드 중복작성을 방지)    
    
**문법**
한번에 **하나의 클래스만 상속가능**하다.
```javascript
class Parent {
    ...
}

class Child extends Parent {
    ...
}
```

**상속의 의미**     
일반 객체를 생성하지만 모든 객체가 부모 

### 상속과 생성자

### 모든곳에서 상속 사용하기

### super 생성자

#### 1. super의 호출 순서
super()는 상속 클래스("하위 클래스")에서 this를 사용하기 전에 호출되어야 한다.
#### 2. 생성자와 this

#### 3. 메서드를 추가하는 다양한 방법

### Private Fielid, properties, methods

|                Public                |                    Private                     |
| :----------------------------------: | :--------------------------------------------: |
| 외부 클래스와 오브젝트에서 접근 가능 | 오직 내부 클래스/오브젝트에 접근 가능한 클래스 |
|   다른 코드에서 작업해야하는 것들    |                                                |
|         example: product.buy         |                                                |

**선언**    
변수 앞에 #을 붙이면 된다.
```javascript
#products = [];
```

**특징**    

'#'키워드가 붙은 메소드, 클래스 객체 외부에서 접근이 불가능

### Pseudo-Private 프로퍼티

private와 유사한 프로퍼티       
프로퍼티 앞에 "_"를 넣어서 객체 외부에서 접근 불가능 한다는 표시,   
```javascript
class User {
    constructor() {
        this._role = 'admin';
    }
}
 
 
const product = {
    _internalId: 'abc1' // 이거!
};
```

단, 기술적인 접근을 방지하지 않음 -> 엄격하지 않음
```javascript
const product = {
    _internalId: 'abc1'
};
console.log(product._internalId); // works!
```
## Instances 연산자
[데이터] instanceof [클래스, 오브젝트]     
\> 데이터가 클래스와 오브젝트에서 만들어졌는지 확인     
참이면 true, 거짓이면 false 반환
```javascript
class Person {
    name = "Max";
}

const p = new Person();

console.log(typeof p); //'object'

console.log(p instanceof Person) //true
```
## 빌트인 클래스
### Object 클래스
단순 빌트인 클래스
```javascript
const obj = new Object();
```

## 객체 설명자란?

자바스크립트가 저장하는 스크립트에 대한 메타 데이터     
객체와 객체 프로퍼티가 어떻게 사용될 수 있는지에 영향을 준다.   
```javascript
const person = { name : "Max" , greet() {
    console.log(this.name);
}}

Object.getOwnPropertyDescriptors(person);

// 이름 변경 불가능 하도록
Object.defineProperty(person, 'name', {
    configurable : true,
    enumerable : true,
    value : person.name,
    writable : false // 이름 변경 불가능하도록
});

person.name = "Anna";
console.log(person.name); // "Max"

```