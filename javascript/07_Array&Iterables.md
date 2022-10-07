# Arrays & Iterables
what we learn

    Different Ways of Creating Arrays   
    Working with Arrays - A Deep Dive   
    Important Array Methods     
    Other Iterables : Maps, Sets

#### 반복(Iterable)과 유사 배열객체란?


**Iterable**(반복자)    

기술적 정의:     
객체나 이터러블 프로토콜을 구현하는 객체    

프로그래머 입장:     
for-of문으로 반복해서 사용 할 수있다.

**An Array-like Object(유사 배열 객체)**    

기술적 정의:     
길이 프로퍼티를 가지고 아이템에 접근하기 위해서 인덱스를 살용하는 객체    

프로그래머 입장:     
-> 기술적 정의와 동일하다.

종류:   
NodeList, String...


## 1. Create Arrays
```javascript
// (1) 권장 방법
const numbers = [1, 2, 3];
console.log(numbers);

// (2) 배열 객체 선언 방법 -> 사용X
const moreNumbers = new Array(); // []
console.log(moreNumbers);
const moreNumbers1 = new Array("Hi", "Welcome!"); // ["Hi", "Welcome!"]
console.log(moreNumbers1);
const moreNumbers2 = new Array(1, 5); // [1,5]
console.log(moreNumbers2);
// (2) 주의!
const moreNumbers3 = new Array(5); // 크기가 5인 빈 배열
console.log(moreNumbers3);
// (2) new 없어도 가능
const oneNumber = Array(5, 2); // [5,2]
console.log(oneNumber);

// const yetMoreNumbers = Array.of(1, 2); //[1,2]
// console.log(yetMoreNumbers);

const moreNumbers = Array.from([1, 2]); //원소를 []에 넣어서 전달
console.log(moreNumbers);

const morechars = Array.from("Hi!"); // ["H",i","!"] 로 분리되서 들어간다.
console.log(morechars);

```

**동일하거나 다른 유형의 데이터를 가진 배열이  될 수있다.**

```javascript
const personalData = [30, "Max", { moreDetail: [] }];
```

**중첩배열, 다차원 배열도 가질 수 있다.**

```javascript
const analyticsData = [ [1,1.5],[-5.4,2.1]];

// 배열은 원소를 인덱스로 접근한다.
for (const data of analyticsData) {
  console.log(data); // 원소가 되는 배열 data가 배열이다
}
```

### 배열 관련 함수들

push(), unshift(), pop(), shift() :      
배열 요소에 변화를 준다.

```javascript
const hobbies = ["Sports", "Cooking"];
hobbies.push("Reading"); // 배열에 마지막 인덱스에 추가
console.log(hobbies); //["Sports", "Cooking", "Reading"]

hobbies.unshift("Coding"); // 원소를 배열의 왼쪽부터 추가
console.log(hobbies); //["Coding","Sports", "Cooking", "Reading"]

popValue = hobbies.pop(); //배열의 마지막 요소 반환하면서 삭제
console.log(popValue); // Reading, ["Coding", "Sports", "Cooking"]

hobbies.shift(); // 배열의 첫번재 요소 삭제, 원소 왼쪽으로 한칸 이동
console.log(hobbies); // ["Sports", "Cooking"]
```

splice() : 인덱스로 접근, 수정

```javascript
hobbies[1] = "Coding";
console.log(hobbies); //["Sports", "Coding"]

hobbies[5] = "test"; // 만약 아득히 먼 인덱스에 값을 넣으면 공간을 할당하고 출력한다.
//['Sports', 'Coding', empty × 3, 'test']
console.log(hobbies[4]); // undefined

// 특정 요소 사이에 삽입
hobbies.splice(1, 0, "Good Food"); // hobbies[1]에 "Good Food"가 삽입되고, 다른 요소들은 삽입된 만큼 이동한다.
// hobbies.splice("시작번호", "삭제할 요소 갯수", "넣을 값");
console.log(hobbies);
hobbies.splice(0, 1); // 첫번째 요소 1개 삭제하고 그 만큼 왼쪽으로 가져옴
console.log(hobbies);

hobbies.splice(2); // 2번째 요소(0,1 요소만)까지 남기고 전부 삭제
console.log(hobbies);

hobbies.splice(0); // 배열원소 전부 삭제
console.log(hobbies);

hobbies.splice(-2, 1); // 음수를 입력하면 배열의 끝으로 이동해서 오른쪽 부터 확인
// 음수 인덱스로 오른쪽 부터 엑세스 할 수있다.
```

slice() : 배열 깊은 복사 및 일부분 새 배열로 복사 반환

```javascript
const testResult = [1, 2, 5.3, 1.5, 10.99, -5, 10];

//slice() 깊은 배열복사 ()
const copyResult = testResult.slice() 
// 인덱스 0이상 3미만으로 배열 깊은 복사 반환
const storedResult = testResult.slice(0, 3);
// 인덱스 3부터 끝까지 반환 
const storedResult2 = testResult.slice(3); 
// 음수로 지정가능
const storedResult3 = testResult.slice(-5, -1);
// 왼쪽 인덱스가 오른쪽 인덱스보다 크지 말아야
const storedResult4 = testResult.slice(3, 2); //[]

testResult.push(5.6);
console.log(storedResult, testResult);
```

