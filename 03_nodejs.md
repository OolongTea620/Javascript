## 3. 파일 시스템 접근하기

### **1. fs**
파일 시스템에 접근하는 모듈    

파일/폴더 생성, 삭제, 읽기, 쓰기 기능이 있다.

웹 브라우저에서는 제한적이였으나,   
 노드는 권한을 가지고 있음  
#### 1. 파일 입출력
ex)
```javascript
const fs = require('fs');

fs.readFile('./readme.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log(data);
    console.log(data.toString());
});
```
> 해당 결과를 실행하면   바이너리,버퍼    
> (컴퓨터가 읽을 수 있는 0,1의 데이터)로 반환   

> promises 방식으로 선언되기도 한다.
> ```javascript
> const fs = require('fs').promises;
> fs.readFile('./README.md')
>   .then((data) => {
>       console.log(data);
>       console.log(data.toString());
>   })
>   .catch( (err) => {
>       throw err;
>   }); 
> ```
#### 2. 동기/비동기 메서드
*1. 파일 입출력 예제* 실행시 매번순서가 다르게 실행됨.    
... **순서에 맞게 실행을 시킬려면?**    

case 1)
동기와 비동기   
: 백그라운드 작업 완료 확인 여부    

case 2) 블로킹과 논 블로킹  
: 함수가 바로 return 되는지 여부    

\>**노드에서는 대부분 동기-블로킹 방식과 비동기-논 블로킹 방식**

```javascript
const fs = require('fs')

// 콜백을 사용하지 않아도 되서 코드가 간편해진다.
// 주로 서버 초기화 작업시 사용.
const data = fs.readFileSync('README.md');
console.log('1번', data.toString());
```

### 2. 버퍼와 스트림
**버퍼**: 일정한 크기로 모아두는 데이터  
-> 일정한 크기가 되면 한번에 처리   
- 버퍼링: 버퍼에 데이터가 찰 때까지 모으는 작업   

**스트림**: 데이터의 흐름   
->일정한 크기로 나눠서 여러번에 걸쳐 처리  
버퍼(또는 청크)의 크기를 작게 만들어서 **주기적으로 데이터를 전달**     
- 스트리밍: 일정한 크기의 데이터를 지속적으로 전달하는 작업   
장점: 서버의 메모리를 적게 차지한다.

### 3. pipe와 스트림 효율 확인
-> 예제 참조 
### 4.파일 관련 다른 기능들
#### fs.access(경로 옵션, 콜백) 
폴더나 파일에 접근 할 수 있는지를 체크.  
두번째 인자로 상수들을 넣는다.  
*F_OK*: 파일 존재 여부 체크
*R_OK*: 읽기 권한 여부 체크   
*W_OK*: 쓰기 권한 여부 체크

파일/폴더나 권한이 없으면 에러 발생     
->  파일/폴더가 없을 때 에러 코드는 ENOENT

#### fs.mkdir(경로,콜백)
폴더를 만드는 메서드    
이미 폴더가 있다면 에러발생    
-> **access() 메서드를 먼저 호출**해서 확인 필요

#### fs.open(경로,옵션,콜백)
파일의 아이디(fd 변수)를 가져오는 메서드    
파일이 없으면 파일을 생성 뒤 그 아이디를 가져옴.    
가져온 아이디를 사용해 fs.read()나 fs.write()로 읽거나 쓸수 있음.   
두번째 인자로 어떤 동작을 할 수 있는지 설정가능
*w*:쓰기 
*r*:읽기

#### fs.rename(기존경로,새 경로, 콜백)
파일의 이름을 바꾸는 메서드   
반드시 같은 폴더를 지정할 필요 없어 잘라내기 같은 기능을 할 수 있음

### 5.기타 메서드
**watch**   
파일을 감시하는 방법(변경사항 
발생 시 이벤트 호출)
```javascript
const fs = require('fs');
// target.txt가 변경될 때 해당 변경을 알려줌
fs.watch('./target.txt', (eventType,filename)=>{
    console.log(eventType, filename);
});
```
**fs.existsSync**
**fs.stats** : 파일이 폴더인지 일반 파일인지 알아낼 수 있음
