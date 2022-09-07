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