concat() : 두 배열 합치기
```javascript
const testResult = [1, 2, 5.3, 1.5, 10.99, -5, 10];
// testResult 마지막뒤에 요소 3.99, 2를 원소로 추가한 새 배열을 반환
const storedResult = testResult.concat([3.99, 2]);
```
indexOf(), lastIndexOf() : 원시값에서 찾기
```javascript
// 배열 요소중 인자와 동일한 값을 가진 첫번째 요소의 인덱스를 반환
// 설명과 일치하는 첫번째 요소를 찾으면 종료
console.log(testResult.indexOf(1.5));

// 배열의 오른쪽에서부터 탐색해서 설명과 일치하는 요소를 만나면 종료
console.log(testResult.lastIndexOf(1.5));

// !주의 : 참조값에 대해서는 실행되지 않음
const personData = [{ name: "Max" }, { name: "Manual" }];
console.log(personData.indexOf({ name: "Manual" })); //-1은 없다는 의미
```

findIndex(), findeOf : 참조값의 경우 찾는 방법
```javascript
const personData = [{ name: "Max" }, { name: "Manual" }];

// find는 복사본을 생성하지 않음 참조값을 반환
const manual = personData.find((person, idx, persons) => {
  return person.name === "Manual";
});

// findIndex는 해당 객체가 있는 배열의 인덱스를 반환
const maxIndex = personData.findIndex((person, idx, persons) => {
  return (person.name = "Max");
});
```

includes() : 배열요소에 값이 있는지 없는지 확인

```javascript
console.log(testResult.includes(1.4));
```

forEach문 : 배열 요소 접근 대안
```javascript
const prices = [10.99, 5.99, 3.99, 6.59];
const tax = 0.19;
const taxAdjustedPrices = [];

// for (const price of prices) {
//   taxAdjustedPrices.push(price * (1 + tax));
// }
prices.forEach((price, idx, prices) => {
  const priceObj = { index: idx, taxAdjPrice: price * (1 + tax) };
  taxAdjustedPrices.push(priceObj);
});
console.log(prices);
console.log(taxAdjustedPrices);
```
map() : 배열을 객체로 전환
```javascript
const prices = [10.99, 5.99, 3.99, 6.59];
const tax = 0.19;

const taxAdjustedPrices = prices.map((price, idx, prices) => {
  const priceObj = { index: idx, taxAdjPrice: price * (1 + tax) };
  return priceObj;
});

console.log(prices, taxAdjustedPrices);
```

sort(), reverse()
```javascript
// 오름차순(작 -> 큰) 
const sortedPrice = prices.sort((a, b) => {
  if (a > b) { // 왼쪽 숫자 크면 왼쪽숫자 인덱스 1증가
    return 1;
  } else if (a === b) { // 같으면 제자리
    return 0;
  } else { // 다르면 인덱스 1감소 
    return -1;
  }
});
console.log(sortedPrice);

// 내림차순 (큰 -> 작)
console.log(sortedPrice.reverse());
```
filter() : 조건에 해당하는 요소를 반납함
```javascript
// const filterArray = prices.filter((price, index, prices) => {
//   return price > 6;
// }); // 배열값, 인덱스, 배열(원본) 받음
const filterArray = prices.filter((price) => price > 6);

console.log(filterArray);
```

**reduce() : 배열의 값을 단일 값으로 결합할 때 정말 유용**
```javascript
const sum = prices.reduce((prevalue, curvalue, curIndex, prices) => {
  return prevalue + curvalue; // 해당 경우는 요소들의 합을 더하는 거라서 어렵다.
}, 0);
```

split() , join() : 배열의 요소를 나누거나, 합치거나
```Javascript
const data = "new york;10.99;2000";
const transformData = data.split(";"); // ";'을 기준으로 나눔
console.log(transformData); // "new york", 10.99, 2000

const nameFragments = ["Max", "test"];
const fullName = nameFragments.join(" "); // 배열을 문자열로 " " 붙이기
console.log(fullName); // "Max test"
```

## 배열 복사
### 전개 구문
배열의 모든 원소를 개별요소로 변환
```javascript
const copiedName = [...nameFragments]; // nameFragments 의 모든 원소를 꺼내서 새로운 배열에 저장
console.log(copiedName);

Math.min(1, 5, -3); // 들어간 인자 중 가장 작은 것을 반환한다.

const numbers = [1, 5, 3, 2, 6, 5, 2, -3];
console.log(Math.min(...numbers));

// 객체 복사 -> 객체의 주소를 복사
const persons = [
  { name: "max", age: 30 },
  { name: "manual", age: 20 },
];
//const copiedPersons = [...persons];
const copiedPersons = [
  ...persons.map((person) => ({ name: person.name, age: person.age })),
];
persons.push({ name: "Anna", age: 45 });
persons[0].age = 1; // 변경시 복사본에도 영향을 줆

console.log(persons, copiedPersons);
```
### 구조 분해 할당
